# AGENTS.md

Follow existing CONTRIBUTING.md, project canon and rights gates. Read the full registry before code work. Known touch-points are not exhaustive; search for other consumers and update this registry in the same change. Report consulted IDs and actual test results; a self-reported check is not proof.

## PACS Registry

Convention adapted from Pietro Impagliazzo's [PACS specification](https://github.com/pietro-works/PACS/blob/main/SPEC.md), MIT. No upstream CLI or hooks installed.

```yaml
PACS0001:
  anchor: "training/training-display.js:site-breadcrumbs"
  sync_with:
    - "field-notes/index.html"
    - "field-notes/putting-ourselves-to-work.html"
    - "field-notes/one-universe-many-entrances.html"
    - "scripts/check-field-notes-breadcrumbs.cjs"
  fails_silently: "Field Notes renders a duplicate visible breadcrumb navigation although the HTML and build remain valid."
  justification: "The shared display script selects a particular JSON-LD ID to generate visible navigation; Field Notes requires metadata only while retaining the same reading controls."
  verify: "scripts/check-field-notes-breadcrumbs.cjs"
```

Use field-notes-breadcrumbs for Field Notes JSON-LD; preserve the Training selector and reading controls. CI must fail when this registry or its required invariant disappears. Deployment and device acceptance are separate from source checks.
