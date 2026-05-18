---
name: copirate-playwright-import-procedure
description: Transform one existing human procedure into a bounded draft Playwright spec and metadata sidecar using real DOM anchors and explicit config resolution.
---

<!-- deployment_hash: 3745e295 -->
<!-- Extension Version: 1.32.6 -->
<!-- Deployed: 2026-05-18 -->
<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->

<!-- Copirate Extended Metadata (not part of VS Code schema) -->
<!-- category: workflow | language: any | difficulty: advanced -->
<!-- estimated_time: 10-20 minutes -->
<!-- tags: playwright, import, procedures, draft-generation -->

# Copirate Playwright Import Procedure

> **Invocation**: `/copirate-playwright-import-procedure` in Copilot chat

## Purpose

Use this workflow when the user wants to transform one existing human-centric test procedure into a bounded Playwright draft package.

## Workflow

1. Normalize one complete procedure source before generating anything.
2. Read `.github/skills/copirate-playwright/references/procedure-import.md` before DOM exploration or file writing.
3. Confirm scenario target, destination mode, auth mode, and environment target.
4. Build and review the workflow-analysis package, then confirm it.
5. Build and review the DOM anchor map and dynamic config-resolution package, then confirm them.
6. Only after blockers are cleared, generate one draft `.spec.ts` and one sibling `.metadata.json`.

## Guardrails

- Required steps without DOM anchors are blockers.
- Required runtime values without safe destinations are blockers.
- Never emit credentials or session contents into generated artifacts.
- Do not write files before the workflow, config, and pre-generation confirmations are complete.

## References

- `.github/skills/copirate-playwright/references/procedure-import.md`

## Success Criteria

1. Procedure import stays grounded in real-page evidence.
2. The generated draft is blocked rather than guessed when critical data is missing.
3. One spec and one metadata sidecar are produced only after explicit confirmation.
