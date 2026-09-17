# PIXIE + 50 Ways to Leave Another

## Status

**Review integration — part of the IP/experience layer; educational/creative prototype only.**

PIXIE is part of the Loptr Lab / Veiled Dominion IP and should be treated as a first-class experience-layer concern wherever a project meaningfully exposes narrative, accessibility, reflection, or interface mediation. This document records the current *50 Ways to Leave Another* review implementation. It does not define a production PIXIE runtime or final accessibility specification.

## Why PIXIE belongs here

PIXIE is an established Loptr Lab project and development presence, not merely a generic accessibility feature. The name expands to **Paraconsistent Inclusive Xenodochial Intuitive Ecstatic**. The PIXIE development work concerns ethical mediation, player agency, platform design, and related experience-layer questions.

The Veiled Dominion continuity document separately establishes that PIXIE is **not literally Rebirth** in the *Rebirth, Death's Daughter* reinterpretation. Keeper is likewise not literally Death. Those distinctions remain explicit here.

## Role in 50 Ways

PIXIE is an **opt-in presentation, reader, and accessibility layer**. She can help a person encounter and navigate the work without becoming the authority over its meaning or making choices on the player's behalf.

In the current browser prototype, PIXIE can:

- read the current scene aloud;
- read the currently available choices aloud;
- stop reading on request;
- expose concise status messaging for assistive technology;
- coexist with native keyboard controls and semantic HTML.

The prototype uses the browser's `SpeechSynthesis` API rather than claiming to embed the full PIXIE runtime. If the browser does not provide speech synthesis, the page leaves the reader's existing browser/screen-reader options available.

## Agency boundary

PIXIE should not decide what a scene means, choose an action for the player, or speak as Violet/Sebastien unless a later, explicit narrative design decision establishes that behavior.

The design principle is:

> **PIXIE can help the reader encounter the story without becoming the authority over the reader's interpretation of it.**

This makes PIXIE compatible with *50 Ways to Leave Another*, whose core mechanic is player agency.

## Keepr / Keeper boundary

The current prototype does not place PIXIE inside the Keeper's Realm. The Keeper/Keeper's Realm remains a distinct continuity, archive, custody, and mythic layer. PIXIE may interact with Keeper-related material elsewhere in the ecosystem without becoming Keeper or collapsing the two concepts into one.

## IP placement rule

When another Veiled Dominion or Loptr Lab surface is being prepared for review, add PIXIE to the relevant experience/interface layer rather than treating her as an optional afterthought. The exact capability may differ by medium:

- **Narrative/web review:** reader, navigation, accessibility, reflective interface.
- **Interactive prototype:** opt-in mediation and presentation controls.
- **Game/engine documentation:** experience-layer requirement and explicit boundary from core game mechanics.
- **Archive/Keeper surfaces:** relationship or handoff may be documented, but PIXIE remains distinct from Keeper.
- **Adaptations/reinterpretations:** preserve the explicit continuity distinction unless an authoritative canon decision changes it.

This is a placement rule, not a requirement that every work expose identical PIXIE UI or behavior.

## Accessibility boundary

This integration is intended to improve access, but it is **not a claim of WCAG conformance or accessibility validation**. The prototype should still be tested with actual assistive technologies and browsers, including keyboard-only navigation and commonly used screen readers, before production use.

The page therefore uses native buttons, heading structure, focus management, status/live regions, reduced-motion support, and explicit opt-in reader controls rather than requiring users to install PIXIE or a browser extension.

## Production gate

A future production implementation should determine separately:

1. the canonical PIXIE runtime/interface;
2. whether PIXIE is an embedded service, local browser capability, or external application;
3. voice/persona and performer rights, if any human performance or digital replica is involved;
4. privacy and telemetry boundaries;
5. accessibility testing and conformance targets;
6. which PIXIE behavior is product infrastructure versus narrative canon.

Until those decisions are made, browser implementations should be labeled **review integrations**, not final PIXIE runtime implementations.
