# Loptr Lab: Contributor Skillset & Resources

## ⚠️ Read This Before Writing Code

Veiled Dominion is not a standard chess game. It is a 4-player, asymmetric, state-manipulation engine built on a 14x14 cross-shaped board.

If you use standard 8x8 array logic, 2-player turn toggles, or hard-coded piece movement without passing it through our state-modifier pipeline, your Pull Request will be rejected.

## 1. Expected Skillset

To contribute effectively to the C# engine or Unity prototype, you must be comfortable with:

- **Advanced C# OOP:** Inheritance, Interfaces, Generics, and LINQ. We do not use procedural spaghetti code.
- **Custom Data Structures:** We do not use a standard `Piece[,]` 2D array for the board. You must understand how to build and query custom coordinate systems (see `src/Board/BoardCoordinate.cs`).
- **State Machines:** Pieces in VD do not have static rules. A Bishop might suddenly be forced to move like a Pawn. You must understand how to decouple "Base Movement" from "Active State Modifiers."
- **Unity URP (For Prototype Devs):** Familiarity with Universal Render Pipeline, Shader Graph (for Musou Black light absorption and Translucent Resin emission), and ScriptableObjects for data management.

## 2. The "Standard Chess" Trap

99% of chess tutorials online teach you how to build this:

- An 8x8 flat grid.
- Two players alternating turns (`isWhiteTurn = !isWhiteTurn`).
- Pieces with hard-coded move sets in child classes.

Veiled Dominion requires this:

- A 14x14 cross-shaped grid with dead zones (the corners).
- A 4-player clockwise turn queue with an event-driven state-clear phase.
- Pieces whose movements are intercepted and altered dynamically by the `VeiledStateManager`.

Do not copy-paste standard chess math into this repository.

## 3. The Curated Resource Library

The following resources are approved for learning the foundational concepts. You must read them through the "VD Filter" below.

### Textual & Conceptual

#### A Guide to Programming a Chess Engine (Adam Barent)
- **Use for:** Deep mathematical logic for move generation and check detection.
- **Skip:** 8x8 array implementations. Rely on our `BoardCoordinate.cs` instead.

#### From Beginner to Checkmate: Building a Chess Engine (Atharva Mote)
- **Use for:** Plain-English explanations of how computers parse board states.
- **Skip:** Any Python/Java code examples. We are strictly C#.

### C# Architecture

#### Chess App Dev Log (Captain Coder)
- **Use for:** Modern C# OOP patterns, LINQ for querying board states, and general architecture.
- **Skip:** Rigid inheritance models where move logic is hard-coded into child classes. Our state modifiers must be able to intercept these.

### Video & Unity Implementation

#### Unity Chess Tutorial
- **Use for:** Learning how to represent a board in Unity, handle mouse inputs for piece selection, and execute visual moves in the engine.
- **Skip:** Turn management systems (we use a 4-player queue) and standard checkmate UI. Focus only on the Unity C# scripting patterns for moving GameObjects on a grid.

## 4. The "VD Filter" Checklist

Before submitting a PR based on external tutorials, verify your code against this list:

- [ ] **Board Bounds:** Did I use the custom `BoardCoordinate` bounds checking, or did I hardcode an 8x8/14x14 square array? (If the latter, rewrite it).
- [ ] **Turn Cycle:** Did I use a simple boolean toggle for turns? (If yes, rewrite it to interface with the 4-player queue).
- [ ] **Veiled Interception:** Does my move generation logic allow for the piece to be intercepted and restricted to 1-square-forward movement by the `VeiledStateManager`?
- [ ] **Sanctuary Check:** Does my move logic check if the target square is within 1 square of the Death piece (granting Veil immunity)?
- [ ] **No Static Rules:** Is the piece's movement calculated dynamically, or is it locked into a rigid `GetValidMoves()` method that ignores active debuffs?

## 5. Start Here

Do not write code until you have read the following files in the `src/` directory. They are the source of truth:

- `src/Board/BoardCoordinate.cs` (Understand the cross-shaped geometry).
- `src/Pieces/Piece.cs` (Understand the base properties).
- `src/Systems/RadiusOfRuinSystem.cs` (Understand the core AoE logic).
- `docs/ENGINE_ACCESSIBILITY_A11Y_PARADOX.md` (Required if your work touches rendering, shaders, post-processing, animation timing, or WebGL export settings).

## 6. The #A11y Paradox: Engine-Level Safety

### The Problem

Veiled Dominion relies on extreme luminance contrast (Musou Black vs. Amber Emission). While this passes static colorblind contrast checks (WCAG AAA), it creates a severe risk of Photosensitive Epilepsy (PSE) if the rendering pipeline introduces temporal artifacts (frame drops, screen tearing, Z-fighting, or rapid opacity flickers).

### Strict Engineering Rules for VD

Contributors MUST adhere to the following rendering rules:

- **No Hard-Cut Flickering:** The "Veiled" state (losing abilities) MUST NOT be a sudden on/off toggle. It must be a smooth, 0.5-second ease-in/ease-out transition (lerp). A piece must never pop from fully lit to black in a single frame.
- **Sine-Wave Pulsing:** If the Daughter's aura "breathes" or pulses, it MUST use a smooth sine wave function (`Mathf.Sin`), never a harsh square wave.
- **Z-Fighting Prevention:** The Musou Black material (0.0 specular, 1.0 roughness) is highly susceptible to Z-fighting with other dark materials. You MUST use offset shadow bias or camera near-clip planes to ensure the Death piece never flickers against the board.
- **Frame Pacing:** The WebGL export MUST lock its framerate or implement a robust V-Sync. A dropped frame during an aura movement is a seizure trigger.

For the full rendering safety guidance, see `docs/ENGINE_ACCESSIBILITY_A11Y_PARADOX.md`.

### 3. The "Sickboi.EXE" Exception

We already designed the Sickboi variant to intentionally use screen-tearing, Z-fighting, and harsh glitch effects.

This creates a fascinating design constraint: The main game must be medically safe. The Sickboi variant must be intentionally dangerous.

**The Rule:** The Sickboi variant cannot be shipped without a mandatory, unskippable "Photosensitivity Warning" UI screen at startup, and a hard-coded "Safe Mode" toggle in the settings menu that replaces all VHS glitches with static, solid-color grey screens while keeping the gameplay logic identical.

See `docs/variants/SICKBOI_EXE.md` for the internal concept framing of this variant.

### 4. The Funding Angle (The Masterstroke)

This is how you turn the paradox into money. Organizations like AbleGamers Charity and Epic MegaGrants actively look for projects doing R&D in accessible gaming.

If you write a grant proposal titled: **"Solving the #A11y Paradox: Building a High-Contrast Rendering Pipeline that Prevents Photosensitive Epilepsy in Dark-Mode Games,"** you are no longer pitching "a cool chess game." You are pitching a proprietary engine solution that solves a known industry problem.

**Action Item:** Treat `docs/ENGINE_ACCESSIBILITY_A11Y_PARADOX.md` as the source-of-truth reference when proposing rendering, shader, post-processing, or export pipeline changes.
