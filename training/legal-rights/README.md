# Public evidence exercise and export · v1.0.0

Owning sources: [Legal & Rights hub](https://ibloud.github.io/legal-rights/), [PIXIE specification](https://loptr-lab.github.io/pixie-ecosystem-guide/assets/evidence-workflow.html). Independent professional review: PENDING. All records here are synthetic; never replace them with personal records in this public repository.

`package.json` is the sample analytical source. The schema is copied unchanged from the PIXIE guide, its owning source. `report.html`/`report.css` are the portable selectable-text print source. `report.pdf` is generated using the already available Chromium print renderer, with tagged PDF and document outline enabled. No PDF/site runtime dependency is added.

Development commands, after changing report source:

```
CHROMIUM_EXECUTABLE=/usr/bin/chromium node scripts/render-legal-report.cjs
python3 scripts/package-legal-evidence.py
python3 scripts/package-legal-evidence.py --check
```

The render command needs development Playwright and a supported Chromium, as existing browser tests do. The package command uses Python standard library only. It is deliberately restricted to fixed checked-in public synthetic members, not arbitrary private inputs. Rendering can change PDF metadata bytes; regenerate the manifest/ZIP after rendering, then use `--check` without rerendering to check reproducibility of packaging.

Each CSV cell is JSON encoded. Parse CSV then JSON-decode cells to recover exact fields and nested types. Quoted scalar strings remain data rather than spreadsheet formulas. Manifest hashes every member except itself; the ZIP gets an external checksum. Unknown values and prior correction events are retained. No archive import or private ingestion feature is shipped.

PDF review evidence: selectable text, root language `en`, marked structure, H1/H2, Table/TH/TD roles, document outline and extracted section order verified with development inspection tooling; visual pagination inspected separately. No PDF/UA certification or physical iPad/VoiceOver acceptance is implied. The HTML alternative uses no active upload or tracking code. Use Training's exercise page for reading/display controls.

Training PR #55 is unmerged and requires device/owner acceptance. This package is not its Library format and does not claim import compatibility. PIXIE PR #12 release holds remain unchanged. No private account, financial, medical, housing, correspondence or source-recording evidence belongs in this sample.
