# Variant Creation Workflow

This is the start-to-finish path for proposing a Veiled Dominion variant. The canonical four-player rules remain in docs/design/GDD.md and docs/RULEBOOK_v0.1.

## 1. Start with the template
Copy docs/variants/VARIANT_TEMPLATE.md. Open a variant-proposal issue before implementation.

## 2. Classify the work
Declare the source type, rights status, implementation state, accessibility state, commercial-use boundary, and whether the document has rules authority. A file in this directory is not canonical merely because it exists.

## 3. State the mechanical thesis
Explain the player experience and systems question. Separate transferable mechanics from theme, character, music, likeness, branding, or presentation.

## 4. Write the rules delta
Name every change to topology, turn order, movement, resources, status effects, victory, and illegal-move handling. If a rule cannot be resolved deterministically, it is not implementation-ready.

## 5. Complete the gates
- Rights: original, verified public domain, or permission-dependent.
- Accessibility: equivalent information, reduced-motion/safe-mode behavior, content warnings.
- Privacy: synthetic test data; no private participant, payment, medical, or credential records.
- Canon: canonical, experimental, adaptation, historical/archive, or unresolved.

## 6. Review before playtesting
Documentation review precedes code. Maintainers decide whether the proposal stays a case study, enters incubation, or may be implemented.

## 7. Use Discord for live work
Discord supports intake, discussion, scheduling, and session feedback. GitHub remains the durable record. Link every approved session to an issue and return reproducible findings to that issue.

## 8. Promotion
Only an explicit maintainer decision may promote an experiment into current game canon. Promotion requires resolved rules, tests, accessibility review, provenance/rights review, and updated authoritative rules.

See docs/variants/README.md, docs/DISCORD_COMMUNITY_ACCESS.md, and docs/COMMERCE_AND_RIGHTS_GATES.md.
