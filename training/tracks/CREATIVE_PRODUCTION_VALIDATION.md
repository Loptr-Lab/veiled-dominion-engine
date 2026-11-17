# Creative-production integration review evidence

8 November 2026. Draft proposal; no merge or production release.

## Scope and review inventory

- Primary placement: existing `tracks/hybrid-creative-technology.html` and matching
  Markdown. No standalone course, competing Library or new navigation category.
- All 12 publishers, exact URLs, verification method, level, original practice
  objective and mapped categories: [source record](CREATIVE_PRODUCTION_SOURCES.md)
  and [machine-readable inventory](creative-production-resources.json).
- Source collection: Natan Zaretsky's exact original LinkedIn post. Adjacent credit
  links the direct post. Lesson publishers and assessment-reference hosts are
  credited separately. No infographic or third-party media is reproduced.
- Animation uses the Adobe-hosted rubric's original descriptors by reference;
  Nebraska ACE 2D Production/Interpretation are distinguished; UTS remains
  qualitative criteria guidance. Tampa is optional advanced reading only.
- Existing AI Literacy scoring, two-attempt capstone, downloads, shared CSS,
  preferences and PR #55's Library code are unchanged.
- Creative reviews default to self-assessment. Peer/instructor feedback is
  separately recorded, not authenticated institutional grading. Two saved review
  rounds retain evidence and revision notes; no new numeric aggregation or pass
  mark is invented.

## Exact changed files

1. `docs/tracks/hybrid-creative-technology.html`
2. `docs/tracks/hybrid-creative-technology.md`
3. `docs/tracks/creative-production-resources.json`
4. `docs/tracks/creative-production-review.md`
5. `docs/tracks/CREATIVE_PRODUCTION_SOURCES.md`
6. `docs/tracks/CREATIVE_PRODUCTION_VALIDATION.md`
7. `scripts/test-creative-production-browser.cjs`

## Checks performed

- `npm run typecheck`: PASS.
- `node scripts/validate-ai-literacy.cjs`: PASS, including 1,024 independently
  checked seeded scenarios, costs, signed scoring and retry behavior.
- Existing `scripts/test-ai-literacy-browser.cjs`: PASS. Quiz retries/reset,
  scoring, writing hints/downloads, two-attempt capstone paths, study guides,
  exports, no-JavaScript, preferences and 20 theme/viewport/text cases.
- New `scripts/test-creative-production-browser.cjs`: PASS in Chromium. Actual
  training home → existing tracks index → hybrid track navigation; all 12 source
  mappings and objectives in HTML/Markdown; local links and fragments resolve;
  native resource disclosures; source-link destinations; keyboard skip link and
  disclosure; exact review-file download; locally edited saved-file reopen check;
  no-JavaScript path; reduced-motion setting; 10 light/dark largest-text viewport
  cases (320, 375, 768, 1024, 1440px); no third-party source-page requests or
  JavaScript errors.
- axe-core 4.11.0 WCAG 2 A/AA and 2.1 AA checks on the expanded creative-production
  section: zero violations in light and dark themes.
- `git diff --check` and new browser-script syntax: PASS.
- Visual inspection of the rendered section: shared theme, readable text and
  wrapped attribution links. No new stylesheet or runtime dependency.

Run browser checks with a static server (`python -m http.server 8765 --directory
docs`), Playwright and axe-core available to Node, and Chromium installed.
`BASE_URL`, `BROWSER_EXECUTABLE` and `ARTIFACT_DIR` can override defaults. Browser
test packages were installed in a separate workspace test-tools directory; the
repository's package manifest and lockfile are unchanged.

## Known baseline, separately reported

`npm test -- --runInBand`: 2 failed suites, 24 failed tests on existing
`Not implemented` starter methods. Engine source and tests are byte-for-byte
unchanged from base. These are not introduced creative-integration regressions;
the existing CI starter-state exception remains unchanged. Do not report Jest
as passing.

## Limits

- No physical iPad Safari, VoiceOver, Files provider, actual browser zoom or
  independent learner-completion acceptance. Automated checks do not establish
  those outcomes.
- Six publisher pages were read; six resource links rely on indexed metadata or
  page titles plus the contributor's explicit access confirmation. Full video
  playthrough, enrollment, captions and external software behavior are not tested.
- Resume is explicit local-file editing and saving, not autosave on this static
  page. The test verifies exact download bytes and reopening an edited saved file,
  not an Apple Files/editor workflow or crash recovery. Back up original assets
  separately. PR #55 remains draft; no Library availability or new structured
  creative-record adapter is claimed.
- No new source-identity substitution or unresolved rubric-authority assumption.
  The Adobe-hosted PDF has no individual author credit; hosting is not authorship.
- Preview access may require Vercel sign-in. Preview verification and commit are
  recorded in the draft PR; a preview is not a production deployment.
