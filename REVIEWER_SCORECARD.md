# Veiled Dominion Engine — Reviewer Scorecard

Use this scorecard to reduce subjectivity and keep evaluations consistent across reviewers.

## 0) Hard gate: mandatory edge-rule tests
Candidate must run against:
- `edge-rules.test.ts`

### Gate outcome
- **Pass**: All mandatory tests pass, or any discrepancy is clearly justified in `NOTES.md` with coherent technical reasoning.
- **Fail**: Mandatory tests fail without strong, explicit justification.

> Recommendation: If gate fails, stop evaluation for engine-facing roles unless hiring loop explicitly allows conditional reconsideration.

---

## 1) Weighted rubric

| Criterion | Weight | Score (1–5) | Weighted |
|---|---:|---:|---:|
| Correctness of movement rules | 25% |  |  |
| Reaction framework design | 35% |  |  |
| Task 3 extension cleanliness | 20% |  |  |
| Honesty/reasoning in NOTES.md | 10% |  |  |
| Code clarity/readability | 10% |  |  |
| **Total** | **100%** |  |  |

### Pass bar
- Weighted average **>= 3.5 / 5**
- **No criterion below 2 / 5**
- Reaction framework score **>= 3 / 5** (hard requirement)

---

## 2) Evidence-first scoring notes (required)
For each criterion, record 1–2 concrete evidence points (file/function/test behavior).

### A) Correctness of movement rules (25%)
Look for:
- Tide alternation persisted per piece across turns
- Gale row/column end constraint correctly enforced
- Ember midpoint blocking and steam blocking behavior
- Root movement/anchor rules respected

Evidence:
- 
- 

### B) Reaction framework design (35%)
Look for:
- Reactions declared as data/rules and dispatched generically
- No brittle `if` chain buried in core move resolution
- Clear separation of move validation vs post-move reaction processing

Evidence:
- 
- 

### C) Task 3 extension cleanliness (20%)
Look for:
- Second reaction added with minimal/no changes to core movement logic
- Extension implemented through existing framework entry points

Evidence:
- 
- 

### D) Honesty/reasoning in NOTES.md (10%)
Look for:
- Explicit limits/tradeoffs
- Realistic failure points for reaction graph evolution
- No hand-wavy or defensive narrative

Evidence:
- 
- 

### E) Code clarity/readability (10%)
Look for:
- Naming quality and modular boundaries
- Ease of understanding without verbal walkthrough
- Reasonable testability and decomposition

Evidence:
- 
- 

---

## 3) Final decision
- **Hire / No Hire / Borderline**:
- **Confidence (Low/Med/High)**:
- **Primary risk**:
- **Primary strength**:
- **Follow-up recommendation** (if borderline):
  - Optional controlled second-chance: redo Task 3 only with explicit extensibility guidance.
