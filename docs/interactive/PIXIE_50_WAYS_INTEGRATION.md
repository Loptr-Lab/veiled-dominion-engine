# PIXIE + 50 Ways to Leave Another

## Status

**Prototype integration — educational/creative review only.**

This document records the current relationship between PIXIE and the *50 Ways to Leave Another* browser prototype. It does not define a production PIXIE runtime, a final accessibility specification, or new narrative canon.

## Why PIXIE belongs here

PIXIE is part of the Loptr Lab ecosystem and has an established development presence outside the game rules. The PIXIE development blog identifies P.I.X.I.E. as **Paraconsistent Inclusive Xenodochial Intuitive Ecstatic** and frames the project around ethical misconduct in spiritual teaching. The blog also presents PIXIE devlog and reflective-archive material involving platform design, player agency, AT Protocol, and the Keeper's Dispatch.

The Veiled Dominion continuity document separately establishes that PIXIE is **not literally Rebirth** in the *Rebirth, Death's Daughter* reinterpretation. Keeper is likewise not literally Death. Those distinctions are preserved here.

## Role in 50 Ways

PIXIE is an **opt-in presentation and reader layer**, not a character who interprets the story for the player.

In the current browser prototype, PIXIE can:

- read the current scene aloud;
- read the currently available choices aloud;
- stop reading on request;
- expose a concise status message for assistive technology;
- coexist with native keyboard controls and semantic HTML.

The prototype uses the browser's `SpeechSynthesis` API rather than claiming to embed a production PIXIE service. If the browser does not provide speech synthesis, the page leaves the reader's existing browser/screen-reader options available.

## Agency boundary

PIXIE should not decide what a scene means, choose an action for the player, or speak as Violet/Sebastien unless a later, explicit narrative design decision establishes that behavior.

The design principle is:

> **PIXIE can help the reader encounter the story without becoming the authority over the reader's interpretation of it.**

That makes PIXIE compatible with *50 Ways to Leave Another*, whose core mechanic is player agency.

## Keepr / Keeper boundary

The current prototype does not place PIXIE inside the Keeper's Realm. The Keeper/Keeper's Realm remains a distinct continuity, archive, custody, and mythic layer. PIXIE may interact with Keeper-related material elsewhere in the ecosystem without becoming Keeper or collapsing the two concepts into one.

## Accessibility boundary

This integration is intended to improve access, but it is **not a claim of WCAG conformance or accessibility validation**. The prototype should still be tested with actual assistive technologies and browsers, including keyboard-only navigation and commonly used screen readers, before production use.

The page therefore uses native buttons, heading structure, focus management, status/live regions, reduced-motion support, and an explicit opt-in reader control rather than requiring users to install PIXIE or any browser extension.

## Production gate

A future production implementation should determine separately:

1. the canonical PIXIE runtime/interface;
2. whether PIXIE is an embedded service, local browser capability, or external application;
3. voice/persona and performer rights, if any human performance or digital replica is involved;
4. privacy and telemetry boundaries;
5. accessibility testing and conformance targets;
6. which PIXIE behavior is product infrastructure versus narrative canon.

Until those decisions are made, the browser implementation remains a review prototype.
