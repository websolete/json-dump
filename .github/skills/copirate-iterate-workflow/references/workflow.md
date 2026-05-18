# Iterate Workflow Reference

## Work-Order Gate

- Before starting open-ended iterate execution, decide whether the task should be elevated into a work order instead.
- Elevate when the task needs phased rollout, cross-file coordination, explicit acceptance criteria, or a durable handoff or restart boundary.
- Check for overlapping pending work orders before creating a new one; if one exists, resume or refine it instead of running a parallel ad hoc execution.
- In interactive runs, offer a bounded choice between resuming the relevant work order, creating or refining one through `/copirate-planner`, or continuing ad hoc without a work order.
- In higher-autonomy runs, if the work-order threshold is clearly met and no overlapping active work order exists, self-select the planner path and report the elevation before continuing.

## Phase Model

1. Work-order gate when the task may need durable planning
2. Objective search and memory retrieval
3. Task decomposition and first execution step
4. Focused validation after each substantive edit
5. Completion challenge and evidence review
6. Final closeout with learned-pattern capture when appropriate

## Self-Assessment Contract

Each assessment should cover:
- current status: continue, complete, or blocked
- confidence and evidence summary
- what was validated
- what still needs verification
- the next concrete action

## Completion Gates

- Do not mark complete until the key requirements are met and the touched slice is validated.
- If confidence is below the completion threshold, explain why and continue or block accordingly.
- Treat unresolved integration risk or missing executable validation as a reason to keep going.
