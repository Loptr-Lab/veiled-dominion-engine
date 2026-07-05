# `src/` Directory Casing — Migration Status

## The Problem

The `src/` directory currently contains both uppercase and lowercase variants
of the same subdirectory names:

| Uppercase (legacy)    | Lowercase (canonical)  |
|-----------------------|------------------------|
| `src/Board/`          | `src/board/`           |
| `src/Pieces/`         | `src/Pieces/`          |
| `src/Systems/`        | `src/systems/`         |

This creates a contributor hazard on **case-insensitive filesystems** (macOS,
Windows) where `src/Board` and `src/board` appear to be the same directory,
but on Linux (and in Git's object store) they are distinct paths.

## Canonical Structure

**The lowercase paths are canonical.** This is documented in the `.cleanup`
marker file present in each lowercase directory.

| Canonical path             | Contents                                    |
|----------------------------|---------------------------------------------|
| `src/board/`               | `GridTopology.cs`                           |
| `src/pieces/`              | `BasePiece.cs`                              |
| `src/systems/`             | `RadiusOfRuin.cs`, `VeiledStateManager.cs`  |
| `src/integration/`         | `rpgActor/` adapter boundary                |

## Legacy Uppercase Directories

The uppercase directories (`src/Board/`, `src/Pieces/`, `src/Systems/`) contain
`.gitkeep` placeholder files and are tracked in Git solely to preserve history.
They are not the active development path.

**Do not add new files to the uppercase directories.**

## Contributor Guidance

- Always create new files under the **lowercase** paths.
- If you are on macOS or Windows and your filesystem silently merges the two
  paths, verify with `git status` and `git ls-files` to ensure your changes
  land in the correct tracked path.
- Completing the migration (removing the uppercase directories after all
  content has been consolidated under lowercase paths) is a tracked cleanup
  task. Do not delete the uppercase directories without coordinating with
  maintainers — a cross-platform rename requires a deliberate Git history
  operation to avoid breaking case-insensitive checkouts.

## Migration Completion Criteria

The casing ambiguity is fully resolved when:

1. All source files live exclusively under the lowercase canonical paths.
2. The uppercase directories and their `.gitkeep` files are removed from the
   repository.
3. All documentation references use the lowercase paths consistently.
