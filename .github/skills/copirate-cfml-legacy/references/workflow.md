# Legacy Modernization Workflow

Use this workflow after the legacy skill has been activated.

## 1. Assess Before Changing

Start by identifying the legacy pattern instead of rewriting from instinct.

- locate cfinclude chains used for business logic flow control
- identify inline queries, query-of-queries, and unparameterized SQL
- measure component size, method sprawl, and application/session scope misuse
- record which parts of the system are presentation-only and should not be treated as modernization defects

## 2. Choose An Incremental Path

- prefer the Strangler Fig pattern over big-bang rewrites
- add tests or characterization checks around legacy behavior first
- move one seam at a time: query extraction, service extraction, DI cleanup, or scope normalization
- keep rollback-friendly steps and avoid mixing unrelated refactors into the same slice

## 3. Modernize Data Access Safely

- extract inline queries into repositories or persistence helpers
- remove SQL injection vectors as part of the extraction, not later
- replace query of queries when the underlying SQL should own the join or filter
- use Common framework polyfills when CF10 compatibility blocks newer syntax

## 4. Untangle Architectural Debt

- convert business-logic include chains into explicit component methods
- reduce Application scope service wiring in favor of DI/1 or clearer construction seams
- shrink god components by responsibility, not by arbitrary line count alone
- keep presentation includes in place when they are genuinely view-only

## 5. Validate Compatibility And Migration

- verify CF10-compatible syntax when the app is still running on CF10
- document where a future CF2025 move can switch from polyfills to native functions
- use the example files for worked transformations and keep the top-level skill focused on routing
