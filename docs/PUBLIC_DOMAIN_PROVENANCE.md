# Public Domain Provenance Guide

## Purpose
This guide defines how contributors must document and justify the use of public-domain source material in the Veiled Dominion engine and its variant ecosystem.

This includes:
- characters
- literary references
- mythological figures
- symbolic motifs
- quotations
- narrative framing
- names, themes, or mechanics derived from historical works

The purpose is to reduce legal ambiguity and protect contributors and maintainers from accidental inclusion of non-approved material.

---

## Core Rule
Do not submit public-domain-based content without provenance.

If your contribution is inspired by or derived from an external source, you must explain:
- what the source is
- why it is believed to be usable
- what part of it you are using
- whether you are using the original source or a later adaptation

---

## Required Provenance Fields

Every relevant contribution must include the following:

### 1. Source Work Title
Example:
- *Dracula*
- *The Raven*
- *A Christmas Carol*
- *The Epic of Gilgamesh*

### 2. Original Author / Creator
Example:
- Bram Stoker
- Edgar Allan Poe
- Charles Dickens

### 3. Original Publication Date
Provide the earliest relevant publication date if known.

### 4. Source Link
Provide a stable archival or reference link when possible, such as:
- Project Gutenberg
- Internet Archive
- Wikisource
- museum or library archives
- other reliable primary-source repositories

### 5. Public Domain Rationale
Briefly explain why the source is believed to be in the public domain.

Examples:
- published before a known cutoff in the relevant jurisdiction
- original mythological or folkloric source with no modern author
- historical text with expired copyright

### 6. What Is Being Used
Specify whether the contribution uses:
- a character name
- a story premise
- a public-domain quotation
- a symbolic motif
- a gameplay reinterpretation
- a setting element
- a mythic archetype

### 7. Adaptation Status
State whether your contribution is based on:
- the original source directly
- a public-domain translation
- an original reinterpretation of the public-domain material

If it is based on a modern adaptation, do not submit it unless maintainers explicitly approve it.

---

## What Is Usually Acceptable
Contributions are more likely to be acceptable when they use:
- original public-domain texts
- original mythological or folkloric material
- public-domain-era character concepts
- abstracted mechanics inspired by historical themes
- contributor-authored reinterpretations that do not copy later protected depictions

---

## What Is Usually Not Acceptable
Do not submit:
- modern copyrighted translations
- recent retellings
- film/TV/game adaptation elements
- trademarked character branding
- copyrighted costumes, iconography, taglines, or visual designs
- material copied from fan wikis or adaptation summaries without checking the primary source

---

## Important Warning About Characters
A character may originate in the public domain while a later **depiction** of that character is still protected.

Example risks include:
- using a public-domain figure through the lens of a modern franchise adaptation
- copying visual design elements from a recent film or comic
- importing names, settings, or attributes that were added later by copyrighted works

When possible:
- work from the oldest usable source
- cite that source directly
- strip away later branded or copyrighted layers

---

## Suggested Provenance Block Format

Use this block in issues, variant docs, or PRs when relevant:

```md
## Public Domain Provenance

- **Source work:**  
- **Original author/creator:**  
- **Publication date:**  
- **Source link:**  
- **Public domain rationale:**  
- **What is being used:**  
- **Adaptation status:**  
- **Notes / limitations:**  
```

---

## Review Guidance
Maintainers may reject or request revision if:
- the provenance is incomplete
- the contributor relies on a modern adaptation
- the material appears trademark-sensitive
- the source link is weak or unclear
- the contribution mixes public-domain material with protected IP signals

If provenance is uncertain, maintainers should prefer rejection or abstraction over risk.

---

## Best Practice
When in doubt:
- remove names
- remove quotations
- remove adaptation-specific traits
- preserve only the mechanical or symbolic abstraction

A clean abstraction is safer than a legally ambiguous homage.
