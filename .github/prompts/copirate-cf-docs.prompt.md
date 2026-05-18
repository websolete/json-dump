---
name: copirate-cf-docs
description: Generate comprehensive CFDoc documentation for CFML code with @ai_ attributes and modern CF2016+ patterns
---
<!-- deployment_hash: c79bec38 -->
<!-- Extension Version: 1.32.6 -->
<!-- Deployed: 2026-05-18 -->
<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->


# Copirate CF Docs - CFML Documentation Generation

Invoke as: **/copirate-cf-docs**

## Purpose

Generate standards-compliant CFDoc for modern CFML code with the minimum structure needed to explain purpose, parameters, return values, integration points, and the @ai_ context that Copirate relies on for later analysis.

## When to Use

- Documenting new CFML functions, components, or services
- Adding CFDoc comments to undocumented code
- Integrating @ai_ attributes for AI-assisted development
- Creating developer reference materials for FW/1 applications
- Documenting gateway, service, repository, or utility components
- Clarifying complex business logic, validation, or data transformations
- Preparing code for team collaboration

## Documentation Contract

- Use CFDoc comment syntax that matches the file type: `/** */` for `.cfc`, `<!--- --->` for `.cfm`
- Use the CFML parameter format `@paramname type description`; do not switch to JavaDoc ordering
- Mark optional parameters with `?:` when the optionality is not obvious from the signature alone
- Add `@ai_purpose` to public APIs and add other `@ai_` tags only when they capture real architectural, security, validation, performance, or dependency context
- Use `@backstory` only when legacy replacement context materially helps future maintainers
- Keep generated comments grounded in observed code behavior; do not invent business rules, integrations, or deprecated-history claims

## Workflow

1. Retrieve relevant CFDoc patterns or project conventions from memory before writing comments.
2. Inspect the target file and classify the surface being documented: component, function, gateway, service, repository, utility, or template logic.
3. Generate concise CFDoc that explains purpose, parameters, return value, side effects, and integration points.
4. Pull detailed tag taxonomy, type guidance, and validation rules from `.github/prompts/support/copirate-cf-docs/reference.md` when needed.
5. Pull full examples and sample completion summaries from `.github/prompts/support/copirate-cf-docs/examples.md` when needed.
6. After editing, verify parameter ordering, optional markers, @ai_ usage, and file-type comment syntax.

## Response Contract

- Report what was documented, where it was applied, and any gaps that still need domain confirmation.
- If the code is ambiguous, ask one targeted question before inventing undocumented behavior.
- Keep progress updates operational: what changed, what was validated, and what still needs follow-up.

## Support Docs

- `.github/prompts/support/copirate-cf-docs/reference.md`
- `.github/prompts/support/copirate-cf-docs/examples.md`

## Success Criteria

1. Parameter format stays CFML-native.
2. Public APIs include meaningful purpose and context.
3. Optional parameters, return values, side effects, integration, security, and performance notes are documented when relevant.
4. Comments match the actual implementation and file type.
5. Output is concise enough to maintain without losing important context.

## Tool Integration

- `copirate_memory` - retrieve or store CFDoc patterns
- `copirate_database` - inspect existing documentation guidance
- `read_file` - inspect CFML implementation before documenting it
- `grep_search` - find undocumented components or functions
- `get_errors` - validate touched files after edits
