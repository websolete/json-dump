---
description: "Use when objective search, memory-first behavior, Copirate shortcut triggers, whisper handling, or shared execution posture is relevant in the Copirate workspace."
---

# Copirate Core Operating Rules

## Objective Search Gate

- Before complex work, run the objective-search gate rather than broad file scanning.
- Treat multi-file refactors, architecture changes, complex debugging, new features, and cross-domain work as objective-search cases.
- If repo-specific precedent is missing, stop and load it before broader implementation.
- If you catch yourself reading many files sequentially or making architecture decisions without pattern review, treat that as drift and recover.

## Work-Order Triage Gate

- During early methodology and routing evaluation, decide whether the task should be elevated into a work order before defaulting to open-ended execution.
- Treat a task as work-order-worthy when it needs phased rollout, cross-file coordination, explicit acceptance criteria, or a durable scope boundary that another engineer or agent may need to resume, review, or validate later.
- Treat isolated, low-risk, one-pass changes that can be completed safely without sequencing, handoff, or explicit verification as valid ad hoc work.
- Before creating a new work order, enumerate pending work orders and reuse, extend, or reconcile an overlapping canonical work order instead of creating a parallel plan.
- In interactive runs, present a bounded choice when the work-order threshold is met: resume the relevant work order, create or refine a work order through `/copirate-planner`, or continue ad hoc without a work order.
- In higher-autonomy runs, if the threshold is clearly met and no overlapping active work order exists, self-select the work-order creation path and report that elevation explicitly before continuing.

## Memory-First Protocol

- For workspace-specific requests, consult durable memory before deeper file analysis whenever the task depends on prior work, conventions, testing, debugging, or implementation posture.
- `MFP` means stop planned file work, retrieve the relevant memory context first, and only then continue.
- For workspace-specific requests that depend on prior work or conventions, always perform workspace-aware memory retrieval before broad searching.

## Trigger And Whisper Contracts

- The canonical Copirate vernacular dictionary lives in `.github/instructions/copirate-vernacular-dictionary.instructions.md`.
- Prefer the bang-prefixed canonical forms from that dictionary: `!patterns`, `!patternizer`, `!topic`, `!arrr`, `!rememberize`, and `!mfp`.
- Continue honoring the legacy bare or phrase aliases defined in the dictionary during ratification so existing prompts, whispers, and habits do not break.
- Keep non-shortcut operational routes such as `/copirate-qa`, the `PreCompact` hook, and `run copirate suite` separate from the shared shortcut trigger set.
- Whisper guidance stays active; if a whisper is pending before a long non-Copirate stretch, check it before continuing.

## Memory Tool Routing

- For any rememberize-style request or any time durable Copirate knowledge should be captured, prefer the Copirate `memory_rememberize` operation over the native VS Code `memory` tool. The native tool produces flat markdown notes that bypass the Copirate database, embeddings, importance/retirement matrix, telemetry lifecycle, and reconciliation surfaces.
- Use the native `memory` tool only for ephemeral session scratch notes or for repository-scoped facts under `/memories/repo/` that are explicitly outside Copirate-system knowledge and are not rememberize requests.
- If a request is rememberize-style and `copirate_memory` is not currently loaded, load it before honoring the request rather than substituting the native tool.
- When in doubt, route to `copirate_memory` (rememberize) and let the Copirate pipeline classify it.

## Execution Posture

- Keep user communication concise, direct, and action-oriented.
- Start significant work with the objective-search and memory-first posture, then build on existing evidence rather than generic assumptions.
- Capture durable knowledge after major milestones and avoid relying on file-only notes as the sole memory surface.
- For architecture understanding, prefer `copirate_code_search`, `vscode_listCodeUsages`, `copirate_knowledge`, `copirate_database`, `copirate_memory`, and `copirate_workspace` before broad repo scans.
- Working-doc placement rules now live in the working-docs-governance instruction rather than in this file.
