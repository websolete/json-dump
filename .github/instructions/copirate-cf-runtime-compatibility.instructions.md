---
description: "Use when editing CFML files or writing CF-specific Copirate guidance that depends on runtime compatibility."
applyTo: "**/*.{cfc,cfm,cfml}"
---

# Copirate CF Runtime Compatibility

## Runtime-Sensitive Guidance

- Apply these rules in order: resolve environment metadata first, emit the compatibility header next, add any required caveat or fallback, then reuse existing shared implementations before introducing new utilities.
- Always prepend runtime-sensitive snippets with a compatibility header that includes `engine`, `mode`, and `version-floor`.
- If a snippet uses modern-only or engine-specific syntax, include an explicit compatibility caveat line.
- For `mixed` or `legacy-strict` runtime modes, include a fallback-safe alternative path whenever modern syntax is shown.
- Before writing new utility functions or database queries, search for existing shared implementations and schema knowledge through the available workspace and Copirate tools.
- Before creating or recommending utilities, wrappers, or service patterns for foundational concerns (`hash`, `path-normalization`, `stable-id`, `logging`, `secret-storage`), retrieve the canonical topic package first.

## Environment Metadata Resolution

Before CF implementation, resolve environment context from workspace metadata.

- Execute `copirate_workspace({ operation: "info" })`.
- If application metadata is present (`.copirate/.application-metadata.json`), derive:
	- `CF_ENGINE` from the ColdFusion runtime target (engine + variant + version)
	- `CF_FRAMEWORK` from metadata frameworks (prefer FW/1 when present)
	- `CF_DATASOURCE` from explicit user or project config rather than inferred application metadata
- If metadata is missing, use conservative defaults and mark unknowns explicitly:
	- `CF_ENGINE`: `UNKNOWN`
	- `CF_FRAMEWORK`: `UNKNOWN`
	- `CF_DATASOURCE`: `UNKNOWN`

Treat resolved values as working truth for the current snippet or recommendation unless the user explicitly overrides them. If metadata is missing or stale, ask the user to initialize or refresh workspace application metadata for higher-fidelity CF guidance.

## Compatibility Header Template

Use this block directly above runtime-sensitive snippets:

~~~text
Compatibility:
- engine: adobe|lucee|mixed
- mode: legacy-strict|mixed|modern
- version-floor: CF10|CF2016|CF2021|CF2023|Lucee5+
- caveat: <required when syntax is modern-only or engine-specific>
- fallback: <required when mode is mixed or legacy-strict>
~~~

If `CF_ENGINE` is unknown, default to conservative assumptions and always provide a fallback-safe variant.
