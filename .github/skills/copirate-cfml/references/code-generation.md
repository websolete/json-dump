# CFML Code Generation Reference

Use this reference when the task is scaffolding or generating modern CFML implementation surfaces after the top-level skill has been activated.

## 1. Pre-Generation Circuit Breakers

Before writing code, verify that the package is generating the right thing.

- check `mcp_cf_common_lib` first so the implementation does not duplicate an existing Common library or module
- consult `copirate_cf_corpus_search` before coding so generated shapes reflect validated workspace behavior
- use `mcp_cf_sql_schema` when the generated surface depends on table shape, indexes, or routine definitions
- confirm runtime-sensitive syntax and fallback rules through `.github/instructions/copirate-cf-runtime-compatibility.instructions.md`

## 2. Artifact Shapes To Prefer

Keep generation generic by staying at repeatable component shapes rather than repo-local inventories.

- **FW/1 controller:** orchestration only, request validation, redirects or view selection, no embedded SQL, and no business logic
- **Service:** business orchestration, transaction boundaries, structured result returns, and coordination across repositories or libraries
- **Repository:** persistence-only seam with parameterized queries, row mapping, and no presentation concerns
- **Validator or helper:** pure CFScript utility surface with narrow responsibility and no hidden framework side effects

## 3. CFDoc And Write-Back Expectations

- add CFDoc to generated public functions unless the target file already follows a different established convention
- use CFML-native types in `@param` and `@return` tags
- preserve existing `@backstory` and `@ai_*` tags when extending a file rather than generating a new one
- keep generated comments aligned with the actual function signature before write-back

## 4. Generation-Time Performance Checklist

Make these checks before treating generated code as ready for validation.

- avoid creating new helpers or wrappers when Common already provides the capability
- consider query caching or cache-region posture on stable read paths instead of deferring all performance thinking to a later pass
- prefer collection member functions where the runtime supports them and they improve clarity or hot-path behavior
- keep controllers thin so expensive work stays in reusable services or repositories
- avoid repeated schema lookups, repeated object construction, and N+1 query patterns in generated flows
- use parallel operations only when each generated unit of work is independent and shared state is not mutated

## 5. Generic Boundary

This package may define repeatable implementation shapes and retrieval order, but it must stop short of repo-specific inventory.

- acceptable here: FW/1 controller or service shapes, repository boundaries, CFDoc defaults, Common-first discovery, corpus retrieval, and performance checks
- not acceptable here: repo-local Common inventories, application-owned accessor names, datasource-specific assumptions, or environment-local module choices
- when repo-specific detail is required, retrieve it from Common, schema, workspace evidence, or environment-specific overlays before writing code
