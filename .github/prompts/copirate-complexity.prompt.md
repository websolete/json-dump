---
name: copirate-complexity
description: Analyze complexity hotspots with actionable remediation recommendations
---
<!-- deployment_hash: 5669d391 -->
<!-- Extension Version: 1.32.6 -->
<!-- Deployed: 2026-05-18 -->
<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->


# Copirate Complexity - Hotspot Analysis & Remediation

Invoke as: **/copirate-complexity**

## Purpose

Identify complexity hotspots across the workspace and provide actionable remediation strategies with priority rankings and a quantitative estimate of complexity reduction or performance improvement.

## When to Use

- Planning refactoring work
- Investigating performance bottlenecks
- Preparing code quality reports
- Before major feature additions
- During technical debt assessment
- When code becomes difficult to maintain

## What It Analyzes

Read this section in order: complexity metrics and thresholds first, hotspot rules second, remediation strategies last.

### Complexity Metrics

| Metric | What It Measures | Hotspot Threshold |
|--------|------------------|-------------------|
| **Cyclomatic Complexity** | Branching and decision points | File >15, function >10 |
| **Cognitive Complexity** | Mental effort to understand code | File >30 |
| **Lines of Code** | File and function size analysis | Large object >500 LOC |
| **Nesting Depth** | Deep conditional structures | >4 levels |
| **Method Count** | God objects and bloated classes | >20 methods |

### Hotspot Detection

| Hotspot Type | Trigger |
|--------------|---------|
| Complexity Threshold | File exceeds >15 cyclomatic or >30 cognitive |
| Function Hotspot | Function complexity >10 |
| Large Object | >500 lines or >20 methods |
| Deep Nesting | Nesting depth >4 |
| Coupling/Cohesion | High coupling or low cohesion patterns |

### Remediation Strategies
- **Extract Method**: Break down long functions
- **Extract Class**: Decompose god objects
- **Simplify Conditionals**: Replace with polymorphism
- **Reduce Nesting**: Guard clauses and early returns
- **Parameter Objects**: Replace long parameter lists

## Usage Instructions

1. **Invoke the Prompt**:
   ```
   /copirate-complexity
   ```

2. **Specify Scope** (optional):
   - **Workspace-wide**: Analyze entire codebase
   - **Directory**: Focus on specific folder (e.g., `src/services/`)
   - **Single file**: Deep dive into one component

3. **Execute Analysis**:
   ```typescript
   // Identify complexity hotspots
   copirate_specialized_analysis({
     operation: "performance_hotspots",
     includeOptimizationPlan: true,
     includeRecommendations: true
   });
   ```

4. **Review Hotspot Report**:
   - Priority-ranked list of complex areas
   - Severity indicators (🔴 Critical, 🟡 Warning, ✅ Acceptable)
   - Specific line ranges for each issue

5. **Implement Recommendations**:
   - Start with P1 (Critical) items
   - Follow provided refactoring patterns
   - Use before/after code examples

6. **Store Insights**:
   ```typescript
   copirate_memory({
     operation: "memory_store",
     type: "solution",
     content: "Complexity analysis findings and remediation strategies",
     tags: ["complexity", "refactoring", "hotspots"],
     importance: 8
   });
   ```

## Self-Assessment Format

**After each phase of analysis or remediation, provide structured self-assessment.**

```markdown
# SELF-ASSESSMENT → [CONTINUE|COMPLETE|BLOCKED]

- **Confidence:** X%
- **Quality:** Y/10
- **Evidence:** X/Y verified
- **Current Focus:** [one-line description of current phase]

## Progress Summary

| Status | Count | Details |
|--------|-------|---------|
| 🟢 Completed | X items | [hotspots analyzed, metrics calculated] |
| 🟡 In Progress | Y items | [remediation phase, refactoring] |
| ⚪ Remaining | Z items | [validation, pattern storage] |

## Completion Verification & Reality Check

| Claim |
|-------|
| 🟢 [The completion statement - e.g., "Identified 5 critical hotspots"] |

| Reality Check |
|---------------|
| 🟢 Complexity metrics calculated (cyclomatic, cognitive, LOC) |
| 🟢 Hotspots prioritized by impact and remediation effort |
| 🟡 Remediation strategies provided for each hotspot |
| 🔴 Post-refactoring validation not yet performed |
| 🔴 Before/after metrics comparison pending |

### Evidence Checklist

| Verification Area | Evidence/Result |
|-------------------|------------------|
| 🟢 Analysis Complete | X files analyzed, Y hotspots detected |
| 🟢 Metrics Calculated | Cyclomatic: A→B, Cognitive: C→D, LOC: E→F |
| 🟡 Remediation Plan | Phase 1/2/3 strategies defined |
| 🔴 Validation Pending | Re-run analysis after refactoring |
```

**Confidence Transparency:**
- Explain what metrics are certain vs. estimated
- Identify assumptions in complexity calculations
- Highlight files that may need manual review
- Call out edge cases (generated code, test files, external dependencies)

- **Estimated Remediation:** 4-6 weeks
- **Projected Complexity Reduction:** 156 → 48 points (-69%)

## Top 5 Complexity Hotspots

| Rank | File | Complexity | LOC | Priority | Key Issues |
|------|------|------------|-----|----------|------------|
| 1 | 🔴 OrderService.ts | 45 | 1,340 | P1 | God Object (7 responsibilities), 12 long methods, max nesting 7 |
| 2 | 🔴 UserService.ts | 38 | 987 | P1 | High coupling (15 dependencies), duplicated validation |
| 3 | 🟡 PaymentProcessor.ts | 28 | 743 | P2 | Complex conditionals (8 nested if-else), switch statement smell |
| 4 | 🟡 ReportGenerator.ts | 25 | 612 | P2 | Long methods (5 >80 LOC), formatting logic mixed with business |
| 5 | 🟡 ValidationService.ts | 20 | 435 | P3 | Repeated code patterns, 6 similar validation methods |

## Detailed Analysis

### 1. 🔴 OrderService.ts

#### Metrics

| Metric | Value | Threshold | Status |
|--------|-------|-----------|--------|
| Cyclomatic Complexity | 45 | 20 | 🔴 Critical (+125%) |
| Cognitive Complexity | 62 | 30 | 🔴 Critical (+107%) |
| Lines of Code | 1,340 | 500 | 🔴 Critical (+168%) |
| Methods Count | 38 | 20 | 🔴 Critical (+90%) |
| Max Nesting Depth | 7 | 4 | 🔴 Critical (+75%) |
| Dependencies | 23 | 10 | 🔴 Critical (+130%) |

#### Code Smells Detected

| Smell | Instances | Impact |
|-------|-----------|--------|
| 🔴 God Object | 7 responsibilities | Violates SRP, hard to test/maintain |
| 🔴 Long Method | 12 methods >50 LOC | Reduces readability, increases complexity |
| 🔴 Deep Nesting | 7 levels in processOrder() | Cognitive overload, hard to debug |
| 🟡 Feature Envy | Database logic embedded | High coupling, violates DI principle |
| 🟡 Duplicated Code | Validation repeated 8x | DRY violation, maintenance burden |

#### Remediation Plan

**Phase 1: Extract Classes (Priority 1)**

| New Class | Extracted Methods | Complexity Reduction | Effort |
|-----------|-------------------|----------------------|--------|
| ValidationService | validateOrder, validatePayment, validateAddress | 45 → 32 (-29%) | 2-3 days |
| CalculationService | calculateTotals, applyDiscounts, calculateTax | 32 → 24 (-25%) | 2 days |
| NotificationService | sendConfirmation, notifyAdmin, sendReceipt | 24 → 18 (-25%) | 1 day |
| PaymentService | processPayment, refundPayment, verifyCC | 18 → 12 (-33%) | 2-3 days |

**Phase 2: Extract Methods (Priority 2)**

| Target Method | Current | Extracted Methods | Result |
|---------------|---------|-------------------|--------|
| processOrder() | 127 LOC, complexity 18 | validateOrder(), calculateTotals(), saveOrder(), notifyCustomer() | 4 methods avg 32 LOC, complexity 4-5 each |
| handlePayment() | 89 LOC, complexity 14 | verifyPayment(), authorizeCharge(), recordTransaction() | 3 methods avg 30 LOC, complexity 4-5 each |

**Phase 3: Introduce Parameter Objects (Priority 3)**

| Current Signature | Refactored | Benefit |
|-------------------|------------|---------|
| createOrder(name, email, items, addr, payment, prefs, notes) | createOrder(orderData: OrderRequest) | -6 parameters, improved readability |
| calculateShipping(weight, origin, dest, speed, insurance) | calculateShipping(shipmentDetails: ShipmentInfo) | -4 parameters, easier testing |

#### Projected Impact

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Cyclomatic Complexity | 45 | 12 | -73% 🟢 |
| Cognitive Complexity | 62 | 15 | -76% 🟢 |
| Lines of Code | 1,340 | 287 | -79% 🟢 |
| Test Coverage | 42% | 85% (projected) | +43% 🟢 |
| Maintainability Index | 35% | 82% (projected) | +47% 🟢 |

#### Estimated Effort

- **Phase 1:** 7-9 days (extract classes)
- **Phase 2:** 3-4 days (extract methods)
- **Phase 3:** 2 days (parameter objects)
- **Testing & Validation:** 3-4 days
- **Total:** 15-19 days (3-4 weeks)

### 2. 🔴 UserService.ts

#### Metrics

| Metric | Value | Threshold | Status |
|--------|-------|-----------|--------|
| Cyclomatic Complexity | 38 | 20 | 🔴 Critical (+90%) |
| Cognitive Complexity | 51 | 30 | 🔴 Critical (+70%) |
| Dependencies | 15 | 10 | 🟡 High (+50%) |
| Duplicated Blocks | 8 | 3 | 🔴 Critical (+167%) |

#### Code Smells Detected

| Smell | Details | Priority |
|-------|---------|----------|
| 🔴 High Coupling | 15 dependencies on concrete classes | P1 |
| 🔴 Duplicated Validation | Same validation logic repeated 8 times | P1 |
| 🟡 Feature Envy | Direct database queries, bypassing repository | P2 |
| 🟡 Primitive Obsession | User data passed as 7 separate strings | P3 |

#### Remediation Plan

**Priority 1: Dependency Injection**
- Replace concrete dependencies with interfaces (15 refactorings)
- Introduce IUserRepository, IValidator, IEmailService
- Projected complexity reduction: 38 → 28 (-26%)
- Estimated effort: 4-5 days

**Priority 2: Extract Validation**
- Create UserValidator class
- Consolidate 8 validation instances into single reusable methods
- Projected complexity reduction: 28 → 22 (-21%)
- Estimated effort: 2-3 days

**Priority 3: Introduce Domain Objects**
- Create UserData, UserProfile, UserPreferences classes
- Replace primitive parameters with domain objects
- Improves type safety and readability
- Estimated effort: 2 days

#### Total Effort: 8-10 days (2 weeks)

### 3-5. Additional Hotspots Summary

| File | Complexity | Primary Issue | Effort | Impact |
|------|------------|---------------|--------|--------|
| 🟡 PaymentProcessor.ts (28) | Complex nested conditionals | Extract Strategy pattern | 5-6 days | -50% complexity |
| 🟡 ReportGenerator.ts (25) | Long methods, mixed concerns | Extract Formatter classes | 4-5 days | -60% complexity |
| 🟡 ValidationService.ts (20) | Duplicated patterns | Template Method pattern | 3-4 days | -40% complexity |

## Remediation Roadmap

### Timeline Overview

| Phase | Duration | Files | Expected Reduction |
|-------|----------|-------|-------------------|
| Phase 1: Critical Hotspots | 4-6 weeks | OrderService.ts, UserService.ts | 83 → 34 points (-59%) |
| Phase 2: High Priority | 2-3 weeks | PaymentProcessor.ts, ReportGenerator.ts | 53 → 23 points (-57%) |
| Phase 3: Medium Priority | 1-2 weeks | ValidationService.ts | 20 → 12 points (-40%) |
| **Total** | **7-11 weeks** | **5 files** | **156 → 48 points (-69%)** |

## Knowledge Integration

### Memory Sources Consulted

| Query | Result |
|-------|--------|
| 🟢 "complexity refactoring patterns" | Found Extract Class pattern (Jan 2026) - similar God Object resolution |
| 🟢 "dependency injection migration" | Found DI strategy (Dec 2025) - interface extraction approach |
| 🟢 "validation consolidation" | Found Validator pattern (Nov 2025) - centralized validation service |

### Patterns Recommended

| Pattern | Application | Files Affected |
|---------|-------------|----------------|
| Extract Class | God Object decomposition | OrderService.ts (4 new classes) |
| Strategy Pattern | Conditional complexity | PaymentProcessor.ts |
| Template Method | Duplicated code | ValidationService.ts |
| Dependency Injection | High coupling | UserService.ts (15 dependencies) |

## Success Metrics

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| Average File Complexity | 31.2 | <15 | 🔴 |
| Files >20 Complexity | 5 | 0 | 🔴 |
| Technical Debt Ratio | 38% | <10% | 🔴 |
| Maintainability Index | 42% | >75% | 🔴 |

**Re-run analysis after Phase 1 to validate improvements.**
```

## Related Prompts

- `/copirate-refactor` - Execute refactoring with skill guidance
- `/copirate-qa` - Quality assurance validation
- `/copirate-suite` - Full analysis orchestration

## Tips

- Run analysis weekly to catch complexity creep early
- Focus on P1 (Critical) items first
- Use provided code examples as refactoring templates
- Store successful refactoring patterns as memories
- Re-run analysis after remediation to validate improvements

---



**Last Updated**: 2026-01-18
**Maintained By**: Copirate Team
