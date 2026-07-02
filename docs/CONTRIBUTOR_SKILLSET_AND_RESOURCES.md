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
