---
name: copirate-debug
description: Systematic debugging with troubleshooting skill and error pattern analysis
---
<!-- deployment_hash: 7bdef13d -->
<!-- Extension Version: 1.32.6 -->
<!-- Deployed: 2026-05-18 -->
<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->


# Copirate Debug - Systematic Error Investigation

Invoke as: **/copirate-debug**

## Purpose

Execute systematic debugging workflow using proven troubleshooting methodologies, error pattern analysis, and solution memory retrieval. Prevents trial-and-error debugging with structured hypothesis testing.

## When to Use

- Investigating errors without obvious cause
- Recurring issues that reappear after fixes
- Complex multi-component failures
- Performance degradation tracking
- Integration failures between systems
- Mysterious production-only issues

## What It Does

### Phase 1: Error Context Gathering
1. **Extract Error Details**:
   - Stack traces and error messages
   - Timestamps and frequency
   - User actions leading to error
   - Environment (dev/staging/prod)
   - Recent code changes

2. **Search Solution History**:
   - Query memory for similar errors
   - Check error pattern database
   - Review previous fixes and workarounds
   - Identify recurring patterns

### Phase 2: Systematic Hypothesis Formation

Uses proven troubleshooting methodology:

1. **Memory-First Investigation**:
   - Has this exact error occurred before?
   - What solutions worked previously?
   - Are there known patterns?

2. **Hypothesis Generation**:
   - Most likely causes ranked by probability
   - Required data to validate each hypothesis
   - Testing strategy for each theory

3. **Pattern Recognition**:
   - Is this a known anti-pattern?
   - Does error frequency correlate with events?
   - Are there environmental factors?

### Phase 3: Guided Investigation

**Workflow Integration**: Uses prompt-visible debugging guidance for:
- Decision tree workflows
- Hypothesis testing frameworks
- Escape hatches for dead ends
- Circuit breakers for infinite loops

**CFML/ColdFusion Routing**:
- Keep `/copirate-debug` as the orchestration entry point for CF debugging work.
- For CF-specific heuristics, tool order, and failure-mode checks, route through `.github/skills/copirate-cfml/references/debugging.md`.
- If the active issue is dominated by procedural CF10+ behavior or runtime-compatibility constraints, keep the shared debug flow but supplement it with `.github/skills/copirate-cfml-legacy/references/compatibility.md` and `.github/skills/copirate-cfml-legacy/references/patterns.md` instead of creating a separate CF debug prompt.

**Systematic Testing**:
1. Test most likely hypothesis first
2. Collect evidence (logs, queries, traces)
3. Validate or eliminate hypothesis
4. Document findings
5. Move to next hypothesis if needed

### Phase 4: Solution Implementation

Once root cause identified:
1. Implement fix with validation
2. Add regression tests
3. Document solution
4. Store pattern in memory for future reference

### Phase 5: Pattern Recording

Capture the complete debugging journey:
- Error pattern and trigger conditions
- Investigation steps taken
- Hypothesis testing results
- Final root cause
- Solution implemented
- Prevention strategy

## Usage Instructions

### 1. Invoke with Error Context

```
/copirate-debug

Error: "NullPointerException in UserService.saveUser()"
Frequency: Intermittent, ~5% of save operations
Environment: Production only
Recent changes: Database connection pooling updated yesterday
```

### 2. Review Memory Findings

Agent checks for:
- Previous occurrences of this error
- Similar error patterns
- Known solutions
- Related troubleshooting workflows

### 3. Load Evidence And Prior Solutions

```typescript
copirate_memory({
  operation: "memory_retrieve",
  content: "similar error patterns and fixes",
  type: "solution",
  limit: 10,
  includeRelated: true
});
```

### 4. Follow Systematic Workflow

**Decision Tree Example**:
```
Step 1: Check memory for previous occurrences
  - If found: Apply known solution
  - If not found: Proceed to hypothesis generation

Step 2: Generate hypotheses ranked by likelihood
  H1: Race condition in connection pool (70% likely)
  H2: Null user data from upstream service (20% likely)
  H3: Database schema mismatch (10% likely)

Step 3: Test H1 (highest probability)
  - Add logging to connection acquisition
  - Check pool metrics during error window
  - Evidence: Connection pool exhausted during peak load
  - VALIDATED

Step 4: Implement solution
  - Increase pool max size from 10 to 20
  - Add connection leak detection
  - Deploy to staging and validate

Step 5: Store solution
  - copirate_memory({ type: "solution", domain: "database" })
  - Include error pattern, root cause, fix, prevention
```

### 5. Validate Fix

- Deploy fix to staging
- Run regression tests
- Monitor error frequency
- Verify no new issues introduced

### 6. Document Pattern

Store complete troubleshooting journey:
```typescript
copirate_memory({
  operation: "memory_store",
  type: "solution",
  content: `
    Error Pattern: NullPointerException in UserService.saveUser()
    Trigger: Database connection pool exhaustion during peak load
    Root Cause: Pool size too small (10) for traffic volume
    Solution: Increased pool max size to 20, added leak detection
    Prevention: Monitor pool metrics, set alerts at 80% utilization
    Evidence: Connection pool metrics, error correlation analysis
  `,
  tags: ["database", "connection-pool", "performance", "nullpointer"],
  importance: 9
});
```

## Success Criteria

- Root cause identified with evidence
- Fix implemented and validated
- No regressions introduced
- Solution pattern stored in memory
- Prevention strategy documented
- Regression tests added

## Workflow

**Memory-First Protocol** (Critical for Debugging):
```typescript
// ALWAYS check memory first - prevents rediscovering solutions
copirate_memory({
  operation: "memory_retrieve",
  content: "NullPointerException UserService connection pool"
});

// If similar error found, apply proven solution
// If not found, proceed with systematic investigation
```

**Workflow Integration**:
- Uses prompt-visible decision trees and debugging phases
- Uses `copirate-database` for error history queries
- Applies `copirate-memory` for solution pattern retrieval
- Routes CF-specific debugging contexts through `.github/skills/copirate-cfml/references/debugging.md`

**Tool Sequence**:
1. Memory retrieval for similar errors
2. Database query for error frequency/patterns
3. Follow debugging workflow for hypothesis testing and validation
4. Execute hypothesis testing workflow
5. Implement and validate fix
6. Store solution pattern

## Common Debugging Patterns

### Database Errors
- Connection pool exhaustion
- Query timeout issues
- Deadlock detection
- Transaction isolation problems

### Performance Issues
- Memory leaks
- N+1 query patterns
- Inefficient algorithms
- Resource contention

### Integration Failures
- API timeout/retry logic
- Authentication failures
- Data format mismatches
- Version compatibility

### CFML-Specific
- Session scope issues
- Application vs Request scope problems
- ColdFusion service registration
- Framework routing failures

## Circuit Breakers

If investigation stalls:
1. **After 3 failed hypotheses**: Revisit error context gathering
2. **If no progress in 30 minutes**: Consult team or escalate
3. **If fix introduces regressions**: Rollback and reassess
4. **If error persists after fix**: Hypothesis was wrong, restart investigation

## Related Prompts

- `/copirate-qa` - Validate fix quality
- `/copirate-complexity` - Check if complexity contributed to bug
- `/copirate-suite` - Full workspace analysis for systemic issues

## Tips

- Always check memory FIRST - saves hours on known issues
- Document evidence at every step
- Don't skip hypothesis testing - trial-and-error wastes time
- Store successful solutions immediately
- Add regression tests to prevent recurrence
- Use skill decision trees to avoid dead ends

## Example Output

```markdown
# SELF-ASSESSMENT → CONTINUE

- **Confidence:** 70%
- **Quality:** 7/10
- **Evidence:** 3/4 verified
- **Current Focus:** Testing connection pool exhaustion hypothesis in staging environment

## Progress Summary

| Status | Count | Details |
|--------|-------|---------|
| 🟢 Completed | 3 items | Error context gathered, memory searched, hypothesis tested |
| 🟡 In Progress | 1 item | Staging deployment validation |
| ⚪ Remaining | 1 item | Production deployment and pattern storage |

## Completion Verification & Reality Check

| Claim |
|-------|
| 🟢 Root cause identified - connection pool exhausted at peak load |

| Reality Check |
|---------------|
| 🔴 Solution not validated under production traffic patterns |
| 🔴 Alternative hypothesis (null data) only partially eliminated |
| 🔴 No confirmation error rate drops to 0% in production |
| 🟡 Staging validation in progress (1000 operations pending) |

### Evidence Checklist

| Verification Area | Evidence/Result |
|-------------------|------------------|
| 🟢 Error Pattern Analyzed | NullPointerException at UserService.saveUser():142, ~5% frequency |
| 🟢 Memory Search Complete | Found 2 similar patterns from Dec 2025 and Nov 2025 |
| 🟢 Hypothesis Tested | Pool metrics show 100% utilization during errors |
| 🟡 Staging Validation | Deployment in progress, 0/1000 operations complete |
| 🔴 Production Deployment | Pending staging success |

### Still Need To Verify

| Item |
|------|
| ⚪ Error rate = 0% in 1000+ staging operations |
| ⚪ Production deployment successful |
| ⚪ Pattern stored for future reference |

## Context, Patterns & Intelligence

### Knowledge Sources Consulted

| Source Type | Result |
|-------------|--------|
| 🟢 Memory retrieve | Found ConnectionPoolException fix (Dec 2025) - pool exhaustion pattern |
| 🟢 Memory retrieve | Found similar NullPointerException in OrderService (Nov 2025) |
| 🟢 Database logs | Pool metrics during error windows showed 100% utilization |

### Solution Applied

| Configuration | Before | After |
|---------------|--------|-------|
| maxPoolSize | 10 | 20 |
| connectionTimeout | 30s | 45s |
| leakDetectionThreshold | none | 60s |

## Confidence Breakdown

### Overall Confidence Score: 70%

| Confidence Level | Items | Details |
|------------------|-------|---------|
| 🟢 High (90%+) | 2 items | Root cause identified, similar patterns found in memory |
| 🟡 Medium (60-89%) | 2 items | Solution configuration, staging deployment |
| 🔴 Low (<60%) | 1 item | Production impact unknown until validated |

## Next Action Decision

- **Status:** CONTINUE
- **Quality Score:** 7/10

**Reasoning:** Root cause identified with strong evidence from memory and metrics, but solution requires staging validation before production deployment.

### Next Steps (Ordered)

  1. Deploy configuration changes to staging (maxPoolSize: 20, timeout: 45s, leak detection: 60s)
  2. Run load test with  1000 operations monitoring error rate
  3. Verify 0% error rate under load
  4. If successful → production deployment
  5. Store debugging pattern in memory (tags: database, connection-pool, performance)

### Response to 'c'

I'll deploy the config to staging, execute load testing, validate 0% error rate, and report back with results before proceeding to production.
```

---



**Last Updated**: 2026-01-18
**Maintained By**: Copirate Team
