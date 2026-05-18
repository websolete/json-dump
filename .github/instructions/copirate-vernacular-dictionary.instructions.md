---
description: "Use when Copirate shortcut triggers, canonical bang-prefixed forms, or legacy trigger aliases are relevant in the Copirate workspace."
---

# Copirate Vernacular Dictionary

## Purpose

- Apply rules in this order: use the canonical definitions in this file first, preserve the listed legacy aliases until they are explicitly retired, then allow domain-specific overlays only when they extend rather than redefine the canonical mapping.
- This file is the canonical dictionary for the shared Copirate shortcut triggers.
- Prefer the bang-prefixed canonical forms below in new docs, examples, prompts, whispers, and user guidance.
- Preserve the listed legacy aliases until the vernacular ratification pass explicitly retires and communicates them so older habits, prompts, and handoffs continue to work.
- Non-shortcut operational routes such as `qa pass`, `pre compact`, and `run copirate suite` may still exist as prompt, hook, or tool-entry surfaces, but they are not part of the canonical shortcut set.

## Parsing Posture

- Treat a trigger as a standalone token or short phrase in user or whisper text, not as arbitrary punctuation inside code, logs, or prose.
- Multi-word canonical triggers use kebab-case after `!`.
- Slash prompts such as `/copirate-topic`, `/copirate-qa`, and `/copirate-suite` remain separate UI surfaces; they are not replacements for this dictionary.
- If a trigger is not defined in this dictionary, treat it as unrecognized, do not invent an action target, and ask for clarification or suggest a listed valid trigger.

## Canonical Trigger Set

### `!patterns`

- Legacy aliases: `!patterns`
- Action target: behavior `copirate-patterns-preload`
- Maps to: retrieve prior patterns and precedent before substantive work, then report support strength honestly.

### `!patternizer`

- Legacy aliases: `!patternizer`
- Action target: behavior `copirate-patternizer-capture`
- Maps to: store a newly verified workflow as durable reusable guidance after validation.

### `!topic`

- Legacy aliases: `!topic`
- Action target: prompt `/copirate-topic`
- Maps to: use bounded topic construction or refresh only when evidence is concrete enough.
- Related UI surface: `/copirate-topic` when the direct-construction workflow is needed.

### `!arrr`

- Legacy aliases: `arrr`, `rediscover copirate`
- Action target: behavior `copirate-arrr-preload`
- Maps to: confirm Copirate tool visibility, refresh workspace context, preload relevant memory context, then continue.

### `!rememberize`

- Legacy aliases: `rememberize`, `remember this`, `memorialize this`
- Action target: tool `copirate_memory:memory_rememberize`
- Maps to: invoke the Copirate `memory_rememberize` workflow rather than native VS Code memory storage.

### `!mfp`

- Legacy aliases: `MFP`, `Memory-First Protocol`, `arrr MFP`
- Action target: behavior `memory-first-protocol`
- Maps to: stop planned file work, retrieve relevant memory context first, and only then continue.

## Ratification Rules

- New documentation, prompts, examples, and hooks should prefer the canonical bang-prefixed forms.
- Existing bare forms remain valid aliases until the vernacular ratification pass explicitly retires them.
- New shortcut triggers should be added here with both an action target and a base action mapping so runtime consumers can inherit them from one place.
- Domain-specific overlays may add extra behavior to a shared trigger, but they should not redefine the canonical trigger name or its base action mapping.

## High-Risk Drift Surfaces

- `.github/instructions/copirate-core-operating-rules.instructions.md`
- `.github/agents/copirate.agent.md`
- `.github/agents/cfcopirate.agent.md`
- Domain overlays such as `.github/skills/copirate-cfml/references/workflow.md` and `.github/skills/copirate-iterate-workflow/references/intelligence-scaffolding.md`
