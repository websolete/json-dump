<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->
# Copirate Enforcer Appendix

## Self-Assessment Format

After validation, provide a structured self-assessment.

```markdown
# SELF-ASSESSMENT → [CONTINUE|COMPLETE|BLOCKED]

- **Confidence:** X%
- **Quality:** Y/10
- **Evidence:** X/Y verified
- **Current Focus:** [one-line description of validation phase]

## Progress Summary

| Status | Count | Details |
|--------|-------|---------|
| Completed | X items | [files validated, patterns checked] |
| In Progress | Y items | [current validation dimension] |
| Remaining | Z items | [dimensions or files pending] |

## Completion Verification & Reality Check

| Claim |
|-------|
| [The completion statement - e.g., "Validated 15 files against 8 patterns"] |

| Reality Check |
|---------------|
| Blueprint patterns retrieved from memory (X patterns found) |
| Coding standards validated (naming, structure, organization) |
| Architectural boundaries checked (Y violations found) |
| Integration points validated (Z boundaries crossed) |
| Pattern evolution not yet assessed (potential outdated patterns) |
| Context-aware exceptions not identified |
```

### Validation Confidence Factors

- Blueprint currency
- Pattern completeness
- Context awareness
- Historical evolution

## Enforcement Report Structure

Generate a report with these components:

- File context with path, language, project type, and consulted pattern-source counts
- Compliance summary with what passed
- Violations by severity: `CRITICAL`, `ERROR`, `WARNING`, `INFO`
- Actionable fix guidance for each violation
- Recommendations and knowledge gaps
- Quality-gate status: `PASS` or `FAIL`

### Example Report Shape

```markdown
## Pattern Enforcement Report

**File**: [src/services/UserService.ts](src/services/UserService.ts)
**Language**: TypeScript | **Project**: VS Code Extension
**Patterns Consulted**: 19 (Blueprints: 8, Solutions: 5, MCP: 4, CID: 2)

### Violations Found

#### CRITICAL

**SQL Injection Vulnerability** - Line [45](src/services/UserService.ts#L45)
- Pattern expected: parameterized queries only
- Current: string concatenation with user input
- Fix: parameterize the query
```

## Memory Capture & Workflow Integration

When enforcement reveals durable new fixes or repeat violations, store them as solution memories.

Use `/copirate-enforcer` after `/copirate-iterate`, `/copirate-refactor`, or `/copirate-debug` when a post-change standards gate is needed.

## Edge Cases & Context-Aware Validation

- **Low pattern coverage**: fall back to security, complexity, and basic naming, then state the knowledge gap.
- **Conflicting patterns**: prefer higher-importance or newer patterns; say which source won.
- **Legacy code**: relax style severity, but keep security findings critical.
- **Generated/build artifacts**: skip entirely.
- **Experimental code**: lenient style posture, full security posture.
- **Test files**: relaxed complexity and length thresholds where scenario structure justifies it.

## Core Principles

- Knowledge-first: retrieve the patterns before enforcing them.
- Never invent standards: validate against accumulated knowledge, not generic preference.
- Security never waived: security issues stay critical regardless of file type.
- Actionable guidance: every violation should explain the fix, not only the problem.
- Context awareness: threshold tuning depends on file role.

## Expected Outcomes

- A completed enforcement report with findings by severity
- Clear pattern-source references for each major violation
- Actionable remediation guidance
- Quality gate status and prioritized next steps
