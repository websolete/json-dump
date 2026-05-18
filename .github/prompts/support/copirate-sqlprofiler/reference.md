<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->
# Copirate SQL Profiler Support - Reference

## Contract-First Rule

- Treat `.github/prompts/support/copirate-sqlprofiler/package-contract.md` as the authoritative workflow contract.
- The authoritative package is a standardized JSON object, not an extension-native runtime type.
- Materialize and update that JSON package under `.copirate/sqlprofiler/packages/` during processing so extraction, execution, and analysis can share the same state.
- Missing package fields should determine the bounded questions.
- Saved artifacts should render from the package instead of becoming a second competing source of truth.

## Workflow Stages

### Stage 1: Source-Derived Foundation

- resolve the source first
- create or resume the working package immediately after source resolution
- populate extraction, scenario matrix, and prompt-governed analysis seeds before any schema or measured claim
- keep the package source-derived and hypothesis-oriented until the evidence gate is satisfied

### Stage 2: Structure-Only Schema Enrichment

- attempt schema enrichment only when caller-extracted table, routine, or column hints exist
- call `mcp_cf_sql_schema` with `operation = "get_sqlprofiler_context"`
- persist returned `contractVersion`, `tables`, `foreignKeys`, `routines`, `findings`, `warnings`, and `unresolved` under `analysis.schemaContext`
- keep schema-backed findings separate from measured evidence and preserve unresolved state when structure hints are insufficient

### Stage 3: Evidence Augmentation

- attempt measured execution only after the source-derived foundation exists
- require confirmed databridge readiness and a runnable scenario
- if measured profiling is requested for a runtime-dependent DAO query, allow one bounded read-only databridge discovery query such as `select_query` to resolve a representative runnable scenario before escalating to the user
- augment the same package with measured baseline and optional comparison data
- keep measured findings separate from prompt-derived hypotheses and schema-backed structure facts

## Working Package Lifecycle

- Create the working package once the source is resolved.
- Default working path: `.copirate/sqlprofiler/packages/<package-id>.json`.
- Derive `packageId` from normalized canonical inputs; do not use random or time-based suffixes for resumable packages.
- Resume the existing package when the deterministic `packageId` resolves to the same logical source and the user has not asked for a separate package.
- Persist `storagePath` as the normalized workspace-relative forward-slash package path; if a future field needs an absolute path, it must use a separately named field.
- Update the same JSON file as the workflow moves from extraction to scenario selection to databridge execution to optimization guidance.
- Return a concise summary in chat plus the package path unless the user explicitly asks for the full JSON.

## Operator Summary Stencil

Before emitting checkpoints or the final profiling report, retrieve and follow the canonical operator-summary stencil.

Preferred retrieval path:

```typescript
copirate_memory({
	operation: "memory_retrieve_by_id",
	memoryId: "mem_stencil_sqlprofiler_operator_summary"
});
```

Fallback for extension-source workspaces:

```typescript
copirate_read_file({
	filePath: "[workspaceRoot]/config/workspace-templates/stencils/sqlprofiler-operator-summary-stencil.md"
});
```

Use `memory_retrieve_by_id` rather than semantic `memory_retrieve` for this stencil. Stencil memories are intentionally excluded from embeddings, so keyword retrieval is not a reliable deployment check.
If the workspace fallback path is absent because the current workspace is not the Copirate extension source, use the prompt's embedded section contract instead of concluding that the stencil is unavailable.
Use the stencil as the response scaffold, not as verbatim output.

## Operator Visibility And Approval Gates

Default slice model:

- Slice 1: source resolution, package create or resume, extraction, and scenario assembly
- Slice 2: schema enrichment and structure-backed access-path review
- Slice 3: databridge preflight, bounded discovery if needed, measured baseline, and optional comparison
- Slice 4: compact report, next-step recommendation, and optional artifact routing

Checkpoint summary contract:

- Emit a compact checkpoint after each completed slice and before approval-bound transitions.
- Keep the checkpoint to five short lines: `Status`, `Tried`, `Recorded`, `Decision`, and `Next`.
- Build the checkpoint from package facts instead of generic narration.
- Slice 1 checkpoints should prefer source identity, parameter-slot count, branch count, scenario count, and unresolved-input count.
- Slice 2 checkpoints should prefer schema findings, unresolved structure facts, warnings, and the decision about evidence readiness.
- Slice 3 checkpoints should prefer preflight contract readiness, the selected scenario or `preflight-blocked-no-runnable-scenario`, bounded-discovery basis, measured baseline or comparison metrics when present, and the next validation decision or bounded operator question set.
- For runtime-dependent DAO queries, a zero-row first bounded discovery attempt gets one governing rule: a second tightly-scoped recovery hop is allowed only when it stays in the same source-derived scenario family, resolves exactly one missing runnable input, and does not introduce a new exploratory dimension, branch posture, or generic representative data hunt.
- Switching from direct-key to identity matching, changing the governing branch posture, or broadening into generic representative data hunting is outside the same source-derived scenario family; when that happens, degrade immediately into bounded operator questions for `iInqKey` or the identity tuple, `sAccountsList`, and `ReviewCredit` or the credit-type exclusion lane.
- If bounded preflight still cannot produce a runnable scenario, set `status = preflight-blocked-no-runnable-scenario` and surface that blocked state in the checkpoint and final report instead of relying on freeform warnings.
- When resuming an existing package, `Tried` should name only current-turn actions and `Recorded` should make inherited state explicit.

Approval discipline:

- In interactive chat, default to a checkpoint after Slice 1 before continuing into schema or evidence unless the user explicitly requested that next slice.
- Before bounded discovery, `profile_query`, or `compare_query_variants`, stop for approval unless the user already approved measured execution.
- Use `vscode_askQuestions(...)` with bounded options when the next slice needs a user decision.
- If the user explicitly asked for an end-to-end measured run, continue automatically after the checkpoint summary, but still emit the checkpoint.

## Default Reporting Posture

- The package file is the detailed processing surface.
- The chat response should normally be a compact operational summary plus the package path.
- Intermediate checkpoints should be compact package deltas rather than mini final reports.
- Final reports should follow the stencil section order: `Status Snapshot`, `What Was Tried`, `What Changed In Package`, `Performance Results`, `Key Analysis`, `Unknowns And Caveats`, and `Next Step`.
- `Performance Results` must separate `Baseline` from `Delta`; if no comparison ran, say `No comparison delta evaluated`.
- Full inline JSON is an opt-in response mode, not the default.

## Why The Source/Evidence Boundary Exists

- Source extraction answers what SQL exists, what parameters it binds, what optional branches can activate, and what scenario variations are possible from code alone.
- Schema enrichment answers which tables, routines, columns, indexes, and foreign-key edges can be explicitly confirmed from caller-supplied structure hints.
- Databridge answers how one fully instantiated scenario performs and how an approved candidate compares under that same scenario.
- Schema enrichment does not prove timing, row counts, plan facts, or semantic correctness of a rewrite.
- Databridge does not prove branch-level timing, full schema interpretation, or semantic correctness of a rewrite.
- Therefore source, extraction, scenario matrix, decomposition, access-path review, schema context, ranked suspects, suggested optimizations, warnings, and next validation step stay prompt-governed even when schema or evidence mode is active.
- Evidence mode augments the package with measured baseline and comparison data; it does not replace the source-derived package foundation or the structure-only schema lane.

## Package Assembly Order

1. `packageVersion`, `packageId`, `packageMode`, and `storagePath`
2. `source`
3. `extraction`
4. `scenarioMatrix`
5. `analysis.schemaContext`
6. `databridge.preflight`
7. `databridge.baseline`
8. `databridge.comparison`
9. remaining `analysis`
10. `warnings`

## Required Rendered Section Headings

- Source context
- Scenario matrix
- Baseline
- Decomposition
- Access-path review
- Schema/Routine Findings
- Ranked suspects
- Next validation step

## Prerequisites And Considerations

- Stay read-only.
- Use the current selection, attached file, or pasted SQL as the primary source.
- Schema enrichment uses `mcp_cf_sql_schema` with `operation = "get_sqlprofiler_context"` when caller-extracted table, routine, or column hints exist.
- `Evidence mode requires a confirmed databridge contract via tool_discovery`.
- Evidence mode also needs a usable scenario; prefer extracted literals or defaults, resumed package state, or one bounded `select_query` before asking for scenario inputs. Candidate SQL is optional unless the user wants side-by-side comparison.
- Use `PathNormalizationUtils.normalizeToUnix()` before persisting any path-derived field that becomes part of package identity or `storagePath`.
- If a bounded discovery query resolves a missing key or account, record that basis in `scenarioMatrix` notes and `databridge.preflight.readinessNotes`; mirror it in warnings only when operator-visible context adds value.
- If scenario inputs are missing, ambiguous, or intentionally withheld, record that state explicitly in the package before deciding whether evidence mode can proceed.
- If the schema route returns `warnings` or `unresolved`, preserve that state and keep the affected findings unresolved instead of inferring structure certainty.
- If evidence mode is not requested, the contract is unavailable, or the scenario inputs remain incomplete, degrade to the source-derived package and say so explicitly.

## Bounded Input Rules

- Ask for the source only when the selection, attachment, or pasted SQL is missing.
- When the user requests measured profiling or comparison, combine scenario and optional candidate-variant collection into one question whenever possible, but only after extracted source, resumed package state, and one bounded discovery attempt still leave the scenario unresolved.
- Ask for a schema hint only when it materially improves schema-context enrichment and cannot be inferred from the source.
- Ask whether to save a packaged artifact only when the user has not already requested a saved output and that question still fits inside the budget.
- Use `vscode_askQuestions(...)` and stop at three questions total.

## Workflow Steps

1. Identify the profiling target from the editor selection, attached file, or pasted SQL.
2. Create or resume the working JSON package under `.copirate/sqlprofiler/packages/`.
3. Populate `source`, `extraction`, and `scenarioMatrix` before claiming evidence mode is ready.
4. Derive table, routine, and column hints from the extracted source when possible; if hints exist, call `mcp_cf_sql_schema` with `operation = "get_sqlprofiler_context"`.
5. Treat the source-derived stage as complete only when scenario inputs are populated, explicitly unresolved, or recorded as blockers.
6. Treat the schema stage as complete only when explicit structure facts or unresolved markers are preserved in `analysis.schemaContext`.
7. For evidence mode, run `tool_discovery` and confirm `contractVersion`, `implementedOperations`, `profile_query`, and `compare_query_variants`.
8. If the scenario is runtime-dependent and still unresolved, use at most one bounded `select_query` to resolve a representative runnable key from the already-identified tables and predicates; record how that scenario was chosen in `scenarioMatrix` notes and `databridge.preflight.readinessNotes`.
9. Use `profile_query` for the measured baseline and `compare_query_variants` when a candidate variant is supplied or approved under the same scenario.
10. Write measured outputs back into `databridge.baseline` and `databridge.comparison`.
11. Populate `analysis.indexUsageReview` once extraction, schema context, and scenario state are stable; populate `analysis.suggestedOptimizations` and `analysis.nextValidationStep` only after the source-derived findings and any measured findings are in place.
12. Use `copirate_workspace` with `render_markdown_artifact` when the user wants a saved package report.

## Output Discipline

- `Phase 1 does not capture` profiler-grade CPU, IO, DMV, or execution-plan data in the source-derived lane.
- Treat returned `contractVersion`, `findings`, `warnings`, and `unresolved` from the schema route as structure-lane evidence only.
- Treat `durationMs`, `rowCount`, `totalRowCount`, `resultShapeSignature`, warnings, and unavailable fields as bounded measured findings when returned by databridge.
- Keep unavailable metrics explicit inside the JSON package instead of implying support that does not exist.
- Do not infer or fabricate logical reads, physical reads, CPU time, plan XML, or semantic equivalence.
- Do not present source-derived or schema-backed access-path findings as proof that an index was used effectively unless measured evidence supports that claim.
- Recommendations should cite package fields or measured comparison fields, not blur hypotheses into measured wins.

## Supporting Anchors

- `.github/prompts/support/copirate-sqlprofiler/package-contract.md`
- `.github/prompts/support/copirate-sqlprofiler/examples.md`
- `.github/prompts/support/copirate-sqlprofiler/cf-dao-use-case.md`
- `.copirate/sqlprofiler/packages/`
