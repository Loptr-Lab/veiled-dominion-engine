# 3. Evaluation, AI applications, and generative media

## Evaluation
1. Define success before generating.
2. Create typical and edge cases.
3. Record prompts, inputs, product/model/version and settings where known.
4. Run consistently; score against evidence.
5. Investigate failures; revise; retest to catch regressions.
6. Document limitations and human review.

Criteria: accuracy, instruction adherence, completeness, relevance, clarity, safety, format, source quality, uncertainty. Failure modes include hallucinations, ignored constraints, bias, unsafe output, data leakage, formatting errors, and version changes. Automated evaluation can miss issues.

## Application engineering
- **API:** programmatic interface.
- **Structured output:** format constraints; syntax does not guarantee correct values.
- **Tool calling:** model requests a tool; application validates/authorizes.
- **RAG:** retrieves external data; freshness, access, and source quality matter.
- **Workflow:** ordered tasks/checks.
- **Agent:** iterative tool/step selection; autonomy increases safeguard needs.
- **Observability:** logs/traces/metrics; evaluation and monitoring check behavior over time.

Use the simplest reliable system; prompting may be enough.

## Generative media
Define deliverable/audience/format/duration; choose platform/model; prompt for subject, scene, style, composition, motion, constraints; use rights-cleared references; iterate and log; inspect/export and check provenance, quality, terms.

A model generates/transforms; a platform provides access/interface/workflow and may expose multiple models. OpenArt is a multi-model creative platform, not one model. Compare control, consistency, editing, export, privacy, licensing, availability. Respect rights/consent; disclose synthetic media where context requires; avoid deceptive impersonation.

**Practice:** Sketch a tour companion retrieving official information and displaying sources/dates, with human confirmation before action. Create a fictional concert image/video/audio concept and document iterations.
