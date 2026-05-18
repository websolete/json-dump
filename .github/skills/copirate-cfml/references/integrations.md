# CFML Integrations Reference

## Common Framework First

The Common framework is the first stop before building new utilities.

- use `mcp_cf_common_lib` to search libraries and modules
- prefer existing Common utilities for query execution, validation, formatting, caching, encryption, logging, OAuth2, and email where available
- rely on `getLib()` and `getModule()` helpers when the application already exposes them

## Database And Schema Intelligence

Use `mcp_cf_sql_schema` when the task depends on table structure, indexes, foreign keys, triggers, or routine definitions. Do not infer database shape from controller code if the schema surface is available.

## Instruction Search

Use `mcp_ai_instruct` when the task needs additional CFML, framework, database, or Common guidance that is not already covered by the package examples and references.

## Practical Tool Sequence

1. `mcp_cf_common_lib` to prevent duplicate implementation
2. `mcp_cf_sql_schema` for schema-aware design or debugging
3. `mcp_ai_instruct` for deeper standards or workflow guidance
4. workspace validation or tests after the implementation is in place

## Skill Boundary Reminder

If the task is about modernizing legacy procedural CF10+ code rather than implementing modern CFML patterns, route to `copirate-cfml-legacy` instead of stretching this package.

## Behavioral Corpus Retrieval

Before generating CF code, consult behavioral corpus patterns with `copirate_cf_corpus_search`.

1. Determine the current task domain (`fw1`, `security`, `repository`, `service-layer`, `error-handling`, `idiom`, `transactions`, `validation`, `caching`, or `other`).
2. Call `copirate_cf_corpus_search({ query: <task intent>, domain: <detected domain>, limit: 3 })`.
3. Treat compatibility filtering as a hard gate: only apply examples returned for the active runtime mode and engine compatibility.
4. If results are returned, prioritize high-score examples. Where records include a `wrong` field, use it as a negative reference alongside the `assistant` field.
5. If no semantic results are returned above threshold, optionally perform a lexical fallback against the currently available CF correction corpus or workspace examples.
6. Continue with the standard CF circuit breakers and the worked examples in this package.

## Environment-Specific Common Overlay

This package stays intentionally generic. Repo-specific Common library inventories, accessor patterns, naming conventions, and environment-local module choices belong in the cross-workspace overlay, not here.

For this environment, the overlay lives at:
`.copirate-shared/handoffs/HANDOFF-cfml-common-overlay-2026-05-10.md`

Consult that overlay when:
- Verifying which Common categories are actually available in this environment
- Determining whether `getLib()` or `getModule()` accessors are wired in the target application
- Resolving Common integration failure modes specific to this environment
- Understanding naming conventions for Common library and module calls
