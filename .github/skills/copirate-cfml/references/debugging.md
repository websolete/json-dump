# CFML Debugging Reference

Use this reference when `/copirate-debug` is investigating a ColdFusion or CFML issue. Keep the shared debug prompt as the orchestration entry point. This reference supplies the CF-specific heuristics, tool order, and routing checks that the generic prompt should not re-embed.

## 1. Evidence-First CF Debugging Posture

- start from the actual failure surface: error text, stack trace, failing route, malformed response, bad query result, or runtime-specific behavior difference
- determine whether the problem is primarily routing, scope state, datasource or schema shape, compatibility, Common integration, security flow, or application-specific business logic
- do not jump from a CF symptom straight to a rewrite; collect the narrowest workspace evidence that can falsify the leading hypothesis
- if the issue appears legacy- or compatibility-dominated, keep `/copirate-debug` as the route but supplement this reference with `copirate-cfml-legacy` compatibility and pattern guidance

## 2. CF-Specific Tool Order

Use the lightest sequence that can falsify the leading hypothesis:

1. resolve runtime and compatibility context through `.github/instructions/copirate-cf-runtime-compatibility.instructions.md` when syntax, engine, or version behavior may matter
2. inspect the active workspace code path and nearby call sites before broad exploration
3. use `mcp_cf_sql_schema` when the failure involves datasource shape, query behavior, joins, missing columns, or routine assumptions
4. use `mcp_cf_common_lib` before inventing logging, formatting, validation, query, or helper behavior during a fix
5. use `copirate_cf_corpus_search` when the issue depends on validated FW/1, repository, service-layer, validation, transaction, caching, or error-handling patterns
6. validate the fix with the narrowest available behavior or regression check

## 3. Common CF Failure Lanes

### Routing And Request Flow

- FW/1 action or subsystem mismatch
- missing or malformed route parameters
- request collection values present in one phase and absent in another
- controller code doing work that should live in services or repositories

### Scope And Lifecycle

- request, session, application, or variables scope confusion
- shared mutable state surviving longer than intended
- cached or singleton services retaining request-specific assumptions
- Application-scope wiring hiding dependency or initialization failures

### Datasource And Query Behavior

- datasource name mismatch or environment drift
- schema assumptions that do not match the live tables or routines
- query-of-queries, transaction, or parameterization behavior causing divergent results
- N+1 or caching behavior that looks like correctness failure under load

### Compatibility And Runtime Behavior

- CF10 or mixed-mode syntax boundaries
- engine-specific behavior between Adobe CF and Lucee
- member-function or collection-helper assumptions on older runtimes
- removed or changed behavior around legacy query and compatibility seams

### Common And Integration Seams

- repo-local code duplicating a Common helper with slightly different behavior
- `getLib()` or `getModule()` accessors present but bypassed
- mismatched assumptions about Common-provided validation, formatting, or query helpers

## 4. Legacy Boundary

- stay on this shared reference lane when the debugging posture is still general CF diagnosis
- supplement with `.github/skills/copirate-cfml-legacy/references/compatibility.md` and `.github/skills/copirate-cfml-legacy/references/patterns.md` when the failure is driven by procedural CF10+ structure, compatibility limits, or modernization seams
- do not split into a separate legacy debug surface unless later evidence proves the shared route cannot absorb the divergence cleanly

## 5. Fix-Shaping Guardrails

- prefer the smallest falsifiable fix over broad rewrites
- keep runtime compatibility caveats explicit when the issue depends on engine or version behavior
- keep Common-first and schema-aware checks visible before new helper creation
- when the failure exposes a stable CF debugging heuristic, capture the validated pattern through the normal memory path after the fix is verified
