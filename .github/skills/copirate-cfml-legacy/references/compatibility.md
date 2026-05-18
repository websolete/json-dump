# CF10 Compatibility Reference

## Baseline Assumption

This skill assumes the legacy application may still need to run on ColdFusion 10 while modernization is in progress.

## Syntax And BIF Constraints

- avoid CF11+ member-function assumptions when the runtime is still CF10
- avoid `arrayEach`, `arrayMap`, `arrayFilter`, and similar newer collection helpers when compatibility is required
- avoid the elvis operator and other newer shorthand unless the runtime boundary has been confirmed
- prefer explicit control flow over clever syntax shortcuts in compatibility-sensitive files

## `queryExecute()` Strategy

- use the Common framework polyfill when modernized data access still needs to run on CF10
- verify the `/common` mapping and helper availability before assuming native support
- document the migration path so a future CF2025 pass can switch to native `queryExecute()` cleanly

## Acceptable Versus Problematic Includes

- presentation includes such as headers, footers, and navigation partials are acceptable
- cfinclude chains that drive business logic or service orchestration are the modernization target

## Migration Rule

Compatibility is not a reason to freeze poor architecture forever. Use compatibility-aware replacements that preserve behavior now and create a clear native-upgrade path later.
