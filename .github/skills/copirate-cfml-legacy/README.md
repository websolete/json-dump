# CFML Legacy Modernization Agent Skill

**Status:** Progressive-loading refactor in place
**Version:** 1.32.6
**Created:** January 15, 2026
**Last Updated:** 2026-05-18T20:44:19.558Z
**Deployed:** 2026-05-18T20:44:19.558Z

---

## Overview

The CFML Legacy Modernization Skill provides systematic guidance for refactoring legacy ColdFusion applications (CF10+) to modern architecture patterns. The top-level `SKILL.md` is now the discovery and workflow-entry surface; deeper remediation guidance lives in `references/`, and worked transformations stay in `examples/`.

## Package Map

- `SKILL.md` - activation surface, when-to-use guidance, modernization workflow skeleton, and support-file index
- `references/workflow.md` - phased modernization workflow and decision points
- `references/roadmap.md` - roadmap output shape, reversible slice planning, concern coupling, and handoff trigger
- `references/compatibility.md` - CF10 constraints, polyfills, and migration-path rules
- `references/patterns.md` - legacy-pattern recognition and remediation priorities
- `examples/` - detection, Application scope DI, and data-access modernization examples

## Scope Boundary

This package covers legacy modernization for CF10+ codebases. It owns legacy diagnosis, phased remediation planning, reversible slice design, and compatibility-aware sequencing. Modern CFML implementation guidance remains in `copirate-cfml` once the roadmap has selected the target steady-state implementation shape and the next step is authoring it.

## Task 2 Decision Record

- The package already carried substantive modernization method in `workflow`, `patterns`, `compatibility`, and the worked examples.
- The missing seam was reusable roadmap output guidance: phases, slice boundaries, rollback checkpoints, concern coupling, and the explicit handoff trigger into `copirate-cfml`.
- Task 2 therefore adds `references/roadmap.md` as a dedicated support surface instead of bloating `references/workflow.md` or relying on example-specific checklists as the primary contract.

## Deployment Notes

Keep the template and deployed package structures aligned. Any new reference or example file added to the template tree must also be present in the deployed package after the refactor or deployment pass.
