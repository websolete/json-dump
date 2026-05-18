# Data Access Modernization

**Purpose:** Transform inline SQL queries into Repository pattern with parameterized queries for security, maintainability, and testability.

## Legacy Pattern: Inline Queries Everywhere

### Before (Legacy ShowReport.cfm)
```cfml
<!--- ShowReport.cfm - 500+ lines of inline queries --->
<cfparam name="url.startDate" default="">
<cfparam name="url.endDate" default="">
<cfparam name="url.status" default="">

<!--- Query 1: Get users --->
<cfquery name="qUsers" datasource="myDB">
  SELECT id, username, email FROM users
  WHERE status = '#url.status#'
</cfquery>

<!--- Query 2: Get orders for each user --->
<cfloop query="qUsers">
  <cfquery name="qOrders_#qUsers.id#" datasource="myDB">
    SELECT
      o.id, o.orderDate, o.total,
      p.name AS productName
    FROM orders o
    INNER JOIN products p ON o.productId = p.id
    WHERE o.userId = #qUsers.id#
      AND o.orderDate >= '#url.startDate#'
      AND o.orderDate <= '#url.endDate#'
  </cfquery>
</cfloop>

<!--- Query 3: Calculate totals --->
<cfquery name="qTotals" datasource="myDB">
  SELECT
    COUNT(*) AS orderCount,
    SUM(total) AS grandTotal
  FROM orders
  WHERE orderDate >= '#url.startDate#'
    AND orderDate <= '#url.endDate#'
</cfquery>

<!--- Display logic mixed with data access --->
<h1>Sales Report</h1>
<table>
  <cfloop query="qUsers">
    <tr>
      <td>#qUsers.username#</td>
      <td>
        <cfset userOrders = evaluate("qOrders_#qUsers.id#")>
        <cfoutput>#userOrders.recordCount#</cfoutput>
      </td>
    </tr>
  </cfloop>
</table>
```

**Problems:**
- ❌ **SQL Injection:** Unsanitized `url` parameters directly interpolated
- ❌ **N+1 Query Problem:** 1 query for users + N queries for orders (performance nightmare)
- ❌ **Mixed Concerns:** Data access + business logic + presentation in one file
- ❌ **No Reusability:** Duplicate queries across multiple reports
- ❌ **Untestable:** Cannot unit test data access logic

---

## Modern Pattern: Repository + Service Layer

### Architecture Overview

```
Presentation Layer (View)
    ↓
Controller Layer (Thin orchestration)
    ↓
Service Layer (Business logic)
    ↓
Repository Layer (Data access)
    ↓
Database
```

---

### Step 1: Create Repository for Data Access

**UserRepository.cfc:**
```cfml
component {

  /**
   * Finds users by status with parameterized query
   *
   * @status string                  User status filter (active, inactive, pending)
   *
   * @return query                    User records
   */
  public query function findByStatus(required string status) {
    return queryExecute(
      "SELECT id, username, email, status
       FROM users
       WHERE status = :status
       ORDER BY username",
      {
        status: { value: arguments.status, cfsqltype: "cf_sql_varchar" }
      },
      { datasource: "myDB" }
    );
  }

  /**
   * Finds all active users
   *
   * @return query                    Active user records
   */
  public query function findActiveUsers() {
    return this.findByStatus("active");
  }
}
```

**OrderRepository.cfc:**
```cfml
component {

  /**
   * Finds orders for multiple users within date range
   *
   * @userIds array                   List of user IDs
   * @startDate date                  Start date for order range
   * @endDate date                    End date for order range
   *
   * @return query                    Order records with product information
   */
  public query function findOrdersByUsersAndDateRange(
    required array userIds,
    required date startDate,
    required date endDate
  ) {
    // Single query replaces N+1 pattern
    return queryExecute(
      "SELECT
         o.id, o.userId, o.orderDate, o.total,
         p.name AS productName
       FROM orders o
       INNER JOIN products p ON o.productId = p.id
       WHERE o.userId IN (:userIds)
         AND o.orderDate >= :startDate
         AND o.orderDate <= :endDate
       ORDER BY o.orderDate DESC",
      {
        userIds: { value: arrayToList(arguments.userIds), list: true, cfsqltype: "cf_sql_integer" },
        startDate: { value: arguments.startDate, cfsqltype: "cf_sql_date" },
        endDate: { value: arguments.endDate, cfsqltype: "cf_sql_date" }
      },
      { datasource: "myDB" }
    );
  }

  /**
   * Calculates order totals for date range
   *
   * @startDate date                  Start date
   * @endDate date                    End date
   *
   * @return struct                   { orderCount: numeric, grandTotal: numeric }
   */
  public struct function calculateTotalsByDateRange(
    required date startDate,
    required date endDate
  ) {
    var qTotals = queryExecute(
      "SELECT
         COUNT(*) AS orderCount,
         COALESCE(SUM(total), 0) AS grandTotal
       FROM orders
       WHERE orderDate >= :startDate
         AND orderDate <= :endDate",
      {
        startDate: { value: arguments.startDate, cfsqltype: "cf_sql_date" },
        endDate: { value: arguments.endDate, cfsqltype: "cf_sql_date" }
      },
      { datasource: "myDB" }
    );

    return {
      orderCount: qTotals.orderCount,
      grandTotal: qTotals.grandTotal
    };
  }
}
```

**Benefits:**
- ✅ **Parameterized Queries:** All inputs use `cfqueryparam` (SQL injection prevention)
- ✅ **Single Query:** Replaces N+1 pattern with `IN` clause (massive performance boost)
- ✅ **Reusable:** Other reports can use same repository methods
- ✅ **Testable:** Repository can be mocked in unit tests

---

### Step 2: Create Service Layer for Business Logic

**ReportService.cfc:**
```cfml
component {

  // DI/1 property injection
  property userRepository;
  property orderRepository;

  /**
   * Generates sales report data for specified date range and status
   *
   * @startDate date                  Report start date
   * @endDate date                    Report end date
   * @status string                   User status filter (default: active)
   *
   * @return struct                   { users: array, totals: struct }
   */
  public struct function generateSalesReport(
    required date startDate,
    required date endDate,
    string status = "active"
  ) {
    // 1. Get users by status
    var qUsers = userRepository.findByStatus(arguments.status);

    // 2. Extract user IDs
    var userIds = [];
    for (var row in qUsers) {
      arrayAppend(userIds, row.id);
    }

    // 3. Get all orders in ONE query (not N queries)
    var qOrders = orderRepository.findOrdersByUsersAndDateRange(
      userIds,
      arguments.startDate,
      arguments.endDate
    );

    // 4. Group orders by user
    var userOrderMap = {};
    for (var order in qOrders) {
      if (!structKeyExists(userOrderMap, order.userId)) {
        userOrderMap[order.userId] = [];
      }
      arrayAppend(userOrderMap[order.userId], {
        id: order.id,
        orderDate: order.orderDate,
        total: order.total,
        productName: order.productName
      });
    }

    // 5. Build user report data
    var users = [];
    for (var user in qUsers) {
      arrayAppend(users, {
        id: user.id,
        username: user.username,
        email: user.email,
        orders: structKeyExists(userOrderMap, user.id)
          ? userOrderMap[user.id]
          : [],
        orderCount: structKeyExists(userOrderMap, user.id)
          ? arrayLen(userOrderMap[user.id])
          : 0
      });
    }

    // 6. Calculate totals
    var totals = orderRepository.calculateTotalsByDateRange(
      arguments.startDate,
      arguments.endDate
    );

    return {
      users: users,
      totals: totals,
      dateRange: {
        startDate: arguments.startDate,
        endDate: arguments.endDate
      }
    };
  }
}
```

**Benefits:**
- ✅ **Business Logic Isolation:** All report logic in one place
- ✅ **No SQL:** Service layer doesn't know about database structure
- ✅ **Testable:** Can mock repositories and test business logic independently
- ✅ **Reusable:** Other controllers can use `generateSalesReport()`

---

### Step 3: Create Thin Controller

**report.cfc (FW/1 Controller):**
```cfml
component {

  // DI/1 injection
  property reportService;

  /**
   * FW/1 action: report.sales
   * Displays sales report view
   */
  public void function sales(struct rc) {
    // Default parameters
    param rc.startDate = dateAdd("d", -30, now());
    param rc.endDate = now();
    param rc.status = "active";

    // Validate date inputs
    if (!isDate(rc.startDate)) {
      rc.startDate = dateAdd("d", -30, now());
    }
    if (!isDate(rc.endDate)) {
      rc.endDate = now();
    }

    // Generate report (business logic delegated to service)
    rc.reportData = reportService.generateSalesReport(
      parseDateTime(rc.startDate),
      parseDateTime(rc.endDate),
      rc.status
    );

    // View will render: /views/report/sales.cfm
  }
}
```

**Controller Characteristics:**
- ✅ **Thin:** Only 20 lines (orchestration only)
- ✅ **No SQL:** All data access delegated to service
- ✅ **Clear Flow:** Validate → Delegate → Render

---

### Step 4: Create Clean View

**views/report/sales.cfm:**
```cfml
<cfoutput>
<h1>Sales Report</h1>
<p>Date Range: #dateFormat(rc.reportData.dateRange.startDate, "mm/dd/yyyy")#
   to #dateFormat(rc.reportData.dateRange.endDate, "mm/dd/yyyy")#</p>

<h2>Summary</h2>
<ul>
  <li>Total Orders: #rc.reportData.totals.orderCount#</li>
  <li>Grand Total: #dollarFormat(rc.reportData.totals.grandTotal)#</li>
</ul>

<h2>User Orders</h2>
<table>
  <thead>
    <tr>
      <th>User</th>
      <th>Email</th>
      <th>Orders</th>
    </tr>
  </thead>
  <tbody>
    <cfloop array="#rc.reportData.users#" index="user">
      <tr>
        <td>#encodeForHTML(user.username)#</td>
        <td>#encodeForHTML(user.email)#</td>
        <td>#user.orderCount#</td>
      </tr>
    </cfloop>
  </tbody>
</table>
</cfoutput>
```

**View Characteristics:**
- ✅ **Pure Presentation:** No queries, no business logic
- ✅ **XSS Prevention:** All output uses `encodeForHTML()`
- ✅ **Readable:** Clear HTML structure

---

## Performance Comparison

### Legacy Pattern (N+1 Queries):
```
1 query for users (10ms)
+ 50 queries for orders (50 * 20ms = 1000ms)
= 1010ms total
```

### Modern Pattern (Optimized):
```
1 query for users (10ms)
+ 1 query for all orders (50ms)
+ 1 query for totals (30ms)
= 90ms total
```

**Result:** **91% faster** (1010ms → 90ms)

---

## Migration Checklist

### Phase 1: Identify Legacy Files
- [ ] Use `grep_search` to find files with `<cfquery>` tags
- [ ] Run `copirate_analysis` to find complexity hotspots
- [ ] Prioritize by query count (files with 5+ queries first)

### Phase 2: Create Repositories
- [ ] Create `UserRepository.cfc` with `findByStatus()`
- [ ] Create `OrderRepository.cfc` with date range queries
- [ ] Add CFDoc documentation for all methods
- [ ] Use `cfqueryparam` for ALL parameters

### Phase 3: Create Services
- [ ] Create `ReportService.cfc` with business logic
- [ ] Inject repositories via DI/1 property injection
- [ ] Extract N+1 patterns into single queries
- [ ] Return structured data (not raw queries)

### Phase 4: Refactor Controllers
- [ ] Create FW/1 controller `report.cfc`
- [ ] Inject services via DI/1
- [ ] Remove inline queries
- [ ] Add input validation

### Phase 5: Update Views
- [ ] Remove `<cfquery>` tags from views
- [ ] Use `rc.reportData` from controller
- [ ] Add `encodeForHTML()` for XSS prevention
- [ ] Separate presentation from data access

### Phase 6: Testing
- [ ] Write unit tests for repositories
- [ ] Mock repositories in service tests
- [ ] Integration test full report generation
- [ ] Performance test (compare before/after query counts)

---

## Common Pitfalls

### Pitfall 1: Forgetting cfqueryparam
**Problem:** Repository still uses string interpolation
**Solution:** ALWAYS use parameterized queries
```cfml
// ❌ WRONG
"WHERE status = '#arguments.status#'"

// ✅ CORRECT
{ status: { value: arguments.status, cfsqltype: "cf_sql_varchar" } }
```

### Pitfall 2: Returning Queries from Service Layer
**Problem:** Service returns raw `query` object (tight coupling)
**Solution:** Convert to arrays/structs
```cfml
// ❌ WRONG (returns query)
return userRepository.findByStatus("active");

// ✅ CORRECT (returns struct)
var qUsers = userRepository.findByStatus("active");
return {
  users: queryToArray(qUsers),
  count: qUsers.recordCount
};
```

### Pitfall 3: Business Logic in Repository
**Problem:** Repository contains validation or calculations
**Solution:** Repository = data access ONLY, Service = business logic

---

## Query Optimization Techniques

### Use JOIN Instead of N+1
**Before (N+1):**
```cfml
<cfloop query="qUsers">
  <cfquery name="qOrders">
    SELECT * FROM orders WHERE userId = #qUsers.id#
  </cfquery>
</cfloop>
```

**After (JOIN):**
```cfml
<cfquery>
  SELECT u.*, o.id AS orderId, o.total
  FROM users u
  LEFT JOIN orders o ON u.id = o.userId
</cfquery>
```

### Use Query Caching
```cfml
queryExecute(
  "SELECT * FROM products WHERE categoryId = :catId",
  { catId: { value: 5, cfsqltype: "cf_sql_integer" } },
  {
    datasource: "myDB",
    cachedWithin: createTimeSpan(0, 0, 5, 0) // 5 minute cache
  }
);
```

### Use Indexed Columns
```sql
-- Add indexes for frequently queried columns
CREATE INDEX idx_orders_userId_orderDate
ON orders (userId, orderDate);
```

---

## Resources

- [Martin Fowler - Repository Pattern](https://martinfowler.com/eaaCatalog/repository.html)
- [CFDocs - queryExecute](https://cfdocs.org/queryexecute)
- [N+1 Query Problem Explained](https://secure.phabricator.com/book/phabcontrib/article/n_plus_one/)
- [OWASP - SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
