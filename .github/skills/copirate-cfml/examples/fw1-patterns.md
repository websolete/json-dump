# FW/1 Architecture Patterns

This document demonstrates best practices for FW/1 (Framework One) application architecture, focusing on the separation of concerns between controllers and service layers.

## Table of Contents

- [Thin Controller Pattern](#thin-controller-pattern)
- [Service Layer Pattern](#service-layer-pattern)
- [Best Practices Summary](#best-practices-summary)

---

## Thin Controller Pattern

**Goal:** Keep controllers focused on orchestration only—no business logic, no direct database access.

**Target size:** 50-200 lines per controller method.

### Example: User Management Controller

```cfml
/**
 * Example FW/1 Thin Controller - User Management
 *
 * Demonstrates best practices for FW/1 controller architecture:
 * - Thin orchestration only (50-200 lines per method)
 * - Business logic delegated to service layer
 * - No direct database access
 * - Standard response patterns
 * - DI/1 dependency injection
 */
component extends="BaseController" {

  // DI/1 automatic property injection
  property userService;
  property validationService;

  /**
   * List all active users
   * @rc struct                     Request context
   */
  public void function index(required struct rc) {
    // Delegate to service layer
    rc.users = userService.listActiveUsers();

    // Set pagination if needed
    rc.currentPage = structKeyExists(rc, "page") ? rc.page : 1;
    rc.pageSize = 20;
  }

  /**
   * Display user details
   * @rc struct                     Request context (expects rc.id)
   */
  public void function view(required struct rc) {
    // Validate required parameters
    if (!structKeyExists(rc, "id") || !isNumeric(rc.id)) {
      variables.fw.redirect(
        action = "user.index",
        queryString = "error=invalid_id"
      );
      return;
    }

    // Delegate to service layer
    rc.user = userService.getUserById(rc.id);

    // Handle not found
    if (!rc.user.exists) {
      variables.fw.redirect(
        action = "user.index",
        queryString = "error=not_found"
      );
    }
  }

  /**
   * Save user (create or update)
   * @rc struct                     Request context (expects user data in form)
   */
  public void function save(required struct rc) {
    // Validate input (delegate to validation service)
    var validationResult = validationService.validateUser(rc);

    if (!validationResult.isValid) {
      // Validation failed - redisplay form with errors
      rc.errors = validationResult.errors;
      variables.fw.setView("user.form");
      return;
    }

    // Delegate save operation to service layer
    var saveResult = userService.saveUser(rc);

    if (saveResult.success) {
      // Success - redirect to user detail page
      variables.fw.redirect(
        action = "user.view",
        queryString = "id=#saveResult.userId#&message=saved"
      );
    } else {
      // Save failed - redisplay form with errors
      rc.errors = saveResult.errors;
      variables.fw.setView("user.form");
    }
  }

  /**
   * Delete user (soft delete)
   * @rc struct                     Request context (expects rc.id)
   */
  public void function delete(required struct rc) {
    // Validate required parameters
    if (!structKeyExists(rc, "id") || !isNumeric(rc.id)) {
      variables.fw.redirect(
        action = "user.index",
        queryString = "error=invalid_id"
      );
      return;
    }

    // Delegate to service layer
    var deleteResult = userService.deleteUser(rc.id);

    if (deleteResult.success) {
      variables.fw.redirect(
        action = "user.index",
        queryString = "message=deleted"
      );
    } else {
      variables.fw.redirect(
        action = "user.index",
        queryString = "error=delete_failed"
      );
    }
  }
}
```

### Key Controller Principles

1. **Orchestration only**: Controllers coordinate between services, views, and redirects
2. **No business logic**: All business rules live in the service layer
3. **No database access**: Never write SQL or call repositories directly
4. **Standard response patterns**: Use consistent redirect patterns for success/error states
5. **Dependency injection**: Use DI/1 property injection for services

---

## Service Layer Pattern

**Goal:** Encapsulate all business logic, validation, and coordination between repositories.

### Example: User Service

```cfml
/**
 * User Service - Business Logic Layer
 *
 * Demonstrates service layer pattern:
 * - Encapsulates business logic
 * - Validates business rules
 * - Coordinates multiple repositories
 * - Implements transaction boundaries
 * - Returns structured results
 */
component {

  // DI/1 injected dependencies
  property userRepository;
  property auditLogService;
  property emailService;
  property passwordService;

  /**
   * List all active users
   * @return array - Array of user structs
   */
  public array function listActiveUsers() {
    return userRepository.findActiveUsers();
  }

  /**
   * Get user by ID
   * @id numeric                    User ID
   * @return struct - User data or {exists: false}
   */
  public struct function getUserById(required numeric id) {
    return userRepository.findById(arguments.id);
  }

  /**
   * Authenticate user with username and password
   * @username string               User's login name
   * @password string               User's password (plaintext)
   * @return struct - {isAuthenticated: boolean, userId: numeric, errors: array}
   * @backstory Created to centralize authentication logic after security audit
   */
  public struct function authenticateUser(
    required string username,
    required string password
  ) {
    var result = {
      isAuthenticated: false,
      userId: 0,
      errors: []
    };

    // Validate inputs
    if (len(trim(arguments.username)) == 0) {
      arrayAppend(result.errors, "Username is required");
      return result;
    }

    if (len(trim(arguments.password)) == 0) {
      arrayAppend(result.errors, "Password is required");
      return result;
    }

    // Fetch user from repository
    var user = userRepository.findByUsername(arguments.username);

    if (!user.exists) {
      // Log failed attempt (security)
      auditLogService.logFailedLogin(
        username: arguments.username,
        reason: "User not found",
        ipAddress: cgi.remote_addr
      );

      // Generic error message (don't reveal user existence)
      arrayAppend(result.errors, "Invalid username or password");
      return result;
    }

    // Verify password (using bcrypt)
    if (!passwordService.verify(arguments.password, user.passwordHash)) {
      // Log failed attempt (security)
      auditLogService.logFailedLogin(
        username: arguments.username,
        reason: "Invalid password",
        ipAddress: cgi.remote_addr
      );

      arrayAppend(result.errors, "Invalid username or password");
      return result;
    }

    // Check if account is active
    if (!user.isActive) {
      arrayAppend(result.errors, "Account is inactive. Contact support.");
      return result;
    }

    // Success - log and return
    auditLogService.logSuccessfulLogin(
      userId: user.id,
      ipAddress: cgi.remote_addr
    );

    result.isAuthenticated = true;
    result.userId = user.id;

    return result;
  }

  /**
   * Save user (create or update)
   * @userData struct               User data (id, username, email, etc.)
   * @return struct - {success: boolean, userId: numeric, errors: array}
   */
  public struct function saveUser(required struct userData) {
    var result = {
      success: false,
      userId: 0,
      errors: []
    };

    // Business rule: Check for duplicate username/email
    if (structKeyExists(arguments.userData, "username")) {
      var existingUser = userRepository.findByUsername(arguments.userData.username);
      if (existingUser.exists) {
        var isUpdate = structKeyExists(arguments.userData, "id") && existingUser.id == arguments.userData.id;
        if (!isUpdate) {
          arrayAppend(result.errors, "Username already exists");
          return result;
        }
      }
    }

    // Business rule: Email must be unique
    if (structKeyExists(arguments.userData, "email")) {
      var existingEmail = userRepository.findByEmail(arguments.userData.email);
      if (existingEmail.exists) {
        var isUpdate = structKeyExists(arguments.userData, "id") && existingEmail.id == arguments.userData.id;
        if (!isUpdate) {
          arrayAppend(result.errors, "Email already exists");
          return result;
        }
      }
    }

    // Delegate to repository
    try {
      result.userId = userRepository.save(arguments.userData);
      result.success = true;

      // Send welcome email if new user
      if (!structKeyExists(arguments.userData, "id") || arguments.userData.id == 0) {
        emailService.sendWelcomeEmail(arguments.userData.email);
      }

    } catch (any e) {
      arrayAppend(result.errors, "Failed to save user: #e.message#");
    }

    return result;
  }

  /**
   * Delete user (soft delete)
   * @id numeric                    User ID to delete
   * @return struct - {success: boolean, errors: array}
   */
  public struct function deleteUser(required numeric id) {
    var result = {
      success: false,
      errors: []
    };

    // Business rule: Check if user exists
    var user = userRepository.findById(arguments.id);
    if (!user.exists) {
      arrayAppend(result.errors, "User not found");
      return result;
    }

    // Business rule: Cannot delete admins
    if (user.isAdmin) {
      arrayAppend(result.errors, "Cannot delete admin users");
      return result;
    }

    // Perform soft delete
    try {
      userRepository.softDelete(arguments.id);
      result.success = true;
    } catch (any e) {
      arrayAppend(result.errors, "Failed to delete user: #e.message#");
    }

    return result;
  }
}
```

### Key Service Layer Principles

1. **Business logic encapsulation**: All business rules live here (validation, authorization, calculations)
2. **Structured returns**: Always return consistent structs with `{success, errors, data}` pattern
3. **Repository coordination**: Orchestrate multiple repositories when needed
4. **Transaction boundaries**: Wrap multi-step operations in transactions
5. **Security logging**: Audit sensitive operations (authentication, authorization failures)
6. **Generic error messages**: Don't leak internal details to users ("Invalid username or password" vs "User not found")

---

## Best Practices Summary

### Controller Responsibilities ✅

- Request parameter validation (type checking, required fields)
- Service method invocation
- View selection and rendering
- Redirect logic based on results
- Pagination and sorting parameters

### Controller Anti-Patterns ❌

- Direct database queries
- Business logic (validation rules, calculations)
- Email sending or external API calls
- File I/O operations
- Logging business events

### Service Responsibilities ✅

- Business rule validation
- Authorization checks
- Repository coordination
- Transaction management
- External service integration (email, APIs)
- Business event logging
- Domain calculations

### Service Anti-Patterns ❌

- Direct HTTP request/response manipulation
- View rendering logic
- Request parameter parsing
- Redirect decisions
- Session management

---

**Related Resources:**
- [Security Patterns](security-patterns.md) - OWASP-compliant security examples
- [Performance Patterns](performance-patterns.md) - CF2025 optimization techniques
- FW/1 Official Documentation: https://framework-one.github.io/
- DI/1 Dependency Injection: https://framework-one.github.io/documentation/4.3/using-di-one.html

---

## cfCopirate Extracted Quick Examples

### Action With rc/prc Boundaries

~~~cfml
/**
 * Lists users for the current status filter.
 *
 * @rc struct         Request collection input values.
 * @prc struct        Private request collection for view rendering.
 * @return void
 */
public void function list(
  required struct rc,
  required struct prc
) {
  var statusFilter = structKeyExists(arguments.rc, "status") ? arguments.rc.status : "active";
  arguments.prc.users = variables.userService.getUsersByStatus(statusFilter);
  arguments.prc.status = statusFilter;
}
~~~

### FW/1 Lifecycle before() And after() Hooks

~~~cfml
/**
 * Normalizes pagination input before action execution.
 *
 * @rc struct    Request collection.
 * @prc struct   Private request collection.
 * @return void
 */
public void function before(required struct rc, required struct prc) {
  var page = val(arguments.rc.page ?: 1);
  arguments.rc.page = page > 0 ? page : 1;
  arguments.prc.startTime = getTickCount();
}

/**
 * Records action timing after execution completes.
 *
 * @rc struct    Request collection.
 * @prc struct   Private request collection.
 * @return void
 */
public void function after(required struct rc, required struct prc) {
  var elapsed = getTickCount() - arguments.prc.startTime;
  variables.logger.debug('Action elapsed=' & elapsed & 'ms event=' & (arguments.rc.action ?: 'unknown'));
}
~~~

### Transaction-Wrapped Service Registration

~~~cfml
/**
 * Registers a new user and dispatches a welcome notification atomically.
 *
 * @input struct   Registration fields: email, displayName.
 * @return struct
 * @throws application When registration or notification dispatch fails.
 */
public struct function register(required struct input) {
  var validation = variables.validator.validateRegistration(arguments.input);
  if (!validation.isValid) {
    return { success: false, errors: validation.errors, data: {} };
  }

  var userId = 0;

  transaction {
    try {
      userId = variables.userRepository.insertUser(arguments.input.email, arguments.input.displayName);
      variables.notificationService.dispatch('welcome', userId);
    } catch (database dbEx) {
      throw(type='application', message='Registration failed.', detail=dbEx.message);
    }
  }

  return { success: true, errors: [], data: { userId: userId } };
}
~~~
