# Legacy Modernization Roadmap Reference

Use this reference when the task is still deciding how to stage a legacy CFML modernization effort. Keep the output on the planning side of the boundary. Once the roadmap has selected the target steady-state implementation shape and the next step is authoring that implementation, hand off to `copirate-cfml`.

## 1. Required Roadmap Outputs

Every modernization roadmap should make these items explicit:

- current runtime boundary and compatibility constraints
- dominant legacy patterns and the highest-risk seams
- target steady-state architecture direction
- ordered phases, why each phase comes next, and what it unlocks
- reversible slices within each phase, with rollback checkpoints
- compatibility, security, and performance concerns that apply to each phase or slice
- the explicit handoff trigger into `copirate-cfml`

## 2. Output Shape To Prefer

Prefer a roadmap that makes the sequence visible before describing implementation details.

```md
## Legacy Findings Summary
- Runtime boundary:
- Dominant patterns:
- Highest-risk seams:

## Target Steady-State Direction
- Controllers or entry points:
- Services or orchestration seams:
- Repositories or data access seams:
- Compatibility notes:

## Phased Roadmap
### Phase 1: [goal]
- Why now:
- Exit condition:
- Slices:

### Slice 1.1: [goal]
- Seam:
- Compatibility constraints:
- Security or performance concerns:
- Validation:
- Rollback:

## Handoff To copirate-cfml
- Trigger:
- First modern implementation target:
```

## 3. Phase Ordering Heuristics

Use a sequence like this unless the codebase evidence supports a different order:

1. characterize behavior and locate the riskiest seams
2. stabilize data access and remove obvious security hazards
3. extract service or orchestration seams and reduce shared-state sprawl
4. convert entry points and business-flow control into clearer components
5. hand off to `copirate-cfml` for steady-state modern implementation work

## 4. Reversible Slice Rules

- keep each slice small enough to roll back independently
- avoid mixing unrelated architecture cleanup into the same slice
- define the exact seam being changed before naming the replacement
- include validation and rollback notes in the roadmap, not as an afterthought
- prefer slices that unlock the next seam cleanly rather than maximizing lines changed per pass

## 5. Concern-Coupling Rules

- review compatibility, security, and performance for every roadmap phase and every slice
- carry only the concerns evidenced for that slice; do not force every slice to absorb every cleanup
- if a slice is already extracting a risky query seam, remove SQL injection or obvious N+1 hazards in that same slice
- keep polyfill and runtime-boundary notes attached to the slice that depends on them
- defer unrelated cleanup that does not change the sequencing decision

## 6. Handoff Trigger To `copirate-cfml`

- stay in `copirate-cfml-legacy` while diagnosing patterns, designing the remediation roadmap, and defining rollback-friendly slice boundaries
- hand off once the roadmap has selected the target steady-state implementation shape and the next step is authoring that modernized implementation
- after handoff, use `copirate-cfml` for modern artifact-shape guidance, FW/1 implementation posture, and post-remediation standards
