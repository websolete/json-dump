# CFML/ColdFusion Agent Skill

**Status:** Progressive-loading refactor in place
**Version:** 1.32.6
**Created:** January 9, 2026
**Last Updated:** 2026-05-18T20:44:19.561Z
**Deployed:** 2026-05-18T20:44:19.561Z

---

## Overview

The CFML Agent Skill provides on-demand, context-aware guidance for modern ColdFusion development. The top-level `SKILL.md` is now the discovery and workflow-entry surface for modern CFML implementation, CF debugging and diagnosis, and code-generation or scaffolding requests; deeper standards, debugging guidance, and integrations live in `references/`, and worked code stays in `examples/`.

## Package Map

- `SKILL.md` - activation surface, when-to-use guidance, workflow skeleton, and support-file index
- `references/workflow.md` - detailed CFML workflow and decision gates
- `references/code-generation.md` - first-stop generation checklist for Common-first discovery, artifact shapes, CFDoc, and performance posture
- `references/debugging.md` - CF-specific debugging heuristics, tool order, and failure-lane routing for `/copirate-debug`
- `references/standards.md` - CFScript, CFDoc, FW/1, security, performance, and CF2025 standards
- `references/integrations.md` - Common framework and MCP integration guidance
- `examples/` - FW/1, security, and performance examples with code blocks

## Scope Boundary

This package covers modern CFML development for CF2016+ codebases. It also owns the shared CF debugging reference lane used by `/copirate-debug`, while legacy modernization and CF10-compatible refactoring remain in `copirate-cfml-legacy`.

## Task 1 Decision Record

- Audit result: the current gap is primarily package and discovery wording, not the adjacent CF routing surface.
- Current package boundary: expanding `copirate-cfml` is sufficient for first-stop code-generation guidance; a separate top-level skill is not required in this slice.
- Generic boundary: this package may describe repeatable artifact shapes such as thin FW/1 controllers, services, repositories, validators, CFDoc defaults, and generation-time performance checks.
- Repo-specific boundary: Common inventories, application-owned accessor names, and environment-local module choices must stay outside this package and be retrieved from Common, workspace evidence, or environment-specific overlays.
- Validation proxy: improved discovery wording, top-level routing to `references/code-generation.md`, and deployment assertions for that support file are the strongest local proxy for improved invocation behavior in this repo.

## Task 3 Decision Record

- The shared debug route belongs in `copirate-cfml/references/debugging.md`, with `/copirate-debug` kept as the orchestration entry point.
- Legacy compatibility and pattern references remain supplemental depth for debugging rather than a separate debug surface in this slice.
- Validation proxy: prompt routing, top-level surfacing, and deployment assertions for `references/debugging.md` are the strongest local proxy for improved discoverability in this repo.

## Deployment Notes

Keep the template and deployed package structures aligned. Any new reference or example file added to the template tree must also be present in the deployed package after the refactor or deployment pass.
