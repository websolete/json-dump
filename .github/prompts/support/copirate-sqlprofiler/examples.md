<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->
# Copirate SQL Profiler Support - Examples

## Example 1 - Source-Derived Quick Pass

```text
/copirate-sqlprofiler

Profile the highlighted CFML query, keep it read-only, and give me the compact package without running databridge.
```

## Example 1 - Response Shape

```text
SQL profiling package ready.

- Package Mode: source-derived
- Package Path: .copirate/sqlprofiler/packages/sqlprofiler-selection-customerdao-cfc-searchcustomers-4e2a91b7-v1.json
- Source Context:
  - Source Kind: selection
  - Source Label: CustomerDAO.cfc selection
- Working Package:
  - packageVersion: 1.0
  - status: assembling
- Extraction:
  - Parameter Slots: 2
  - Branch Conditions: 1
- Scenario Matrix:
  - Scenario 1: lastNamePrefix="Sm" with optional prefix branch active
- Baseline:
  - Elapsed Time: unavailable (phase1_not_available)
  - Row Count: unavailable (not_collected)
- Decomposition:
  - Base query plus one optional predicate slice
- Access-path Review:
  - Table Candidates: dbo.Customers (c)
  - Known Index Evidence: none recorded
  - Sargability Findings: [source-derived] wrapped LEFT(c.LastName, 1) predicate may reduce direct use of a plain LastName index
  - Join Predicate Findings: none recorded
  - Binding Risks: none recorded
  - Unknowns: [unknown] no explicit index metadata is recorded for dbo.Customers in the current source-derived package
- Schema/Routine Findings:
  - none recorded
- Ranked Suspects:
  - [source-derived] first-letter predicate should be validated against explicit schema evidence before rewriting the DAO
- Next Validation Step:
  - decide whether a measured baseline is needed for this scenario
```

## Example 1A - Slice 1 Checkpoint And Approval Gate

```text
/copirate-sqlprofiler

Profile the highlighted CFML query, keep it read-only, and pause after the source-derived package so I can decide whether to continue.
```

## Example 1A - Response Shape

```text
Slice 1 checkpoint.

- Status: Slice 1 | source-derived foundation | packageMode=source-derived | status=assembling
- Tried: selection resolved, working package created, extraction completed, and scenario matrix assembled
- Recorded: package `.copirate/sqlprofiler/packages/sqlprofiler-file-model-dao-report-cfc-getwipnames-b73bbed2-v1.json`, parameterSlots=6, branchConditions=6, scenarios=5
- Decision: schema enrichment is possible from extracted table and routine hints; measured profiling still needs explicit approval and a runnable scenario basis
- Next: Continue to schema enrichment, continue to evidence-backed profiling, return the compact package report now, or stop here
```

## Example 1B - Structured Source-Derived Final Response

```text
SQL profiling package ready.

- Status Snapshot: `.copirate/sqlprofiler/packages/sqlprofiler-selection-customerdao-cfc-searchcustomers-4e2a91b7-v1.json` | source-derived | assembling | source=`CustomerDAO.cfc selection`
- What Was Tried:
  - Resolved the highlighted selection and built the source-derived package foundation.
  - No schema or databridge work was attempted in this turn.
- What Changed In Package:
  - Recorded `parameterSlots=2`, `branchConditions=1`, and one scenario seed.
  - Seeded source-derived access-path review findings and the next validation step.
- Performance Results:
  - Baseline: not collected in the source-derived lane.
  - Delta: No comparison delta evaluated.
- Key Analysis:
  - Wrapped `LEFT(c.LastName, 1)` remains the main source-derived sargability concern.
  - No explicit index metadata is yet recorded for `dbo.Customers`.
- Unknowns And Caveats:
  - `Phase 1 does not capture` CPU, IO, DMV, or execution-plan data.
  - Effective runtime access-path quality is still unmeasured.
- Next Step:
  - Decide whether a measured baseline is needed for this scenario.
```

## Example 2 - Schema-Backed Structure Enrichment

```text
/copirate-sqlprofiler

Use the current SQL source as the working package foundation, then enrich it with structure-only schema facts through `mcp_cf_sql_schema`.
Use these extracted hints:
- table dbo.Adjustments
- routine dbo.AddComment
- predicate Account
- projection State, ID
- sort ID
- column hint State

Keep it read-only and stop after the schema-backed stage.
```

## Example 2 - Response Shape

```text
SQL profiling package ready.

- Package Mode: source-derived with schema-backed findings
- Package Path: .copirate/sqlprofiler/packages/sqlprofiler-selection-adjustments-addcomment-a13f4b9c-v1.json
- Source Context:
  - Source Kind: selection
  - Source Label: AddComment selection
- Working Package:
  - packageVersion: 1.0
  - status: ready-for-execution
- Extraction:
  - Table Hints: dbo.Adjustments
  - Routine Hints: dbo.AddComment
  - Column Hints: Account, State, ID
- Scenario Matrix:
  - Scenario 1: structure-only validation; no measured execution requested
- Baseline:
  - not collected
- Access-path Review:
  - Table Candidates: dbo.Adjustments (a)
  - Known Index Evidence: [schema-backed] PK_Adjustments, idx_inquirytype
  - Sargability Findings: [schema-backed] predicate column Account and projection/sort columns State, ID were resolved from explicit schema metadata
  - Join Predicate Findings: none recorded
  - Binding Risks: none recorded
  - Unknowns: [unknown] effective runtime access-path quality is still unmeasured
- Schema/Routine Findings:
  - contractVersion: schema-sqlprofiler-context.v1
  - table: dbo.Adjustments
  - routine: dbo.AddComment
  - warnings: none
  - unresolved: none
- Ranked Suspects:
  - [schema-backed] explicit structure facts are available for the highlighted source
  - [unknown] runtime timing and row counts still require databridge
- Next Validation Step:
  - run `profile_query` if you need a measured baseline for the same scenario
```

## Example 3 - Evidence-Backed Baseline Plus Candidate Comparison

```text
/copirate-sqlprofiler

Profile the highlighted DAO query through databridge using scenario `customer-search-baseline` with parameters `{ "lastNamePrefix": "Sm", "includeInactive": false }`.
Then compare this candidate variant against the current query under the same scenario:

SELECT c.CustomerId, c.LastName, c.FirstName
FROM dbo.Customers c
WHERE c.LastNameFirstLetter = LEFT(@lastNamePrefix, 1)
  AND c.IsActive = 1
ORDER BY c.LastName, c.FirstName
```

## Example 3 - Response Shape

```text
SQL profiling package ready.

- Status Snapshot: `.copirate/sqlprofiler/packages/sqlprofiler-selection-customerdao-cfc-searchcustomers-4e2a91b7-v1.json` | evidence-backed | compared | scenario=`customer-search-baseline`
- What Was Tried:
  - Ran `profile_query` for the current baseline under the fixed scenario.
  - Ran `compare_query_variants` for one approved candidate under the same scenario.
- What Changed In Package:
  - Recorded the measured baseline, candidate comparison, and comparison parity fields.
  - Preserved source-derived access-path findings alongside the measured delta.
- Performance Results:
  - Baseline: `durationMs=42`, `rowCount=37`, `totalRowCount=37`, `resultShapeSignature=CustomerId|LastName|FirstName`.
  - Delta: candidate `durationMs=18` versus baseline `42`; `sameRowCount=true`; `sameResultShapeSignature=true`.
- Key Analysis:
  - The predicate rewrite improved elapsed time under the fixed scenario.
  - Index coverage for `dbo.Customers` remains unconfirmed without explicit schema metadata.
- Unknowns And Caveats:
  - `statisticsIo`, `statisticsTime`, and `planXml` remain unavailable.
  - No explicit schema hints were supplied, so `analysis.schemaContext` remains unresolved.
- Next Step:
  - Confirm the candidate semantics on a second representative prefix before adopting the rewrite.
```

## Example 4 - Runtime-Dependent DAO Scenario Preflight

```text
/copirate-sqlprofiler

Profile the highlighted WebScreenFW1 DAO query with measured evidence if you can do it read-only. If one runtime key is missing, use bounded preflight to resolve a representative runnable scenario instead of turning this into open-ended browsing.
```

## Example 4 - Response Shape

```text
SQL profiling package ready.

- Status Snapshot: `.copirate/sqlprofiler/packages/sqlprofiler-file-model-dao-report-cfc-getwipnames-56bdb28f-v1.json` | evidence-backed | executed | scenario=`getwipnames-representative-account`
- What Was Tried:
  - Used one bounded `select_query` to resolve a representative account for the broad default-letter path.
  - Ran `profile_query` for the measured baseline under that same scenario.
- What Changed In Package:
  - Recorded databridge preflight readiness plus one evidence-backed baseline.
  - Preserved explicit schema facts under `analysis.schemaContext`.
- Performance Results:
  - Baseline: `durationMs=4326`, `rowCount=100`, `totalRowCount=404`.
  - Delta: No comparison delta evaluated.
- Key Analysis:
  - The broad default-letter route is expensive for the representative account.
  - Specific-letter paths should be compared under the same account before code changes are proposed.
- Unknowns And Caveats:
  - Schema remained structure-only and did not prove timing or equivalence.
  - The measured lane still covers only one representative account and one broad route shape.
- Next Step:
  - Compare the current query against a `LastNameFirstLetter` candidate under the same representative account.
```

## Example 4A - Blocked Slice 3 Runtime-Dependent Recovery

```text
/copirate-sqlprofiler

Resume the existing WebScreenFW1 SQLProfiler package. Stay read-only. If the first bounded discovery attempt still does not produce a runnable direct-key scenario, stop with the blocked operator summary instead of browsing for more data.
```

## Example 4A - Response Shape

```text
SQL profiling package ready.

- Status Snapshot: `.copirate/sqlprofiler/packages/sqlprofiler-file-model-dao-report-cfc-getwipname-085bda07-v1.json` | source-derived | preflight-blocked-no-runnable-scenario | scenario=`unresolved`
- What Was Tried:
  - Reused the resumed package state and confirmed databridge preflight readiness.
  - Spent one bounded `select_query` on the direct-`iInqKey` representative path and got `rowCount=0`.
  - Did not take a second hop because switching to the identity tuple would leave the same source-derived scenario family.
- What Changed In Package:
  - Recorded `status=preflight-blocked-no-runnable-scenario` plus the bounded discovery miss.
  - Preserved unresolved runnable inputs for `iInqKey` or the identity tuple, `sAccountsList`, and the branch posture for `ReviewCredit` or the credit-type exclusion lane.
- Performance Results:
  - Baseline: not collected because preflight blocked without a runnable scenario.
  - Delta: No comparison delta evaluated.
- Key Analysis:
  - The direct-key representative miss does not justify widening into generic representative data hunting.
  - The next allowed move is a bounded operator question set, not another exploratory query.
- Unknowns And Caveats:
  - A concrete runnable scenario is still missing.
  - The blocked state is prompt-owned package state, not a `SqlProfilerPackageFormatter` rendering contract.
- Next Step:
  - Provide either `iInqKey` or the identity tuple, plus `sAccountsList`, and the branch posture for `ReviewCredit` or the concrete credit-type exclusion lane.
```

## Validation Note

- The authoritative deployed AppTesting schema proof fixture for `get_sqlprofiler_context` is `dbo.Adjustments` plus `dbo.AddComment` with predicate `Account`, projection `State` and `ID`, sort `ID`, and column hint `State`.
- Earlier `GetWipNames` planning examples are historical context only and are not the deployed proof surface.
- For runtime-dependent DAO queries, one bounded `select_query` may be used during preflight to resolve a representative runnable scenario. Record that basis explicitly; do not pretend the runtime key came from static source analysis.

## Example Artifact Routing

```text
Packaged artifact requested.
Working package preserved at .copirate/sqlprofiler/packages/sqlprofiler-selection-customerdao-cfc-searchcustomers-4e2a91b7-v1.json
Routing markdown output to the governed working-doc analysis lane with the title: Wip Query Profiling Package
```

## Related Docs

- `.github/prompts/support/copirate-sqlprofiler/package-contract.md`
- `.github/prompts/support/copirate-sqlprofiler/cf-dao-use-case.md`
