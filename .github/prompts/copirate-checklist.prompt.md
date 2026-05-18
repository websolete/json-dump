---
name: copirate-checklist
description: 'Retrieve recurring quality gates from memory and format them as a checklist'
---

<!-- deployment_hash: b1d685a1 -->
<!-- Extension Version: 1.32.6 -->
<!-- Deployed: 2026-05-18 -->
<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->

<!-- Copirate Extended Metadata (not part of VS Code schema) -->
<!-- category: workflow | language: any | difficulty: beginner -->
<!-- estimated_time: 1-2 minutes -->
<!-- tags: checklist, quality-gates, best-practices, recurring-checks, validation -->
<!-- memory_directives: Retrieve atomic quality gate memories tagged copirate-checklist -->

# Copirate Checklist - Recurring Quality Gates

> **Invocation**: `/copirate-checklist` in Copilot chat
>
> **Role**: You are a quality assurance bot that retrieves and formats recurring checks from the memory system.

## Purpose

This prompt retrieves atomic recurring quality gates stored as individual pattern memories. Instead of maintaining static checklists, quality gates evolve naturally:

1. **Discover issue** during implementation
2. **Create pattern memory** tagged `copirate-checklist`
3. **Memory appears** automatically in future checklist retrievals
4. **Gates evolve** with project maturity

## Workflow

### Step 1: Retrieve Quality Gate Memories

Query the memory system for atomic checklist items:

Use the retrieval rules in order: run the base query first, add topic precedent only for a known implementation concern, and add filters only when they clearly improve relevance.

```typescript
copirate_memory({
  operation: "memory_retrieve",
  content: "recurring quality gates checklist",
  tags: ["copirate-checklist"],
  limit: 5  // Progressive disclosure - start with top 5 most relevant (paginated)
});
```

If the current work involves a known implementation concern such as `hash`, `path-normalization`, `stable-id`, `logging`, or `secret-storage`, retrieve the canonical topic package before presenting checklist gates. Topic precedent is the repo-specific implementation baseline; the checklist should reinforce it rather than replace it with generic advice.

```typescript
copirate_topic({
  operation: "cid_get_topic_package",
  identifier: "[canonical concern slug]"
});
```

If the concern is implied by a natural-language task instead of a canonical slug, activate the topic package from the task wording first:

```typescript
copirate_topic({
  operation: "cid_activate_topic_package",
  userMessage: "[current task wording]",
  includePackages: true,
  maxActivatedPackages: 1
});
```

This stays in normal checklist flow. Do not broaden PreToolUse for it; use bounded behavioral-pack reminders only when execution posture needs reinforcement.

**Retrieval Priority:**
- **Required baseline**: Start with `limit: 5`
- **Expand only on demand**: Increase to `limit: 15`, then `limit: 25`
- **Quality threshold**: Top results usually score above `0.40`; treat scores below `0.35` as noise
- **Temp-file guardrail**: If retrieval writes to a temp file larger than `35KB`, rerun with `limit: 25` or lower
- **Optional refinement**: Add domain or language filters only when they clearly match the current task

**Domain/Language Filtering** (recommended before retrieval):
```typescript
// Detect current context
const tags = ["copirate-checklist"];
const currentExtension = "[active file extension]";
const workContext = "[database/service/UI/testing]";

// Step A: add language tags when the extension is explicit
if (currentExtension === ".cfc" || currentExtension === ".cfm") {
  tags.push("cfml");
}
if (currentExtension === ".ts") {
  tags.push("typescript");
}
if (currentExtension === ".js") {
  tags.push("javascript");
}

// Step B: add work-context tags when the task is clear
if (workContext.includes("database")) {
  tags.push("database", "schema");
}
```

**CIRCUIT BREAKER - Skill Chunk Filtering**:
- **NEVER** retrieve skill chunks without domain/language filters
- **Anti-pattern**: `{ tags: ["skill"] }` → Rejects with error (would retrieve ALL skill chunks)
- **Required pattern**: `{ tags: ["cfml", "skill"] }` → Domain-specific filtering
- **Why**: Prevents context window waste, ensures relevance, enforces progressive disclosure
- **Gateway enforcement**: MemoryGateway throws error if skill tag present without domain tag

### Step 2: Filter by Phase or Domain (Optional)

**By Implementation Phase:**
```typescript
// Pre-implementation checks
tags: ["copirate-checklist", "pre-implementation"]

// During implementation
tags: ["copirate-checklist", "during-implementation"]

// Post-implementation validation
tags: ["copirate-checklist", "post-implementation"]

// Architecture decisions
tags: ["copirate-checklist", "architecture"]
```

**By Domain:**
```typescript
// Database-related checks
tags: ["copirate-checklist", "database"]

// Service pattern checks
tags: ["copirate-checklist", "service-patterns"]

// Path normalization
tags: ["copirate-checklist", "path-normalization"]

// Embedding services
tags: ["copirate-checklist", "embeddings"]
```

### Step 3: Format Results

Present retrieved quality gates organized by phase or domain:

```markdown
# Copirate Quality Gates

## Pre-Implementation Phase
- [Memory title 1] (importance: X, tags: [...])
  Summary of check/validation required

- [Memory title 2] (importance: X, tags: [...])
  Summary of check/validation required

## During Implementation
...

## Post-Implementation Validation
...

## Architecture Decisions
...
```

### Step 4: Self-Check Questions Format

For gates that include self-check questions, format them as interrupt patterns:

```
[CHECK] GATE NAME:
   [YES/NO] → Verification question
   [YES/NO] → Verification question
```

## Usage Examples

**All Recurring Checks:**
```
/copirate-checklist
```

**Pre-Implementation Only:**
```
/copirate-checklist pre
```

**Database-Related Checks:**
```
/copirate-checklist database
```

**Service Pattern Checks:**
```
/copirate-checklist service
```

## Creating New Checklist Items

**For complete template and guidance**, retrieve the stencil:

```typescript
copirate_memory({
  operation: "memory_retrieve",
  content: "recurring check memory template stencil",
  tags: ["stencil", "recurring-check"],
  limit: 1
});
```

**Quick reference** - when you discover a recurring issue, create an atomic pattern memory:

```typescript
copirate_memory({
  operation: "memory_store",
  content: `**Recurring Check: [Check Name]**

[Description of what to check]
□ Checklist item 1?
□ Checklist item 2?
□ Checklist item 3?

**Why this matters:** [Impact of missing this check]

**Agent self-check:** "[Question agent should ask themselves]"`,
  type: "pattern",
  importance: 8-10,
  tags: ["copirate-checklist", "[phase-tag]", "[domain-tag]", "recurring-check"],
  milestone: false
});
```

**Template details in stencil:**
- Phase tags (\`pre-implementation\`, \`during-implementation\`, \`post-implementation\`, \`architecture\`)
- Importance guidelines (8-10 based on impact)
- Domain tags (database, service-patterns, path-normalization, etc.)
- Anti-patterns to avoid
- Complete examples

## Response Format

1. **Query memory system** (with optional filters + domain awareness)
2. **Check result size**: If temp file written (>35KB), reduce limit immediately
3. **Assess relevance**: Note highest/lowest hybrid scores (flag if <0.35)
4. **Group by phase or domain** for readability
5. **Format as actionable checklist** with self-check questions
6. **Show count**: "Retrieved X quality gates (scores: 0.XX - 0.XX)"
7. **Pagination guidance**: "Showing top 5. Need more? Increase limit to 15, then 25"
8. **Suggest filters**: Mention available phases/domains for narrowing

## Key Principles

- **Atomic memories**: One quality gate per memory (not grouped checklists)
- **Tag-driven retrieval**: Dynamic filtering by phase/domain/language
- **Natural evolution**: Create memories when issues discovered
- **Self-interruption**: Format as circuit-breaker questions
- **Phase awareness**: Organize by implementation lifecycle
- **Progressive disclosure**: Start small (limit: 5), expand only if needed (5 → 15 → 25)
- **Context awareness**: Filter by current file type and work domain
- **Quality threshold**: Hybrid scores <0.35 indicate low relevance
- **Temp file = red flag**: If result writes to file (>35KB), rerun with limit 25 or lower

## Notes

- Quality gates grow with project maturity
- High importance (8-10) ensures retrieval priority
- Users can add gates by creating pattern memories
- Agent discovers gaps and creates new gates autonomously
- No maintenance burden - gates self-organize via tags
