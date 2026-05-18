<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->
# Copirate Refactor Support - Workflow

## Suggested Flow

1. Run a bounded complexity or smell check first.
2. Pick one dominant smell to address: long method, duplication, large class, feature envy, or nested conditionals.
3. Apply one structural change at a time.
4. Re-run focused validation before the next change.
5. Stop when the local quality issue is solved; do not widen into a rewrite.

## Safety Rules

- Add characterization tests first when behavior is poorly covered.
- Keep commits or change batches small enough to revert easily.
- Do not mix multiple refactoring strategies in one uncontrolled pass.
