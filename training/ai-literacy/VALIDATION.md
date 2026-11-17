# AI literacy review evidence

7 November 2026. Feature-branch proposal; no deployment or physical-device acceptance claimed.

## Verified locally

- `node scripts/validate-ai-literacy.cjs`: PASS. Required snapshot provenance, four HTML/data values, local links/fragments, eight steps, exact per-person/party costs, signed scoring and split-weight arithmetic.
- `node --check docs/ai-literacy/rubrics.js` and `snapshot.js`: PASS.
- `npm run typecheck`: PASS.
- `ARTIFACT_DIR=/workspace/work node scripts/test-ai-literacy-browser.cjs`: PASS using installed Playwright and `/usr/bin/chromium` against a local static server. All seven quizzes: incorrect attempt, one retry, correction reveal, reset and correct answer. Score practice: signed penalty, retry, reset. Writer: zero-weight rejection, targeted hints, revision example, three drafts, download, reset. Skip-link keyboard route, 20 theme/viewport/largest-text reflow cases (320, 375, 768, 1024, 1440px), simulated snapshot age over 180 days, no-JavaScript answer access and no browser errors.
- Automated axe-core WCAG 2 A/AA and 2.1 AA scan: zero violations or incomplete findings across both pages in both dark and light themes, using local Chromium. This is an automated scan, not screen-reader acceptance.
- Inspected rendered mobile screenshot. Fixed a long native select overflowing at 320px/largest text; all reflow cases then passed. Simplified the labor table to two columns with adjacent source links for narrow screens.
- `git diff --check`: PASS.
- `npm ci --cache /workspace/work/npm-cache --ignore-scripts --no-audit --no-fund`: PASS. Initial default cache installation failed because the environment's home cache was unavailable; changing only the cache path succeeded. No package/dependency changes.

## Baseline starter tests

Before changes: both Jest suites fail; 24/24 tests fail on `Not implemented` starter engine methods. After changes: the same two suites and 24 failures remain. No engine, engine tests or starter assignment was modified. Existing CI explicitly permits the documented starter state. Do not describe the entire test suite as passing.

## Reproduce

From repository root:

```sh
node scripts/validate-ai-literacy.cjs
npm run typecheck
npm test -- --runInBand
python -m http.server 8765 --directory docs
```

Open `http://localhost:8765/ai-literacy/`. In another terminal, where Playwright and a browser are available:

```sh
BASE_URL=http://127.0.0.1:8765 BROWSER_EXECUTABLE=/usr/bin/chromium node scripts/test-ai-literacy-browser.cjs
```

Playwright/axe were available or installed only in the review workspace, not added to the site's package manifest. The publication validator runs in existing CI without new dependencies. There is no application build script: `docs/` is the static site payload; no build step or new hosting service is required.

## Remaining acceptance

- Physical iPad Safari, VoiceOver, actual browser zoom and independent beginner completion have not been tested. Largest reading size and narrow CSS viewport tests do not substitute for those checks. WebKit launch was attempted but its browser executable is not installed in this environment.
- Exact owner-provided Handshake referral destination/account eligibility remains unverified; official general terms are retrieved and linked. Check the exact URL manually before publishing. Reward numbers and vacancy claims are omitted.
- Open-ended feedback is a keyword heuristic, never a semantic grader; learners must use the provided checklist and evidence.
- No Vercel binding/configuration or existing preview workflow was found. Local preview only; no new Vercel project, production deployment, main push or merge.
- BLS/Stanford evidence and reference verification are recorded in SOURCE_RECORD.md. Static snapshot chosen over an unapproved scheduled publisher. No automatic refresh exists; failure-retention tests for a scheduled job are inapplicable.

## Additional classroom-pilot verification

- 1,024 generated scenario variants (512 seeds × two attempts): PASS. Independently recomputed synthetic prices, meal costs, shuttle allocation, per-person/party totals, printed-response comparisons and signed scoring. Verified study facts remain unchanged on the second attempt while all three response outcomes change; positive, negative and zero scores occur.
- Browser assessment paths: first-attempt success; first failure with scenario guide and Cornell link; second-attempt success; two failures with observed number-checking, rule-checking or arithmetic routes; two failures with no demonstrated strength and an interest-based route. No third assessment attempt offered. Both attempts appear in the downloaded record. Existing eight-step quiz/retry/reset checks still pass.
- No correct-answer feedback is revealed during a final assessment attempt; the completed attempt provides evidence and study. Local record is learner-produced, not independently verified. Reload starts a new session rather than enforcing a permanent learner failure count.
