---
name: copirate-playwright-scenario
description: Generate or refine bounded Playwright scenarios using repo conventions, existing specs, and coverage-aware candidate context.
---

<!-- deployment_hash: ff2f1faa -->
<!-- Extension Version: 1.32.6 -->
<!-- Deployed: 2026-05-18 -->
<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->

<!-- Copirate Extended Metadata (not part of VS Code schema) -->
<!-- category: workflow | language: any | difficulty: intermediate -->
<!-- estimated_time: 5-15 minutes -->
<!-- tags: playwright, scenario, specs, coverage -->

# Copirate Playwright Scenario

> **Invocation**: `/copirate-playwright-scenario` in Copilot chat

## Purpose

Use this workflow to create or refine one bounded Playwright scenario package: one executable spec plus one sibling metadata sidecar.

## Workflow

1. Read `.github/skills/copirate-playwright/references/phase-model.md` and `.github/skills/copirate-playwright/references/scenario-generation.md` before drafting or refining specs.
2. Inspect existing specs and sidecars first so duplicate coverage is not generated.
3. If this route was entered from Discover or Entry Point Inventory, carry that candidate context forward instead of asking the user to restate it.
4. Retrieve the coverage-level-appropriate stencil and conformance checklist before generating the spec.
5. Prefer codegen-first only for approved, direct, bounded routes when selectors would otherwise be guessed.
6. Keep the executable spec primary and create or update the sibling metadata sidecar in the same pass.
7. Use `.github/prompts/support/copirate-playwright/workflow.md` for batch-mode and codegen-first question shapes.

## Guardrails

- Confirm environment targeting before validation-dependent execution.
- Reuse saved auth state or established auth context instead of inventing a new login strategy.
- Treat raw codegen output as capture evidence that must be normalized before it becomes durable executable truth.

## References

- `.github/skills/copirate-playwright/references/phase-model.md`
- `.github/skills/copirate-playwright/references/scenario-generation.md`
- `.github/prompts/support/copirate-playwright/workflow.md`

## Success Criteria

1. One bounded scenario package is created or refined.
2. Coverage context is reused instead of rediscovered.
3. The spec follows repo conventions before it is treated as durable truth.
