---
name: copirate-docs
description: Generate intelligent documentation from codebase analysis and patterns, with large examples and appendix material extracted to support docs.
---
<!-- deployment_hash: 43fbca03 -->
<!-- Extension Version: 1.32.6 -->
<!-- Deployed: 2026-05-18 -->
<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->

# Copirate Docs

> **Invocation**: `/copirate-docs` in Copilot chat

## Purpose

Generate accurate documentation from codebase analysis, accumulated knowledge, and architectural patterns. Use it for README files, architecture guides, API documentation, onboarding material, and bounded inline-code documentation.

## When To Use

- Starting or restructuring project documentation
- Bringing docs back in sync after significant changes
- Preparing onboarding or handoff material
- Producing API, architecture, or contribution documentation

## Primary Outputs

- `README.md`
- `ARCHITECTURE.md`
- `API.md`
- `CONTRIBUTING.md`
- Inline code documentation when the user requests code-level docs

## Documentation Workflow

1. Analyze workspace structure and existing docs first.
2. Retrieve relevant architectural knowledge and prior documentation patterns.
3. Generate only the documentation types the user asked for or the workflow requires.
4. Keep examples and diagrams grounded in actual codebase evidence.
5. Preserve clear traceability back to the analyzed code or workspace structure.

## Quality Gates

- Accuracy beats completeness theater.
- Version numbers and commands must match observable workspace data.
- Setup instructions should be realistic from a clean state.
- Architecture and API docs must stay aligned with actual code, not aspirational design.
- Documentation should target the stated audience.

## Tooling Guidance

- Use `copirate_knowledge` and `copirate_database` to gather structure and precedent.
- Use focused file reads and bounded analysis rather than broad speculative generation.
- Treat Mermaid diagrams as derived artifacts that must reflect real architecture.

## Output Contract

- State what documentation was generated or refreshed.
- Call out evidence sources and any remaining knowledge gaps.
- Keep follow-up suggestions concrete and limited.

Use `.github/prompts/support/copirate-docs/appendix.md` for the extended quality standards, example output shape, related prompts, tips, and documentation-pattern memory capture example.

## Success Criteria

1. Documentation is grounded in observable workspace evidence.
2. Generated docs match the requested scope and audience.
3. Examples, commands, and diagrams are traceable to real code or config.
4. The final summary is concise and operational.
