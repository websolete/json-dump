---
description: "Use when thin Copirate workflow prompts need shared routing, interactive user input collection via vscode/askQuestions, bounded choices, concise status updates, or delegated prompt loading rules."
---

# Copirate Prompt Conventions

## Operational Flow Rules

Apply these rules in order: choose the bounded interaction path first, keep updates concise and next-action-focused second, stay inside the selected workflow third, and prefer direct workspace evidence over metadata-only flows last.

- Declare the tool as `vscode/askQuestions` in prompt or agent metadata whenever the workflow may need user input.
- When the agent needs input from the user to continue, use `vscode_askQuestions(...)` instead of asking in freeform prose. Use explicit options when a fixed option set exists, and allow freeform widget input when the needed answer is open-ended.
- Keep status updates to one sentence focused on the next concrete action.
- Do not narrate internal reasoning or chain-of-thought.
- Once a thin router selects a bounded workflow, stay inside that workflow until the user changes scope.
- When a router delegates to an extracted workflow prompt, load that prompt file and follow its contract instead of re-summarizing it from memory.
- Prefer executable truth and direct workspace evidence before metadata-only or documentation-only flows.

## Extraction Rules

- Keep slash-command parent prompts focused on identity, readiness, routing, and phase control.
- Move large reference blocks, examples, and checklists into support docs or skill references.
- Move reusable domain contracts into skills when they are broader than one prompt invocation.
- Keep support-doc and extracted-workflow references explicit so moved content stays traceable.
