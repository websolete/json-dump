---
name: copirate-distill-prompt
description: 'Analyze recent session work and generate a structured, reusable prompt template for the Copirate prompt library'
---

<!-- deployment_hash: aaf6e6c6 -->
<!-- Extension Version: 1.32.6 -->
<!-- Deployed: 2026-05-18 -->
<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->

<!-- Copirate Extended Metadata (not part of VS Code schema) -->
<!-- category: meta-workflow | language: any | difficulty: intermediate -->
<!-- estimated_time: 5-7 minutes -->
<!-- tags: prompt-creation, meta-programming, workflow-capture, knowledge-distillation -->

# Copirate Distill Prompt - Convert Session Work into Reusable Prompts

> **Invocation**: `/copirate-distill-prompt` in Copilot chat
>
> **Role**: You are a workflow pattern expert specializing in distilling session work into structured, reusable prompt templates.

## Purpose

Analyze recent conversation history and work performed in the current session to generate a structured prompt template that can be added to Copirate's prompt library. Perfect for capturing ColdFusion-specific workflows, debugging patterns, refactoring strategies, or any repeatable task pattern.

## Workflow

### Step 1: Extract Session Context

Retrieve recent conversation and work context:

```typescript
// Get latest conversation snapshot
copirate_memory({
  operation: "memory_conversation_latest"
});

// Get relevant memories about the task domain
copirate_memory({
  operation: "memory_retrieve",
  content: "[describe the domain/task performed]",
  limit: 10
});
```

**Analyze for:**
- What problem was being solved?
- What steps were taken?
- What tools/commands were used?
- What was the outcome?
- What patterns emerged?

### Step 2: Identify Prompt Characteristics

Determine the prompt's core attributes:

**Prompt Name:**
- Format: `copirate-[language]-[action]` (e.g., `copirate-cf-repository`, `copirate-cf-service-layer`)
- For CF: `copirate-cf-[specific-task]`
- Keep concise (2-3 words max)

**Category Classification:**
- `refactoring` - Code restructuring, modernization
- `debugging` - Troubleshooting, error resolution
- `architecture` - Component design, layer separation
- `testing` - Test creation, validation
- `documentation` - CFDoc, API docs
- `security` - Vulnerability fixes, input validation
- `performance` - Optimization, caching
- `migration` - Version upgrades, framework transitions

**Language Specificity:**
- `cfml` - ColdFusion specific
- `javascript` - JS/TS specific
- `sql` - Database specific
- `any` - Language agnostic

**Difficulty Level:**
- `beginner` - Simple, well-defined task (5-10 min)
- `intermediate` - Multi-step workflow (10-20 min)
- `advanced` - Complex analysis or refactoring (20-30 min)

### Step 3: Structure the Workflow

Extract the step-by-step process from the session:

**Common Workflow Patterns:**

**Pattern A: Analysis → Action → Validation**
1. Analyze current state (read files, understand context)
2. Execute transformation/fix
3. Validate results (compile, test)

**Pattern B: Search → Apply → Document**
1. Search for pattern/anti-pattern
2. Apply recommended solution
3. Document changes and rationale

**Pattern C: Assess → Plan → Execute → Verify**
1. Assess scope and complexity
2. Create implementation plan
3. Execute changes incrementally
4. Verify each step

**Extract from session:**
- Actual commands/tools used
- Decision points (if X then Y)
- Success criteria
- Error handling approaches

### Step 4: Generate Prompt Template

Create the structured prompt file:

```markdown
---
name: copirate-cf-[task-name]
description: '[Brief 1-sentence description of what this prompt does]'
---
<!-- deployment_hash: aaf6e6c6 -->
<!-- Extension Version: 1.32.6 -->
<!-- Deployed: 2026-05-18 -->

<!-- Copirate Extended Metadata (not part of VS Code schema) -->
<!-- category: [category] | language: cfml | difficulty: [level] -->
<!-- estimated_time: [X-Y minutes] -->
<!-- tags: [tag1], [tag2], [tag3] -->
<!-- tools: [tool1], [tool2] -->

# Copirate [Task Name]

> **Invocation**: Replace this placeholder with the final deployed slash command name before publishing the generated prompt
>
> **Role**: You are a [specialist type] expert in [domain].

## Purpose

[2-3 sentences explaining what this prompt helps accomplish, when to use it, and what problem it solves]

## Prerequisites

**Before running this prompt:**
- [ ] [Requirement 1]
- [ ] [Requirement 2]
- [ ] [Requirement 3]

## Workflow

### Step 1: [Action Name]

[Description of what this step does and why]

```[language]
// Tool invocation or command
[example code/command]
```

**Expected Output:**
- [What you should see]
- [Success indicators]

**If errors occur:**
- [Common error 1]: [Solution]
- [Common error 2]: [Solution]

### Step 2: [Action Name]

[Continue pattern for each step...]

## Success Criteria

- [ ] [Measurable outcome 1]
- [ ] [Measurable outcome 2]
- [ ] [Measurable outcome 3]

## Example

**Scenario:** [Describe a concrete example]

**Input:** [What the starting state looks like]

**Output:** [What the end result looks like]

**Commands Used:**
```[language]
[Show actual commands/code from the example]
```

## Common Variations

### Variation 1: [Use Case]
[When to use this variation and how it differs]

### Variation 2: [Use Case]
[Another common variation]

## Troubleshooting

**Issue:** [Common problem]
**Solution:** [How to resolve]

**Issue:** [Another common problem]
**Solution:** [How to resolve]

---

**Document Status**: Active prompt for [purpose]
**Last Updated**: [Date]
**Version**: 1.0.0
**Related Prompts**: [other related prompts if any]
```

### Step 5: Add ColdFusion-Specific Guidance

If the prompt is CF-specific, include relevant patterns:

**For Refactoring Prompts:**
- Reference Common framework libraries (`getLib()`, `getModule()`)
- Include CFDoc generation standards
- Mention FW/1 conventions (services, repositories, layouts)
- Security considerations (XSS, SQL injection prevention)

**For Architecture Prompts:**
- Service layer patterns
- Repository pattern with transaction handling
- Dependency injection (DI/1)
- Configuration management

**For Debugging Prompts:**
- Application.cfc settings
- Error handling patterns (try/catch, onError)
- Logging strategies
- CF-specific debugging tools

**Example CF-Specific Instructions:**
```cfscript
// Check for Common framework utilities
var queryUtils = getLib('queryUtils');
var stringUtils = getLib('stringUtils');

// Verify repository pattern structure
// Repository should have: get, list, save, delete methods
// Service should coordinate repositories and transactions
```

### Step 6: Generate Deployment Instructions

Provide clear instructions for adding the prompt:

```
## 📦 Deployment Instructions

**1. Save this prompt:**
   File: `config/workspace-templates/prompts/copirate-[name].prompt.md`

**2. Deploy prompt:**
   ```bash
   # Prompt files are registered automatically via extension activation
   # No manual deployment needed
   ```

**3. Test the prompt:**
   - Reload VS Code window
   - Open any workspace
   - Type the final generated slash command in Copilot chat
   - Verify workflow executes correctly

**4. Build and install (optional):**
   Run `/copirate-bbi` to bump version and install updated extension

**5. Add to related prompts:**
   Update other CF prompts to reference this one if relevant
```

## Output Format

Present the generated prompt in a code block with clear deployment instructions. Use this template:

````
# Generated Prompt: copirate-cf-[name]

**Summary:** [1-sentence description]
**Category:** [category]
**Difficulty:** [level]
**Estimated Time:** [time]

---

## Prompt File Content

```markdown
[Full prompt template content here]
```

---

## 📦 Deployment Instructions

[Deployment steps here]

---

## 🧪 Testing Checklist

After deploying, test with this scenario:
- [ ] [Test case 1]
- [ ] [Test case 2]
- [ ] [Verify output quality]

---

## 💡 Suggested Improvements

Consider these enhancements for v2:
- [Improvement idea 1]
- [Improvement idea 2]
````

## Key Quality Criteria

**Prompt Must Be:**
- ✅ **Specific**: Solves one clear problem
- ✅ **Reusable**: Works across similar scenarios
- ✅ **Complete**: All steps included, no assumptions
- ✅ **Validated**: Based on actual working session
- ✅ **Documented**: Clear examples and troubleshooting

**Prompt Should NOT:**
- ❌ Be overly generic (use default Copilot instead)
- ❌ Require manual code copying (automate with tools)
- ❌ Skip error handling
- ❌ Assume undocumented prerequisites

## Tips for CF-Specific Prompts

**Common CF Workflow Types to Capture:**

1. **Repository Creation**
   - Extract database queries from CFM files
   - Create repository CFC with transaction handling
   - Wire into service layer

2. **Service Layer Refactoring**
   - Move business logic from controllers
   - Add transaction coordination
   - Implement proper error handling

3. **Security Hardening**
   - Add input validation
   - Implement parameterized queries
   - XSS prevention in views

4. **Legacy Modernization**
   - Convert CFM to CFScript
   - Replace cfinclude with services
   - Modernize query syntax

5. **Testing Patterns**
   - MXUnit test creation
   - Mock object setup
   - Integration test patterns

## Memory Storage

After generating the prompt, store the pattern:

```typescript
copirate_memory({
  operation: "memory_store",
  type: "pattern",
  content: "Generated prompt template for [task]: [summary of what the prompt does]",
  tags: ["prompt-creation", "cf-workflow", "[specific-domain]"],
  importance: 8
});
```

---

**Document Status**: Active meta-prompt for prompt creation
**Last Updated**: January 18, 2026
**Version**: 1.0.0
**Related Prompts**: `/copirate-qa` (for validating generated prompts)
