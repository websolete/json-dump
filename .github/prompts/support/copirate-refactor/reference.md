<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->
# Copirate Refactor Support - Reference

## Common Refactoring Triggers

- Long method
- Large class or module
- Duplicate code
- Nested conditionals
- Long parameter list
- Feature envy
- Magic numbers or repeated literals

## Common Refactoring Patterns

- Extract method or function
- Extract class or module
- Introduce parameter object
- Replace conditional with polymorphism
- Extract constant or configuration
- Remove dead code

## Validation Guidance

- Prefer a narrow test or compile check over broad repo validation.
- Confirm public APIs and integration points still behave the same.
- Capture measurable improvement when possible: shorter methods, reduced complexity, or removed duplication.
