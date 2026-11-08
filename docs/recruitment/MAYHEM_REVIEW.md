# Gods of Mayhem recruitment preview review

Implementation date: 2026-11-08. Scope: implementation, testing and preview only. This document records evidence and limitations, not launch approval.

## Repository and continuity audit

Target: `Loptr-Lab/veiled-dominion-engine`, branch `feat/gods-of-mayhem-recruitment`, based on main `ff3d29f97eeaa64792b0e3daa5b1ab132d0febbf`.

The repository's [CNAME](../../CNAME) names `loptrlab.com`; its existing Pages configuration confirms this is the studio-domain site. The existing Vercel project is `veiled-dominion-engine`, project ID `prj_FCf7e96Ud0oe2uroCsKBnUf1qhmO`, team `loptr-lab`. No new application, repository or deployment project was created. `/mayhem/` is a route within that static site. `mayhem.loptrlab.com` is proposed, not configured by this work.

Reviewed the studio governance repository [`ibloud/ibloud.github.io`](https://github.com/ibloud/ibloud.github.io), especially its ecosystem architecture, mission and collaboration routes. It is not the current studio-domain deployment target. Training remains the separate canonical learning repository. No unrelated project was changed.

Open engine PRs at audit: #57 contributor test baseline, #53 original tarot experiment, #44 historical variants, #37 ecosystem architecture, #36 historical lineage, #29 training links, #6 documentation CI and #4 documentation setup. Their unfinished work was not incorporated or overwritten. PR #57 independently documents the exercise-harness baseline below.

Gameplay authority: [rulebook](../RULEBOOK_v0.1), [canon](../CANON_AND_CONTINUITY.md), [architecture](../../ARCHITECTURE_OVERVIEW.md), README and GDD. The four-player asymmetric design is distinguished from the separate two-player Duet experience. A finished four-player competitive service was not verified, so the page links the rules/build documentation rather than inventing a playable or ranked destination. No rules changed.

## Existing functionality reused

- `training/training.css`: appended a scoped `data-brand=mayhem` variant and `.mayhem` components. The original stylesheet prefix remains unchanged.
- `training/training-display.js`: existing device-local theme/text controls, including storage-failure fallback and reduced-motion CSS.
- Studio footer navigation: one `/mayhem/` link. Other routes and engine code remain unchanged.
- Existing `questions@loptrlab.com` contribution-contact route, documented in the owning source and studio governance. No arbitrary public GitHub issue is created; existing issue templates restrict unstructured issues.
- Existing Training/PIXIE public contribution pathway is an optional alternative. A public checkpoint is not a confidential application.
- Original user-supplied brand assets; [provenance and rights record](../../mayhem/assets/README.md).

Changed files: `index.html`, `training/training.css`, `mayhem/index.html`, `mayhem/recruitment.js`, two `mayhem/assets/*.jpg` files and their README, `scripts/test-mayhem-browser.cjs`, and this directory's review/preparation documents. No production domain or LinkedIn settings changed.

## Application verification and data flow

The implemented vertical slice prepares a short draft locally, validates required fields, lets the applicant review it, and provides a fixed-recipient mailto handoff plus exact-text download. Each department preselects its form category. Every edit invalidates the previous review and email link. Clear resets the draft. With JavaScript disabled, the contact address and instructions remain available.

No browser network request is made with applicant input. No applicant localStorage, account creation, email-address collection, analytics or CRM write is introduced. Only existing reading preferences persist. A manually downloaded file and the applicant's chosen email provider have their own storage behavior. Nothing is submitted by the web page.

Browser tests verify recipient, encoding, exact draft contents and downloaded bytes without invoking a mail client or sending mail. Mail delivery, inbox access, reviewer staffing, retention/deletion policy and response times are not verified. This is a working applicant-controlled contact handoff, not an application-submission backend.

Specific backend gap: no approved recruitment endpoint or authoritative consent/member-record integration was found in the audited sources. Future submission/identity integration needs an owner, data/retention contract and separate authorization before any new service is introduced. It is unnecessary for this preview's contact handoff.

Sifa.ID was verified as an external ATproto professional-profile service, not as a deployed Loptr recruitment backend. A public profile can optionally be included as a link; it is not fetched or verified. [Player identity/ranked integration](../PLAYER_IDENTITY_AND_RANKED_INTEGRATION.md) describes planned infrastructure; planned rpg.actor/ATproto capabilities are not represented as live. PIXIE project status was consulted for discovery, then checked against owning-source main; the ecosystem snapshot alone was not treated as current implementation evidence.

### Record-state boundary

| State | Meaning / evidence needed |
| --- | --- |
| Prospect | Public professional research only; no contact or consent implied. |
| Reviewed prospect | Human has checked current role, relevant evidence, fit and conflicts; not an invitation. |
| Invited candidate | Separately authorized invitation actually sent and recorded. None sent here. |
| Interested applicant | Person chooses to express interest. A locally prepared draft alone does not establish receipt. |
| Playtest participant | Specific participation and access agreed and recorded by the owning process. |
| Accepted member | Explicit role/membership approval and consent record; never created from a Clay record. |
| Crowdfunding subscriber | Separate voluntary marketing consent with unsubscribe/retention process. Not implemented here. |

## Clay research

Connected workspace [1458439](https://app.clay.com/workspaces/1458439) was verified. Company/role discovery and task-context reads returned public professional leads. No paid enrichment function, personal email lookup, invitation, campaign or member import was run. Search operations were not assumed to be a free unlimited service; no extra credits were purchased.

A separate research slate is kept outside public source/assets. The target allocation is 8 chess/strategy, 5 grassroots esports, 4 game-design/playtesting and 3 accessible-gaming/community leaders. Search results include self-described platform coaches and senior national-body executives: platform affiliation is not employment proof, and national leadership does not prove grassroots captain experience. Those distinctions are flagged, rather than padding a supposedly qualified cohort of 20.

Review tasks: chess `mcp-task_0to6p7xKGBhmrXSwiuo`; esports `mcp-task_0to6p8vnE7c4nKSzocB`; game development `mcp-task_0to6p8xnfN6P8fFR44G`; accessible community `mcp-task_0to6p86GcHGsDq9iH6u`. Additional designer/owner searches produced graphic-design leads or zero matches; they were not silently relabeled game designers. Three supplemental designer leads were checked against public publisher/creator pages instead. No willingness, relationship, endorsement or availability is inferred.

## Verification

Local Chromium, Playwright 1.56.1 and axe-core 4.11.0; system Chromium executable. No new runtime dependencies.

- 36 browser assertions passed: keyboard skip link; focused, linked required-field errors; all four department CTAs; unsafe/non-HTTPS/credentialed URLs rejected; text rendered literally; exact mailto recipient/body; exact download; stale draft invalidation; reset; preference persistence; applicant storage/network absence; image decoding; root navigation and no-JavaScript contact fallback.
- Ten axe WCAG 2 A/AA + 2.1 AA scans: zero violations in dark/light at 320, 375, 768, 1024 and 1440 CSS pixels, using the largest reading preference. No horizontal page overflow at those settings.
- Reduced-motion context exercised; no animated recruitment elements. Desktop and mobile screenshots visually inspected.
- `npm run typecheck` passed. Existing Jest baseline: 24 integration tests passed, 24 starter exercise tests failed in two suites. `engine.ts` still contains intentional `Not implemented` placeholders; this change does not modify them. The existing CI explicitly recognizes this exercise state. This is not an all-tests-pass claim.
- Physical iPad Safari and VoiceOver have not been tested. Chromium viewport checks and automated rules do not establish those results. Physical checks remain a release gate.

Reproduce optional browser verification without adding project dependencies:

```sh
npm install --prefix /tmp/mayhem-browser-tools --cache /tmp/mayhem-npm-cache --ignore-scripts --no-audit --no-fund playwright@1.56.1 axe-core@4.11.0
python -m http.server 8770 --directory .
# In another shell, with /usr/bin/chromium available:
NODE_PATH=/tmp/mayhem-browser-tools/node_modules node scripts/test-mayhem-browser.cjs
```

`MAYHEM_TEST_URL` can override the local origin; this script expects a local static server and forbids third-party requests. `MAYHEM_AXE_REPORT` overrides `/tmp/mayhem-axe.json`. It does not send mail. Authenticated Vercel preview verification is recorded on the PR, separately from the local browser run.

## Production gates

Do not merge or promote this branch without separate approval. Before launch: confirm artwork ownership/publication channels; test physical iPad Safari/VoiceOver; verify inbox ownership and agree review/privacy/retention responsibilities; approve selection and participant-record procedures; configure and verify the proposed subdomain; approve public copy and LinkedIn changes only after the destination works. Campaign rewards remain unavailable concepts until budgets, fulfillment, rights and terms pass their separate gates.
