---
name: copirate-playwright-metadata
description: Create or update streamlined Playwright scenario metadata sidecars from executable truth.
---

<!-- deployment_hash: 18613369 -->
<!-- Extension Version: 1.32.6 -->
<!-- Deployed: 2026-05-18 -->
<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->

<!-- Copirate Extended Metadata (not part of VS Code schema) -->
<!-- category: workflow | language: any | difficulty: intermediate -->
<!-- estimated_time: 2-5 minutes -->
<!-- tags: playwright, metadata, sidecar -->

# Copirate Playwright Metadata

> **Invocation**: `/copirate-playwright-metadata` in Copilot chat

## Purpose

Use this workflow when an executable Playwright spec already exists and the user wants a streamlined sibling `.metadata.json` sidecar.

## Workflow

1. Read the executable spec first.
2. Infer metadata from executable truth rather than inventing a second authoring surface.
3. Create or update the sibling sidecar beside the spec.
4. Keep first-pass metadata intentionally small and mark it as draft until executable truth is validated.
5. Promote metadata to `derived` only after the same scenario has passed a minimal successful run or reachability check.

## Guardrails

- Do not use this route before an executable spec exists.
- Never embed usernames, passwords, tokens, cookies, or session contents in metadata.
- Ask for missing business context instead of inventing new metadata fields.

## Success Criteria

1. Metadata is derived from the spec, not guessed.
2. Sidecar status reflects actual execution maturity.
3. The metadata contract stays intentionally small.
