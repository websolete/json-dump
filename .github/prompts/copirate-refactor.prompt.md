---
name: copirate-refactor
description: Single-component quality improvement with code smell detection and SOLID principles
---
<!-- deployment_hash: 77f37ff9 -->
<!-- Extension Version: 1.32.6 -->
<!-- Deployed: 2026-05-18 -->
<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->


# Copirate Refactor - Code Quality Improvement

Invoke as: **/copirate-refactor**

## Purpose

Execute systematic refactoring of a single component or tightly related component group. Prioritize constraints in this order: keep functional output and externally observable side effects stable first, keep scope bounded second, then improve readability, maintainability, and testability.

## When to Use

- Improving readability of a single class, function, or module
- Reducing complexity in a specific component
- Eliminating duplication within a file or tightly related slice
- Applying SOLID principles to existing code
- Simplifying patterns or modernizing a bounded component

**Scope**: single file or tightly related component group (2-3 files max)

**Not for**: cross-cutting, multi-area changes; use `/copirate-iterate` for those

## Refactor Contract

- Analyze before editing so the chosen refactor matches the actual smell.
- Keep functional output and externally observable side effects stable while improving structure.
- Prefer one refactoring pattern at a time.
- Validate the touched slice after each substantive change.
- Stop and surface risk when coverage is too weak to refactor safely without characterization tests.

## Workflow

1. Measure the current slice: complexity, smell profile, coupling, and tests.
2. Choose the smallest refactoring pattern that addresses the dominant problem.
3. Make one bounded structural change at a time.
4. Validate the touched slice before continuing.
5. Summarize improvements, residual risks, and any follow-up opportunities.

## Support Docs

- `.github/prompts/support/copirate-refactor/workflow.md`
- `.github/prompts/support/copirate-refactor/reference.md`
- `.github/prompts/support/copirate-refactor/examples.md`

## Success Criteria

1. External behavior remains stable.
2. Complexity or duplication is measurably reduced.
3. Validation still passes for the touched slice.
4. The refactor improves maintainability without widening scope unnecessarily.
5. Template and deployed prompt copies stay aligned.
