---
name: copirate-iterate
description: 'Execute a complex task with structured self-assessment until verified complete'
---

<!-- deployment_hash: e9e1482a -->
<!-- Extension Version: 1.32.6 -->
<!-- Deployed: 2026-05-18 -->
<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->

<!-- Copirate Extended Metadata (not part of VS Code schema) -->
<!-- category: workflow | language: any | difficulty: intermediate -->
<!-- estimated_time: varies by task complexity -->
<!-- tags: iteration, autonomous, self-assessment, completion-tracking, context-gathering, intelligence -->
<!-- memory_directives: Objective search FIRST, mid-process pattern checks, cross-cutting concern discovery, store learnings at completion -->

# Copirate Iterate - Self-Assessing Task Execution

> **Invocation**: `/copirate-iterate [task description]` in Copilot chat
>
> **Purpose**: Execute complex multi-step tasks with structured progress tracking and self-assessment. Interactive runs can be user-paced with `c` or `continue`; higher-autonomy runs should self-continue until completion is verified unless a safety-critical blocker appears, such as risk of data loss, destructive irreversible change, credential exposure, or system failure, or a semantically decisive blocker appears, such as ambiguous task intent or a scope boundary that changes the meaning of the next step.

## Wrapper Contract

This prompt preserves the `/copirate-iterate` slash command while routing the heavy methodology into the `copirate-iterate-workflow` skill package.

Apply the wrapper sections in this order: Wrapper Contract first, Memory Layering Rule second, Pattern Triggers And Whisper Parity third, and Skill References last.

- Use the skill for the detailed self-assessment schema, execution phases, circuit breakers, knowledge consultation matrix, and example session.
- Keep interactive pacing available through `c`, `continue`, `complete`, and `abort`.
- In higher-autonomy runs, do not stop for routine continuation when the next step is still within scope and low-risk; stop only for the safety-critical or semantically decisive blockers defined above.

## Memory Layering Rule

Use Copirate memory as the comprehensive memory system for workspace and repo-aware retrieval. Copilot native persisted memory is a simpler supplementary layer. When both are available, consult Copirate memory consistently and do not substitute native memory for Copirate memory.

## Pattern Triggers And Whisper Parity

- The canonical Copirate vernacular dictionary lives in `.github/instructions/copirate-vernacular-dictionary.instructions.md`.
- Keep the shared `!patterns`, `!patternizer`, and `!topic` base meanings from that dictionary while using this wrapper prompt.
- Honor direct-user and whisper-delivered triggers the same way; whisper delivery must not weaken `!patterns`, `!patternizer`, or related guidance.

## Skill References

- `.github/skills/copirate-iterate-workflow/SKILL.md`
- `.github/skills/copirate-iterate-workflow/references/workflow.md`
- `.github/skills/copirate-iterate-workflow/references/intelligence-scaffolding.md`
- `.github/skills/copirate-iterate-workflow/examples/example-session.md`

## Success Criteria

1. `/copirate-iterate` remains the stable entry point.
2. The wrapper stays concise and does not re-inline the heavy methodology body.
3. Memory layering, pattern triggers, and whisper parity remain explicit.
4. Interactive pacing and higher-autonomy continuation rules remain clear.
