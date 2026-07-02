# Variant Template

## Summary
Provide a short summary of the variant and what makes it meaningfully different from baseline Veiled Dominion.

---

## Design Goal
Explain the design objective of the variant.

Questions to answer:
- What experience is this variant trying to create?
- What pressure, pacing, or tactical behavior is it trying to emphasize?
- Why should this variant exist instead of remaining a design note?

---

## Mechanical Thesis
Describe the central gameplay idea in 1–3 paragraphs.

Good examples:
- This variant increases positional pressure by shrinking recovery options.
- This variant tests whether asymmetry remains stable under stricter aura interactions.
- This variant explores whether deterministic fear-space can be created without adding randomness.

---

## Rules Delta from Baseline
Document exactly what changes from the baseline ruleset.

### Board / Topology Changes
- 

### Turn Loop Changes
- 

### Piece Changes
- 

### Resource Changes
- 

### Victory Condition Changes
- 

### Status Effect Changes
- 

---

## Deterministic Behavior Requirements
Document implementation-critical behavior.

At minimum, specify:
- exact trigger timing
- effect duration
- overlap or collision behavior
- immunity behavior
- refresh vs stack behavior
- illegal move handling
- resolution priority when multiple effects apply

If a mechanic cannot be described deterministically, it is not ready for implementation.

---

## Edge Cases
Document edge cases clearly.

Examples:
- simultaneous effect conflicts
- sanctuary/immunity overlap
- edge-of-board adjacency logic
- pass-through movement interactions
- elimination-state interactions
- neutral obstacle interactions

---

## Testing Notes
Describe how the variant should be validated.

Include:
- expected gameplay scenarios
- logic cases to test
- balance assumptions worth observing
- whether this is documentation-only or implementation-ready

---

## Public Domain Provenance
If the variant uses public-domain characters, stories, quotations, mythic frameworks, or thematic source material, document provenance here.

Use the guidance in:
- `docs/PUBLIC_DOMAIN_PROVENANCE.md`

Suggested format:
- **Source work:**
- **Original author/creator:**
- **Publication date:**
- **Source link:**
- **Public domain rationale:**
- **What is being used:**
- **Adaptation status:**
- **Notes / limitations:**

If not applicable, explicitly state that the variant is fully original.

---

## Open Questions
List unresolved design questions, assumptions, or implementation uncertainties.

---

## Related References
Link related issues, pull requests, rules sections, or prototype files.

---

## Contributor Notes
Before submitting or implementing a variant, review:
- `docs/VARIANT_SUBMISSION_GUIDE.md`
- `docs/PUBLIC_DOMAIN_PROVENANCE.md`
- `CONTRIBUTING.md`
