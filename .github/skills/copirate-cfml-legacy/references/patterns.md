# Legacy Pattern Reference

## Common Legacy Patterns

- procedural cfinclude chains for business logic flow
- inline SQL in views or mixed-concern scripts
- query-of-queries used where proper SQL should own the operation
- Application scope used as a dependency container
- session sprawl and broad shared mutable state
- monolithic components or controllers that centralize unrelated responsibilities

## Detection Signals

- repeated `cfinclude` or `cfmodule` hops between business steps
- direct SQL stitched from request or form input
- components with excessive method count, large line count, or mixed data-access and presentation logic
- application-scoped service factories spread across `Application.cfc`
- legacy code that cannot be changed safely because there are no seams or characterization checks

## Remediation Priorities

1. eliminate security risks in inline data access
2. create explicit seams around query extraction and business logic flow
3. reduce the most dangerous shared-state or god-object surfaces
4. only then widen into broader architecture cleanup

## Relationship To Examples

Use the example files for worked before/after transformations:

- `examples/legacy-detection-patterns.md`
- `examples/application-scope-di-refactoring.md`
- `examples/data-access-modernization.md`
