---
name: copirate-suite
description: Execute comprehensive Copirate analysis suite (29-step orchestration)
---
<!-- deployment_hash: b36003bb -->
<!-- Extension Version: 1.32.6 -->
<!-- Deployed: 2026-05-18 -->
<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->


# Copirate Suite - Comprehensive Analysis Orchestration

Invoke as: **/copirate-suite**

## Purpose

Execute the complete Copirate analysis suite with memory building, database population, codebase knowledge generation, and specialized analysis pipelines. This is a multi-phase, 29-step orchestration that takes ~10-15 minutes.

## When to Use

- Starting work on a new project or workspace
- After major codebase refactoring
- When workspace knowledge needs refresh
- Preparing comprehensive architecture assessment
- Before major feature development
- Investigating technical debt

## What It Does

### Phase 1: Memory Building (Steps 1-11)
- Load and store default memory set (87 items)
- Cluster analysis for theme discovery
- Memory optimization and quality improvement
- Relationship discovery between memories
- Generates accumulated knowledge base

### Phase 2: Database Population (Steps 12-15)
- Refresh Code Intelligence Database (CID)
- Populate function definitions and metadata
- Extract documentation from workspace
- Build searchable code index

### Phase 3: Codebase Knowledge Generation (Steps 16-18)
- Generate project architecture documentation
- Create architectural blueprints
- Document design patterns and conventions

### Phase 4: Business Intelligence (Steps 19-21)
- Register workspace with business context
- Analyze domain models
- Extract workflow patterns

### Phase 5: Code Analysis (Steps 22-26)
- Workspace-wide complexity analysis
- Performance hotspot detection
- Architectural health assessment
- Dependency analysis
- Design pattern identification

### Phase 6: Specialized Analysis (Steps 27-29)
- Impact analysis for recent changes
- Security vulnerability scan
- Data flow pattern extraction

## Usage Instructions

1. **Invoke the Prompt**:
   ```
   /copirate-suite
   ```

2. **Confirm Execution**:
   - Review workspace scope
   - Confirm ~10-15 minute runtime
   - Ensure no pending uncommitted critical changes

3. **Execute Suite**:
   ```typescript
   copirate_run_suite({
     request: "Execute comprehensive Copirate analysis suite"
   });
   ```

4. **Monitor Progress**:
   - Real-time progress updates for each phase
   - Completion time estimates
   - Phase-by-phase status reporting

5. **Review Results**:
   - Memory count and clustering insights
   - Database population statistics
   - Analysis summaries with key findings
   - Generated documentation locations

## Success Criteria

- All 29 steps complete successfully
- Memory count > 80 items
- CID populated with functions and documentation
- Analysis results stored in database
- Workspace intelligence refreshed

## Post-Execution

After suite completes:

1. **Check Memory Status**:
   ```
   copirate_memory({ operation: "memory_context" })
   ```

2. **Query Database**:
   ```
   copirate_database({ operation: "cid_stats" })
   ```

3. **Review Analysis**:
   - Check accumulated knowledge summaries
   - Review complexity hotspots
   - Examine architectural health metrics

## Workflow

**Memory-First Protocol**: This prompt BEGINS with memory operations, so no manual memory retrieval needed.

**Guidance Integration**: Automatically leverages:
- prompt-visible memory-first guidance for knowledge management
- `copirate-database` for CID operations
- `copirate-analysis` for code analysis

**Error Handling**: If any phase fails, suite provides detailed error context and recovery suggestions.

## Example Output

```markdown
## 🎯 Copirate Suite Execution Summary

### Execution Overview

- **Duration:** 12m 34s
- **Phases Completed:** 6/6 (100%)
- **Memories Created:** 47 insights
- **Database Records:** 1,284 functions, 89 analyses
- **Errors:** 0 failures
- **Status:** ✅ Complete

## Phase Results

| Phase | Duration | Status | Key Metrics |
|-------|----------|--------|-------------|
| 🟢 Memory Building | 3m 12s | Complete | 47 memories created (18 patterns, 12 solutions, 9 insights, 8 context) |
| 🟢 Database Population | 4m 45s | Complete | 1,284 functions, 156 classes, 23 interfaces indexed |
| 🟢 Codebase Knowledge | 2m 18s | Complete | 12 architectural patterns, 8 integration points discovered |
| 🟢 Business Intelligence | 1m 34s | Complete | 5 domain models, 18 workflow patterns, 34 business rules |
| 🟢 Code Analysis | 50s | Complete | 5 hotspots identified, 23 analyses stored |
| 🟢 Specialized Analysis | 55s | Complete | 3 circular dependencies, 8 API boundaries mapped |

## Memory System Status

### Memory Distribution

| Type | Count | Key Examples |
|------|-------|--------------|
| 🟢 Pattern | 18 | Service registration pattern, DI container initialization, command factory |
| 🟢 Solution | 12 | Memory migration fix (Dec 2025), circular dependency resolution (Jan 2026) |
| 🟢 Insight | 9 | Extension activation sequence, database transaction patterns |
| 🟢 Context | 8 | VS Code API integration points, tool registration lifecycle |

### Memory Quality Metrics

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Average Importance | 7.8/10 | >7.0 | 🟢 Excellent |
| Tagged Memories | 47/47 (100%) | >90% | 🟢 Complete |
| With Relationships | 34/47 (72%) | >60% | 🟢 Good |
| Clustered Topics | 12 clusters | >8 | 🟢 Healthy |

## Database Intelligence Status

### Function Index

| Category | Count | Coverage |
|----------|-------|----------|
| Exported Functions | 1,284 | 100% workspace |
| Classes | 156 | All major services |
| Interfaces | 23 | Core abstractions |
| Type Definitions | 89 | Domain models |

### Analysis Results Stored

| Analysis Type | Records | Status |
|---------------|---------|--------|
| Complexity Metrics | 156 files | 🟢 Complete |
| Dependency Graph | 1,284 nodes | 🟢 Complete |
| Call Hierarchies | 342 traces | 🟢 Complete |
| Pattern Detection | 23 patterns | 🟢 Complete |

### Semantic Search Readiness

| Component | Status | Performance |
|-----------|--------|-------------|
| Embeddings Generated | 🟢 1,284 functions | 2-5ms retrieval |
| Documentation Indexed | 🟢 89 docs | Full-text search ready |
| Code Relationships | 🟢 3,456 edges | Graph traversal enabled |

## Architectural Intelligence

### Key Patterns Discovered

| Pattern | Occurrences | Impact |
|---------|-------------|--------|
| 🟢 Service Container (DI) | 45 services | Central dependency management |
| 🟢 Command Registration | 32 commands | Extensible command system |
| 🟢 Tool Factory | 16 tools | Dynamic tool initialization |
| 🟢 Event Bus | 23 events | Decoupled component communication |
| 🟡 Singleton Services | 12 instances | Consider DI migration |

### Integration Points

| System | Integration Type | Files Affected |
|--------|------------------|----------------|
| VS Code Extension API | Direct calls | 45 files |
| SQLite Database (sql.js) | Repository pattern | 23 files |
| Language Model API | Service abstraction | 12 files |
| File System | Adapter pattern | 18 files |

### Architectural Health

| Metric | Score | Threshold | Status |
|--------|-------|-----------|--------|
| Modularity | 82% | >70% | 🟢 Good |
| Coupling | Medium | Low-Medium | 🟡 Acceptable |
| Cohesion | High | High | 🟢 Excellent |
| Testability | 67% | >60% | 🟢 Good |

## Business Intelligence

### Domain Models Identified

| Domain | Entities | Relationships | Status |
|--------|----------|---------------|--------|
| Memory System | 11 types | 23 relationships | 🟢 Well-defined |
| Code Intelligence | 8 entities | 15 relationships | 🟢 Structured |
| Analysis Pipeline | 6 services | 12 dependencies | 🟢 Clear boundaries |
| Tool Infrastructure | 5 abstractions | 8 integration points | 🟢 Extensible |

### Workflow Patterns

| Workflow | Steps | Complexity | Automation |
|----------|-------|------------|------------|
| Memory Storage | 4 steps | Low | 🟢 Fully automated |
| Database Query | 3 steps | Low | 🟢 Optimized |
| Code Analysis | 7 steps | Medium | 🟡 Partially automated |
| Suite Orchestration | 29 steps | High | 🟢 Fully orchestrated |

## Code Quality Analysis

### Complexity Hotspots (Top 5)

| Rank | File | Complexity | Priority | Recommendation |
|------|------|------------|----------|----------------|
| 1 | 🔴 MemoryStorageEngine.ts | 42 | P1 | Extract query builder class |
| 2 | 🔴 CIDService.ts | 38 | P1 | Split database/search concerns |
| 3 | 🟡 AnalysisPipeline.ts | 28 | P2 | Extract strategy pattern |
| 4 | 🟡 ToolRegistry.ts | 24 | P2 | Simplify registration logic |
| 5 | 🟡 ServiceContainer.ts | 22 | P3 | Document DI lifecycle |

### Code Smells Detected

| Smell | Instances | Impact | Priority |
|-------|-----------|--------|----------|
| 🔴 God Object | 2 classes | High | P1 |
| 🟡 Long Method | 8 methods | Medium | P2 |
| 🟡 Feature Envy | 5 methods | Medium | P2 |
| 🟢 Duplicated Code | 3 blocks | Low | P3 |

### Specialized Analysis Results

| Analysis Type | Findings | Status |
|---------------|----------|--------|
| 🟢 Circular Dependencies | 3 cycles detected | All resolved via interfaces |
| 🟢 API Boundaries | 8 boundaries mapped | Clear service contracts |
| 🟢 Performance Anti-patterns | 2 detected | Documented for review |
| 🟢 Design Patterns | 12 identified | Well-applied |

## Recommendations

### Immediate Actions (Priority 1)

| Action | File | Benefit | Effort |
|--------|------|---------|--------|
| 🔴 Refactor MemoryStorageEngine | MemoryStorageEngine.ts | -67% complexity | 3-4 days |
| 🔴 Split CIDService concerns | CIDService.ts | +testability, -coupling | 2-3 days |

### Short-Term Improvements (Priority 2)

| Action | Impact | Timeline |
|--------|--------|----------|
| 🟡 Extract analysis strategies | +extensibility | 1-2 weeks |
| 🟡 Simplify tool registration | +maintainability | 1 week |
| 🟡 Document lifecycle patterns | +developer onboarding | 3-5 days |

### Long-Term Enhancements (Priority 3)

| Enhancement | Benefit | Complexity |
|-------------|---------|------------|
| 🟢 Automated testing coverage | +confidence | Medium |
| 🟢 Performance benchmarking | +optimization insights | Low |
| 🟢 Memory clustering optimization | +retrieval accuracy | Medium |

## System Readiness

### Knowledge Systems

| System | Status | Capabilities |
|--------|--------|--------------|
| 🟢 Memory Storage | Operational | Store, retrieve, cluster, optimize |
| 🟢 Database (CID) | Populated | Semantic search, relationship mapping |
| 🟢 Analysis Pipeline | Ready | Complexity, patterns, architecture |
| 🟢 Business Intelligence | Active | Domain models, workflows, rules |

### Next Actions

1. **Query accumulated knowledge**: Use `copirate_memory({ operation: "memory_retrieve", content: "..." })` to access stored insights
2. **Search code intelligence**: Use `copirate_database({ operation: "cid_search", query: "..." })` for semantic function discovery
3. **Review hotspots**: Focus on MemoryStorageEngine.ts and CIDService.ts refactoring (Priority 1)
4. **Monitor quality**: Re-run suite after refactoring to validate improvements

### Suite Completion

**Status:** ✅ Complete - All systems operational and ready for intelligent assistance

**Memory Context Restored:** 47 memories available for immediate consultation

**Database Ready:** 1,284 functions indexed for semantic search

**Analysis Available:** 23 stored analyses ready for retrieval
```

## Related Prompts

- `/copirate-complexity` - Focus on complexity analysis only
- `/copirate-docs` - Documentation generation only
- `/copirate-qa` - Quality assurance validation

## Technical Details

**Tool Used**: `copirate_run_suite({ request: "run copirate suite" })`

**Duration**: 10-15 minutes (varies by workspace size)

**Token Budget**: High (~50K+ tokens for full execution)

**Frequency**: Run weekly for active projects, monthly for stable codebases

---



**Last Updated**: 2026-01-18
**Maintained By**: Copirate Team
