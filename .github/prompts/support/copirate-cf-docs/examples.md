<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->
# Copirate CF Docs Support - Examples

## Function Documentation

```cfml
/**
 * Retrieves audit records for a specific inquiry with optional filtering.
 *
 * @inqKey string                    Unique inquiry key
 * @auditType string                 ?: Type of audit record to filter
 * @startDate date                   ?: Start of date range for audit records
 * @endDate date                     ?: End of date range for audit records
 * @return query                     Audit records with timestamp and status info
 *
 * @ai_purpose Data retrieval layer for audit trail queries
 * @ai_functionality Executes parameterized query with optional filters
 * @ai_integration Integrates with WipAuditService
 * @ai_performance Uses indexed query on inq_key and audit_timestamp columns
 */
function getAuditRecords(required string inqKey, string auditType, date startDate, date endDate) {
	// Implementation
}
```

## Component Documentation

```cfml
/**
 * Gateway component for WIP audit trail operations.
 *
 * @ai_purpose Data access layer for WIP audit trail system
 * @ai_architecture Repository pattern with parameter binding
 * @ai_integration Used by WipAuditService and WipController
 * @ai_security All queries use cfqueryparam for SQL injection prevention
 *
 * @backstory Replaces legacy ShowAudit.cfm during OOP refactor
 */
component output="false" accessors="true" {
	property name="dsn" type="string";
}
```

## Service Documentation

```cfml
/**
 * Service component for WIP audit trail business logic and orchestration.
 *
 * @ai_purpose Business logic orchestration for WIP audit system
 * @ai_architecture Service layer pattern with dependency injection
 * @ai_dependencies Common/utilities/StringUtils.cfc, Common/logging/LogService.cfc
 * @ai_transactional Uses transaction wrapper for multi-step audit operations
 */
component output="false" accessors="true" {
	property name="gateway" type="WipAuditGateway";
}
```

## Completion Summary Shape

Use a terse closeout that states what was documented, what was validated, and what still needs confirmation.

```text
CFDoc updated for 3 public methods in AuditGateway.cfc.
Validated parameter ordering, optional markers, and @ai_purpose / @ai_security usage.
Remaining follow-up: confirm one integration note with the service owner.
```
