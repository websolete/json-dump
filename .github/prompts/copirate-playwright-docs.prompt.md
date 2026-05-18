---
name: copirate-playwright-docs
description: Generate or refresh derived Playwright procedure documentation from executable specs and metadata sidecars.
---

<!-- deployment_hash: 76d13a4b -->
<!-- Extension Version: 1.32.6 -->
<!-- Deployed: 2026-05-18 -->
<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->

<!-- Copirate Extended Metadata (not part of VS Code schema) -->
<!-- category: workflow | language: any | difficulty: intermediate -->
<!-- estimated_time: 2-5 minutes -->
<!-- tags: playwright, docs, procedures -->

# Copirate Playwright Docs

> **Invocation**: `/copirate-playwright-docs` in Copilot chat

## Purpose

Use this workflow when the user wants generated or refreshed `.procedure.md` documentation derived from an executable Playwright scenario package.

## Workflow

1. Treat the spec as primary input and the metadata sidecar as the human-context companion.
2. Generate or refresh derived markdown only.
3. Default to placing `<scenario>.procedure.md` beside the scenario package unless the repo already has a stronger convention.
4. Preserve source traceability back to the spec and metadata paths.

## Guardrails

- Docs are derived artifacts, not a competing authoring surface.
- Keep the output colocated with the scenario package unless an explicit stronger convention exists.

## Success Criteria

1. Procedure docs are derived from executable truth.
2. Traceability back to spec and metadata is preserved.
3. Documentation refresh does not fork the scenario contract.
