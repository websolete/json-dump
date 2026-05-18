<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->
# Copirate Playwright Support - Workflow Appendix

## Coverage Sweep Batch Mode

Use this appendix when the active workflow stage is Phase 3 and the user is doing breadth-oriented coverage expansion.

If a current ratified planning surface or shared handoff-backed candidate set already exists for the active app corpus, use its retained candidates as the default batch input. Keep deferred or blocked candidates out of the batch unless the user explicitly asks to widen scope or newer executable evidence supersedes the current ratified set.

### Batch scoping question

```typescript
vscode_askQuestions({
	questions: [{
		header: 'playwright_batch_confirm',
		question: 'Coverage batch: I have [N] entry point candidates ready for landing-oriented scenario generation. Confirm to proceed with the batch, or adjust the list.',
		options: [
			{ label: 'Proceed with this batch', recommended: true },
			{ label: 'Let me adjust the candidate list' },
			{ label: 'Cancel batch mode, work on one scenario' }
		],
		allowFreeformInput: true
	}]
});
```

### Batch execution detail

1. Generate one bounded scenario package per approved candidate.
2. Retrieve the landing-oriented spec stencil and any profile-entry stencil before generation.
3. Emit one compact progress line per candidate as the batch proceeds.
4. Do not use batch mode for multi-step functionality-realm slices; keep those one at a time so scenario-profile fit, safety boundaries, and stop points can be reviewed explicitly.

### Batch validation gate

```typescript
vscode_askQuestions({
	questions: [{
		header: 'playwright_batch_validate',
		question: 'Batch complete: [N] specs created. Run Playwright validation on the batch before continuing?',
		options: [
			{ label: 'Yes, validate the batch now', recommended: true },
			{ label: 'Skip validation, continue to next batch' },
			{ label: 'Stop here' }
		],
		allowFreeformInput: false
	}]
});
```

### Batch completion prompt

```typescript
vscode_askQuestions({
	questions: [{
		header: 'playwright_batch_continue',
		question: 'Batch done: [N] specs, [N] profiles, [N] sidecars. Continue to next batch or stop?',
		options: [
			{ label: 'Continue to next batch' },
			{ label: 'Stop coverage batch' }
		],
		allowFreeformInput: false
	}]
});
```

### Codegen-first follow-up shape

```typescript
vscode_askQuestions({
	questions: [{
		header: 'playwright_codegen_next_step',
		question: 'This candidate looks closer to a direct bounded UI landing than to a legacy shell or frame flow. Do you want to start with Playwright codegen first?',
		options: [
			{
				label: 'Yes, start Playwright codegen with the confirmed target',
				description: 'Use plain codegen for auth-free capture, or --save-storage / --load-storage for auth-required flows',
				recommended: true
			},
			{
				label: 'Open Playwright auth onboarding first',
				description: 'Command: copirate.playwright.onboarding.open'
			},
			{
				label: 'No, continue with bounded Copilot draft generation',
				description: 'Skip codegen and create the first draft spec directly'
			}
		],
		allowFreeformInput: false
	}]
});
```

## Procedure-Import Discovery Follow-Up Shapes

The contract-bearing discovery policy lives in the main `/copirate-playwright` prompt body. Use these appendix shapes only after the main prompt has already named the current outcome.

### `dom-ambiguity` escalation

```typescript
vscode_askQuestions({
	questions: [{
		header: 'procedure_import_dom_ambiguity',
		question: 'Repo evidence and a lightweight probe narrowed the route, but the durable selector target is still ambiguous. Do you want to use selective Playwright codegen as the next bounded discovery aid?',
		options: [
			{ label: 'Yes, use selective codegen for this bounded route', description: 'Capture selector evidence, then normalize it before adoption', recommended: true },
			{ label: 'No, stop and let me revise the route or workflow assumptions', description: 'Treat the ambiguity as a blocker instead of escalating to codegen' }
		],
		allowFreeformInput: false
	}]
});
```

### Blocked discovery outcome summary

```text
Procedure-import discovery is blocked. Current outcome: [blocked-source-quality | blocked-route-mismatch | blocked-auth-session | blocked-environment-unreachable]. This is not a codegen problem; the route should stop until the blocker is resolved.
```

## Discovery Follow-Up Question Shapes

These follow-up shapes assume the main prompt has already reused any current ratified planning surface for the active app corpus before naming the top recommendation.

### Breadth mode

```text
I found likely missing or weakly covered Playwright candidates from the current retained shortlist. Do you want me to generate the next scenario now, start with Playwright codegen for the top recommendation, or choose a different retained candidate from the short list?
```

### Depth-gap mode

```text
I found retained routes with L1 landing coverage where the next useful protection is a bounded L2 interaction-depth or multi-step functionality-realm slice. Do you want me to generate that scenario for the top recommendation, or choose a different retained candidate?
```

### Functionality-realm mode

```text
I found a retained workflow family where another landing check would add little value, but a bounded multi-step functionality-realm scenario would protect meaningful user behavior. Do you want me to generate that L2 scenario for the top retained recommendation, or choose a different retained candidate?
```

#### Multi-step functionality-realm progression

1. Keep the same confirmed actor and scenario profile from the retained L1 anchor whenever possible.
2. Expand one retained workflow family at a time; do not mix unrelated branches into a single spec.
3. Prefer one happy path or one validation/failure path per spec, with an explicit stop point before uncontrolled downstream delivery.
4. If a deeper slice needs a new role, environment target, or reusable runtime value, stop and return to Project Strategy / Scenario Profiles before drafting the spec.
5. If the remaining branch crosses the local-only widening boundary, keep that branch blocked and preserve the smaller validated slice as the current stopping point.
