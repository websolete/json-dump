---
name: copirate-cf-modernization
description: CFML legacy code modernization with FW/1 patterns and CF10→CF2025 transformation
---
<!-- deployment_hash: ef47d5f2 -->
<!-- Extension Version: 1.32.6 -->
<!-- Deployed: 2026-05-18 -->
<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->


# Copirate CF Modernization - Legacy CFML Transformation

Invoke as: **/copirate-cf-modernization**

## Purpose

Execute systematic modernization of legacy CFML code using FW/1 patterns and skill-guided workflows. Specialized for transforming ColdFusion procedural code, breaking monolithic CFCs, and applying CF-specific architectural patterns for CF10→CF2025 migration.

## When to Use

- Modernizing legacy CFML (cfinclude chains, inline queries, Application.cfm)
- Refactoring god objects and blob classes
- Breaking monolithic components (>1000 lines)
- Transforming procedural code to OOP
- Applying Strangler Fig pattern for incremental migration
- Modernizing CF10-era code to CF2025

## What It Does

### Pre-Refactoring Analysis
1. **Legacy Pattern Detection**:
   - Procedural code structures
   - God objects and monoliths
   - Inline database queries
   - Missing abstractions
   - Technical debt quantification

2. **Complexity Assessment**:
   - Cyclomatic and cognitive complexity
   - Coupling and cohesion metrics
   - Code smell identification
   - Risk scoring

### Refactoring Strategy Selection

Based on code patterns, selects appropriate strategy:

- **Strangler Fig Pattern**: Gradual replacement with new implementations
- **Extract Class/Service**: Decompose monoliths by responsibility
- **Extract Repository**: Separate data access from business logic
- **Replace Conditional with Polymorphism**: Simplify complex branches
- **Introduce Parameter Object**: Reduce parameter lists
- **Extract Interface**: Enable dependency injection

### Guided Execution

**For CFML Legacy Code**:
- Loads `copirate-cfml-legacy` skill automatically
- Applies proven CF modernization patterns
- Handles Application.cfm → Application.cfc migration
- Transforms cfinclude chains to components
- Refactors inline queries to repository pattern

**For General OOP Refactoring**:
- Applies SOLID principles
- Uses design patterns appropriately
- Maintains backward compatibility
- Provides rollback strategy

### Safety & Testing
- Identifies test gaps before refactoring
- Recommends test harness creation
- Validates refactoring with unit tests
- Provides regression testing strategy

## Usage Instructions

### 1. Invoke with Context

**Option A: Workspace-wide scan**
```
/copirate-cf-modernization
```
Analyzes entire workspace for refactoring candidates, priority-ranks by impact.

**Option B: Specific file/directory**
```
/copirate-cf-modernization src/legacy/UserService.cfm
```
Deep analysis and guided refactoring for specific target.

### 2. Load Agent Skill

```typescript
// Load CFML legacy refactoring expertise (see agent directives for skill location)
read_file({
  filePath: ".github/skills/copirate-cfml-legacy/SKILL.md",
  startLine: 1,
  endLine: 500
});
```

### 3. Analyze Complexity

```typescript
// Analyze target for complexity metrics
copirate_analysis({
  operation: "analysis_file",
  filePath: "[target-file-path]"
});

// Detect legacy patterns
copirate_specialized_analysis({
  operation: "design_patterns",
  includeRecommendations: true
});
```

### 4. Review Legacy Analysis

You'll receive:
- **Legacy Pattern Report**: Detected anti-patterns with severity
- **Complexity Metrics**: Current state baseline
- **Recommended Strategy**: Best refactoring approach for this code
- **Estimated Effort**: Time and risk assessment

### 3. Approve Refactoring Plan

Review and confirm:
- Target patterns and files
- Refactoring strategy
- Test coverage requirements
- Rollback plan

### 4. Execute Guided Refactoring

Follow step-by-step workflow:
- Create test harness (if missing)
- Apply Extract Class/Service pattern
- Move logic incrementally
- Validate with tests at each step
- Update calling code
- Remove legacy code

### 5. Validate Results

Post-refactoring validation:
- Complexity reduction achieved
- Test coverage maintained/improved
- No regressions introduced
- Documentation updated

## Example Workflow: CFML Refactoring

### Input: ShowReport.cfm (procedural monolith)
```cfml
<cfinclude template="header.cfm">
<cfquery name="qReport" datasource="#application.dsn#">
  SELECT * FROM reports WHERE id = #url.id#
</cfquery>
<!-- 800+ lines of mixed logic -->
```

### Output: Modern FW/1 Architecture
```cfml
// ReportController.cfc
component extends="framework.one" {
  property reportService;

  function show(rc) {
    rc.report = reportService.getReportById(rc.id);
    return successResponse(rc.report);
  }
}

// ReportService.cfc
component {
  property reportRepository;

  function getReportById(required numeric id) {
    return reportRepository.findById(arguments.id);
  }
}

// ReportRepository.cfc
component {
  function findById(required numeric id) {
    return queryExecute(
      "SELECT * FROM reports WHERE id = :id",
      {id: {value: arguments.id, cfsqltype: "cf_sql_integer"}},
      {datasource: application.dsn}
    );
  }
}
```

### Refactoring Steps Applied
1. Extract Repository (data access layer)
2. Extract Service (business logic layer)
3. Create Controller (thin orchestration)
4. Configure DI/1 (dependency injection)
5. Add tests (unit + integration)
6. Update routes (FW/1 conventions)
7. Remove legacy file

## Example Output

```markdown
# SELF-ASSESSMENT → CONTINUE

- **Confidence:** 75%
- **Quality:** 8/10
- **Evidence:** 4/5 verified
- **Current Focus:** Repository pattern extracted, testing data access layer before service extraction

## Progress Summary

| Status | Count | Details |
|--------|-------|---------|
| 🟢 Completed | 4 items | Legacy analysis, complexity baseline, repository extracted, unit tests passing |
| 🟡 In Progress | 1 item | Service layer extraction (business logic migration) |
| ⚪ Remaining | 3 items | Controller creation, DI/1 configuration, integration testing |

## Completion Verification & Reality Check

| Claim |
|-------|
| 🟢 Repository pattern extracted - UserRepository.cfc created with 8 data access methods |

| Reality Check |
|---------------|
| 🟢 All 8 repository methods tested (42 unit tests passing, 98% coverage) |
| 🟢 Database queries migrated from inline to repository (0 remaining inline queries) |
| 🟡 Service layer partially extracted (UserService.cfc created, 5/12 methods migrated) |
| 🔴 Controller not yet created (legacy ShowUsers.cfm still in use) |
| 🔴 DI/1 configuration pending (no dependency injection yet) |

### Evidence Checklist

| Verification Area | Evidence/Result |
|-------------------|------------------|
| 🟢 Baseline Complexity | Before: Cyclomatic 38, Cognitive 52, LOC 1,247 (ShowUsers.cfm monolith) |
| 🟢 Legacy Patterns Identified | Inline queries (8), cfinclude chain (5 files), Application.cfm usage, no OOP |
| 🟢 Repository Created | UserRepository.cfc (234 lines, 8 methods, all parameterized queries) |
| 🟢 Repository Tested | 42 unit tests (98% coverage, 0 failures) |
| 🟡 Service Layer | UserService.cfc (156 lines, 5/12 methods migrated from legacy) |
| 🔴 Controller Layer | Not created (awaiting service completion) |
| 🔴 DI/1 Configuration | Pending |

### Still Need To Verify

| Item |
|------|
| ⚪ Service layer completion (7 remaining methods to migrate) |
| ⚪ Controller creation (thin orchestration layer) |
| ⚪ DI/1 configuration and injection working |
| ⚪ Integration tests passing (end-to-end user flows) |
| ⚪ Legacy ShowUsers.cfm removed (final migration) |

## Context, Patterns & Intelligence

### Knowledge Sources Consulted

| Source Type | Result |
|-------------|--------|
| 🟢 Memory retrieve | Found Strangler Fig pattern (Nov 2025) - incremental migration strategy |
| 🟢 Memory retrieve | Found FW/1 repository pattern (Dec 2025) - data access abstraction |
| 🟢 Skill loaded | copirate-cfml-legacy (736 lines) - legacy modernization patterns |
| 🟢 Complexity analysis | Baseline metrics captured for before/after comparison |

### Refactoring Strategy Applied

**Pattern: Strangler Fig (Incremental Migration)**

| Phase | Component | Before | After | Status |
|-------|-----------|--------|-------|--------|
| 🟢 Phase 1: Data Layer | UserRepository | Inline queries (8) | Repository.cfc (234 LOC) | Complete |
| 🟡 Phase 2: Business Logic | UserService | Embedded in ShowUsers.cfm | Service.cfc (156 LOC, 5/12 methods) | In Progress |
| ⚪ Phase 3: Presentation | UserController | ShowUsers.cfm (1,247 LOC) | Controller.cfc + views | Pending |
| ⚪ Phase 4: Dependency Injection | DI/1 Config | None | Application.cfc config | Pending |

### CFML Modernization Techniques

| Technique | Application | Complexity Reduction | Status |
|-----------|-------------|----------------------|--------|
| Extract Repository | 8 database queries → UserRepository.cfc | 38 → 28 (-26%) | 🟢 Complete |
| Parameterized Queries | Direct SQL → cfqueryExecute with params | SQL injection risk → 0 | 🟢 Complete |
| OOP Encapsulation | Procedural cfinclude → component methods | Cohesion 12% → 78% | 🟡 Partial |
| FW/1 Convention | Application.cfm → Application.cfc | Framework integration | ⚪ Pending |

### CF10 → CF2025 Upgrades Applied

| Feature | CF10 Syntax | CF2025 Replacement | Status |
|---------|-------------|-------------------|--------|
| 🟢 Query Execution | cfquery tags | queryExecute() function | Migrated |
| 🟢 Component Syntax | Mixed script/tags | Pure CFScript | Applied |
| 🟢 Array Functions | Loop + append | arrayMap, arrayFilter | Modernized |
| 🟡 Null Handling | isDefined() checks | Elvis operator ?: | Partial |
| ⚪ Async Operations | None | async/await | Not yet applied |

## Confidence Breakdown

### Overall Confidence Score: 75%

| Confidence Level | Items | Details |
|------------------|-------|---------|
| 🟢 High (90%+) | 2 items | Repository pattern proven (42 tests passing), complexity reduced 26% |
| 🟡 Medium (60-89%) | 3 items | Service layer migration (partial), business logic extraction (in progress) |
| 🔴 Low (<60%) | 2 items | DI/1 configuration (no experience yet), integration testing (unknown edge cases) |

## Next Action Decision

- **Status:** CONTINUE
- **Quality Score:** 8/10

**Reasoning:** Repository layer solid with excellent test coverage, service extraction progressing well, but DI/1 configuration and controller creation remain unknown territory requiring careful validation.

### Next Steps (Ordered)

  1. Complete UserService business logic migration (7 remaining methods from ShowUsers.cfm)
  2. Create unit tests for newly extracted service methods (target: 90% coverage)
  3. Extract UserController.cfc (thin orchestration, delegates to service)
  4. Configure DI/1 in Application.cfc (inject UserRepository into UserService)
  5. Test dependency injection working correctly
  6. Create integration tests (end-to-end user registration, login, profile update flows)
  7. Remove legacy ShowUsers.cfm after integration tests pass
  8. Store modernization pattern in memory (tags: cfml, fw1, strangler-fig, repository)

### Response to 'c'

I'll complete the service layer extraction, create the controller with FW/1 conventions, configure DI/1, and report back when integration tests pass before removing the legacy file.
```

## Success Criteria

- Complexity reduced by ≥30%
- Separation of concerns achieved (controller/service/repository)
- Test coverage ≥80% of refactored code
- No functional regressions
- Code follows framework conventions
- Documentation updated

## Store Refactoring Pattern

**After successful refactoring:**
```typescript
copirate_memory({
  operation: "memory_store",
  type: "solution",
  content: "CFML refactoring: [pattern applied] - Reduced complexity from X to Y, applied [strategy]",
  tags: ["cfml", "refactoring", "legacy", "fw1"],
  importance: 9
});
```

## Workflow

**Memory-First Protocol**:
```typescript
// Check for similar refactoring patterns
copirate_memory({
  operation: "memory_retrieve",
  content: "refactoring legacy CFML patterns Application.cfm"
});
```

**Skill Integration**:
- Loads `copirate-cfml-legacy` skill for CFML refactoring expertise
- Uses `copirate_analysis` for complexity assessment
- Queries `copirate_knowledge` for proven refactoring patterns

**Tool Sequence**:
1. Knowledge check: `copirate_knowledge({ query: "CFML refactoring patterns" })`
2. Load skill: `read_file({ filePath: ".github/skills/copirate-cfml-legacy/SKILL.md" })`
3. Analyze target: `copirate_analysis({ operation: "analysis_file" })`
4. Detect patterns: `copirate_specialized_analysis({ operation: "design_patterns" })`
5. Execute refactoring with guided workflow
6. Validate: Re-run complexity analysis
7. Store pattern: `copirate_memory({ operation: "memory_store", type: "solution" })`

## Refactoring Patterns Supported

### CFML-Specific
- **cfinclude Chains → Components**: Modular OOP structure
- **Inline Queries → Repository**: Data access abstraction
- **Application.cfm → Application.cfc**: Modern lifecycle management
- **God Components → Service Layer**: Thin controllers pattern
- **CF10 Syntax → CF2025**: Modern features and performance

### General OOP
- **God Object Decomposition**: Single Responsibility Principle
- **Extract Class/Service**: Cohesive components
- **Replace Conditional with Polymorphism**: Strategy pattern
- **Extract Interface**: Dependency Injection enablement
- **Introduce Parameter Object**: Cleaner method signatures

## Safety Features

### Risk Mitigation
- Test harness creation before refactoring
- Incremental changes with validation
- Backward compatibility preservation
- Rollback strategy documentation

### Validation Gates
- Pre-refactoring: Baseline complexity and test coverage
- During refactoring: Step-by-step validation
- Post-refactoring: Regression testing and metrics comparison

## Related Prompts

- `/copirate-complexity` - Identify refactoring targets
- `/copirate-qa` - Validate refactoring quality
- `/copirate-suite` - Full workspace analysis

## Tips

- Start with smallest viable refactoring (Strangler Fig)
- Always create tests before refactoring untested code
- Refactor incrementally, validate frequently
- Store successful patterns as memories for reuse
- Use skill-provided examples as templates

---



**Last Updated**: 2026-01-18
**Maintained By**: Copirate Team
