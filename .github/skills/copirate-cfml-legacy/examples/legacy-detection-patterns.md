# Legacy Detection Patterns

**Purpose:** Identify legacy CFML patterns requiring modernization using automated detection rules.

## Detection Categories

### 1. Procedural Code Patterns

#### High cfinclude Count (>5 per file)
**Pattern:**
```cfml
<cfinclude template="header.cfm">
<cfinclude template="navigation.cfm">
<cfinclude template="sidebar.cfm">
<cfinclude template="content.cfm">
<cfinclude template="footer.cfm">
<cfinclude template="analytics.cfm">
```

**Risk:** Tight coupling, maintenance burden, no encapsulation

**Detection Rule:**
```javascript
// Use copirate_analysis for complexity analysis
copirate_analysis({
  operation: "analysis_file",
  filePath: "/path/to/legacy.cfm"
});

// Check for cfinclude count in results
```

**Modernization Target:** Component-based architecture with layouts and controllers

---

### 2. Inline SQL Queries

#### Query-heavy Business Logic
**Pattern:**
```cfml
<cfquery name="qUser" datasource="myDB">
  SELECT * FROM users WHERE id = #url.id#
</cfquery>

<cfif qUser.recordCount>
  <cfquery name="qOrders" datasource="myDB">
    SELECT * FROM orders WHERE userId = #qUser.id#
  </cfquery>
</cfif>
```

**Risk:** SQL injection, no abstraction, duplicate queries across files

**Detection Rule:**
```javascript
// Search for inline queries
copirate_database({
  operation: "grep_search",
  query: "<cfquery",
  includePattern: "**/*.cfm"
});
```

**Modernization Target:** Repository pattern with parameterized queries

---

### 3. God Components (>1000 lines)

#### Monolithic Service Files
**Pattern:**
```cfml
component {
  // 50+ methods, mixed concerns (authentication, business logic, data access)
  function authenticateUser() { }
  function logAction() { }
  function sendEmail() { }
  function processOrder() { }
  function generateReport() { }
  // ... 45 more methods
}
```

**Risk:** Unmaintainable, low cohesion, violates Single Responsibility Principle

**Detection Rule:**
```javascript
copirate_specialized_analysis({
  operation: "complexity_hotspots",
  workspacePath: "/path/to/project"
});

// Results show components >1000 lines with complexity metrics
```

**Modernization Target:** Split into domain-specific services (AuthService, OrderService, ReportService)

---

### 4. Application Scope Abuse

#### Application-scoped Service Factories
**Pattern (Application.cfm):**
```cfml
<cfset application.userService = createObject("component", "services.UserService")>
<cfset application.productService = createObject("component", "services.ProductService")>
<cfset application.orderService = createObject("component", "services.OrderService")>
```

**Risk:** No dependency injection, tight coupling, difficult testing

**Detection Rule:**
```cfml
// Search for Application scope object creation
grep_search({
  query: "application\\.[a-zA-Z]+\\s*=\\s*createObject",
  isRegexp: true,
  includePattern: "**/Application.cf*"
});
```

**Modernization Target:** DI/1 framework with bean factory

---

### 5. Query of Queries (QoQ)

#### In-memory Query Processing
**Pattern:**
```cfml
<cfquery name="qUsers" datasource="myDB">
  SELECT id, name, status FROM users
</cfquery>

<cfquery name="qActive" dbtype="query">
  SELECT * FROM qUsers WHERE status = 'active'
</cfquery>
```

**Risk:** CF2025 breaking change (`dbtype="query"` removed), performance issues

**Detection Rule:**
```javascript
grep_search({
  query: "dbtype=\"query\"",
  isRegexp: false,
  includePattern: "**/*.cfm"
});
```

**Modernization Target:** Database-side filtering with WHERE clauses, or `queryExecute()` with `dbtype: "query"`

---

### 6. cfmodule Tag Dependencies

#### Legacy Custom Tag System
**Pattern:**
```cfml
<cfmodule template="/customtags/layout.cfm" title="Dashboard">
  <cfmodule template="/customtags/menu.cfm">
  <!-- content -->
</cfmodule>
```

**Risk:** Deprecated pattern, hard to test, poor IDE support

**Detection Rule:**
```javascript
grep_search({
  query: "<cfmodule",
  isRegexp: false,
  includePattern: "**/*.cfm"
});
```

**Modernization Target:** Component-based layouts with FW/1 or CFWheels

---

## Automated Detection Workflow

### Step 1: Run Copirate Analysis Suite
```javascript
// Comprehensive codebase analysis
copirate_run_suite({
  request: "analyze legacy patterns"
});
```

**Returns:**
- Complexity hotspots (god components)
- Design pattern violations
- Performance anti-patterns
- Security vulnerabilities (inline SQL)

### Step 2: Query CID for Legacy Patterns
```javascript
copirate_database({
  operation: "cid_search_documentation",
  query: "legacy detection patterns"
});
```

### Step 3: Memory-First Pattern Recognition
```javascript
copirate_memory({
  operation: "memory_retrieve",
  content: "legacy cfml patterns inline queries god components",
  type: "pattern"
});
```

### Step 4: Generate Refactoring Roadmap
Use detected patterns to prioritize modernization:
1. **High Priority:** SQL injection risks (inline queries)
2. **Medium Priority:** God components (>1000 lines)
3. **Low Priority:** Aesthetic refactoring (cfinclude cleanup)

---

## Example Detection Report

**File:** `ShowReport.cfm`
**Legacy Patterns Detected:**
- ✅ High cfinclude count (8 includes)
- ✅ Inline SQL queries (12 queries)
- ✅ No parameterized queries (SQL injection risk)
- ✅ Mixed concerns (business logic + presentation)
- ❌ God component (N/A - not a .cfc file)

**Recommended Modernization Path:**
1. Extract inline queries → `ReportRepository.cfc`
2. Extract business logic → `ReportService.cfc`
3. Convert to FW/1 controller → `report.cfc`
4. Use layouts for includes → `layouts/main.cfm`

---

## Pattern Detection Stencils

**Copirate Stencils for Legacy Analysis:**
- `cf-large-object-remediation` - God component detection and remediation
- `cf-security-performance-assessment` - SQL injection vulnerability scanning
- `cf2025-breaking-changes-analysis` - CF2025 compatibility (QoQ deprecation)

**Access via:**
```javascript
copirate_database({
  operation: "cid_search_documentation",
  query: "cf large object remediation"
});
```

---

## Resources

- [Martin Fowler - Strangler Fig Pattern](https://martinfowler.com/bliki/StranglerFigApplication.html)
- [Refactoring Guru - God Object Anti-Pattern](https://refactoring.guru/antipatterns/god-object)
- [CFDocs - Query of Queries Migration](https://cfdocs.org/query-of-queries)
