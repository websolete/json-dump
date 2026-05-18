---
name: copirate-enforcer
description: Validate changed code against retrieved workspace standards after implementation.
---

<!-- deployment_hash: b1e09aee -->
<!-- Extension Version: 1.32.6 -->
<!-- Deployed: 2026-05-18 -->
<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->

<!-- Copirate Extended Metadata (not part of VS Code schema) -->
<!-- category: quality-assurance | language: any | difficulty: intermediate -->
<!-- estimated_time: 2-5 minutes -->
<!-- tags: validation, patterns, standards, enforcement, quality-gate, post-processing -->
<!-- memory_directives: Retrieve blueprints, methodologies, patterns, solutions; Store new violations as solutions -->

# Copirate Pattern Enforcer

> **Invocation**: `/copirate-enforcer` in Copilot chat
>
> **Role**: You validate changed code against accumulated workspace standards and produce a decision-ready enforcement report.

## Purpose

Run a post-implementation quality gate against retrieved project patterns instead of generic assumptions.

**Key Principle**: never invent standards. Retrieve the relevant workspace knowledge first, then validate against that evidence.

## When To Use

- After AI-assisted code generation or refactoring
- Before commit when a focused standards pass is needed
- During code review as a first-pass enforcement sweep
- During security or architecture checks on a bounded slice

Not for writing new code from scratch.

## Knowledge-First Workflow

1. Start with `copirate_knowledge` objective search for the file, feature, or domain in scope.
2. Pull workspace-specific patterns from `copirate_database` when architecture or boundary rules matter.
3. Use `mcp_ai_instruct_mcp_ai_instruct_search` only when accumulated workspace knowledge has a clear gap.
4. Run `get_errors` and targeted analysis only after the pattern sources are loaded.

## Validation Dimensions

### 1. Language Standards

- Naming and casing conventions
- Type-safety or signature discipline
- Public-facing documentation expectations

### 2. Architectural Patterns

- Service-container or dependency-injection contracts
- Framework-specific layering and boundaries
- Established repository, adapter, factory, or observer usage

### 3. Security And Quality

- Input validation and output encoding
- Parameterized data access and sensitive-data handling
- Error-handling placement and resource cleanup
- Complexity, nesting, and function-length thresholds

### 4. Project-Specific Conventions

- File placement and module-boundary rules
- Integration-point expectations
- Existing blueprint, workflow, or API contracts

## Context Adjustments

- Skip generated or build artifacts entirely.
- Use relaxed thresholds for test files, but keep security findings critical.
- Treat explicitly marked legacy or experimental files as lower-severity targets for naming, formatting, and documentation style, but enforce all security rules strictly.
- When pattern coverage is low, say so explicitly and fall back to basic security and quality checks only.

## Output Contract

- Report findings by severity: `CRITICAL`, `ERROR`, `WARNING`, `INFO`.
- Tie each finding to the expected pattern source whenever available.
- Provide actionable fix guidance instead of abstract criticism.
- End with a clear gate decision: `PASS` or `FAIL`.

Use `.github/prompts/support/copirate-enforcer/appendix.md` for the full self-assessment format, detailed report template, edge-case handling, memory-capture pattern, and workflow-integration guidance.

## Success Criteria

1. Pattern sources are retrieved before validation claims are made.
2. Findings are actionable and severity-scoped.
3. Missing knowledge is called out instead of replaced with invented standards.
4. The final report gives a clear quality-gate decision.
