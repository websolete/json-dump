---
name: copirate-playwright-project-strategy
description: Confirm committed scenario profiles, project naming, and reusable non-secret Playwright topology before deeper workflow generation.
---

<!-- deployment_hash: 1994e972 -->
<!-- Extension Version: 1.32.6 -->
<!-- Deployed: 2026-05-18 -->
<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->

<!-- Copirate Extended Metadata (not part of VS Code schema) -->
<!-- category: workflow | language: any | difficulty: intermediate -->
<!-- estimated_time: 3-6 minutes -->
<!-- tags: playwright, project-strategy, profiles, topology -->

# Copirate Playwright Project Strategy

> **Invocation**: `/copirate-playwright-project-strategy` in Copilot chat

## Purpose

Use this workflow when the workspace needs committed scenario profiles, project naming, or reusable non-secret topology decisions before deeper Playwright authoring.

## Workflow

1. Read `.github/skills/copirate-playwright/references/phase-model.md` and `.github/skills/copirate-playwright/references/project-strategy.md` before changing committed scenario topology.
2. Confirm whether `.playwright/` is the canonical package boundary or whether a stronger existing layout should be preserved.
3. Determine whether an existing committed scenario profile already fits the next slice; if not, resolve project/profile changes before deeper authoring.
4. Align reusable execution variants with named Playwright projects and committed scenario profiles.
5. End with a terse summary naming the confirmed project/profile direction and the next route.

## Guardrails

- Resolve project strategy before scenario, discovery, inventory, metadata, or import when committed scenario-profile coverage is still undefined.
- Do not put credentials, tokens, helper ids, or extension-storage dependencies into committed scenario files or `.playwright/.env`.

## References

- `.github/skills/copirate-playwright/references/phase-model.md`
- `.github/skills/copirate-playwright/references/project-strategy.md`

## Success Criteria

1. Project and scenario-profile direction is explicit.
2. Storage-surface boundaries stay non-overlapping.
3. The next workflow can reuse the confirmed project target without rediscovery.
