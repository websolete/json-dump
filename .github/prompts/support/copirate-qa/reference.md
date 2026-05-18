<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->
# Copirate QA Support - Reference

## Review Areas

- Implementation quality: structure, types, naming, complexity, duplication
- Validation: focused tests, compile errors, lint or type issues
- Architecture: patterns, dependency registration, integration seams
- Security: validation, secrets handling, injection and encoding risks
- Documentation: public API docs, comments, changelog or README updates when relevant

## Hygiene Passes

- Run demoji follow-up when agent-facing content includes emoji noise.
- Run pattern enforcement follow-up when the touched slice risks drifting from project conventions.
- Keep these as review-adjacent checks, not excuses to widen the QA scope.

## Reporting Rules

- Findings first, then open questions or residual risks.
- Include validation evidence whenever possible.
- If no issues are found, say so explicitly.
