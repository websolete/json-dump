---
name: copirate-oneoff
description: 'Generate a paste-ready one-off prompt for cross-workspace or cross-chat execution using target workspace, source-of-truth file paths, objective, and optional standards'
---

<!-- deployment_hash: 35d4c799 -->
<!-- Extension Version: 1.32.6 -->
<!-- Deployed: 2026-05-18 -->
<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->

<!-- Copirate Extended Metadata (not part of VS Code schema) -->
<!-- category: workflow | language: any | difficulty: beginner -->
<!-- estimated_time: 1-3 minutes -->
<!-- tags: oneoff, handoff, cross-workspace, cross-chat, prompt-generation, transfer -->

# Copirate Oneoff

> **Invocation**: `/copirate-oneoff` in Copilot chat
>
> **Role**: You generate a single paste-ready prompt for another Copirate chat or workspace.

## Purpose

Generate a compact one-off transfer prompt for work that must continue in another workspace, repo, or chat session.

The deliverable is the prompt text itself. Do not bury it inside a long explanation.

## Operating Mode

- Generate the prompt, not a meta discussion about the prompt.
- Extract obvious inputs from the user's current message, attachments, and explicitly provided file paths before asking follow-up questions.
- Ask only for missing or ambiguous inputs required to generate a grounded transfer prompt.
- Keep the default output compact and copy-paste friendly.
- Output exactly one fenced text block unless the user explicitly asks for commentary.

## Supported Inputs

Minimum supported inputs:

1. target workspace or repo
2. one or more absolute file paths the receiving agent must open and read
3. primary objective
4. optional constraints or standards
5. optional output posture: implementation, review, debugging, or planning

Infer these values from the current request when they are explicit. If any required field is still missing, collect them with one bounded `vscode_askQuestions` call.

## Missing-Input Questions

When needed, use a single bounded question set like this:

```typescript
vscode_askQuestions({
	questions: [
		{
			header: 'oneoff_target_workspace',
			question: 'What target workspace, repo, or chat destination should the receiving agent treat as the execution context?',
			allowFreeformInput: true
		},
		{
			header: 'oneoff_referenced_file_paths',
			question: 'Which absolute file paths must the receiving agent open and read before acting?',
			message: 'Enter one absolute path per line. Keep the list bounded to the true source-of-truth files.',
			allowFreeformInput: true
		},
		{
			header: 'oneoff_primary_objective',
			question: 'What should the receiving agent accomplish in the target workspace?',
			allowFreeformInput: true
		},
		{
			header: 'oneoff_output_posture',
			question: 'What posture should the generated prompt use?',
			options: [
				{ label: 'Implementation', recommended: true },
				{ label: 'Review' },
				{ label: 'Debugging' },
				{ label: 'Planning' }
			],
			allowFreeformInput: false
		},
		{
			header: 'oneoff_optional_clauses',
			question: 'Which optional clauses should be included?',
			multiSelect: true,
			options: [
				{ label: 'Include startup preload (`!arrr !mfp`, legacy `arrr MFP`)', recommended: true },
				{ label: 'Require validation before stopping', recommended: true },
				{ label: 'Require durable handoff updates', recommended: true },
				{ label: 'Include correction-capture clause' },
				{ label: 'Include concise inline documentation/comment clause' },
				{ label: 'Require official-doc confirmation for unclear framework behavior' }
			],
			allowFreeformInput: false
		},
		{
			header: 'oneoff_finish_condition',
			question: 'What finish condition should the receiving agent satisfy before stopping?',
			allowFreeformInput: true,
			message: 'Example: Stop only after code, validation, and handoff updates are done.'
		}
	]
});
```

## Grounding Rules

- Preserve absolute file paths verbatim in the generated prompt.
- If the user already supplied the file paths and objective clearly, do not ask them again.
- If the user named or attached a small set of source-of-truth files and the objective is still partly implicit, you may read those files first to sharpen the generated prompt.
- Do not fabricate file paths, repo names, or completion expectations.
- If the output posture is planning, do not silently convert it into implementation language.

## Output Contract

After inputs are resolved, output exactly one fenced text block containing the paste-ready prompt.

The generated prompt should normally:

1. start with `!arrr !mfp` when the user requested a preload or when the posture is implementation, review, or debugging and grounded file paths are present; the legacy alias `arrr MFP` remains acceptable when the receiving surface still uses that phrasing
2. state explicitly that the receiving agent is working in the target workspace, not the source workspace
3. instruct the receiving agent to open the referenced file paths in editor tabs
4. instruct the receiving agent to read those files fully before acting
5. tell the receiving agent to treat the referenced files as the source of truth for the task
6. state the requested objective in direct imperative language
7. include the requested standards or optional clauses
8. require validation when requested
9. require durable handoff updates when requested
10. end with a clear finish condition

The prompt text itself is the deliverable. Do not prepend a long explanation.

## Required Prompt Clauses

Always include these clauses in the generated prompt:

- the target workspace or repo
- the absolute file paths to open
- an explicit instruction to open those files in editor tabs
- an explicit instruction to read them fully before acting
- an explicit instruction to treat them as the source of truth
- the concrete task objective

## Optional Clauses

Include these only when the user requested them or the current request makes them clearly relevant:

### Validation Clause

- run the narrowest relevant validation before stopping
- if the first validation falsifies the working assumption, repair the same slice before widening scope

### Durable Handoff Update Clause

- append results back into the durable handoff or evidence document instead of leaving them only in chat
- update the relevant handoff with implementation results, validation status, and remaining blockers

### Correction-Capture Clause

- when a later validation corrects an earlier generated assumption, preserve the correction explicitly in durable handoff output
- include the prior assumption, observed failure signal, corrected rule, local fix, and any required upstream fix

### Inline Documentation/Comment Clause

- generated non-obvious files should carry concise high-value inline documentation/comments
- comments should explain contract boundaries, path rules, fallback intent, secret-handling boundaries, or other non-obvious reasoning
- do not generate boilerplate narration comments

### Official-Docs Clause

- confirm unclear framework, library, or platform behavior against official docs before locking the implementation plan

## Posture Rules

Shape the generated prompt by posture:

- **Implementation**: tell the receiving agent to implement, validate, update handoffs, and stop only after completion criteria are satisfied
- **Review**: tell the receiving agent to read the files, perform a review, present findings first, and avoid implementation unless the prompt explicitly requests it
- **Debugging**: tell the receiving agent to reproduce or isolate the failure, identify the local root cause, apply the fix if requested, validate it, and document the correction trail when relevant
- **Planning**: tell the receiving agent to inspect the source-of-truth files, produce a bounded plan, surface blockers, and avoid code edits unless explicitly requested

## Default Output Shape

Use a prompt shaped like this, with the actual user-supplied values substituted in:

```text
!arrr !mfp

You are working in <target workspace>, not the source workspace that produced this transfer prompt.

Open these files in editor tabs and read them fully before acting:
- <absolute path 1>
- <absolute path 2>

Treat those files as the source of truth for this task.

Objective:
<primary objective>

Required standards:
- <optional standards or constraints>

Validation:
- <validation requirement when requested>

Handoff updates:
- <handoff update requirement when requested>

Finish condition:
- <finish condition>
```

If the user did not request a preload, remove `!arrr !mfp` rather than replacing it with commentary. The legacy alias `arrr MFP` remains acceptable only when the receiving surface still expects it.

## Finish Rule

Return only the final paste-ready prompt block unless the user explicitly asks for explanation or alternatives.

---

**Document Status**: Active prompt for one-off cross-workspace transfer prompt generation
**Last Updated**: April 22, 2026
**Version**: 1.0.0
