# Copirate Playwright Scenario Generation Reference

Use this reference when generating, refining, or recommending bounded Playwright coverage.

## Scenario-First Rules

- Inspect existing specs and sidecars before creating new coverage.
- Reuse ratified planning surfaces and carried-forward candidate context instead of asking the user to restate already-confirmed route facts.
- Keep the executable spec primary and the sibling metadata sidecar intentionally small.

## Candidate Classification

- `codegen-friendly direct landing`: direct or bounded route, stable visible controls, no major shell or frame interpretation gap, no uncontrolled side effects during initial capture.
- `discovery-first legacy flow`: shell navigation, frame-heavy route, popup-heavy launcher flow, or otherwise too ambiguous for safe direct draft generation.

Prefer codegen-first only for approved direct bounded routes where selectors would otherwise be guessed.

## L1 To L2 Progression

- L1 landing coverage proves the active anchor, route arrival, and smallest non-side-effect assertion.
- L2 interaction-depth coverage protects meaningful user-visible behavior once the anchor is already stable.
- A multi-step functionality-realm scenario is still L2 when it stays inside one retained workflow family and one committed scenario profile.

Keep multi-step functionality-realm slices bounded:

1. one primary actor per spec (a second actor is acceptable when both are already represented in the committed scenario object and no new topology is required)
2. one committed scenario profile
3. one retained workflow family
4. one clear happy path or one validation/failure path

If deeper coverage needs a new role, a different environment target, or reusable runtime values that are not already on the scenario object, return to Project Strategy / Scenario Profiles first.

## Local-Only Widening Boundary

- Restore or recreate the smallest live anchor before widening when the active tree has fallen back to backup-only or missing state.
- Prove the smallest user-visible non-side-effect slice first.
- Stop widening locally when the remaining branch performs real downstream delivery and no sanctioned sandbox or downstream-owned safety contract exists.

## Codegen And Auth Reuse

- Treat codegen as capture evidence, not final truth.
- For auth-required routes without saved auth state, prefer onboarding help or `--save-storage` capture before durable spec generation.
- When saved auth state already exists, prefer `--load-storage` capture and reuse the established auth context instead of inventing a new login path.

## Completion Contract

Before presenting a generated scenario as durable truth:

- normalize raw codegen output into repo conventions
- confirm environment targeting before validation-dependent execution
- write or update the sibling metadata sidecar in the same pass
- keep metadata `draft` or `provisional` until the same scenario has passed a minimal successful run or reachability check
