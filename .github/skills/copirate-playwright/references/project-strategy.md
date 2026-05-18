# Copirate Playwright Project Strategy Reference

Use this reference when committed scenario profiles, project naming, or reusable non-secret topology decisions need to be resolved before deeper Playwright authoring.

## Project-Strategy Checkpoint

The checkpoint is satisfied only when the next coverage slice already has a committed scenario profile that fits:

- the intended app or module target
- the correct base URL or environment target
- the actor or role the slice exercises
- any reusable non-secret runtime values the slice depends on

If any of those is missing, return to Project Strategy / Scenario Profiles before continuing.

The committed profile is ready for Phase 3 only after `npx playwright test --config .playwright/playwright.config.ts --list` confirms the intended named project target is resolvable.

## Storage-Surface Boundaries

Keep these surfaces non-overlapping by design:

- committed scenario profiles own reusable non-secret topology
- saved auth state owns browser session reuse
- `.playwright/.env` owns approved machine-local non-secret overrides only

Do not put credentials, tokens, helper-only ids, or extension-private state into committed scenario files or `.playwright/.env`.

## Low-Friction Defaults

- Start with one default committed scenario profile (for example, named `default-local`) when onboarding a new app.
- Add more committed profiles only when role, environment, or reusable runtime values genuinely diverge.
- Treat local auth profiles as authoring aids, not as substitutes for committed scenario topology.

## Return-To-Phase-2 Triggers

Return to Phase 2 when the next slice needs:

- a new actor or permission boundary
- a different environment target
- reusable runtime values that the current scenario object does not expose
- renamed or expanded project targets that other workflows will also need

## Completion Contract

End project-strategy work with:

1. the confirmed project or scenario-profile direction
2. the storage-surface posture
3. the next downstream route that can now proceed without rediscovery
