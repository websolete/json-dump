---
name: copirate-playwright-entry-point-inventory
description: Build a durable Playwright entry-point inventory for later work-order slicing or coverage batches.
---

<!-- deployment_hash: 7e8e981a -->
<!-- Extension Version: 1.32.6 -->
<!-- Deployed: 2026-05-18 -->
<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->

<!-- Copirate Extended Metadata (not part of VS Code schema) -->
<!-- category: workflow | language: any | difficulty: intermediate -->
<!-- estimated_time: 4-10 minutes -->
<!-- tags: playwright, inventory, planning, coverage -->

# Copirate Playwright Entry Point Inventory

> **Invocation**: `/copirate-playwright-entry-point-inventory` in Copilot chat

## Purpose

Use this workflow when the user wants a durable markdown inventory of likely Playwright coverage candidates rather than a one-off recommendation list.

## Workflow

1. Inspect existing specs and metadata so the inventory reflects current coverage rather than assuming every candidate is new.
2. Discover plausible routes, modules, forms, pages, or workflows.
3. Group candidates into a durable planning artifact suitable for later work-order slicing or coverage batches.
4. For each candidate, include concise decision-oriented fields: route or module, why it matters, auth expectation if obvious, coverage status, and recommended next step.

## Guardrails

- Create an iterable planning artifact rather than a one-off recommendation list.
- Do not auto-generate scenarios from inventory entries unless the user explicitly asks.

## Success Criteria

1. The inventory is durable and coverage-aware.
2. Entries are concise and grounded in observable workspace structure.
3. Later scenario work can proceed from the inventory without broad rediscovery.
