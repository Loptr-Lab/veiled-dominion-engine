# Frontend Bundling & Runtime Notes

## Purpose

Document how bundled HTML artifacts are unpacked and executed in-browser, so failures are diagnosable.

## Observed runtime model (current)

The bundled page includes:

- `script[type="__bundler/manifest"]` — UUID-keyed asset metadata + base64 payload.
- `script[type="__bundler/template"]` — HTML template string referencing UUID asset URLs.
- Optional `script[type="__bundler/ext_resources"]` — resource mapping metadata.

### Runtime sequence

1. On `DOMContentLoaded`, loader reads manifest/template script tags.
2. For each UUID asset:
   - base64 decode → bytes
   - optional gzip decompress (`DecompressionStream` when available)
   - create blob URL by MIME type
3. Replace UUID references in template with blob URLs.
4. Remove `integrity` / `crossorigin` attributes from rewritten script tags.
5. Parse rewritten template via `DOMParser`.
6. Replace current `documentElement`.
7. Re-insert scripts to force execution order.
8. If Babel is present, call `Babel.transformScriptTags()`.

## Operational concerns

- If `DecompressionStream` is unavailable, compressed assets may not render correctly.
- Replacing `documentElement` can hide earlier load-state context during debugging.
- Runtime error reporting is surfaced via a fixed-position `#__bundler_err` panel.

## Debug checklist

1. Confirm manifest/template tags exist.
2. Validate JSON parse of manifest/template blocks.
3. Verify every UUID in template resolves to a blob URL.
4. Check browser support for `DecompressionStream` if `compressed=true`.
5. Confirm script execution order after DOM replacement.
6. Inspect `#__bundler_err` and browser console for asset-specific failures.

## Future hardening ideas

- Add integrity checks before blob URL creation.
- Emit structured telemetry for decode/decompress/render phases.
- Add fallback decompression path when `DecompressionStream` is absent.
