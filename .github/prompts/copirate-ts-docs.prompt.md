---
name: copirate-ts-docs
description: Generate comprehensive TSDoc documentation for TypeScript code with type annotations and examples
---
<!-- deployment_hash: 0020ed30 -->
<!-- Extension Version: 1.32.6 -->
<!-- Deployed: 2026-05-18 -->
<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->


# Copirate TS Docs - TypeScript Documentation Generation

Invoke as: **/copirate-ts-docs**

## Purpose

Generate standards-compliant TSDoc for TypeScript code with enough structure to improve IDE help, clarify public APIs, and preserve the type-level context that Copirate and human maintainers need later.

## When to Use

- Documenting new TypeScript functions, classes, interfaces, or type aliases
- Adding TSDoc comments to undocumented code
- Generating API documentation for libraries or extension surfaces
- Creating developer reference materials
- Clarifying complex types, generics, or async control flow
- Preparing code for internal handoff or public release

## Documentation Contract

- Use standard TSDoc tags such as `@param`, `@returns`, `@throws`, `@remarks`, `@example`, and `@see` only when they match the implementation
- Keep parameter, return, and thrown-error docs aligned with the actual TypeScript signature
- Add examples only when they clarify real usage; examples should be small and type-correct
- Use `@public`, `@internal`, `@deprecated`, and `@since` intentionally rather than mechanically
- Prefer clear API intent and type semantics over long prose blocks
- Do not invent behaviors, thrown errors, configuration surfaces, or migration guidance that the code does not support

## Workflow

1. Retrieve project-specific documentation patterns from memory before writing comments.
2. Inspect the target surface and classify it: function, class, interface, type alias, generic utility, or VS Code extension API.
3. Generate concise TSDoc that explains purpose, parameters, return types, thrown errors, and usage constraints.
4. Pull the tag reference, validation guidance, and VS Code-specific notes from `.github/prompts/support/copirate-ts-docs/reference.md` when needed.
5. Pull worked examples and completion-summary patterns from `.github/prompts/support/copirate-ts-docs/examples.md` when needed.
6. After editing, validate that examples, links, and type descriptions still match the code.

## Response Contract

- Report what was documented, what API surfaces changed, and any remaining documentation gaps.
- Ask one targeted question when signatures, behavior, or public/internal status are ambiguous.
- Keep progress updates operational: what changed, what was validated, and what follow-up remains.

## Support Docs

- `.github/prompts/support/copirate-ts-docs/reference.md`
- `.github/prompts/support/copirate-ts-docs/examples.md`

## Success Criteria

1. Docs stay aligned with actual types and signatures.
2. Public APIs are documented at the right level of detail.
3. Examples, links, and deprecation guidance are accurate when present.
4. IDE-facing documentation improves readability without bloating the file.
5. Output remains maintainable and specific to the code that was inspected.

## Tool Integration

- `copirate_memory` - retrieve or store TSDoc patterns
- `copirate_database` - inspect existing documentation guidance
- `read_file` - inspect TypeScript implementation before documenting it
- `grep_search` - find undocumented code paths or exported surfaces
- `get_errors` - validate touched files after edits
