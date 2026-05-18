---
name: copirate-playwright-discover
description: Recommend the next few Playwright coverage candidates by comparing workspace entry points against existing scenario coverage.
---

<!-- deployment_hash: 6a75996d -->
<!-- Extension Version: 1.32.6 -->
<!-- Deployed: 2026-05-18 -->
<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->

<!-- Copirate Extended Metadata (not part of VS Code schema) -->
<!-- category: workflow | language: any | difficulty: intermediate -->
<!-- estimated_time: 3-8 minutes -->
<!-- tags: playwright, discover, coverage, routing -->

# Copirate Playwright Discover

> **Invocation**: `/copirate-playwright-discover` in Copilot chat

## Purpose

Use this workflow when the user wants a quick recommendation pass for the next likely Playwright coverage targets.

## Workflow

1. Read `.github/skills/copirate-playwright/references/phase-model.md` and `.github/skills/copirate-playwright/references/scenario-generation.md` before choosing breadth mode or depth-gap mode.
2. Inspect the current Playwright specs, sidecars, and major workspace layout before treating the workspace as blank.
3. Choose breadth mode or depth-gap mode based on phase and user intent.
4. Summarize only a few candidates, including why each matters, likely auth expectation, current coverage posture, and whether it looks codegen-friendly or discovery-first.
5. When the user approves a candidate, continue directly into the Scenario workflow instead of returning to a generic chooser.
6. Use `.github/prompts/support/copirate-playwright/workflow.md` for follow-up question shapes.

## Guardrails

- Keep this route recommendation-first rather than turning it into a durable backlog artifact.
- Stop and ask the user before generating tests or metadata.

## References

- `.github/skills/copirate-playwright/references/phase-model.md`
- `.github/skills/copirate-playwright/references/scenario-generation.md`
- `.github/prompts/support/copirate-playwright/workflow.md`

## Success Criteria

1. Discovery is grounded in real existing coverage.
2. Recommendations are small, phase-aware, and immediately actionable.
3. Approved candidates can flow directly into Scenario work.
