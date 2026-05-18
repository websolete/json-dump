---
name: copirate-demoji
description: Remove decorative emojis from agent-facing code and docs while preserving legitimate user-facing or fixture content.
---
<!-- deployment_hash: 0e4048e9 -->
<!-- Extension Version: 1.32.6 -->
<!-- Deployed: 2026-05-18 -->
<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->

# Copirate Demoji

> **Invocation**: `/copirate-demoji` in Copilot chat

## Purpose

Reduce emoji noise and redundant decoration in code, agent-facing content, and documentation so text is easier to scan and less error-prone.

Apply rules in this order: classify content type first, apply safety rules second, then clean up logging and output style.

## Core Distinction

### Agent-Facing Content

- Logs and internal output
- Source-code comments and implementation notes
- Prompts, instructions, and agent-facing documentation
- Data structures and internal return values

Default to no emojis.

### User-Facing Content

- Notifications and dialogs
- UI labels and menus
- User documentation and guides
- Public-facing error messages

Use emojis only when they convey critical context or improve readability, and the user explicitly wants them preserved.

## Logging Policy

- Remove decorative emojis from routine logging.
- Remove redundant severity prefixes when the logger already communicates severity.
- Preserve only rare, major-event markers when they materially help user-facing output.
- Prefer concise natural language over bracketed replacements.

## Workflow

1. Confirm scope: current file, directory, glob, workspace, or custom selection.
2. Classify the target material as agent-facing, user-facing, or mixed.
3. Show a concise preview before bulk changes.
4. Apply the cleanup using workspace tools, not external scripts.
5. Summarize modified files, removed emoji count, and next checks.

## Safety Rules

- Never touch generated artifacts, dependency folders, binary files, or git metadata.
- Skip strings where emoji are part of serialized data, database entries, snapshots, or predefined constants unless the user explicitly wants them normalized.
- Ask before mass-changing public-facing documentation or UX text.
- Preserve URLs, escaped sequences, and deliberate regex or fixture content.

## Output Contract

- Report what changed in plain text.
- Keep replacement summaries concise.
- Recommend a quick diff review and targeted validation when files were modified.

Use `.github/prompts/support/copirate-demoji/appendix.md` for detailed preview examples, file-type handling rules, bulk-replacement workflow, migration guidance, and style best practices.

## Success Criteria

1. Agent-facing noise is removed without damaging functional data.
2. User-facing content is only changed with the right preservation posture.
3. Cleanup uses workspace-native tools and remains reviewable.
4. The output summary is concise and actionable.
