# Back in Derry

## Summary
**Back in Derry** is a thematic Veiled Dominion variant that stress-tests how the engine handles atmospheric pressure, spatial dread, and narrative framing without abandoning deterministic rules. It is intended as a model variant document for future contributors.

This variant serves two purposes:
1. explore a darker symbolic presentation layer for Veiled Dominion-style play, and
2. demonstrate the expected documentation format for variant proposals and implementation-ready design specs.

---

## Design Goal
The goal of **Back in Derry** is to create a variant that feels more claustrophobic and psychologically pressurized than the baseline game while preserving the core restraint fantasy.

Rather than changing the identity of Rebirth into a pure aggressor, this variant tests whether board-state tension can be increased by making safe positioning rarer, movement choices more committal, and adjacency to hostile influence more emotionally costly.

---

## Mechanical Thesis
This variant explores whether the Veiled Dominion engine can support a higher-pressure positional environment by emphasizing containment, narrowing recovery options, and making spatial safety feel temporary.

The design does **not** depend on randomness, hidden information, or narrative exception rules. Instead, tension should emerge from deterministic pressure zones, constrained disengagement, and sharper consequences for mispositioning.

In practice, **Back in Derry** should feel like:
- less room to stabilize after an error,
- more importance on corridor control,
- more meaningful risk when approaching central lanes,
- and a stronger emotional contrast between sanctuary and exposure.

---

## Rules Delta from Baseline

### Board / Topology Changes
- Baseline 14x14 cross topology remains unchanged for the first implementation pass.
- No topology rewrite is required for the documentation model version of this variant.

### Turn Loop Changes
- Core turn-loop structure remains unchanged.
- Start, Action, and Resolution phases remain identical to baseline unless later implementation issues justify a scoped revision.

### Piece / Pressure Changes
- This variant proposes a stricter interpretation of dangerous space rather than wholesale new piece classes.
- Rebirth’s influence should feel more oppressive through surrounding positional consequences, but any implementation must remain explicit and deterministic.
- If implemented mechanically, any additional pressure rule must specify exact trigger timing, affected coordinates, immunity interactions, and duration behavior before merge.

### Resource Changes
- No new resource is required in the model version.
- Future iterations may test whether Boon Token use should become more strategically scarce in high-pressure variants, but that is not part of the initial documented baseline.

### Victory Condition Changes
- Baseline victory conditions remain unchanged in the model version.
- If future iterations alter scoring or collapse thresholds, those changes must be documented as a separate delta section and accompanied by validation notes.

### Status Effect Changes
- No new named status effect is introduced in the model version.
- Contributors should prefer modifying positional interpretation before introducing additional state-machine complexity.

---

## Deterministic Behavior Requirements
Any implementation of **Back in Derry** must preserve deterministic engine behavior.

Contributors must define:
- exact trigger timing for any pressure-related effect,
- whether the effect is checked at movement resolution, end-of-turn resolution, or start-of-turn cleanup,
- exact immunity behavior relative to Death’s Sanctuary,
- whether repeated exposure refreshes, stacks, or is ignored,
- how illegal movement is computed if pressure rules restrict destination choices.

No merge should occur if a reader cannot answer “when exactly does this happen?” from the variant spec alone.

---

## Edge Cases
Potential edge cases to resolve before implementation:

1. **Sanctuary Interaction**  
   If added pressure rules overlap with Rebirth’s Radius of Ruin, clarify whether Sanctuary prevents all related penalties or only baseline Veiled-state application.

2. **Simultaneous Pressure Sources**  
   If future variant rules introduce multiple pressure zones, define whether effects stack, refresh, or resolve by priority.

3. **Neutral Obstacles After Elimination**  
   If eliminated-player pieces become chokepoints, clarify whether pressure rules treat them as ordinary occupancy, blocked terrain, or special-case anchors.

4. **Dash / Pass-Through Effects**  
   If Rebirth phases through occupied coordinates under Soul Reservoir, define whether any variant pressure effect checks only final position or also traversed pathing.

5. **Adjacency Ambiguity**  
   If the variant introduces secondary adjacency penalties, specify whether diagonals count and whether board-edge truncation changes evaluation behavior.

---

## Testing Notes
If implemented, validation should include:
- baseline parity tests confirming unchanged behavior where no variant pressure rule applies,
- sanctuary regression tests,
- adjacency and edge-of-board coordinate tests,
- repeated exposure tests to confirm refresh/stack logic,
- gameplay observation sessions focused on whether tension increases without creating arbitrary-feeling punishment.

Recommended scenario questions:
- Does the variant create meaningful positional dread without becoming opaque?
- Are contributors able to explain the pressure logic in one pass?
- Does the variant preserve the restraint fantasy rather than collapsing into brute denial?

---

## Documentation Expectations
If this variant moves from documentation to implementation, the following should be updated:
- `docs/variants/BACK_IN_DERRY.md`
- any relevant rulebook or README sections if baseline understanding is affected
- tests covering new deterministic behaviors
- PR notes describing the exact mechanical delta

---

## Public Domain Provenance
This model variant document does **not** itself approve or embed external copyrighted narrative material.

If a future revision of **Back in Derry** introduces public-domain-derived characters, quotations, symbolic references, or literary framing, contributors must complete the provenance process described in:
- `docs/PUBLIC_DOMAIN_PROVENANCE.md`

At minimum, that future submission must document:
- source work,
- original creator,
- publication date,
- archive/reference link,
- public-domain rationale,
- what is being used,
- adaptation status.

---

## Open Questions
- Should high-pressure variants stay strictly positional, or introduce a narrowly scoped additional state effect?
- Is the baseline board already sufficiently claustrophobic if neutral obstacles accumulate, making extra pressure unnecessary?
- Should future themed variants be required to ship as documentation-first before code implementation?

---

## Contributor Notes
Use this file as the reference example for future variant documentation quality.

A good variant submission should be:
- mechanically specific,
- documentation-first,
- deterministic,
- provenance-aware,
- and small enough to review without guesswork.
