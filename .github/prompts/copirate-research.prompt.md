---
name: copirate-research
description: Structured technology evaluation workflow for researching options, comparing alternatives, and producing decision-ready recommendations with appendix material extracted to support docs.
---
<!-- deployment_hash: 6f129336 -->
<!-- Extension Version: 1.32.6 -->
<!-- Deployed: 2026-05-18 -->
<!-- Copirate Ownership: canonical Copirate prompt assets are extension-owned. Refresh may overwrite edits to this shipped file. Save local variants under a new filename instead of modifying the registered Copirate asset in place. -->

# Copirate Research & Technology Evaluation Methodology

> **Invocation**: `/copirate-research` in Copilot chat

## Purpose

Provide a systematic research workflow for evaluating technologies, frameworks, approaches, or best practices and turning that work into a decision-ready recommendation.

## When To Use

- Evaluating a new technology or framework
- Comparing multiple solutions for a specific use case
- Researching best practices for a domain
- Assessing adoption, replacement, or migration decisions

## Methodology Phases

Use the phases below as an ordered checklist. Finish the current phase before moving to the next unless new evidence requires revisiting an earlier phase.

### Phase 0: Objective Definition

- Define the problem statement and the current pain points.
- Separate must-have requirements from differentiators.
- Record time, budget, compatibility, or organizational constraints.
- Define success and failure criteria.

### Phase 1: Information Gathering

- Pull primary sources first: official docs, source repos, technical articles, benchmarks.
- Add secondary sources only after primary-source grounding: community feedback, issues, discussions, conference material.
- Run bounded hands-on experiments when they significantly clarify key decision factors or reduce critical unknowns.
- Reuse existing memory or prior research before redoing known work.

### Phase 2: Structured Analysis

- Build a comparison matrix across the critical criteria.
- Evaluate architecture, dependencies, extension points, and integration posture.
- Review performance, security, maintenance, and support health.
- Compare migration or adoption complexity, not just feature checklists.

### Phase 3: Decision Framework

- Apply a weighted scoring rubric.
- Identify the top-candidate risks and mitigations.
- Outline adoption steps, timeline, resources, and rollback posture.
- Document credible alternatives with explicit tradeoffs.

### Phase 4: Recommendation

- State one primary recommendation.
- Explain the rationale against the scored criteria.
- Include why-not-alternative reasoning.
- Provide the next implementation or proof-of-concept steps.

### Phase 5: Artifact Creation

- Create the markdown research artifact.
- Store durable insights when they will help later sessions.
- Create follow-up work only when the recommendation implies concrete execution.

## Tooling Guidance

- Use `fetch_webpage` for authoritative external documentation.
- Use `copirate_knowledge` or `copirate_memory` before external fetches when the repo may already contain relevant precedent.
- Use `runSubagent` only for bounded research fan-out where synthesis still stays in this workflow.

## Output Contract

- Produce a decision-ready summary, not raw notes.
- Separate evidence, analysis, risks, and recommendation.
- Call out unknowns explicitly.
- Keep the primary recommendation and next steps concise.

Use `.github/prompts/support/copirate-research/appendix.md` for the detailed example application, best-practices list, full methodology checklist, metadata, and reference notes.

## Success Criteria

1. Objectives and evaluation criteria are explicit.
2. The recommendation is grounded in cited evidence and comparative analysis.
3. Risks and adoption posture are visible.
4. The final output is decision-ready instead of exploratory noise.
