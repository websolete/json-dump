---
name: copirate-iterate-workflow
description: Structured multi-step execution workflow with self-assessment, evidence gates, and context-aware continuation. Use this skill behind the `/copirate-iterate` wrapper prompt.
---
<!-- deployment_hash: 0d7f75b65be0becff762d2181ed598b5246e32b2208f205eefcda8a8fc56b526 -->

<!-- Extension Version: 1.32.6 | Deployed: 2026-05-18T20:44:19.565Z -->
<!-- Copirate Ownership: scaffold-once skill package. Copirate may upgrade this file while its deployment markers remain intact; user-modified copies are preserved during standard deployment. -->

# Copirate Iterate Workflow

Provides the methodology behind `/copirate-iterate`: structured execution, objective-search-first context loading, evidence-based self-assessment, and staged continuation until the task is actually verified complete.

## Core Responsibilities

1. Start with objective search and memory retrieval for complex work.
2. Break work into bounded steps and keep progress visible.
3. Challenge completion claims before declaring success.
4. Prefer executable validation over assumption.
5. Preserve low-friction continuation in higher-autonomy runs.

## Reference Files

- `references/workflow.md` - phase model, self-assessment contract, completion gates
- `references/intelligence-scaffolding.md` - context gathering, factuality checks, and pattern-trigger behavior
- `examples/example-session.md` - representative iterate session shape
