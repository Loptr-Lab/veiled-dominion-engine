# AI literacy source and implementation record

Reviewed 7 November 2026. This is a proposed educational addition, pending maintainer review and publication.

## Continuity

Base: `Loptr-Lab/training` main `877c4bfe4ce6ca677667be735df747a6e7e63369`.
Inspected all remote branches, current open issues (#42, #45), open PRs (#38, #47, #50, #52), existing prompt library, reviewer scorecard, CONTRIBUTING, contributor governance, PIXIE contributor instructions, shared stylesheet and reading controls. No existing introductory rubric class was located. Preserve those assignments and the existing site; no other project repository, PIXIE backend/authentication/release or plugin is changed.

Read the [canonical ecosystem architecture](https://github.com/ibloud/ibloud.github.io/blob/main/docs/ECOSYSTEM_ARCHITECTURE.md). PIXIE list_projects and refreshed training status were consulted; its dated snapshot predates current main and was not treated as current capability verification. prepare_checkpoint produced an unsubmitted draft for this task. No issue, membership or assignment is claimed. If using that workflow, the participant reviews public visibility and GitHub attribution before submitting and retains that issue URL. Continue progress there; do not add a second tracker.

## Source checks

Direct shell HTTPS to the research domains was blocked by the environment allowlist. The connected web research tool retrieved the following original-publisher pages on 7 November 2026. Accessing a reference does not imply endorsement. No external article was copied into the course.

| Reference | Evidence and use |
| --- | --- |
| [BLS, 16 July 2026](https://www.bls.gov/opub/ted/2026/artificial-intelligence-information-technology-and-employment-2024-34.htm) | Original table: data scientists 33.5%; software developers 15.8%; total employment 3.1%, all projected 2024–34. Also discusses occupations with declining demand. |
| [BLS, January 2026 overview](https://www.bls.gov/opub/mlr/2026/article/industry-and-occupational-employment-projections-overview.htm) | Chart 3 and occupational table: computer and mathematical group 10.1%, 2024–34. Population includes wage/salary jobs and self-employment. |
| [Stanford HAI AI Index 2026](https://hai.stanford.edu/ai-index/2026-ai-index-report) | Report landing page and capability/economic overview retrieved. Used for uneven capabilities and further reading; no benchmark statistics republished. |
| [Stanford Report, 21 October 2026](https://news.stanford.edu/stories/2026/10/ai-labor-market-economic-trends-data) | Describes payroll-based early-career declines, data representation cautions and dashboards. Summarized without conflating observed trends with projections or causal proof. |
| [Lightcast 2026](https://lightcast.io/resources/research/stanford-ai-index-2026) | Publisher page retrieved; describes job-posting/skills data. Linked as context; no numerical claims imported. |
| [OpenAI evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices) | Concepts and evaluation guidance retrieved. Intermediate reference; no hosted evaluation dependency. |
| [Microsoft eval-guide](https://github.com/microsoft/eval-guide) | Repository overview retrieved. Intermediate agent evaluation guidance. |
| [Anthropic educational evals](https://github.com/anthropics/k12-teacher-skills/tree/main/evals) | Web tool could not retrieve this subdirectory. GitHub API directory listing and raw `evals/README.md` retrieved successfully; contains classroom-artifact rubrics and human/deterministic evaluation use. Beginner to intermediate reading. |
| [Inspect scoring](https://inspect.aisi.org.uk/scoring.html) | Documentation retrieved. Advanced software framework with standard/custom scoring. |
| [Google ADK criteria](https://github.com/google/adk-docs/blob/main/docs/evaluate/criteria.md) | File retrieved. Advanced agent evaluation metrics. |
| [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) | Official framework landing page retrieved; risk-management context for checking unsupported claims. |
| [BLS Occupational Outlook Handbook](https://www.bls.gov/ooh/) | Retrieved; independent non-referral career research route. |
| [Handshake referral](https://joinhandshake.com/move-program/referral?referralCode=AB04EB&utm_source=referral) | Owner-supplied URL retained verbatim with visible financial-interest disclosure and `rel=sponsored`. Exact referral destination and this code’s/account’s eligibility remain **unverified**: web tool could not access it; direct HTTPS remained blocked. Main Handshake website and official Help Center terms were retrieved, which do not verify this specific referral route or account. Reward numbers, caps, UK role examples and vacancy claims are omitted from learner copy. |

The user approved read-only HTTPS access to seven requested source domains during this task. Refreshing environment status still showed the original allowlist; a fresh direct Handshake request remained 403. No proxy or access policy was bypassed. Other references were verified through the connected research tool as above. Check the exact referral destination manually before publication. Official Help Center guidance and terms (updated 13 August 2026) were subsequently retrieved through connected web research: [program guidance](https://support.joinhandshake.com/hc/en-us/articles/32245577478295-Referring-someone-to-the-Handshake-AI-Fellowship), [terms](https://support.joinhandshake.com/hc/en-us/articles/34271833422871-Handshake-AI-Fellowship-Referral-Program-Terms-of-Service). These support the general 10%/10-hour/40-hour description with a six-month window and active-account/onboarding/paid-production qualifications, but do not establish the owner’s account or referral code eligibility. The course links the official terms and retains the general financial-interest disclosure without numerical inducements.

## Data architecture decision

| Approach | Cost and reliability | Decision |
| --- | --- | --- |
| Versioned static JSON plus HTML | No service cost, works without JavaScript; reviewed values are reproducible. Manual updates can become old. | Implemented. JSON holds provenance and values; publication validator checks HTML parity and required metadata. Visible verification date always remains. Optional age text warns after 180 days. |
| Scheduled refresh | Requires a stable machine-readable series, schema/range checks, failure retention and approved publishing workflow. Existing CI validates a starter engine; no approved data-release workflow or verified feed was found. | Deferred. No scheduled job, scraping, credentials or API dependency added. |
| Outbound maintained research links | No local feed cost; destinations change and depend on internet access. | Included alongside snapshot as further context, not embedded “live” data. |

Updates require a reviewed PR: verify original publication, population, units and period; update JSON, HTML and verification date/age constant together; run publication checks. Missing data must not become estimates. No automatic refresh exists, so refresh-failure testing is inapplicable; browser tests simulate an old snapshot. A missing remote source does not remove the retained HTML/JSON.

## Teaching and privacy limits

All task facts, vendor names, travelers, rates, dates and responses in the itinerary are explicitly fictional. No model API, accounts, analytics, fetch requests or learner database. Reading preferences retain the existing device-local controls. Written criteria live in memory until reset/reload, with an explicit download option. Text is rendered with textContent, not interpreted as HTML.

Multiple-choice practice is deterministically checked with one retry. Open writing gets keyword-based wording hints, a worked correction reference after revision, and a targeted human self-review checklist. These hints are not semantic grading. The eight-check worked rubric is expressly incomplete: B can earn 12 despite violating the dietary requirement; the class explains adding full coverage/hard gates. No score implies qualification or acceptable real-world performance.

## Local preview and review boundary

`python -m http.server 8765 --directory docs`, then open `http://localhost:8765/ai-literacy/`.
No Vercel configuration, existing project binding or deployment workflow was found. No new Vercel project or production deployment was created. The public GitHub Pages URL reflects approved main, not this feature branch. Maintainer approval controls merging and publication.

## Classroom-pilot additions requested during review preparation

The user requested fresh scenarios, an end scoring record, two unsuccessful attempts with a scenario-specific study guide after the first and an alternative learning route after the second, and Cornell as further study.

Implemented a local seeded fictional-scenario generator. Each page session uses a fresh browser-crypto seed; download preserves the seed, facts and response. A second assessment attempt keeps its study facts and changes the mistakes. Fixed arithmetic generation supports deterministic checking without adding a model service or changing PIXIE. The eight teaching practices retain their own one-retry behavior; the final assessment separately allows two full four-step attempts. Its explicit target is 4/4, chosen for this exercise, not validated as a hiring or qualification standard.

First unsuccessful assessment: guide addresses the particular incorrect total, closure interpretation or signed-score step. Second unsuccessful assessment: alternative tasks refer only to correct checks observed in either attempt; if none were correct, the page offers interest-based tracks without inventing strengths. No conclusion about employment suitability is made. Session evidence, guide and next action can be downloaded and reviewed before manually sharing a synthetic checkpoint with PIXIE. No automatic classroom progress database, cross-session failure count or plugin integration is claimed.

[Cornell Center for Teaching Innovation: Using rubrics](https://teaching.cornell.edu/teaching-resources/assessing-student-learning/using-rubrics) was retrieved and verified via connected web research on 7 November 2026. This is a teaching-resource guide, not an enrolled class. It discusses measurable criteria, feedback and revision; broader performance-level rubrics differ from the atomic PASS/FAIL lesson. Linked in the resource library and scenario study guides. Cornell is not a program partner or endorser.
