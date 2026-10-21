# Training publication and routing — 21 October 2026

Public entry: https://loptrlab.com/training/ . Serve the current guide directly;
do not add a JavaScript redirect, meta refresh, iframe, or old curriculum wrapper.
The normal HTTP redirect from `/training` to `/training/` is directory normalization.

The curriculum's authoring authority remains `Loptr-Lab/training`, `docs/`.
The files here under `training/` are generated publication copies. Their exact
source revision is recorded in `training/publication-source.json`. Edit the owning
training repository, regenerate its HTML as required there, then refresh this
publication; do not maintain a competing curriculum by editing the copies.

To update after a training change, the maintainer checks out both repos, then runs
`python3 scripts/sync-training-site.py /absolute/path/to/training-checkout` from
this repository. Review `git diff --stat` and source revision, check local HTML
links, commit the generated publication plus sitemap and provenance, and push main.
The existing GitHub Pages branch build publishes it. Verify the deployed landing,
career tracks, equipment and PIXIE contributor pages before reporting completion.
This is a maintainer-run sync, not an automatic cross-repository release.

The old engine curriculum remains `training/engine-curriculum.md`, published at
https://loptrlab.com/training/engine-curriculum/ . Do not overwrite or delete it.
The GitHub-hosted training site remains an accessible alias; its canonical
metadata points to the branded public pages. No DNS or Pages domain change is
required. One canonical URL per HTML page and the branded sitemap identify the
preferred publication; canonical tags do not guarantee a search-ranking outcome.

The removed `training/index.md` used a Jekyll theme, a body-level zero-second meta
refresh and JavaScript replacement. Its theme rendered before navigation, and
Jekyll's own canonical conflicted with the canonical embedded in that body. This
explains the reported flash and host change; no cache clearing should be required
to fix the underlying source. CDN caches may briefly retain the previous page.

Canonical metadata in the owning training repository was aligned in commit
`1abf60c40bba568dd11809546f106c4656af1475`; visible curriculum content is unchanged.


Acceptance check: the public landing must return HTTP 200 at the branded URL,
with one canonical tag, no client redirect, and working equipment/contributor links.
