<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->
# Copirate SQL Profiler Support - CF DAO Use Case

## Typical Scenario

A CF developer is working inside a DAO component and wants to optimize a query without leaving the editor, switching to SSMS, or manually rebuilding the profiling context elsewhere.

The common flow is:

1. Highlight the SQL inside the DAO method.
2. Run `/copirate-sqlprofiler`.
3. Let the workflow extract the package foundation from the DAO code before deciding whether measured evidence is needed.
4. Review schema-backed findings, measured findings, and hypotheses side by side.
5. Compare an approved rewrite against the original query under the same scenario before changing the DAO code.

## Example DAO Slice With Optional Branches

```cfml
component accessors="true" {

    public query function searchCustomers(
        string lastNamePrefix = "",
        boolean includeInactive = false,
        array customerIds = []
    ) {
        var sql = "
            SELECT c.CustomerId, c.LastName, c.FirstName, c.IsActive
            FROM dbo.Customers c
            WHERE 1 = 1
        ";

        var params = {};

        if (len(arguments.lastNamePrefix)) {
            sql &= " AND LEFT(c.LastName, 1) = LEFT(:lastNamePrefix, 1)";
            params.lastNamePrefix = {
                value = arguments.lastNamePrefix,
                cfsqltype = "cf_sql_varchar"
            };
        }

        if (!arguments.includeInactive) {
            sql &= " AND c.IsActive = 1";
        }

        if (arrayLen(arguments.customerIds)) {
            sql &= " AND c.CustomerId IN (:customerIds)";
            params.customerIds = {
                value = arguments.customerIds,
                cfsqltype = "cf_sql_integer",
                list = true
            };
        }

        sql &= " ORDER BY c.LastName, c.FirstName";

        return queryExecute(
            sql,
            params,
            { datasource = variables.datasource }
        );
    }
}
```

## What The Extractor Should Preserve

- `source`: DAO file, function label, and whether the query came from a selection or a broader file extraction.
- `extraction.sqlText` and `extraction.normalizedSql`: the assembled SQL shape, not a hand-retyped version from chat.
- `extraction.parameterSlots`:
  - `lastNamePrefix` as a conditional scalar binding
  - `includeInactive` as a boolean scenario driver even though it does not bind directly as SQL text
  - `customerIds` as a conditional list-expanding binding
- `extraction.branchConditions`:
  - prefix predicate branch
  - active-only branch
  - list-membership branch
- `scenarioMatrix.scenarios`: concrete combinations of parameter values and active branches that turn the DAO's optional logic into explicit scenario variations.
- caller-extracted table, routine, and column hints that can seed `analysis.schemaContext` through `mcp_cf_sql_schema` with `operation = "get_sqlprofiler_context"`
- `analysis.indexUsageReview`: source-derived table candidates, sargability findings, binding risks, and explicit unknowns until stronger schema-backed or measured evidence arrives.
- `analysis.suggestedOptimizations`: follow-up guidance linked to concrete access-path review findings with an explicit `basis` such as `inferred` or `mixed`.
- `packageId`: a deterministic identity derived from normalized source inputs for this DAO method.
- `storagePath`: the normalized workspace-relative working JSON package path under `.copirate/sqlprofiler/packages/`.

## Example Extracted Package Fragments

```json
{
  "packageVersion": "1.0",
  "packageId": "sqlprofiler-file-model-dao-customerdao-cfc-searchcustomers-4e2a91b7-v1",
  "packageMode": "source-derived",
  "storagePath": ".copirate/sqlprofiler/packages/sqlprofiler-file-model-dao-customerdao-cfc-searchcustomers-4e2a91b7-v1.json",
  "extraction": {
    "parameterSlots": [
      {
        "id": "lastNamePrefix",
        "bindingKind": "scalar",
        "required": false,
        "isConditional": true
      },
      {
        "id": "customerIds",
        "bindingKind": "list",
        "required": false,
        "expandsList": true,
        "isConditional": true
      },
      {
        "id": "includeInactive",
        "bindingKind": "boolean-driver",
        "required": false,
        "isConditional": true
      }
    ],
    "branchConditions": [
      {
        "id": "branch-prefix",
        "expression": "lastNamePrefix",
        "dependsOn": ["lastNamePrefix"]
      },
      {
        "id": "branch-active-only",
        "expression": "includeInactive = false",
        "dependsOn": ["includeInactive"]
      },
      {
        "id": "branch-customer-ids",
        "expression": "customerIds",
        "dependsOn": ["customerIds"]
      }
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
      },
      {
        "id": "scenario-id-list-only",
        "parameterValues": {
          "lastNamePrefix": "",
          "includeInactive": true,
          "customerIds": [101, 202]
        },
        "activeBranchIds": ["branch-customer-ids"]
      }
    ]
  },
  "analysis": {
    "indexUsageReview": {
      "tableCandidates": [
        { "id": "table-1", "tableName": "dbo.Customers", "alias": "c", "basis": "source-derived" }
      ],
      "knownIndexEvidence": [],
      "sargabilityFindings": [
        {
          "id": "predicate-left-1",
          "summary": "Function-wrapped LEFT(c.LastName, 1) predicate may reduce direct use of a plain LastName index.",
          "basis": "source-derived"
        }
      ],
      "joinPredicateFindings": [],
      "bindingRisks": [
        {
          "id": "binding-list-customerIds",
          "summary": "List-binding parameter customerIds expands into a variable-length predicate and may change access-path selection across scenarios.",
          "basis": "source-derived"
        }
      ],
      "unknowns": [
        {
          "id": "unknown-customers-index",
          "summary": "No explicit index metadata is recorded for dbo.Customers, so actual access-path quality remains unknown.",
          "basis": "unknown"
        }
      ]
    }
  }
}
```

## Deployed Schema Validation Anchor

This customer DAO walkthrough is illustrative. The authoritative deployed AppTesting schema validation fixture for `get_sqlprofiler_context` is:

- table: `dbo.Adjustments`
- routine: `dbo.AddComment`
- predicate: `Account`
- projection: `State`, `ID`
- sort: `ID`
- column hint: `State`

Treat that fixture as the deployed proof surface. Earlier `GetWipNames` planning examples are historical only.

## Typical Source-Derived Invocation

```text
/copirate-sqlprofiler

Profile the highlighted DAO query, keep it read-only, and show me the package for the source-derived path first.
```

## Typical Evidence-Backed Invocation

```text
/copirate-sqlprofiler

Profile the highlighted SQL from this DAO method. Keep it read-only.
Use `mcp_cf_sql_schema` first if you can extract table, routine, and column hints from the DAO source.
Use databridge with scenario `customer-prefix-search` and parameters `{ "lastNamePrefix": "Sm", "includeInactive": false, "customerIds": [] }`.
If the contract supports comparison, compare this candidate variant too:

SELECT c.CustomerId, c.LastName, c.FirstName, c.IsActive
FROM dbo.Customers c
WHERE c.LastNameFirstLetter = LEFT(:lastNamePrefix, 1)
  AND c.IsActive = 1
ORDER BY c.LastName, c.FirstName
```

## What The Prompt Should Do

1. Resolve the highlighted SQL from the DAO method instead of asking the user to restate the query.
2. Create or resume the working package under `.copirate/sqlprofiler/packages/`.
3. Derive a deterministic `packageId` from normalized source inputs and persist the normalized workspace-relative `storagePath` before continuing.
4. Extract the package foundation first: `source`, `extraction`, `scenarioMatrix`, and any explicit candidate `variants`.
5. If caller-extracted table, routine, or column hints are available, call `mcp_cf_sql_schema` with `operation = "get_sqlprofiler_context"` and preserve explicit structure facts under `analysis.schemaContext`.
6. Notice that the request explicitly asks for measured profiling, so evidence-backed mode is appropriate.
7. Confirm the databridge contract through `tool_discovery` before claiming measured execution.
8. If the DAO path still needs a concrete runtime key or account, use at most one bounded `select_query` to resolve a representative runnable scenario before spending the scenario question.
9. Use `profile_query` for the baseline and `compare_query_variants` for the candidate under the same scenario.
10. Return the package path plus a summary that keeps schema-backed and measured findings separate from source-derived optimization hypotheses.

## Typical Bounded Questions

If the request is incomplete, the prompt should stay inside the three-question limit. Typical examples are:

For runtime-dependent DAO queries, the prompt should first try extracted defaults, resumed package state, or one bounded `select_query` to resolve a runnable scenario. The scenario question is for the remaining gap, not the first reflex.

1. `Which DAO selection should I use as the source target?`
2. `If one bounded discovery step cannot resolve a runnable scenario, which scenario values should I use for lastNamePrefix, includeInactive, and customerIds?`
3. `Do you want the package saved to the governed analysis lane?`

If the highlighted source, scenario, and package preference are already clear, the prompt should ask nothing.

## Example Output Shape

```text
SQL profiling package ready.

- Package Mode: evidence-backed
- Package Path: .copirate/sqlprofiler/packages/sqlprofiler-file-model-dao-customerdao-cfc-searchcustomers-4e2a91b7-v1.json
- Source Context:
  - file: CustomerDAO.cfc
  - function: searchCustomers
  - extraction: highlighted queryExecute SQL
- Working Package:
  - packageVersion: 1.0
  - status: compared
- Extraction:
  - Parameter Slots: lastNamePrefix, includeInactive, customerIds
  - Branch Conditions: branch-prefix, branch-active-only, branch-customer-ids
- Scenario Matrix:
  - baseline scenario: customer-prefix-search
  - parameters: { lastNamePrefix: "Sm", includeInactive: false, customerIds: [] }
  - active branches: branch-prefix, branch-active-only
  - candidate variant supplied: yes
- Baseline:
  - durationMs: 42
  - rowCount: 37
  - totalRowCount: 37
  - resultShapeSignature: CustomerId|LastName|FirstName|IsActive
  - statementHash: 6df8b2d1
  - unavailable: statisticsIo, statisticsTime, planXml
- Access-path Review:
  - Table Candidates: dbo.Customers (c)
  - Known Index Evidence: none recorded
  - Sargability Findings: [source-derived] wrapped LEFT(c.LastName, 1) predicate may reduce direct use of a plain LastName index
  - Join Predicate Findings: none recorded
  - Binding Risks: [source-derived] list-binding customerIds branch may change access-path selection when populated
  - Unknowns: [unknown] explicit index metadata for dbo.Customers is not present in the package inputs
- Comparison:
  - candidateDurationMs: 18
  - candidateRowCount: 37
  - sameRowCount: true
  - sameResultShapeSignature: true
- Schema And Routine Findings:
  - no explicit schema route facts were recorded for this invocation
  - structure-lane confirmation still requires `get_sqlprofiler_context` with caller-extracted hints
- Ranked Suspects:
  - [measured] baseline predicate form is slower than the candidate under the same scenario
  - [hypothesis] list-membership branch should be measured separately under a scenario where customerIds is populated
- Next Validation Step:
  - confirm the candidate under at least one more representative prefix before changing the DAO implementation
```

## How To Read The Result

- Treat the databridge timing and comparison fields as measured findings inside the current bounded contract.
- Treat `analysis.indexUsageReview` entries according to their `basis`: `source-derived` is structural guidance from extracted SQL, `schema-backed` comes from explicit schema metadata, `measured` comes from bounded runtime evidence, and `unknown` means the package cannot honestly claim index coverage yet.
- Treat ranked suspects and rewrite recommendations as prompt-owned guidance, not as facts automatically proven by databridge.
- Treat unavailable metrics honestly; if CPU, IO, or execution-plan data are missing, the prompt should say they are unavailable rather than implying them.
- Treat optional DAO branches as scenario dimensions. If a branch was not active in the measured scenario, the package should not imply that branch has been profiled.

## Why This Is Disciplined

- The same highlighted DAO code drives both extraction and measured execution.
- The working JSON package preserves state under `.copirate/sqlprofiler/packages/` so extraction, execution, and analysis do not have to be reassembled from chat history.
- Scenario values freeze optional branches so baseline and candidate runs can be compared honestly.
- If one runtime key had to be discovered during preflight, the package should say so explicitly instead of pretending that value came from static source analysis.
- The package records what came from code analysis and what came from databridge instead of collapsing them into one narrative.
- Follow-up recommendations stay grounded in package fields such as active branches, measured baseline, and candidate comparison results.

## Working Package Lifecycle

- The package should be created when the source is resolved.
- The package should be resumed when the deterministic `packageId` resolves to the same DAO method and query shape.
- The same file should be updated after extraction, after databridge baseline execution, and after any candidate comparison.
- The stored `storagePath` should remain workspace-relative and forward-slash normalized.
- The final user-facing answer can stay compact because the full package already exists at the recorded path.

That is the operational reason for using `.copirate/sqlprofiler/packages/` during processing.

## Expected Outcome For The Developer

The developer gets an in-editor answer to four practical questions without context-switching:

1. `What query did the profiler actually analyze?`
2. `How did the current query perform under a real scenario?`
3. `Did the candidate variant improve or regress under the same scenario?`
4. `What should I validate next before changing the DAO method?`

That keeps the workflow grounded in the code the developer is already editing while still using databridge for bounded measured evidence.
