<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->
# Copirate TS Docs Support - Reference

## Core TSDoc Tags

| Tag | Use | Notes |
|-----|-----|-------|
| `@param` | Describe function or method parameters | Keep aligned with the actual signature |
| `@returns` | Describe resolved or returned value | Match the declared return type |
| `@throws` | Document thrown errors | Only when the implementation can actually throw them |
| `@remarks` | Add contextual guidance | Use for constraints, lifecycle, or architectural notes |
| `@example` | Show minimal real usage | Keep examples type-correct and short |
| `@see` | Link related types or APIs | Prefer stable local symbols or public APIs |
| `@deprecated` | Mark obsolete APIs | Include migration direction when known |
| `@since` | Version marker | Use only when version history is real and known |
| `@public` / `@internal` | Visibility intent | Match the package or repo contract |
| `@typeParam` | Document generic parameters | Explain constraints or semantic meaning |

## Usage Guidance

- Keep docs synchronized with the real TypeScript signature.
- Prefer one strong `@remarks` block over scattered redundant prose.
- Add examples only when they reduce ambiguity.
- Use `@see` and `{@link ...}` for stable references, especially in VS Code extension surfaces.
- Avoid documenting inferred behavior that the implementation does not enforce.

## VS Code Extension Notes

- Reference VS Code API types with `{@link vscode.ExtensionContext}` style links when helpful.
- Document command handlers, providers, and services in terms of their external contract, not internal incidental steps.
- For tools and command surfaces, clarify inputs, outputs, and failure behavior before adding examples.

## Validation Checklist

1. Parameters and return docs match the current signature.
2. Any `@throws` entry reflects real failure paths.
3. Examples are syntactically valid and type-correct.
4. Links and `@see` references resolve to real symbols or APIs.
5. Visibility and deprecation tags match the real contract.
