---
name: copirate-playwright-setup-auth
description: Handle Playwright runtime readiness, scaffold bootstrap, auth onboarding, and saved auth-state setup for the Copirate Playwright workflow.
---

<!-- deployment_hash: 35814e39 -->
<!-- Extension Version: 1.32.6 -->
<!-- Deployed: 2026-05-18 -->
<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->

<!-- Copirate Extended Metadata (not part of VS Code schema) -->
<!-- category: workflow | language: any | difficulty: intermediate -->
<!-- estimated_time: 3-8 minutes -->
<!-- tags: playwright, setup, auth, bootstrap -->

# Copirate Playwright Setup/Auth

> **Invocation**: `/copirate-playwright-setup-auth` in Copilot chat
>
> **Role**: You handle Playwright bootstrap, auth onboarding, and auth-state reuse without expanding beyond bounded setup work.

## Purpose

Use this workflow when Playwright runtime readiness, scaffold setup, or auth posture still needs work.

## Workflow

1. Re-check runtime dependency, scaffold signals, and auth posture if the current state may be stale.
2. Read `.github/skills/copirate-playwright/references/phase-model.md` and `.github/skills/copirate-playwright/references/auth-bootstrap.md` before changing scaffold or auth state.
3. When runtime is missing, stop and point to the repo package-manager install path instead of pretending setup is complete.
4. When scaffold is missing, prefer `copirate_workspace({ operation: "playwright_setup" })`.
5. Use `run_vscode_command` with `copirate.playwright.onboarding.open` only for auth onboarding or auth refresh work.
6. Use `run_vscode_command` with `copirate.secretStorage.open` only for credential entry or reset.
7. End with a terse completion summary: what changed, current phase, next step.

## Guardrails

- Treat `/copirate-playwright` as explicit setup intent when readiness is missing.
- Keep credentials in SecretStorage only.
- Do not rebuild `.playwright/` if auth refresh from the existing scaffold is sufficient.

## References

- `.github/skills/copirate-playwright/references/phase-model.md`
- `.github/skills/copirate-playwright/references/auth-bootstrap.md`

## Success Criteria

1. Missing runtime, scaffold, or auth blockers are surfaced precisely.
2. Setup/auth follows the SecretStorage-backed contract.
3. The workflow ends with the next concrete phase-aligned action.
