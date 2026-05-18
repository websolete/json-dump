# Copirate Playwright Auth Bootstrap Reference

Use this reference behind the extracted setup/auth workflow when Playwright scaffold or auth posture still needs work.

## Bootstrap Completion Summary

After scaffold, config, and npm script work finishes, emit a terse summary that states:

1. What was created or preserved in `.playwright/`
2. The detected phase and current auth posture
3. The next phase-aligned step

## Auth Bootstrap Contract

- Keep credentials in SecretStorage only.
- Use `run_vscode_command` with `copirate.playwright.onboarding.open` for helper-driven auth onboarding.
- Use `run_vscode_command` with `copirate.secretStorage.open` when the task is specifically about entering or clearing local credentials or a Confluence PAT.
- Treat `.playwright/.env.example` as a non-secret runner-input template only.
- Do not generate credential-bearing `.env` files, dotenv credential loading, or credential-reading `globalSetup.ts` files as part of Copirate bootstrap.
- If auth state capture fails after scaffold creation, resume from the existing scaffold instead of rebuilding it.

## Config Rules For Auth Mode (Phase 0 setup and Phase 4 auth-state refresh)

- Preserve scenario-project wiring created by bootstrap.
- Add `workers: 1` and `retries: 1` only when auth mode requires state reuse and sequential execution.
- Add `storageState` under `use` only when auth is required.
- Keep `baseURL` routed through the scenario-environment resolver rather than hard-coded environment literals. On a net-new project where the resolver is not yet configured, stub with the confirmed base URL and add a Phase 2 follow-up item to wire the resolver before committing scenario profiles.
- Do not add dotenv-based credential loading to `playwright.config.ts`.

## SecretStorage Boundary

- Store usernames, passwords, PATs, and helper-only auth values only in SecretStorage-backed flows.
- Treat `PLAYWRIGHT_BASE_URL` as a non-secret convenience value only.
- Do not ask the user to place credentials into workspace files, shell history, or committed artifacts.

## Canonical Scaffold Expectations

When Copirate owns the scaffold, expect or preserve these artifacts:

- `.playwright/playwright.config.ts`
- `.playwright/config/scenarioProjects.ts`
- `.playwright/fixtures/scenario.ts`
- `.playwright/scenarios/index.ts`
- `.playwright/scenarios/types.ts`
- `.playwright/.env.example`
- `.playwright/runtime/.auth/<app-name>-local-default.json` when auth is configured
