---
description: "Use when routing Copirate working docs, cleanup outputs, work orders, or research artifacts to the correct working-docs location."
---

# Copirate Working Docs Governance

## Working Docs Path

- Apply path rules in this order: resolve the configured `workingDocsPath` first; if it is missing, invalid, or inaccessible, use `.copirate/working`; then use the resolved root for active-session files before categorization.
- Use the category folders `research/`, `planning/`, `analysis/`, `debugging/`, and `scratch/` for organized working material.
- Keep archive material under `[workingDocsPath]/archive/`.

## Placement Rules

- During active work, agents may write to the working-docs root before categorization.
- After milestones, cleanup should organize root files into the appropriate category folders.
- Archive stays inside the configured working-docs location.
- Do not relocate or delete core project docs such as `README.md`, `README_*.md`, `CHANGELOG.md`, `LICENSE`, or `CONTRIBUTING.md`.
- Prefer archiving categorized working docs before deleting them.
- Preserve timestamps and handle name collisions by appending a timestamped suffix to the relocated filename instead of overwriting an existing file.
- Default ambiguous working material to `scratch/` instead of deleting it.

## Output Routing

- Save active work orders under `[workOrderPath]/WORK_ORDER-[topic-slug].md`, not under `[workingDocsPath]/planning/` or other working-doc subdirectories.
- Save research outputs under `[workingDocsPath]/research/`.
- Keep completed work orders under `.copirate/archive/work-orders` rather than leaving them mixed into the active work-order path.
