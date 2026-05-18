<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->
# Copirate SQL Profiler Support - Package Contract

## Why JSON Package First

The disciplined version of `/copirate-sqlprofiler` is package-first, but the package is a prompt-owned JSON artifact, not a native extension object.

- The workflow exists to assemble a standardized JSON package that the agent can update through extraction, scenario assembly, execution, and optimization.
- Missing package fields determine the bounded questions.
- Scenario variations exist so optional parameters and branch inclusions become explicit package data instead of hidden assumptions.
- Explicit schema route facts can enrich the package structure lane after the source-derived foundation is stable and before measured evidence is attempted.
- Measured evidence augments the package only after the source-derived package foundation is already stable.
- The live staged JSON package contract is prompt-owned; do not assume `src/services/sqlprofiler/SqlProfilerTypes.ts` or `src/services/sqlprofiler/SqlProfilerPackageFormatter.ts` own blocked-state wording or shape changes for this workflow.

## Working Package Path And Lifecycle

Default working path:

```text
.copirate/sqlprofiler/packages/<package-id>.json
```

Lifecycle expectations:

- create the package once the source is resolved
- update the same file in place as the workflow advances
- keep chat responses concise and point to the package path unless the user explicitly asks for the full JSON
- treat the package file as the working state shared between extraction, databridge execution, and optimization guidance
- persist `storagePath` only in normalized workspace-relative forward-slash form; use `PathNormalizationUtils.normalizeToUnix()` before persisting any path-derived value
- if a future field needs an absolute path, give it a separate field name instead of overloading `storagePath`

## Operator Summary Derivation

Use the existing package fields as the operator-summary surface. Do not invent a second progress object just to explain workflow state in chat.

Checkpoint derivation by slice:

- Slice 1 summary should draw from `source`, `extraction.parameterSlots`, `extraction.branchConditions`, `scenarioMatrix.scenarios`, `scenarioMatrix.selectedScenarioId`, and `scenarioMatrix.unresolvedInputs`.
- Slice 2 summary should draw from `analysis.schemaContext.contractVersion`, `analysis.schemaContext.findings`, `analysis.schemaContext.unresolved`, `analysis.schemaContext.warnings`, and any explicitly preserved table or routine facts.
- Slice 3 summary should draw from `databridge.preflight`, `status`, `scenarioMatrix.selectedScenarioId`, `scenarioMatrix.unresolvedInputs`, `databridge.baseline`, and `databridge.comparison` when present.
- Slice 4 summary should draw from `analysis.rankedSuspects`, `analysis.suggestedOptimizations`, `analysis.nextValidationStep`, and any warnings that materially change the next operator decision.

Final report derivation by stencil section:

- `Status Snapshot` should draw from `storagePath`, `packageMode`, `status`, `source.label`, the source hash when available, and `scenarioMatrix.selectedScenarioId`. When `status = preflight-blocked-no-runnable-scenario`, name the blocked state explicitly instead of implying measured execution.
- `What Was Tried` should name current-turn actions only; if the run only resumed existing state, say so explicitly rather than rewriting package history as fresh activity.
- `What Changed In Package` should call out package create or resume, schema context updates, selected-scenario updates, baseline or comparison additions, and any warnings materially added in the current run.
- `Performance Results` should draw from `databridge.baseline` and `databridge.comparison`. Keep `Baseline` and `Delta` separate, say `Baseline: not collected because preflight blocked without a runnable scenario` when `status = preflight-blocked-no-runnable-scenario`, and say `No comparison delta evaluated` when no candidate comparison exists.
- `Key Analysis` should draw from `analysis.indexUsageReview`, `analysis.rankedSuspects`, and high-value schema-backed findings.
- `Unknowns And Caveats` should draw from `scenarioMatrix.unresolvedInputs`, `analysis.schemaContext.unresolved`, databridge `unavailable` fields, and any duplicate or intentionally discarded attempts.
- `Next Step` should draw from `analysis.nextValidationStep`.

Chat-side discipline:

- Keep checkpoint summaries terse and delta-oriented; the package file remains the full state surface.
- Prefer counts, selected scenario ids, explicit basis labels, and measured metrics over generic prose.
- If a value is unresolved, surface that unresolved state directly instead of inventing a more confident summary.
- Prefer the canonical operator-summary stencil via `memory_retrieve_by_id` with `mem_stencil_sqlprofiler_operator_summary` when shaping the response.
- Use the workspace file `config/workspace-templates/stencils/sqlprofiler-operator-summary-stencil.md` only as an extension-source fallback, not as the primary retrieval contract.

## Canonical JSON Shape

```json
{
  "packageVersion": "1.0",
  "packageId": "sqlprofiler-file-model-dao-customerdao-cfc-searchcustomers-4e2a91b7-v1",
  "packageMode": "source-derived",
  "status": "assembling",
  "storagePath": ".copirate/sqlprofiler/packages/sqlprofiler-file-model-dao-customerdao-cfc-searchcustomers-4e2a91b7-v1.json",
  "source": {},
  "extraction": {},
  "scenarioMatrix": {},
  "databridge": {},
  "analysis": {
    "decomposition": {},
    "schemaContext": {
      "tool": "mcp_cf_sql_schema",
      "operation": "get_sqlprofiler_context",
      "contractVersion": "",
      "requestFingerprint": "",
      "requestEcho": {},
      "tables": [],
      "foreignKeys": [],
      "routines": [],
      "findings": [],
      "unresolved": [],
      "warnings": []
    },
    "indexUsageReview": {
      "tableCandidates": [],
      "knownIndexEvidence": [],
      "sargabilityFindings": [],
      "joinPredicateFindings": [],
      "bindingRisks": [],
      "unknowns": []
    },
    "rankedSuspects": [],
    "suggestedOptimizations": [],
    "nextValidationStep": ""
  },
  "warnings": []
}
```

This is the authoritative contract for the prompt workflow.

## Package Envelope Contract

Every package should include:

- `packageVersion`: contract version for the JSON shape
- `packageId`: deterministic stable identifier for the working package
- `packageMode`: `source-derived` or `evidence-backed`; schema-backed findings live inside `analysis` until measured databridge evidence lands
- `status`: `assembling`, `ready-for-execution`, `preflight-blocked-no-runnable-scenario`, `executed`, `compared`, or `reported`
- `storagePath`: normalized workspace-relative `.copirate/sqlprofiler/packages/...json`

Workflow implication: if these fields do not exist yet, the agent has not started disciplined package assembly.

## Blocked Slice 3 State Contract

Use `status = preflight-blocked-no-runnable-scenario` when bounded preflight spends the allowed first discovery attempt and the workflow still cannot produce a runnable scenario without widening scope.

Blocked-state rules:

- Allow one second tightly-scoped recovery hop only when it stays in the same source-derived scenario family, resolves exactly one missing runnable input exposed by the first miss, and does not introduce a new exploratory dimension, governing branch posture, or generic representative data hunt.
- Switching from direct-key to identity matching, changing the governing branch posture, or broadening into generic representative data hunting is outside the same source-derived scenario family.
- When the blocked state is set, the next operator question set should request `iInqKey` or the identity tuple, `sAccountsList`, and `ReviewCredit` posture or the concrete credit-type exclusion lane needed to resume measured execution.
- Preserve the blocked-state reason in `scenarioMatrix.unresolvedInputs` and `databridge.preflight.readinessNotes`; do not rely on freeform warnings as the only record.

## Package Identity And Resume Contract

`packageId` is the stable persisted identity for a logical sqlprofiler package. It is not a random run token.

Required identity inputs:

- normalized source kind
- normalized workspace-relative source path when available
- scoped symbol, function, or method name when available
- content hash of the selected source or raw SQL text whenever source path and symbol name alone are not unique
- package contract version

Deterministic identity rules:

- Given the same normalized identity inputs, `packageId` must be identical across sessions.
- Do not use random UUID segments, timestamps, counters, or wall-clock suffixes in `packageId`.
- If a required identity component is missing, do not invent a fallback token; record an `unresolvedIdentityInput` warning and keep the package in an assembling state until the source is specific enough to derive the deterministic identity.

Create-versus-resume rules:

- Resume an existing package when the resolved deterministic `packageId` already exists and the user has not asked for a separate package.
- Create a new package when the deterministic identity changes because the source kind, normalized path, scoped symbol, or disambiguating content hash changed.
- Create a new package only on explicit user request when a separate package is desired for the same logical source.

Storage-path rule:

- `storagePath` must equal the normalized workspace-relative package file path for the resolved `packageId`.
- `storagePath` must stay in forward-slash form and must not contain a workspace-absolute prefix.

## Source Contract

`source` answers where the profiled SQL came from.

Required expectations:

- `kind`: `selection`, `file`, or `raw-text`
- `label`: human-readable source label
- `path`: optional file path when available
- `selectionText`: optional captured source selection
- `hostContext`: optional function, DAO, or call-site context

Workflow implication: if `source` is unresolved, the first bounded question should be about source targeting and nothing else.

## Extraction Contract

`extraction` answers what SQL shape was derived before any runtime profiling occurs.

Required expectations:

- `sqlText`: the extracted SQL as found in code
- `normalizedSql`: normalized SQL used for scenario execution and comparison
- `parameterSlots`: extracted parameter model
- `branchConditions`: extracted optional-logic model
- `variants`: approved candidate SQL variants
- `warnings`: extraction warnings

### Parameter Slots Contract

Each entry in `parameterSlots` should answer:

- what parameter exists
- what binding shape it uses
- whether it is required or conditional
- whether it expands a list
- what code expression or default value produced it

Recommended shape:

```json
{
  "id": "lastNamePrefix",
  "bindingKind": "scalar",
  "required": false,
  "isConditional": true,
  "sourceExpression": "arguments.lastNamePrefix",
  "defaultValue": ""
}
```

Discipline rule: if the DAO code makes a parameter optional, the extractor should preserve that optionality in JSON instead of burying it in prose.

### Branch Conditions Contract

Each entry in `branchConditions` should answer:

- what optional predicate or inclusion exists
- which parameters control it
- what SQL fragment or source expression it came from
- what makes it active

Recommended shape:

```json
{
  "id": "branch-prefix",
  "label": "lastName prefix filter",
  "expression": "lastNamePrefix",
  "dependsOn": ["lastNamePrefix"],
  "predicateFragment": "AND LEFT(c.LastName, 1) = LEFT(:lastNamePrefix, 1)"
}
```

Discipline rule: DAO `if`, `else if`, optional `WHERE`, optional `JOIN`, and list-driven `IN (...)` behavior should become `branchConditions[]`, not informal bullet points.

## Scenario Matrix Contract

`scenarioMatrix` answers which parameter values and optional branches define a concrete query run.

Required expectations:

- `scenarios`: explicit scenario objects
- `selectedScenarioId`: the scenario actually used for measured execution when evidence mode runs
- `unresolvedInputs`: explicit missing, ambiguous, or intentionally withheld inputs that block measured execution when they cannot be inferred safely

Recommended scenario shape:

```json
{
  "id": "scenario-prefix-active",
  "parameterValues": {
    "lastNamePrefix": "Sm",
    "includeInactive": false,
    "customerIds": []
  },
  "activeBranchIds": ["branch-prefix", "branch-active-only"],
  "notes": ["list branch inactive"]
}
```

Activation discipline:

- non-empty arrays should be treated as active
- `null` or missing values should be treated as inactive
- non-empty strings should be treated as active
- `true` booleans should be treated as active
- numeric `0` must be handled deliberately; do not assume it means inactive unless the extractor normalizes it that way

Fallback discipline:

- if the scenario can be completed from extracted literals, extracted defaults, or resumed package state, prefer that over a new question
- if measured profiling is requested and one concrete runtime key remains missing, use at most one bounded read-only databridge discovery query such as `select_query` to resolve a representative runnable value
- record that resolution basis in the selected scenario `notes` or package warnings so later readers can distinguish extracted values from preflight-discovered values
- if a required scenario input is missing, ambiguous, or intentionally withheld, record it under `unresolvedInputs`
- if the scenario is still not runnable after that bounded attempt, treat the unresolved state as package progress, not as permission to invent a runnable scenario
- degrade honestly to the source-derived stage until the scenario is runnable

## Schema Context Contract

`analysis.schemaContext` answers what explicit structure facts were returned by the schema lane.

Required expectations:

- `tool`: `mcp_cf_sql_schema`
- `operation`: `get_sqlprofiler_context`
- `contractVersion`: `schema-sqlprofiler-context.v1` when the current AppTesting route responds
- `requestFingerprint`
- `requestEcho`
- `tables`
- `foreignKeys`
- `routines`
- `findings`
- `unresolved`
- `warnings`

Recommended request shape:

```json
{
  "operation": "get_sqlprofiler_context",
  "database": "ops_preprod",
  "schema": "dbo",
  "scenario": {
    "requestedBy": "/copirate-sqlprofiler",
    "reason": "structure-only schema enrichment",
    "sourceLabel": "AddComment"
  },
  "source": {
    "routineName": "AddComment",
    "queryText": "optional raw SQL for provenance only"
  },
  "tables": [
    {
      "schema": "dbo",
      "tableName": "Adjustments",
      "alias": "a",
      "role": "primary",
      "columns": {
        "predicate": ["Account"],
        "join": [],
        "projection": ["State", "ID"],
        "sort": ["ID"]
      }
    }
  ],
  "routines": [
    {
      "schema": "dbo",
      "routineName": "AddComment"
    }
  ],
  "columnHints": ["State"]
}
```

Caller discipline:

- Derive `tables`, `routines`, and `columnHints` from extracted source when possible.
- Treat `source.queryText` as provenance only; do not expect the schema route to replace missing structure hints by parsing raw SQL.
- If no table or routine hints are available, preserve returned `warnings` and `unresolved` instead of inventing schema-backed certainty.
- The current deployed AppTesting schema proof fixture is `dbo.Adjustments` plus `dbo.AddComment` with predicate `Account`, projection `State` and `ID`, sort `ID`, and column hint `State`. Do not treat earlier `GetWipNames` planning examples as the deployed proof surface.

## Databridge Contract

`databridge` answers what was confirmed and measured through the bounded execution lane.

Required expectations in evidence-backed mode:

- `preflight`
- `baseline`
- optional `comparison`

### Databridge Preflight Contract

`preflight` should preserve:

- `contractVersion`
- `implementedOperations`
- `publicOperationNames`
- `consumerRoute`
- `responseSchema`
- optional `readinessNotes`

Discipline rule: `Evidence mode requires a confirmed databridge contract via tool_discovery`. If measured profiling depends on one missing runtime key or account, preflight may use one bounded `select_query` to resolve a representative runnable scenario and should preserve that basis in `readinessNotes`.

### Baseline Contract

`baseline` should preserve:

- `contractVersion`
- `operation`: `profile_query`
- `requestId`
- `scenario`
- `warnings`
- `unavailable`
- `truncated`
- `durationMs`
- `rowCount`
- `totalRowCount`
- `resultShapeSignature`
- `statementHash`

Discipline rule: persist bounded measured baseline fields inside `databridge.baseline`; do not mirror them into legacy top-level package keys.

### Comparison Contract

`comparison` should preserve:

- `contractVersion`
- `operation`: `compare_query_variants`
- `requestId`
- `scenario`
- `baseline`
- `candidate`
- `sameRowCount`
- `sameResultShapeSignature`
- `warnings`
- `unavailable`

Discipline rule: keep bounded comparison signals under `databridge.comparison`; do not infer semantic equivalence when `sameRowCount` or `sameResultShapeSignature` are true.

## Analysis Contract

`analysis` stays prompt-governed even when schema or evidence mode runs.

Required expectations:

- `decomposition`
- `schemaContext`
- `indexUsageReview`
- `rankedSuspects`
- `suggestedOptimizations`
- `nextValidationStep`

### Access-Path Review Contract

`indexUsageReview` answers what the package knows, suspects, or still does not know about likely index use and sargability.

Required expectations:

- `tableCandidates`: tables or aliases referenced by the extracted query shape
- `knownIndexEvidence`: explicit known index or computed-column evidence already present in package inputs, fixtures, or user-provided schema hints
- `sargabilityFindings`: predicate-shape findings that may help or reduce likely index use
- `joinPredicateFindings`: join-related findings that may affect access-path quality
- `bindingRisks`: parameter-shape or list-binding findings that may force conversions or widen scans
- `unknowns`: explicit access-path questions that remain unresolved because supporting evidence is missing

Evidence-basis discipline:

- `source-derived` means the finding comes from extracted SQL shape, parameter bindings, branch conditions, or scenario structure.
- `schema-backed` means the finding is supported by explicit schema route facts preserved under `analysis.schemaContext` or other explicit schema evidence already attached to the package.
- `measured` means the finding is tied to bounded databridge output already represented elsewhere in the package contract.
- `unknown` means the package cannot honestly claim index presence, absence, or effective usage from the evidence currently available.

Recommended finding shape:

```json
{
  "id": "finding-prefix-left",
  "summary": "Function-wrapped LEFT(c.LastName, 1) predicate may reduce direct use of a plain LastName index.",
  "basis": "source-derived",
  "severity": "medium",
  "evidence": [
    "Predicate fragment: LEFT(c.LastName, 1) = LEFT(:lastNamePrefix, 1)"
  ],
  "relatedTableNames": ["dbo.Customers"],
  "relatedParameterIds": ["lastNamePrefix"],
  "relatedBranchIds": ["branch-prefix"]
}
```

Unknown-state discipline:

- If the query references a table but the package has no explicit index evidence for it, record that unknown state instead of inferring likely index coverage.
- If the package has a structural sargability concern but no schema metadata, keep the concern source-derived and leave index effectiveness unresolved.
- If the schema route returns `warnings` or `unresolved` for a candidate table or routine, preserve that response and keep the affected access-path finding unresolved instead of promoting it to `schema-backed`.
- If stronger schema or measured evidence arrives later, update the relevant review entry instead of replacing the unknown state with unsupported certainty.

### Suggested Optimizations Contract

Each entry in `suggestedOptimizations` should answer:

- what change is being suggested
- whether the basis is `measured`, `inferred`, or `mixed`
- which scenario or variant it depends on
- what validation is still required before code changes are made

Recommended shape:

```json
{
  "id": "opt-prefix-rewrite",
  "summary": "Compare first-letter computed-column predicate against LEFT(LastName, 1)",
  "basis": "measured",
  "dependsOnScenarioId": "scenario-prefix-active",
  "candidateVariantId": "variant-first-letter",
  "validationNeeded": "Confirm on one more representative prefix before changing the DAO"
}
```

Discipline rule: suggestions are not freeform advice. They are explicit analysis records tied to evidence or clearly marked inference.

## Source Versus Evidence Boundary

| Package area | Owner | Why |
| --- | --- | --- |
| `source` | source-derived | comes from the editor and extraction context |
| `extraction` | source-derived | comes from parsing and normalization of code or selected SQL |
| `scenarioMatrix` | source-derived | describes potential or chosen runtime shapes |
| `analysis.schemaContext` | prompt-owned packaging of schema-backed facts | preserves explicit structure-lane results from `get_sqlprofiler_context` |
| `databridge.preflight` | databridge-backed | confirms actual measured-lane readiness |
| `databridge.baseline` | databridge-backed in evidence mode | preserves bounded measured execution fields |
| `databridge.comparison` | databridge-backed in evidence mode | preserves bounded baseline-vs-candidate comparison fields |
| `analysis.decomposition` | prompt-owned | databridge does not yet measure slices independently |
| `analysis.indexUsageReview` | prompt-owned | access-path guidance remains structural unless explicit schema or measured evidence upgrades it |
| `analysis.rankedSuspects` | prompt-owned | hypotheses should only be marked measured when evidence supports them |
| `analysis.suggestedOptimizations` | prompt-owned | suggestions must remain tied to explicit evidence or stated inference |

This boundary exists because databridge measures a fully instantiated scenario, not the extraction model itself.

## Conditional DAO Example

```cfml
var sql = "
    SELECT c.CustomerId, c.LastName, c.FirstName, c.IsActive
    FROM dbo.Customers c
    WHERE 1 = 1
";

if (len(arguments.lastNamePrefix)) {
    sql &= " AND LEFT(c.LastName, 1) = LEFT(:lastNamePrefix, 1)";
}

if (!arguments.includeInactive) {
    sql &= " AND c.IsActive = 1";
}

if (arrayLen(arguments.customerIds)) {
    sql &= " AND c.CustomerId IN (:customerIds)";
}
```

Disciplined extraction should produce package fragments like:

```json
{
  "storagePath": ".copirate/sqlprofiler/packages/sqlprofiler-file-model-dao-customerdao-cfc-searchcustomers-4e2a91b7-v1.json",
  "extraction": {
    "parameterSlots": [
      { "id": "lastNamePrefix", "bindingKind": "scalar", "required": false, "isConditional": true },
      { "id": "includeInactive", "bindingKind": "boolean-driver", "required": false, "isConditional": true },
      { "id": "customerIds", "bindingKind": "list", "required": false, "isConditional": true }
    ],
    "branchConditions": [
      { "id": "branch-prefix", "dependsOn": ["lastNamePrefix"] },
      { "id": "branch-active-only", "dependsOn": ["includeInactive"] },
      { "id": "branch-customer-ids", "dependsOn": ["customerIds"] }
    ]
  },
  "scenarioMatrix": {
    "selectedScenarioId": "scenario-prefix-active",
    "scenarios": [
      {
        "id": "scenario-prefix-active",
        "parameterValues": {
          "lastNamePrefix": "Sm",
          "includeInactive": false,
          "customerIds": []
        },
        "activeBranchIds": ["branch-prefix", "branch-active-only"]
      }
    ]
  }
}
```

This is why scenario extraction matters: without it, the workflow cannot honestly say which optional DAO branches were active in a measured run.

## How The Package Influences Workflow

1. Resolve `source` first.
2. Materialize the working package under `.copirate/sqlprofiler/packages/`.
3. Populate `extraction` before asking for runtime inputs.
4. Build `scenarioMatrix` before claiming evidence mode is ready.
5. Populate `analysis.schemaContext` with `get_sqlprofiler_context` only when caller-extracted table, routine, or column hints exist.
6. Record missing, ambiguous, or intentionally withheld scenario inputs or structure hints explicitly when a runnable measured scenario is not yet available.
7. Populate `databridge.preflight`, `databridge.baseline`, and optional `databridge.comparison` only when the contract and scenario are ready.
8. Keep `analysis.decomposition`, `analysis.indexUsageReview`, `analysis.schemaContext`, `analysis.rankedSuspects`, and `analysis.suggestedOptimizations` grounded in extracted structure plus measured evidence.
9. Use `warnings` and `analysis.nextValidationStep` to make the handoff actionable.
10. Render or save from the package without changing its structure.

When the package contract is explicit, the rest of the workflow becomes easier to reason about: question budgeting, scenario handling, databridge usage, package persistence, artifact rendering, and optimization guidance all follow from the same JSON shape.
