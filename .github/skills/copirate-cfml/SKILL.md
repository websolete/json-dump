---
name: copirate-cfml
description: CFML/ColdFusion modernization guidance for CF2016+, including code generation and scaffolding for FW/1 patterns, debugging and diagnosis, CFScript syntax, CFDoc standards, security hardening, Common framework integration (getLib/getModule), performance optimization, and CF2025 migration. Use when doing greenfield CF development, scaffolding controllers or services, FW/1 application work, security audits, or modern CFML remediation.
---
<!-- deployment_hash: 0a91620a10c39158b3f958048fd0ab8c5d4eb7540560c09ec6f617da26984e86 -->

<!-- Copirate Ownership: scaffold-once skill package. Copirate may upgrade this file while its deployment markers remain intact; user-modified copies are preserved during standard deployment. -->
<!-- Extension Version: 1.32.6 | Deployed: 2026-05-18T20:44:19.575Z -->

# CFML/ColdFusion Development

Provides CFML/ColdFusion modernization guidance for CF2016+ development, first-stop code-generation and scaffolding guidance for FW/1 component shapes, shared debugging and diagnosis guidance, CFDoc standards, security hardening, Common framework reuse, performance optimization, and migration to modern CFScript syntax.

## When To Use This Skill

Use `copirate-cfml` for modern CFML and ColdFusion work when the repo needs:

- greenfield or actively modernized CF2016+ development
- code generation or scaffolding for FW/1 controllers, services, repositories, validators, or modern CFScript helpers
- FW/1 controller, service, repository, and DI/1 patterns
- CFDoc generation or validation guidance
- CF-specific debugging or diagnosis for routing, scope, datasource, compatibility, or Common integration failures
- OWASP-focused CFML security review for SQL injection, XSS, CSRF, uploads, or session handling
- Common framework discovery before creating new utilities or modules
- performance optimization or CF2025 readiness checks

---

## Core Responsibilities

1. Check the Common framework first so new work does not duplicate existing utilities or modules.
2. Keep business logic in CFScript and reserve tag-heavy CFML for presentation surfaces.
3. Apply FW/1 thin-controller, service-layer, and repository boundaries.
4. Treat code-generation and scaffolding requests as a first-stop invocation path for the package rather than an ad hoc side case.
5. Enforce CFDoc, security, and performance standards with summary-level checks at the top level.
6. Keep CF2025 migration risks visible when touching syntax, performance, or removed-function surfaces.
7. Surface the shared CF debugging lane through `/copirate-debug` and `references/debugging.md` without duplicating the prompt's generic methodology body.

---

## Quick Standards To Keep At The Top Level

- **CFScript first:** use CFScript for services, repositories, business logic, validation, and utility components.
- **Presentation-only tags:** reserve tag-first code for views, layouts, and rendering surfaces.
- **Common framework first:** use `mcp_cf_common_lib` before building new helpers, and prefer `getLib()` / `getModule()` usage where the framework already provides the capability.
- **Shared debug route:** keep `/copirate-debug` as the orchestration entry point and use `references/debugging.md` for CF-specific heuristics, tool order, and failure-lane checks.
- **Security always:** default to `cfqueryparam`, `encodeForHTML`, safe upload validation, session hardening, and CSRF protection.
- **FW/1 boundaries:** keep controllers thin and push orchestration into services and repositories.
- **Performance posture:** prefer query caching, collection-member functions where supported, and singleton-style shared services.

---

## Reference Files

- `references/workflow.md` - detailed CFML workflow, decision gates, delivery sequence, and generic generation boundary
- `references/code-generation.md` - first-stop generation checklist for scaffolding, artifact shapes, CFDoc, and performance checks
- `references/debugging.md` - CF-specific debugging heuristics, tool order, and failure-lane routing for `/copirate-debug`
- `references/standards.md` - CFScript, CFDoc, FW/1, OWASP, performance, and CF2025 standards
- `references/integrations.md` - Common framework, MCP surfaces, tool-selection guidance, and environment overlay pointer
- `examples/fw1-patterns.md` - FW/1 controller, service, repository, and DI/1 examples
- `examples/security-patterns.md` - SQL injection, XSS, CSRF, upload, and session patterns
- `examples/performance-patterns.md` - caching, member functions, parallel operations, and pooling examples
- **Environment overlay** (cross-workspace): `.copirate-shared/handoffs/HANDOFF-cfml-common-overlay-2026-05-10.md` — repo-specific Common library categories, accessor patterns, naming conventions, and integration failure modes for this environment

---

## Boundary With `copirate-cfml-legacy`

- Use `copirate-cfml` for modern greenfield or already-modernized CFML work.
- Use `copirate-cfml-legacy` for procedural CF10+ modernization, cfinclude-chain cleanup, and incremental legacy remediation.
- Keep `/copirate-debug` as the entry point for CF diagnosis, and supplement `references/debugging.md` with legacy compatibility or pattern references only when procedural structure or runtime limits dominate the failure.
- Keep the two skills distinct: this skill owns modern development posture, while the legacy skill owns transformation strategy.

## Package Maintenance

If this skill changes, keep the template and deployed copies aligned and preserve the support-file structure under both package roots.
