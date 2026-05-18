# CFML Development Workflow

Use this workflow after the top-level skill has been activated.

## 1. Prevent Duplication First

Start by checking whether the Common framework already solves the problem.

- search `mcp_cf_common_lib` before creating helpers, wrappers, validators, or query utilities
- prefer `getLib()` and `getModule()` usage when the application already exposes those accessors
- treat duplicate local helpers as a smell until Common has been ruled out

## 2. Lock Syntax And Boundary Rules

- use CFScript for services, repositories, validators, utilities, and business logic
- reserve tag-heavy CFML for views, layouts, and rendering surfaces
- keep controllers thin and move orchestration into services
- keep data access behind repositories or other explicit persistence seams

## 3. Apply Documentation And Validation

- use CFDoc in the correct comment style for the file type
- preserve existing `@backstory` and `@ai_*` tags during updates
- ensure parameter and return tags match the actual function signature
- prefer validation passes that catch CFML type drift before documentation is written back

## 4. Enforce Security And Performance

- parameterize SQL with `cfqueryparam` or named parameters
- encode output with the appropriate encoder, especially `encodeForHTML`
- review uploads, session handling, and CSRF posture whenever request or form flows change
- consider caching, pooling, and collection-processing improvements where hot paths are involved

## 5. Keep Migration Impact Visible

Even in modern CFML work, watch for CF2025 breaking changes when touching old syntax, removed functions, or performance-sensitive collection patterns.

## Delivery Sequence

1. discover existing utilities and schema context
2. implement with CFScript-first boundaries
3. document with CFDoc where the surface needs maintainable guidance
4. validate security and performance assumptions
5. leave the package examples for worked code, not for the first-stop invocation contract

## Generation Boundary

- Treat the top-level skill as the first-stop invocation contract for code-generation and scaffolding requests.
- Keep this package generic: describe repeatable artifact shapes such as thin FW/1 controllers, services, repositories, validators, CFDoc defaults, and generation-time performance checks.
- Do not hard-code repo-specific Common inventories, application-owned accessor names, or environment-local module choices in this package; retrieve those from Common, workspace evidence, or environment-specific overlays before implementation.

## cfCopirate Trigger Overlays

The canonical Copirate vernacular dictionary lives in `.github/instructions/copirate-vernacular-dictionary.instructions.md`.

When cfCopirate is active, keep the shared `!patterns`, `!patternizer`, and `!topic` base meanings from that dictionary, then apply this CF emphasis:

- `!patterns`: retrieve CF-tagged memories first, prefer compatibility-aware CF and FW/1 patterns when relevant, and report support as `strong`, `partial`, or `none` before proceeding.
- `!patternizer`: capture the runtime, framework, datasource, and compatibility constraints that made the workflow valid, and store only disciplined reusable guidance that future retrieval should surface.
- `!topic`: retrieve CF-tagged evidence first, distinguish clearly between a new canonical topic and an update to an existing incomplete package, and stop short of canonical mutation when the evidence is weak.

When repeated validated CF evidence points to a missing or anemic topic even without `!topic`, surface that opportunity proactively as a bounded recommendation.

## Blueprint Storage Contract

When storing CF-specific architectural knowledge as a blueprint:

1. Prefer `copirate_memory({ operation: "memory_create_blueprint", ... })` over generic `memory_store`.
2. Provide `title`, `content`, and top-level `blueprint_category` on the first attempt.
3. Add `blueprint_component` and `blueprint_project` whenever the component or application is known.
4. Retrieve the `blueprint-memory-creation` stencil first if you are not certain about parameter names or blueprint structure.
5. Avoid generic `memory_store` for blueprints unless you intentionally need to supply the full low-level metadata yourself.
