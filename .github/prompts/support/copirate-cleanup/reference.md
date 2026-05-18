<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->
# Copirate Cleanup Support - Reference

## Working Docs Retrieval

Retrieve the configurable working-docs path before any cleanup action.

```typescript
const config = vscode.workspace.getConfiguration('copirate.workspace');
const workingDocsPath = config.get('workingDocsLocation', '.copirate/working');
const retentionDays = config.get('workingDocsRetentionDays', 30);
```

## Common Artifact Buckets

- Test and validation files: `test-*`, `*-validation.md`, one-off test scripts
- Analysis and QA docs: `*_ANALYSIS.md`, `QA_*.md`, `*_STATUS.md`, `*_PLAN.md`
- Session working docs: `OBJECTIVE_*.md`, `*_SUMMARY.md`, numbered reports
- Temporary files: `hello.txt`, `scratch-*`, `temp-*`, `inspect-*`
- Build artifacts: old `.vsix` files, empty directories, orphaned outputs

## Exclusions

Never relocate or delete:
- `README.md`, `README_*.md`
- `CHANGELOG.md`
- `LICENSE`
- `CONTRIBUTING.md`
- active source files or committed test suites

## Action Guidance

- Relocate root-level working docs into the correct category folder.
- Archive aged working docs under `[workingDocsPath]/archive/[category]-[YYYY-MM]/`.
- Delete only low-value temporary material after approval.
- Keep reusable utilities even when they look test-oriented by name.
