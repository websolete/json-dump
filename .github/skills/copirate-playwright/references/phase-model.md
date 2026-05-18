# Copirate Playwright Phase Model Reference

Use this reference when Playwright routing or follow-up summaries need to stay aligned with the canonical five-phase model.

## Canonical Phases

0. Workspace Bootstrap
1. Auth Setup
2. Scenario Profiles
3. Test Authoring
4. Maintenance

## Operational Rules

- Phases 0-2 are setup. Phase 1 is conditional when the app does not require auth.
- Phase 3 is the long-lived authoring phase. L1 landing coverage, L2 interaction-depth coverage, and bounded multi-step functionality-realm slices all remain inside Phase 3.
- Phase 4 is suite care: auth-state refresh, selector repair, metadata refresh, and coverage-gap follow-up.
- If readiness is missing, Setup/Auth takes priority over generic action selection.
- If the committed scenario-profile plan does not fit the next slice, return to Phase 2 before discovery, metadata, scenario generation, or import.

## Default Next-Step Routing

- Phase 0: Setup/Auth (auth required or unsure); Project Strategy / Scenario Profiles (app confirmed no-auth)
- Phase 1: Setup/Auth until auth posture is resolved
- Phase 2: Project Strategy / Scenario Profiles
- Phase 3: Scenario, Discover, Docs, Metadata, or bounded Import
- Phase 4: Maintenance, Discover, or targeted Scenario follow-on

## Progression Rules

- L1 proves the active anchor and smallest useful user-visible assertion.
- L2 widens protection inside the same retained workflow family when shallow landing checks are no longer enough.
- Multi-step functionality-realm scenarios are L2, not a separate phase.

## Summary Contract

When a Playwright workflow ends, summarize:

1. What changed
2. The current phase and why
3. The next phase-aligned action
