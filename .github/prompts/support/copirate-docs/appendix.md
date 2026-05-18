<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->
# Copirate Docs Appendix

## Documentation Quality Standards

- Accuracy: derive content from actual code and config, not speculation.
- Completeness: cover the requested scope and make setup/config actionable.
- Clarity: target the intended audience and define non-obvious terms.
- Maintainability: keep docs versioned with code and traceable to source evidence.

## Example Output Shape

Typical documentation bundle:

- `README.md`
- `CONTRIBUTING.md`
- `API.md`
- `ARCHITECTURE.md`

Recommended summary fields:

- files created or refreshed
- line counts or scope indicators when helpful
- major sections included
- evidence sources consulted
- remaining gaps or manual follow-up needs

## Related Prompts

- `/copirate-suite` for full analysis before architecture docs
- `/copirate-complexity` for documenting complex areas
- `/copirate-qa` for validating generated documentation quality

## Tips

- Generate docs early and refresh them often.
- Prefer real code examples from the workspace.
- Keep README focused and link outward for detail.
- Treat Mermaid diagrams as derived artifacts that must reflect the current architecture.

## Pattern Capture

When a documentation shape proves durable, store it as a documentation or pattern memory so later generations can reuse the structure consistently.
