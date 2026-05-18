---
name: copirate-cfml-legacy
description: Legacy CFML modernization guidance for CF10+ codebases, including phased modernization-roadmap design, reversible-slice planning, procedural cfinclude decomposition, repository extraction, monolith breakup, Strangler Fig migration planning, and CF10-compatible polyfills. Use when encountering spaghetti code, technical debt, or incremental legacy-system refactoring.
---
<!-- deployment_hash: 05ca9b38cd4c4db4c654b153d5c8c5190a781d775f5188e42b8bac56545d484c -->

<!-- Copirate Ownership: scaffold-once skill package. Copirate may upgrade this file while its deployment markers remain intact; user-modified copies are preserved during standard deployment. -->
<!-- Extension Version: 1.32.6 | Deployed: 2026-05-18T20:44:19.574Z | Baseline: ColdFusion 10 (2012) -->

# CFML Legacy Modernization

Provides legacy CFML modernization guidance for transforming procedural CF10+ codebases into maintainable object-oriented systems with phased modernization roadmaps, reversible slices, CF10-compatible polyfills, and a clear migration path toward newer runtimes.

## When To Use This Skill

Use `copirate-cfml-legacy` when the repo needs:

- refactoring of procedural CF10+ applications or tangled cfinclude chains
- extraction of inline queries into repository or data-access seams
- cleanup of god components, Application scope dependency containers, or session sprawl
- legacy debugging or diagnosis where procedural structure, scope sprawl, or runtime-compatibility limits appear to drive the failure
- compatibility-aware modernization that cannot assume CF11+ or CF2025 syntax yet
- Strangler-Fig-style migration planning instead of big-bang rewrites
- phased modernization-roadmap output or rollback-friendly slice planning before implementation

---

## Core Responsibilities

1. Identify the legacy pattern before changing architecture.
2. Keep modernization incremental, reversible, and compatibility-aware.
3. Extract data access and eliminate SQL injection as part of the same remediation slice.
4. Reduce dependency and scope sprawl without collapsing presentation-only includes into false positives.
5. Preserve a clear path from CF10-compatible replacements to future native runtime upgrades.
6. Produce phased modernization roadmaps with explicit slice boundaries and a visible handoff into `copirate-cfml`.

---

## Quick Standards To Keep At The Top Level

- **CF10 compatibility first:** avoid assuming CF11+ member functions, elvis syntax, or newer collection helpers.
- **Strangler Fig over big-bang rewrites:** replace seams incrementally and keep rollback-friendly steps.
- **Business-logic includes are the target:** presentation includes are acceptable; flow-control include chains are not.
- **Common framework polyfills matter:** use Common utilities such as `queryExecute()` support when modernization still has to run on CF10.
- **Shared debug route:** keep `/copirate-debug` as the entry point and supplement it with legacy compatibility and pattern references when the failure is driven by procedural structure or runtime limits.
- **Security is part of modernization:** inline-query extraction should remove SQL injection risk, not just move code around.

---

## Reference Files

- `references/workflow.md` - phased modernization workflow and decision points
- `references/roadmap.md` - roadmap output shape, reversible slice planning, and handoff trigger
- `references/compatibility.md` - CF10 constraints, polyfills, and migration-path rules
- `references/patterns.md` - legacy-pattern recognition and remediation priorities
- `examples/legacy-detection-patterns.md` - pattern identification and triage examples
- `examples/application-scope-di-refactoring.md` - Application scope DI cleanup examples
- `examples/data-access-modernization.md` - inline-query and repository modernization examples

---

## Boundary With `copirate-cfml`

- Use `copirate-cfml-legacy` for procedural legacy modernization and CF10-compatible remediation.
- Use `copirate-cfml` for modern CFML development, FW/1 implementation, and post-modernization standards work once the roadmap has selected the target steady-state implementation shape and the next step is authoring it.
- For active diagnosis, keep `/copirate-debug` as the orchestration route and use the shared `copirate-cfml` debugging reference plus this package's compatibility or pattern references when legacy constraints dominate.
- Keep the two skills distinct so modernization strategy does not override modern development posture.

## Package Maintenance

If this skill changes, keep the template and deployed copies aligned and preserve the support-file structure under both package roots.
