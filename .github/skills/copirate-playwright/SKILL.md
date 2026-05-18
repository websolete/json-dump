---
name: copirate-playwright
description: Playwright domain guidance for auth bootstrap, scenario generation, and procedure-import contracts. Use this skill behind the `/copirate-playwright` router and extracted Playwright sub-prompts.
---
<!-- deployment_hash: 4c196d363fe99d15eb692dcab5aa5615f1ee7270e76daf701e1fdef517ee1ab7 -->

<!-- Extension Version: 1.32.6 | Deployed: 2026-05-18T20:44:19.564Z -->
<!-- Copirate Ownership: scaffold-once skill package. Copirate may upgrade this file while its deployment markers remain intact; user-modified copies are preserved during standard deployment. -->

# Copirate Playwright

Provides focused Playwright domain guidance for Copirate prompt routing: phase alignment, scenario-profile strategy, scenario-generation conventions, L1-to-L2 coverage progression, auth bootstrap boundaries, and procedure-import contracts, while the parent prompt and extracted sub-prompts keep user-facing workflow control.

## Core Responsibilities

1. Keep the Playwright five-phase model consistent across extracted prompts.
2. Preserve the scenario-profile checkpoint and storage-surface boundaries before deeper authoring.
3. Ground scenario generation in repo conventions, coverage posture, and bounded L1-to-L2 progression.
4. Keep auth bootstrap and procedure import inside their existing safety boundaries.
5. Let the prompt family own user-facing routing while the skill owns durable domain doctrine.

## Reference Files

- `references/phase-model.md` - five-phase model, next-step defaults, and crossover rules
- `references/project-strategy.md` - scenario-profile checkpoint, storage surfaces, and topology fit rules
- `references/scenario-generation.md` - scenario creation doctrine, L1/L2 progression, and local-only widening boundaries
- `references/auth-bootstrap.md` - scaffold and SecretStorage-backed auth rules
- `references/procedure-import.md` - workflow-analysis, DOM discovery, and guarded draft-generation contract
