<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->
# Copirate CF Docs Support - Reference

## CFDoc Rules

- Parameter format must be `@paramname type description`
- Optional parameters should use `?:` when optionality needs to be called out explicitly
- Use `/** */` in `.cfc` files and `<!--- --->` in `.cfm` files
- Prefer standard CFML types such as `string`, `numeric`, `boolean`, `date`, `struct`, `array`, `query`, and `any`

## Core @ai_ Tags

| Tag | When to Use | Example |
|-----|-------------|---------|
| `@ai_purpose` | Required for public APIs | Data access layer for user authentication |
| `@ai_functionality` | Non-obvious behavior | Validates credentials, creates token, logs attempt |
| `@ai_integration` | External dependencies or call chains | Called by SecurityService, integrates with AD |
| `@ai_architecture` | Pattern-level role | Repository pattern with parameter binding |
| `@ai_dependencies` | Important utilities, services, or libraries | Common/utilities/CryptoUtils.cfc |
| `@ai_performance` | Performance-sensitive logic | Indexed query on audit timestamp |
| `@ai_security` | Security-sensitive behavior | SQL injection prevention via cfqueryparam |
| `@ai_validation` | Input or rule validation | inqKey must be uppercase alphanumeric |
| `@ai_side_effects` | Observable state changes | Sends notification and writes audit row |
| `@ai_error_handling` | Complex failure behavior | Returns normalized error struct for invalid credentials |
| `@ai_transactional` | Transaction boundaries | Wraps insertion and status update in transaction |

## Usage Guidance

- Use only the tags that reflect real code behavior.
- Favor short, declarative tag values over paragraph-length prose.
- Put security and performance notes on the specific public API or component that owns the behavior.
- Use `@backstory` only when it explains a real migration or deprecated replacement boundary.

## Validation Checklist

1. Parameter order is CFML-native.
2. Optional parameters are clearly marked when needed.
3. Public APIs include `@ai_purpose`.
4. Security-sensitive code has `@ai_security` when relevant.
5. Integration points and side effects are not invented.
6. Comment syntax matches the file type.
