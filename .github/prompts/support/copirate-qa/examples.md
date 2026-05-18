<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->
# Copirate QA Support - Examples

## Findings Summary Shape

```text
Findings:
1. High - Missing focused validation for the touched command path.
2. Medium - One dependency registration path is inconsistent with the repo pattern.

Validation performed: targeted contract test and problems check.
Residual risk: one untested edge-case path remains.
```

## Clean Pass Shape

```text
No findings in the touched slice.
Validation performed: targeted tests and problems check passed.
Residual risk: broader integration coverage was not rerun in this pass.
```
