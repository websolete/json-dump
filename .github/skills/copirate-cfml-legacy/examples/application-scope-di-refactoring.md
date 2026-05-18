# Application Scope DI Refactoring

**Purpose:** Migrate Application scope service factories to DI/1 framework for dependency injection, testability, and maintainability.

## Legacy Pattern: Application Scope Service Factory

### Before (Legacy Application.cfm)
```cfml
<cfapplication
  name="LegacyApp"
  sessionmanagement="true"
  sessiontimeout="#createTimeSpan(0,0,30,0)#">

<cfif NOT structKeyExists(application, "initialized")>
  <!--- Manual service instantiation --->
  <cfset application.userService = createObject("component", "services.UserService")>
  <cfset application.productService = createObject("component", "services.ProductService")>
  <cfset application.orderService = createObject("component", "services.OrderService")>
  <cfset application.emailService = createObject("component", "services.EmailService")>
  <cfset application.auditService = createObject("component", "services.AuditService")>

  <!--- Manual dependency wiring --->
  <cfset application.orderService.setUserService(application.userService)>
  <cfset application.orderService.setProductService(application.productService)>
  <cfset application.orderService.setEmailService(application.emailService)>

  <cfset application.initialized = true>
</cfif>
```

### Legacy Controller Usage
```cfml
<!--- OrderController.cfm --->
<cfparam name="form.userId" default="0">
<cfparam name="form.productId" default="0">
<cfparam name="form.quantity" default="1">

<!--- Direct application scope access (tight coupling) --->
<cfset orderResult = application.orderService.createOrder(
  userId = form.userId,
  productId = form.productId,
  quantity = form.quantity
)>

<cfif orderResult.success>
  <cfset application.emailService.sendOrderConfirmation(orderResult.orderId)>
  <cflocation url="order.cfm?id=#orderResult.orderId#">
<cfelse>
  <cfset request.errors = orderResult.errors>
  <cfinclude template="order-form.cfm">
</cfif>
```

**Problems:**
- ❌ No dependency injection (tight coupling to `application` scope)
- ❌ Manual dependency wiring (error-prone, forgotten dependencies)
- ❌ Difficult to test (cannot mock services)
- ❌ No lifecycle management (services persist entire application lifetime)
- ❌ Circular dependency risks

---

## Modern Pattern: DI/1 Framework Integration

### Step 1: Install DI/1 (FW/1 Companion)

**Download:** [DI/1 GitHub Repository](https://github.com/framework-one/di1)

**Project Structure:**
```
/myapp
  /framework
    one.cfc         (FW/1 core)
    ioc.cfc         (DI/1 bean factory)
  /model
    /services
      UserService.cfc
      ProductService.cfc
      OrderService.cfc
      EmailService.cfc
      AuditService.cfc
    /repositories
      UserRepository.cfc
      ProductRepository.cfc
      OrderRepository.cfc
  /controllers
    order.cfc
  Application.cfc    (FW/1 + DI/1 setup)
```

### Step 2: Configure DI/1 in Application.cfc

```cfml
component extends="framework.one" {

  this.name = "ModernApp";
  this.sessionManagement = true;
  this.sessionTimeout = createTimeSpan(0, 0, 30, 0);

  // FW/1 configuration
  variables.framework = {
    // Enable DI/1 for dependency injection
    diEngine: "di1",
    diLocations: "/model",  // Scan /model for beans
    diConfig: {
      // Singleton services (cached in application scope)
      singletons: [
        "userService",
        "productService",
        "orderService",
        "emailService",
        "auditService"
      ],
      // Transient beans (new instance per request)
      transients: [
        "userValidator",
        "productValidator"
      ]
    }
  };

  function setupApplication() {
    // DI/1 automatically discovers and wires dependencies
    // No manual createObject() calls needed!
  }
}
```

### Step 3: Update Services for Property Injection

**Before (Legacy UserService.cfc):**
```cfml
component {
  // No dependency declarations

  function getUser(numeric id) {
    // Directly access application scope
    var qUser = application.userRepository.findById(id);
    return qUser;
  }
}
```

**After (Modern UserService.cfc):**
```cfml
component {
  // DI/1 property injection
  property userRepository;
  property auditService;

  /**
   * Retrieves user by ID
   *
   * @id numeric                      User identifier
   *
   * @return struct                   User data
   */
  public struct function getUser(required numeric id) {
    // Dependencies automatically injected by DI/1
    var user = userRepository.findById(arguments.id);
    auditService.log("user_viewed", arguments.id);
    return user;
  }
}
```

**DI/1 automatically:**
- ✅ Discovers `UserService.cfc` in `/model/services/`
- ✅ Injects `userRepository` property (found in `/model/repositories/`)
- ✅ Injects `auditService` property (found in `/model/services/`)
- ✅ Manages singleton lifecycle (cached in application scope)

### Step 4: Refactor Controllers to Use Dependency Injection

**Before (Legacy OrderController.cfm):**
```cfml
<cfset orderResult = application.orderService.createOrder(...)>
```

**After (Modern /controllers/order.cfc):**
```cfml
component {
  // FW/1 automatically injects via DI/1
  property orderService;
  property emailService;

  /**
   * FW/1 action: order.create
   * Handles POST requests to create orders
   */
  public void function create(struct rc) {
    var orderResult = orderService.createOrder(
      userId = rc.userId,
      productId = rc.productId,
      quantity = rc.quantity
    );

    if (orderResult.success) {
      emailService.sendOrderConfirmation(orderResult.orderId);
      variables.fw.redirect(
        action = "order.view",
        queryString = "id=#orderResult.orderId#"
      );
    } else {
      rc.errors = orderResult.errors;
      variables.fw.setView("order.form");
    }
  }
}
```

**Benefits:**
- ✅ No `application` scope references (loose coupling)
- ✅ Testable (can inject mock services)
- ✅ Clear dependencies (property declarations)
- ✅ FW/1 + DI/1 handle wiring automatically

---

## Step 5: Complex Dependencies (Constructor Injection)

**Scenario:** `OrderService` depends on `UserService`, `ProductService`, and `EmailService`

**Property Injection (Recommended):**
```cfml
component {
  property userService;
  property productService;
  property emailService;
  property auditService;

  // DI/1 auto-wires all properties
}
```

**Constructor Injection (Alternative):**
```cfml
component {
  variables.userService = {};
  variables.productService = {};
  variables.emailService = {};

  /**
   * Constructor for manual dependency injection
   */
  public OrderService function init(
    required userService,
    required productService,
    required emailService
  ) {
    variables.userService = arguments.userService;
    variables.productService = arguments.productService;
    variables.emailService = arguments.emailService;
    return this;
  }
}
```

**DI/1 supports both patterns** - property injection is more concise.

---

## Step 6: Testing with Mocked Dependencies

**Legacy Problem:** Cannot test `OrderService` because it directly accesses `application.emailService`

**Modern Solution:** Inject mock EmailService

```cfml
// OrderServiceTest.cfc
component extends="testbox.system.BaseSpec" {

  function run() {
    describe("OrderService", function() {
      it("should send confirmation email after order creation", function() {
        // Arrange: Create mock EmailService
        var mockEmailService = createMock("services.EmailService");
        mockEmailService.$("sendOrderConfirmation").$results(true);

        // Create OrderService with injected mock
        var orderService = new services.OrderService();
        orderService.setEmailService(mockEmailService);

        // Act: Create order
        var result = orderService.createOrder(
          userId = 1,
          productId = 100,
          quantity = 2
        );

        // Assert: Verify email was sent
        expect(mockEmailService.$once("sendOrderConfirmation")).toBeTrue();
      });
    });
  }
}
```

**Before DI:** Impossible to test without hitting real email service
**After DI:** Full test coverage with mocked dependencies

---

## Migration Checklist

### Phase 1: Setup DI/1 Framework
- [ ] Download and install FW/1 + DI/1
- [ ] Configure `diEngine: "di1"` in `Application.cfc`
- [ ] Define `diLocations` (scan `/model` directory)
- [ ] Configure singletons vs transients

### Phase 2: Refactor Services
- [ ] Add `property` declarations for dependencies
- [ ] Remove `application.` references
- [ ] Update constructors for DI/1 compatibility
- [ ] Add CFDoc documentation for properties

### Phase 3: Refactor Controllers
- [ ] Convert `.cfm` controllers to `.cfc` components
- [ ] Extend FW/1 base controller
- [ ] Add property injections
- [ ] Remove `application.` references

### Phase 4: Remove Legacy Application Scope Init
- [ ] Delete manual `createObject()` calls in `Application.cfm/cfc`
- [ ] Delete manual dependency wiring code
- [ ] Rely on DI/1 auto-discovery

### Phase 5: Testing
- [ ] Write unit tests with mocked dependencies
- [ ] Verify DI/1 bean factory configuration
- [ ] Test transient vs singleton lifecycle

---

## Common Pitfalls

### Pitfall 1: Circular Dependencies
**Problem:** `OrderService` depends on `UserService`, which depends on `OrderService`

**Solution:** Introduce interface or event-driven decoupling
```cfml
// Instead of direct dependency, use events
orderService.fireEvent("orderCreated", { orderId: orderId });
```

### Pitfall 2: Forgetting to Declare Properties
**Problem:** `property emailService;` missing, DI/1 doesn't inject
**Solution:** Always declare properties for injected dependencies

### Pitfall 3: Mixing Application Scope and DI/1
**Problem:** Some services use DI/1, others use `application.service`
**Solution:** Migrate ALL services at once (or use Strangler Fig pattern)

---

## Resources

- [DI/1 Documentation](https://framework-one.github.io/documentation/4.3/di-one.html)
- [FW/1 + DI/1 Integration Guide](https://framework-one.github.io/documentation/4.3/using-di-one.html)
- [Martin Fowler - Dependency Injection](https://martinfowler.com/articles/injection.html)
- [TestBox for ColdFusion Unit Testing](https://testbox.ortusbooks.com/)
