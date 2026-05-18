<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->
# Copirate TS Docs Support - Examples

## Function Documentation

```typescript
/**
 * Retrieves memory entries based on semantic similarity and filters.
 *
 * @param content - Search query for semantic matching
 * @param options - Optional filters and configuration
 * @returns Promise resolving to matching memory entries
 * @throws {Error} When the database query fails
 * @example
 * ```typescript
 * const memories = await retrieve('database patterns', { limit: 5 });
 * ```
 */
async function retrieve(content: string, options?: RetrieveOptions): Promise<Memory[]> {
	return [];
}
```

## Interface Documentation

```typescript
/**
 * Configuration options for memory retrieval operations.
 *
 * @remarks
 * Supports both simple and filtered retrieval.
 *
 * @public
 */
interface RetrieveOptions {
	limit?: number;
	includeRelated?: boolean;
}
```

## Class Documentation

```typescript
/**
 * Manages persistent memory storage with semantic search and relationship tracking.
 *
 * @remarks
 * Handles persistence, embeddings, and relationship queries.
 *
 * @public
 */
class MemoryStorageEngine {
	constructor(serviceContainer: ServiceContainer, logger: Logger) {}
}
```

## Completion Summary Shape

Use a terse closeout that states what was documented, what was validated, and any residual gaps.

```text
TSDoc updated for 4 exported APIs in MemoryStorageEngine.ts.
Validated parameter docs, return types, and one example snippet against the current signatures.
Remaining follow-up: confirm whether one helper should stay internal before adding `@public`.
```
