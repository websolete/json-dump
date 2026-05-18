<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->
# Copirate Demoji Appendix

## Preview Shape

Before bulk changes, show a compact preview of representative edits, including line context and the replacement style.

Example transforms:

- `// ✅ Success case` -> `// Success case`
- `logger.info('🔍 Searching files...')` -> `logger.info('Searching files...')`
- `logger.info('[SUCCESS] Completed indexing')` -> `logger.info('Completed indexing')` or `logger.info('✅ Completed indexing')` only when the message is truly a major user-facing completion event

## Bulk Replacement Workflow

For larger files:

1. Scan all emoji matches first.
2. Read local context before building replacements.
3. Apply replacements in reverse-order location sequence so earlier edits do not shift later line matches.
4. Stay on workspace-native tools instead of external text-processing scripts.

## File-Type Handling

- **Code**: clean comments, internal logs, and non-semantic strings first.
- **Markdown**: remove decorative headers, emoji bullets, and noisy callouts unless the content is intentionally user-facing.
- **Config files**: remove decorative descriptions or comments, preserve real data values.
- **CFML**: clean CFDoc blocks, comments, and non-user-facing output.

## Safety Guidance

- Never modify vendor, build, dist, node_modules, or binary artifacts.
- Ask before large user-facing doc changes.
- Preserve fixtures and data strings where emoji are semantically relevant.
- Validate encoding and do a quick diff after the cleanup.

## Style Notes

- Let log level carry severity.
- Prefer plain language over bracketed markers.
- Keep section headings markdown-native instead of decorative.
- Reserve emojis, if any, for rare user-facing major completion or critical-error events.

## Migration Guidance

Suggested rollout:

1. Prompts and instructions
2. Source-code comments
3. Internal logs and messages
4. User-facing docs last
