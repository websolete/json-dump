# Copirate Playwright Procedure Import Reference

Use this reference behind the extracted procedure-import workflow when an existing human procedure needs to become a Playwright draft.

> **Edge-lane posture**: Procedure import is a post-foundational enhancement, not a prerequisite for Phase 3 authoring. Normal Playwright authoring (L1/L2 coverage and functionality-realm slices) proceeds without this lane. Use this reference only after the core scaffold, scenario profiles, and auth posture are established.

## Required Workflow Stages

All stages are required in sequence. Stages that produce no work (e.g., Stage 6 when repo evidence resolves all routes) are still visited and recorded as `no-op` before proceeding.

1. Normalize one complete procedure source.
2. Confirm scenario target, project name, destination mode, auth mode, and environment target.
3. Build a transient workflow-analysis package — a short-lived, in-memory or scratchpad representation of the procedure's steps, actor, route targets, auth mode, and environment constraints. Discard after the workflow review summary is confirmed.
4. Present the workflow review summary and require confirmation.
5. Build a `domDiscoveryPlan` — a structured mapping of each unresolved workflow step to its preferred discovery path (`repo-evidence-only`, `live-probe`, or `live-probe-plus-codegen`) based on what is already known. Update the plan as discovery advances.
6. Explore the real application only for the unresolved steps and build a DOM anchor map with source labels.
7. Build a dynamic config-resolution package for non-secret runtime values.
8. Present the config-resolution summary and require confirmation.
9. Present a final pre-generation review summary and require explicit write approval.
10. Generate one draft `.spec.ts` and one sibling `.metadata.json` only after all blockers are cleared.

## Discovery Order (traversal preference)

This list is ordered preference for how to advance through unresolved steps — earlier stages remain preferred when sufficient. This is distinct from the Named Discovery Outcomes below, which are result states recorded per step.

- `workflow-confirmed`
- `repo-evidence-only`
- `live-probe`
- `live-probe-plus-codegen`
- `normalization`

Treat this as ordered preference, not strict precedence. Earlier stages remain preferred when they are sufficient, but selective codegen may be used only after repo evidence plus a lightweight probe still leave the route in `dom-ambiguity`.

## Named Discovery Outcomes (result states per step)

These are terminal or blocking states recorded for each step after discovery. They are distinct from the traversal stages above.

- `repo-evidence-only`
- `live-probe`
- `dom-ambiguity`
- `live-probe-plus-codegen`
- `blocked-source-quality`
- `blocked-route-mismatch`
- `blocked-auth-session`
- `blocked-environment-unreachable`

## Hard Stop Conditions

- Required steps do not have confirmed DOM anchors after the allowed discovery path.
- The procedure source is too thin, ambiguous, or depends on off-app side effects (`blocked-source-quality`).
- Route or page ownership remains unresolved (`blocked-route-mismatch`).
- Auth/session access needed for probing is unavailable (`blocked-auth-session`).
- The confirmed environment target cannot be reached (`blocked-environment-unreachable`).
- Required runtime values remain unresolved or are sensitive without a SecretStorage-backed destination (credentials must go to SecretStorage, not to workspace files or committed config).
- The operator selected committed scenario coverage but no suitable committed scenario profile exists yet.
- The intended environment target is still unclear.

## Draft Generation Rules

- Keep the spec executable truth primary and the metadata sidecar intentionally small.
- Preserve existing repo layout if one already exists.
- Default imported specs to draft status.
- Use TODO markers with `[procedure-import]` when non-blocking ambiguity remains.
- Treat raw codegen output as temporary capture evidence. Normalize selectors into repo conventions and record anchor sources as `repo`, `probe`, or `codegen` before durable adoption.
- Never emit usernames, passwords, tokens, cookies, or session contents into generated artifacts.

## Review Summary Requirements

The workflow review summary, config-resolution summary, and pre-generation summary must each state:

- what is known
- what remains unresolved
- what will be written
- what blocks generation, if anything

## Safety Scan Requirements

Flag and redact suspicious credentials, internal hosts, private IP addresses, server-side file paths, real employee names, and real business identifiers before the draft is written.
