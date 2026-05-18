---
name: copirate-reconcile
description: 'Reconcile memory and scoped companion artifacts after major milestones or focused closeout work.'
---

<!-- deployment_hash: 809f275d -->
<!-- Extension Version: 1.32.6 -->
<!-- Deployed: 2026-05-18 -->
<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->

<!-- Copirate Extended Metadata (not part of VS Code schema) -->
<!-- category: memory | language: any | difficulty: advanced -->
<!-- estimated_time: 5-10 minutes -->
<!-- tags: memory, reconciliation, cleanup, milestone, topic, focus, knowledge-management -->

# Copirate Memory Reconciliation

> **Invocation**: `/copirate-reconcile` in Copilot chat
>
> **Role**: You are a memory hygiene specialist preventing memory drift after major milestones and recent topic/focus work, and catching scoped document or work-order artifacts that still describe an obsolete reality.

## Purpose

Reconcile memories after complex work so planning artifacts stop polluting retrieval, historical context stays available at the right importance, and a fresh authoritative memory reflects current reality. When the selected scope includes related active or recently completed work orders in the same workflow or project, also verify that scoped companion artifacts still match that current reality.

## When to Use

- Phase or sprint completion
- Version or release closeout
- Architectural milestone completion
- Major bug-fix stabilization
- Recent topic or focus-area closeout
- Active or recently completed work-order cluster closeout for the same workflow or project
- Focused cleanup of a noisy topic realm

Do not run this after minor edits or during work that is still in progress.

## Memory Layering Contract

Use Copirate memory as the comprehensive memory system for workspace and repo-aware retrieval. Copilot native persisted memory is a simpler supplementary layer. When both are available, consult Copirate memory consistently and do not substitute native memory for Copirate memory.

## Scope Selection

These selection rules stay inline as candidate instruction material:
- Allow reconciliation by full milestone, recent topic or focus, topic realm, temporal window, a related active/recent work-order cluster, or a hybrid of realm plus time window.
- Discover candidate realms and related active or recently completed work orders from work completed in the last 30 days before asking the user to choose a narrow scope.
- When work-order context is selected, inventory scoped companion artifacts that may encode the prior reality, such as work-order docs, decision notes, handoffs, validation reports, and working analysis docs.
- Constrain retrieval and action decisions to the approved scope rather than sweeping unrelated memory clusters or unrelated artifacts.

## Decision Criteria

These rules also stay inline:
- **Delete** when a planning note, gap analysis, interim solution, or outdated architectural follow-up is now obsolete or contradictory.
- **Downgrade** when historical context still matters but should no longer dominate retrieval.
- **Keep** when the memory accurately reflects the current implementation, user preferences, or durable design guidance.
- **Update artifact** when a scoped work order or companion document still presents a superseded state as current and the new state is already verified.
- **Keep artifact historical** when a document should remain as an audit trail; add a bounded note or follow-on pointer instead of rewriting history.

## Workflow

1. Define the reconciliation scope: identify the milestone, topic, focus area, or related work-order cluster, then discover candidate realms and related active or recently completed work orders from the last 30 days so the user can choose a narrow scope.
2. Inventory and compare: gather relevant memories and scoped companion artifacts, then compare their claims against current code and observable reality.
3. Recommend actions: propose delete, downgrade, or keep actions for memories and update, keep-historical, or follow-on actions for scoped artifacts, with rationale.
4. Get explicit user approval before destructive or importance-changing actions, and before materially changing scoped work-order or document artifacts.
5. Execute approved actions, create a fresh authoritative memory for the current state, ensure scoped artifacts reflect the new reality or are explicitly marked historical, and produce a reconciliation report when the cleanup is large enough to justify one.

## Approval Contract

- Always present the scoped recommendation summary before deletion or downgrade.
- Keep the rationale specific: why the memory is obsolete, historical, or still authoritative, and why any scoped artifact does or does not need an update.
- Finish by stating what authoritative memory replaced the noisy state and which scoped artifacts were updated, left historical, or deferred.

## Support Docs

- `.github/prompts/support/copirate-reconcile/reference.md`
- `.github/prompts/support/copirate-reconcile/examples.md`

## Success Criteria

1. Obsolete planning memories no longer dominate retrieval.
2. Historical context is preserved at an appropriate importance.
3. A current authoritative memory exists for the reconciled scope.
4. Related active or recently completed work orders and scoped companion artifacts are considered when they materially affect the reconciled reality.
5. Scope selection, delete/downgrade/keep rules, artifact-update rules, and approval gates remain explicit.
5. Template and deployed reconcile prompts stay aligned.
