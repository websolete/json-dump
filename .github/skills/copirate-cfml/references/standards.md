# CFML Standards Reference

## CFScript And File-Type Rules

- use CFScript for business logic, repositories, services, validators, and utility components
- keep CFML tags primarily in `.cfm` presentation files
- do not replace working `new` syntax with `createObject()` only for compatibility folklore; validate the actual version boundary first
- remember that `##` inside CFML string literals can intentionally mean a literal `#`

## CFDoc Standards

### Comment Style

- `.cfm` files use `<!--- --->`
- `.cfc` files use `/** */`

### Required Tags

- `@paramname type [description]`
- `@return type [description]` for non-void returns

### Optional Tags To Preserve

- `@backstory`
- `@ai_purpose`
- `@ai_functionality`
- `@example`

### Type System

Use CFML-native types such as `numeric`, `string`, `boolean`, `struct`, `array`, `query`, `component`, `any`, and `date`.

## FW/1 Architectural Standards

- controllers should stay thin and handle request routing or view selection only
- services own business orchestration and transaction boundaries
- repositories own data access and SQL isolation
- DI/1 is the preferred dependency-injection posture when the application uses FW/1 patterns

## Security Standards

- parameterize every query input
- encode rendered user input for the relevant output context
- validate uploads for type, size, and trust boundaries
- harden session lifecycle behavior and review fixation / timeout posture
- use CSRF protections on state-changing flows

## Performance Standards

- use query caching deliberately on stable reads
- prefer collection member functions where supported and measurable
- use singleton-style shared services for stable expensive dependencies
- review connection pooling and repeated query patterns before adding more application-level loops

## CF2025 Watch List

When code is moving toward CF2025, explicitly review removed functions, changed behavior, and syntax updates instead of assuming old patterns will carry forward unchanged.

## cfCopirate Execution Guardrails

- ALWAYS use parameterized SQL with `queryExecute()` and `cfqueryparam`-style binding. Never concatenate user input into SQL.
- Prefer modern CFScript member-function and literal syntax (`{}`, `[]`, `.each()`, `.filter()`) over legacy procedural constructors when runtime constraints allow it.
- Before creating new utility or service helpers, check existing framework services via `getLib()` and `getModule()` usage patterns.
- Include CFDoc on public generated functions unless the target file already uses a different established documentation convention.
- Prefer CFScript for business logic. Use tag-based implementations only when matching an existing file style matters for consistency.
- Preserve FW/1 boundary semantics: `rc` is request input, `prc` is prepared/request-private output for views.
- Prefer explicit `catch(type)` exception types before fallback handling.
- Prefer dependency injection and property injection patterns already established in the workspace before introducing factory lookups.
- ALWAYS HTML-encode or URL-encode user-facing output with context-appropriate encoders at render boundaries.
- ALWAYS validate session or CSRF tokens for state-changing actions before persistence operations.
- ALWAYS wrap multi-step persistence operations in a CFScript `transaction {}` block. Throwing inside a transaction triggers automatic rollback.
- Consider query caching (`cachedWithin`) for hot read paths that return rarely changing data. Use `cacheId` and `cacheRegion` when targeted invalidation is needed after writes.
- For runtime-sensitive snippets, follow `.github/instructions/copirate-cf-runtime-compatibility.instructions.md` for the compatibility-header and fallback contract.
- If `CF_ENGINE` is unknown, default to conservative assumptions and provide a fallback-safe variant.

## Worked Standards Snippets

### Complete CFDoc On A Public Service Function

~~~cfml
/**
 * Creates a user account and returns the new identifier.
 *
 * @email string            Email address for the user.
 * @displayName string      User-facing display name.
 * @return numeric
 * @throws application When business validation fails.
 */
public numeric function createUser(
	required string email,
	required string displayName
) {
	if (!len(trim(arguments.email))) {
		throw(type = "application", message = "Email is required.");
	}

	return variables.userRepository.insertUser(arguments.email, arguments.displayName);
}
~~~

### Specific Exception Type Handling

~~~cfml
/**
 * Persists a profile update.
 *
 * @userId numeric          User identifier.
 * @profileData struct      Profile fields to update.
 * @return void
 */
public void function updateProfile(
	required numeric userId,
	required struct profileData
) {
	try {
		variables.userRepository.updateProfile(arguments.userId, arguments.profileData);
	} catch (database dbEx) {
		throw(
			type = "application",
			message = "Unable to update profile at this time.",
			detail = dbEx.message
		);
	}
}
~~~

### Modern Struct And Array Literal Idioms

~~~cfml
/**
 * Maps raw user rows to API response objects.
 *
 * @rows array          Query rows from repository.
 * @return array
 */
public array function toUserDtos(required array rows) {
	var results = [];

	arguments.rows.each(function(required struct row) {
		results.append({
			id: row.id,
			email: row.email,
			status: row.status
		});
	});

	return results;
}
~~~
