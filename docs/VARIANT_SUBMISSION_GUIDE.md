# Variant Submission Guide

## Purpose
This guide defines how contributors should propose, document, and implement new gameplay variants for the Veiled Dominion engine.

A “variant” may include:
- modified win conditions
- altered board topology
- new or modified piece behaviors
- resource system changes
- alternate thematic framing built from approved public-domain or original material

The goal is to keep variant contributions:
- mechanically clear
- reviewable
- deterministic
- legally safe
- aligned with the engine’s architecture and contribution boundaries

---

## What a Variant Must Include

Every variant proposal or implementation must include the following:

### 1. Variant Summary
Provide a short summary of:
- the variant name
- the design goal
- what makes it meaningfully different from baseline Veiled Dominion

### 2. Mechanical Thesis
Explain the central gameplay idea in 1–3 paragraphs.

Examples:
- “This variant increases positional pressure by shrinking safe zones.”
- “This variant rebalances Rebirth around delayed power release instead of constant aura control.”
- “This variant tests whether asymmetry can be preserved with two support-class entities.”

### 3. Rules Delta
Clearly describe what changes from the baseline ruleset.

Use explicit sections such as:
- Board / topology changes
- Turn loop changes
- Piece movement changes
- Resource changes
- Victory condition changes
- Status effect changes
- Edge-case changes

Do not assume maintainers will infer differences from prose.

### 4. Deterministic Behavior
All variant mechanics must be implementable as deterministic logic.

Contributors must explain:
- trigger timing
- effect duration
- collision or overlap behavior
- state refresh behavior
- win/loss priority resolution
- illegal move handling

If a mechanic cannot be implemented clearly, the variant is not ready.

### 5. Edge Cases
Document any important edge cases, including:
- simultaneous effect conflicts
- movement restriction conflicts
- sanctuary/immunity interactions
- aura overlap behavior
- turn-order ambiguity
- elimination state interactions

### 6. Testing Notes
Describe how the variant should be validated.

Include:
- expected gameplay scenarios
- logic cases to test
- balance assumptions worth observing
- whether the contribution is documentation-only or implementation-ready

---

## File and Documentation Expectations

When contributing a new variant, include or update the appropriate documentation.

Recommended structure:
- `docs/variants/<VARIANT_NAME>.md` for the variant design document
- related updates to `README.md` or rules docs if baseline understanding changes
- linked issue or proposal using the appropriate GitHub template

A strong variant document should contain:
- Summary
- Design goal
- Mechanical thesis
- Rules delta
- Edge cases
- Open questions
- Public-domain provenance, if relevant

---

## Thematic and Source Material Rules

Variants may be:
- fully original
- mechanically inspired by abstract ideas
- based on approved public-domain material

Variants must **not** introduce:
- copyrighted franchise characters
- proprietary visual identities
- trademark-dependent branding
- commercial narrative IP from the broader DLM ecosystem unless explicitly allowed

If a variant uses public-domain source material, contributors must also complete the provenance requirements described in:
- `docs/PUBLIC_DOMAIN_PROVENANCE.md`

---

## Public-Domain-Based Variants

If your variant includes a public-domain character, literary source, mythic figure, or symbolic framework, you must document:

- source work title
- original author / creator
- publication date
- archive/source link
- why the material is believed to be public domain
- whether the contribution uses the original source, a translation, an adaptation, or a reinterpretation

Do not rely on:
- modern copyrighted translations
- copyrighted adaptations
- recent illustrations
- trademarked franchise depictions
- “everybody knows this is public domain” assumptions

When in doubt, reduce the submission to abstract mechanics and remove risky thematic specifics.

---

## Review Standards

Variant submissions are reviewed on four axes:

### 1. Mechanical clarity
Can maintainers understand the exact rules without guessing?

### 2. Engine fit
Can the idea fit the project’s deterministic systems architecture?

### 3. Documentation quality
Are the changes and edge cases documented clearly?

### 4. Provenance/IP safety
Does the submission stay within approved public-domain and repository boundaries?

A variant may be rejected even if mechanically interesting if it fails provenance or IP review.

---

## Recommended Submission Flow

1. Open a variant proposal issue
2. Describe the variant using the required structure
3. Wait for initial maintainer scoping if the idea affects core engine assumptions
4. Implement docs and/or code in a focused branch
5. Open a PR using the repository PR template
6. Include provenance details if any public-domain material is involved

---

## Minimal Variant Checklist

Before submitting:
- [ ] Variant has a clear summary
- [ ] Mechanical thesis is documented
- [ ] Rules delta is explicit
- [ ] Edge cases are documented
- [ ] Behavior is deterministic
- [ ] Related docs are updated
- [ ] Provenance is documented if public-domain material is used
- [ ] No proprietary or trademarked material is introduced

---

## Final Note
The engine welcomes ambitious variants, but maintainability comes first.

A smaller, clearly documented variant is more valuable than a larger, ambiguous one.
