/* Deterministic local practice. No model calls, network, or saved learner records. */
(() => {
'use strict';
const questions = [
  {
    "correct": 1,
    "answer": "The price list supplies facts to the task; it is the input file.",
    "takeaway": "Keep instructions, evidence, response and grading rules distinct.",
    "principle": "Verifiable"
  },
  {
    "correct": 2,
    "answer": "The exact total supplies a single observable rule and its expected value. \u201cDelightful\u201d is subjective; \u201cmatch the file\u201d requires an external lookup.",
    "takeaway": "A reviewer should not have to guess what PASS means.",
    "principle": "Objective / self-contained"
  },
  {
    "correct": 0,
    "answer": "Atomic fails: lunch choice and arithmetic are separate checks. Write a second criterion with the exact 100-credit party total.",
    "takeaway": "Split checks that can have different outcomes.",
    "principle": "Atomic"
  },
  {
    "correct": 1,
    "answer": "Use the exact expected 100-credit party total and include the shuttle fact. No taste judgment or source lookup is needed.",
    "takeaway": "Replace vague praise with a specific observable value.",
    "principle": "Objective / self-contained"
  },
  {
    "correct": 0,
    "answer": "Penalize the defined nut-containing meal mistake; reward consistent units modestly. Weights express task stakes, not equal-sized boxes.",
    "takeaway": "Define the negative trigger before assigning its penalty.",
    "principle": "Weight direction / stakes"
  },
  {
    "correct": 1,
    "answer": "3 + 3 = 6. The other splits double or increase the weight. Preserve the total, while recognizing partial credit changes.",
    "takeaway": "Split the requirement and preserve the weight budget.",
    "principle": "Weight conservation"
  },
  {
    "correct": 2,
    "answer": "Exclude it from this output rubric. A process audit would need separately authorized evidence; do not infer hidden activity from polished writing.",
    "takeaway": "Grade observable output; do not invent evidence of hidden work.",
    "principle": "Verifiable"
  }
];
document.querySelectorAll('.rubric-question').forEach(form => {
  const q = questions[Number(form.dataset.step) - 1];
  let attempts = 0;
  const feedback = form.querySelector('.feedback');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const answer = form.querySelector('input:checked');
    if (!answer) return;
    attempts++;
    const correct = Number(answer.value) === q.correct;
    if (correct || attempts >= 2) {
      feedback.textContent = (correct ? 'PASS. ' : 'After your retry: ') + q.answer + ' Takeaway: ' + q.takeaway;
      form.querySelector('button[type=submit]').disabled = true;
    } else {
      feedback.textContent = 'Revisit ' + q.principle + '. ' + q.takeaway + ' Try once more.';
    }
  });
  form.querySelector('.question-reset').addEventListener('click', () => {
    form.reset(); attempts = 0; feedback.textContent = '';
    form.querySelector('button[type=submit]').disabled = false;
  });
});
const score = document.getElementById('score-practice');
let scoreAttempts = 0;
score.addEventListener('submit', event => {
  event.preventDefault(); scoreAttempts++;
  const correct = Number(document.getElementById('score-answer').value) === 12;
  document.getElementById('score-feedback').textContent = correct || scoreAttempts >= 2
    ? (correct ? 'PASS. ' : 'After your retry: ') + '18 + (−6) = 12 points. Takeaway: a mistake triggers its negative weight.'
    : 'Weight direction: a negative criterion subtracts points when its defined mistake occurs. Try once more.';
  if (correct || scoreAttempts >= 2) score.querySelector('button[type=submit]').disabled = true;
});
score.addEventListener('reset', () => {
  scoreAttempts = 0; document.getElementById('score-feedback').textContent = '';
  score.querySelector('button[type=submit]').disabled = false;
});
const writer = document.getElementById('writer');
const text = document.getElementById('criterion-text');
const weight = document.getElementById('criterion-weight');
const origin = document.getElementById('criterion-origin');
const reason = document.getElementById('criterion-reason');
const feedback = document.getElementById('writer-feedback');
const keep = document.getElementById('keep-criterion');
const review = document.getElementById('review-criterion');
let drafts = [], reviews = 0;
function hints(value, signedWeight) {
  const result = [];
  if (/\b(and|also|as well as)\b/i.test(value)) result.push('Atomic: you may have combined checks. Can each part pass separately?');
  if (/\b(good|nice|reasonable|beautiful|delightful|appropriate|clear|correct)\b/i.test(value)) result.push('Objective: replace judgment words with an exact observable rule.');
  if (/\b(file|source|above|provided|website|browsed|researched|thought)\b/i.test(value)) result.push('Verifiable/self-contained: include the grading facts here and remove claims about unseen actions.');
  if (!/\d|Moss|Ember|Lantern|Glass|Cloud|credits|Monday|Tuesday|Wednesday/i.test(value)) result.push('Self-contained: add a concrete expected fact, such as 100 credits for the party including the shuttle.');
  if (signedWeight < 0) result.push('Negative weight: does PASS mean a specific mistake occurred? State that trigger explicitly.');
  return result;
}
writer.addEventListener('submit', event => {
  event.preventDefault();
  weight.setCustomValidity(Number(weight.value) === 0 ? 'Choose a nonzero weight.' : '');
  if (!writer.reportValidity()) return;
  reviews++;
  const notes = hints(text.value, Number(weight.value));
  feedback.textContent = 'Wording hints only; no quality grade. ' + (notes.length ? notes.join(' ') : 'No keyword flags. That does not establish that your criterion meets the four principles.') + (reviews === 1 ? ' Revise once, or keep your draft and self-review.' : ' Worked reference: “States the full-trip party total as exactly 100 credits, including the shared 20-credit shuttle” (+4, explicit). Compare your own check with all four principles.');
  keep.hidden = false;
  review.textContent = 'Review my revision';
  if (reviews >= 2) review.disabled = true;
});
weight.addEventListener('input', () => weight.setCustomValidity(''));
keep.addEventListener('click', () => {
  weight.setCustomValidity(Number(weight.value) === 0 ? 'Choose a nonzero weight.' : '');
  if (!writer.reportValidity()) return;
  drafts.push({ criterion: text.value.trim(), weight: Number(weight.value), origin: origin.value, reason: reason.value.trim() });
  const item = document.createElement('p');
  item.textContent = 'Draft ' + drafts.length + ': ' + text.value + ' (' + weight.value + ', ' + origin.value + '). Reason: ' + reason.value;
  document.getElementById('written-criteria').append(item);
  writer.reset(); reviews = 0; keep.hidden = true; review.disabled = false;
  review.textContent = 'Get wording hints'; feedback.textContent = '';
  if (drafts.length === 3) {
    writer.hidden = true;
    const done = document.createElement('p'); done.tabIndex = -1;
    done.textContent = 'Three drafts captured. Now score deliverable C, record evidence, and document one revision in your artifact. Use “Reset my drafts” below to start again.';
    document.getElementById('written-criteria').append(done); done.focus();
  } else {
    document.getElementById('writer-progress').textContent = 'Criterion ' + (drafts.length + 1) + ' of 3'; text.focus();
  }
});
function resetDrafts() {
  drafts = []; reviews = 0; writer.hidden = false; writer.reset(); weight.setCustomValidity('');
  document.getElementById('written-criteria').replaceChildren();
  document.getElementById('writer-progress').textContent = 'Criterion 1 of 3';
  feedback.textContent = ''; keep.hidden = true; review.disabled = false;
  review.textContent = 'Get wording hints'; text.focus();
}
document.getElementById('reset-writer').addEventListener('click', resetDrafts);
const resetAllDrafts = document.createElement('button'); resetAllDrafts.type = 'button';
resetAllDrafts.textContent = 'Reset my drafts'; resetAllDrafts.addEventListener('click', resetDrafts);
document.getElementById('written-criteria').after(resetAllDrafts);
document.getElementById('download-drafts').addEventListener('click', () => {
  const sourceExercise = "Synthetic task prompt\nCreate an itinerary for two travelers, Ari and Bo, for Monday 8 June through Wednesday 10 June in fictional year F1. Include one attraction and one lunch each day, use each attraction once, and use only the supplied vendors. Both travelers require nut-free meals. Show each traveler\u2019s total and the party total, including the shared shuttle. Budget: at most 100 credits for the party.\nSynthetic input facts\nGlass Garden: 10 credits per person; closed Monday.\nLantern Hall: 15 credits per person; closed Wednesday.\nCloud Walk: free; unavailable Tuesday (a blackout date).\nMoss Kitchen: nut-free lunch, 5 credits per person; open all three days.\nEmber Caf\u00e9: lunch, 4 credits per person; contains nuts. It cannot meet this task\u2019s meal requirement.\nOne shuttle pass for all three days costs 20 credits for the party. Allocate 10 credits to each traveler.\nNo other costs, taxes, tips, discounts, travel-time constraints or reservations apply. Each attraction and lunch takes place within that day.\nComplete fictional deliverable A\nMonday 8 June: Lantern Hall; lunch at Moss Kitchen.\nTuesday 9 June: Glass Garden; lunch at Moss Kitchen.\nWednesday 10 June: Cloud Walk; lunch at Moss Kitchen.\nAri: 10 + 15 + 0 + (3 \u00d7 5) + 10 = 50 credits.\nBo: 10 + 15 + 0 + (3 \u00d7 5) + 10 = 50 credits.\nParty: 50 + 50 = 100 credits, including the shared 20-credit shuttle.\nAttractions: 25 per person, 50 party. Lunches: 15 per person, 30 party. Shuttle: 10 per person, 20 party. Total: 50 per person, 100 party.";
  const content = '# Synthetic AI rubric practice artifact\n\nExercise only; not certification or accepted project work.\n\n## Synthetic prompt and input facts\n' + sourceExercise + '\n\n## My three criteria\n' + drafts.map((d,i) => (i+1)+'. '+d.criterion+'\nWeight: '+d.weight+'; '+d.origin+'\nReason: '+d.reason+'\nPASS/FAIL on C: [fill in]\nExact evidence: [fill in]\n').join('\n') + '\n## Fictional deliverable\nDeliverable C: Monday Glass Garden; Tuesday Lantern Hall; Wednesday Cloud Walk. Moss Kitchen lunch daily. Printed totals: Ari 50 credits; Bo 50 credits; party 100 credits including the shared 20-credit shuttle. Glass Garden is closed Monday.\n\n## Scoring\nFor each PASS add its signed weight; FAIL adds zero. Total: [calculate]\n\n## One improvement after feedback\nBefore: [fill in]\nAfter: [fill in]\nWhy: [fill in]\n\nReview all placeholders and public visibility before sharing.\n';
  const extra = {sections: []};
  document.dispatchEvent(new CustomEvent('training-artifact-request', {detail: extra}));
  const url = URL.createObjectURL(new Blob([content, ...extra.sections], {type:'text/markdown'}));
  const link = document.createElement('a'); link.href = url; link.download = 'synthetic-rubric-practice.md'; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
})();
