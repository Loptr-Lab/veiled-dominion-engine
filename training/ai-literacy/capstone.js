/* Fresh, reproducible fictional practice; no AI service, persistence or network. */
(function () {
  'use strict';
  function scenario(seed, variant = 0) {
    let state = seed >>> 0;
    const pick = n => { state = (Math.imul(1664525, state) + 1013904223) >>> 0; return state % n; };
    const gardens = ['Prism Orchard', 'Velvet Conservatory', 'Silver Fern Dome'];
    const halls = ['Echo Pavilion', 'Paper Moon Gallery', 'Amber Archive'];
    const walks = ['Kite Ridge', 'Copper Boardwalk', 'Willow Loop'];
    const kitchens = ['Clover Table', 'Pebble Pantry', 'Saffron Lantern'];
    const names = [gardens[pick(3)], halls[pick(3)], walks[pick(3)]];
    const kitchen = kitchens[pick(3)];
    const prices = [8 + pick(10), 12 + pick(12), 1 + pick(7)];
    const lunch = 4 + pick(7), shuttle = 2 * (6 + pick(9));
    const perPerson = prices.reduce((a,b) => a+b,0) + 3*lunch + shuttle/2;
    // Draw distinct upper bits: parity of consecutive LCG outputs would correlate errors.
    const errorFlags = pick(1024) ^ (variant ? 56 : 0);
    const closedVisit = Boolean(errorFlags & 8);
    const ariPrinted = perPerson + ((errorFlags & 16) ? 2 + pick(7) : 0);
    const partyPrinted = perPerson*2 + ((errorFlags & 32) ? 3 + pick(9) : 0);
    const order = closedVisit ? [0,1,2] : [1,0,2];
    const prompt = 'Plan Monday through Wednesday in fictional year F2 for two travelers, Ari and Bo. Use each attraction once and a nut-free lunch daily. Use only these vendors; show exact per-person and party totals including the shared shuttle. No other costs or travel-time constraints apply.';
    const facts = [
      names[0]+': '+prices[0]+' credits per person; closed Monday.',
      names[1]+': '+prices[1]+' credits per person; closed Wednesday.',
      names[2]+': '+prices[2]+' credits per person; unavailable Tuesday.',
      kitchen+': nut-free lunch, '+lunch+' credits per person; open all three days.',
      'Shared three-day shuttle: '+shuttle+' credits for the party, split equally ('+shuttle/2+' each).'
    ];
    const days = ['Monday','Tuesday','Wednesday'];
    const response = days.map((day,i) => day+': '+names[order[i]]+'; '+kitchen+' lunch.').concat([
      'Ari full-trip total: '+ariPrinted+' credits.',
      'Bo full-trip total: '+perPerson+' credits.',
      'Full-trip party total: '+partyPrinted+' credits including the '+shuttle+'-credit shared shuttle.'
    ]);
    const criteria = [
      {text:'States Ari’s full-trip total as exactly '+perPerson+' credits, including '+shuttle/2+' credits for the shuttle.', weight:2, origin:'explicit', pass:ariPrinted===perPerson, evidence:'The response prints '+ariPrinted+' credits for Ari; the expected total is '+perPerson+'.'},
      {text:'States the full-trip party total as exactly '+perPerson*2+' credits, including the shared '+shuttle+'-credit shuttle.', weight:4, origin:'explicit', pass:partyPrinted===perPerson*2, evidence:'The response prints '+partyPrinted+' credits for the party; the expected total is '+perPerson*2+'.'},
      {text:'Schedules '+names[0]+' on Monday, when it is closed.', weight:-6, origin:'explicit', pass:closedVisit, evidence:closedVisit ? 'Monday names '+names[0]+', triggering the closed-day penalty.' : 'Monday names '+names[1]+', so the closed-day penalty does not trigger.'}
    ];
    return {id:'F2-'+(seed>>>0).toString(16).padStart(8,'0')+'-A'+(variant+1),seed:seed>>>0,prompt,facts,response,criteria,perPerson,partyTotal:perPerson*2,score:criteria.reduce((sum,c)=>sum+(c.pass?c.weight:0),0)};
  }
  if (typeof module !== 'undefined' && module.exports) { module.exports = {scenario}; return; }
  const root = document.getElementById('fresh-practice');
  if (!root) return;
  let exercise, stage, round, seed, history, rounds, completed;
  const form = document.getElementById('capstone-form');
  const question = document.getElementById('capstone-question');
  const controls = document.getElementById('capstone-controls');
  const feedback = document.getElementById('capstone-feedback');
  const submit = document.getElementById('capstone-submit');
  const next = document.getElementById('capstone-next');
  const retry = document.getElementById('capstone-retry');
  const appendText = (parent,tag,text) => { const element=document.createElement(tag); element.textContent=text;parent.append(element);return element; };
  const cornell = 'https://teaching.cornell.edu/teaching-resources/assessing-student-learning/using-rubrics';
  function renderQuestion() {
    controls.replaceChildren(); feedback.textContent=''; submit.hidden=false; next.hidden=true;
    if (stage < 3) {
      const criterion = exercise.criteria[stage];
      question.textContent='Attempt '+round+' of 2 · check '+(stage+1)+' of 3: '+criterion.text+' Weight '+(criterion.weight>0?'+':'')+criterion.weight+'; '+criterion.origin+'. Does this statement PASS or FAIL for the fictional response?';
      ['PASS','FAIL'].forEach(value => {
        const label=document.createElement('label');label.className='choice';
        const input=document.createElement('input');input.type='radio';input.name='capstone-answer';input.value=value;input.required=true;
        label.append(input,document.createTextNode(' '+value));controls.append(label);
      });
    } else {
      question.textContent='Attempt '+round+' of 2 · final scoring step: add each signed weight only when its statement passes. What is this response’s total for the three criteria?';
      const label=appendText(controls,'label','Raw score in points');label.htmlFor='capstone-total';
      const input=document.createElement('input');input.type='number';input.step='1';input.required=true;input.id='capstone-total';controls.append(input);
    }
  }
  function renderScenario() {
    document.getElementById('capstone-id').textContent='Fictional scenario '+exercise.id+'. Attempt '+round+' of 2. Download its ID and facts to keep this practice evidence.';
    const content=document.getElementById('capstone-scenario');content.replaceChildren();
    appendText(content,'h3','Synthetic task prompt');appendText(content,'p',exercise.prompt);
    appendText(content,'h3','Synthetic input facts');const facts=appendText(content,'ul','');exercise.facts.forEach(f=>appendText(facts,'li',f));
    appendText(content,'h3','Fictional model response');const response=appendText(content,'ul','');exercise.response.forEach(r=>appendText(response,'li',r));
    form.hidden=false;renderQuestion();
  }
  function fresh() {
    seed=window.crypto.getRandomValues(new Uint32Array(1))[0];
    exercise=scenario(seed);round=1;stage=0;history=[];rounds=[];completed=false;retry.hidden=true;
    document.getElementById('capstone-progress').textContent='No assessment attempts completed in this page session.';
    document.getElementById('capstone-results').replaceChildren();renderScenario();
  }
  form.addEventListener('submit',event=>{
    event.preventDefault();
    const value=stage<3 ? form.querySelector('input:checked')?.value : document.getElementById('capstone-total').value;
    if(value === undefined || value === '') return;
    const expected=stage<3 ? (exercise.criteria[stage].pass?'PASS':'FAIL') : exercise.score;
    const correct=stage<3 ? value===expected : Number(value)===expected;
    history.push({round,step:stage+1,answer:value,correct});
    feedback.textContent='Answer recorded. Review and your scenario-based study guide appear after all four steps.';
    submit.hidden=true; next.hidden=false;
    document.getElementById('capstone-new').disabled=true;
    controls.querySelectorAll('input').forEach(input=>input.disabled=true);
    next.textContent=stage===3?'Finish this attempt':'Next scoring step';
  });
  function studyGuide(result) {
    const box=document.getElementById('capstone-results');
    appendText(box,'h3','Study guide for '+result.exercise.id);
    const items=appendText(box,'ul','');
    result.studyGuide=[];
    result.answers.filter(a=>!a.correct).forEach(answer=>{
      let explanation;
      if(answer.step===1) explanation='Exact individual cost: add the three attraction prices, three lunches and half the shuttle. For your scenario, '+result.exercise.facts.slice(0,3).map(f=>f.match(/: (\d+)/)[1]).join(' + ')+' + three lunches + half the shuttle = '+result.exercise.perPerson+' credits. Compare this with the amount printed for Ari.';
      else if(answer.step===2) explanation='Party total: two individual totals make '+result.exercise.partyTotal+' credits. Include the shared shuttle once. Compare that expected amount with the printed party total.';
      else if(answer.step===3) explanation='Closed-day mistake: '+result.exercise.criteria[2].text+' A PASS on this statement means the mistake occurred and subtracts 6 points. A FAIL adds zero.';
      else explanation='Weighted score: add each signed weight on PASS, zero on FAIL. For this response: '+result.exercise.criteria.map(c=>c.pass?c.weight:0).join(' + ')+' = '+result.exercise.score+' points. That score evaluates the fictional response, not you.';
      result.studyGuide.push(explanation);
      appendText(items,'li',explanation);
    });
    const p=appendText(box,'p','Read ');const link=appendText(p,'a','Cornell Center for Teaching Innovation: Using rubrics');link.href=cornell;
    p.append(document.createTextNode(' for further study on measurable criteria, feedback and revising a rubric. This is a teaching resource, not an enrolled class or a program endorsement.'));
  }
  function alternativePaths() {
    const box=document.getElementById('capstone-results');
    appendText(box,'h3','Choose a next learning path');
    appendText(box,'p','Two attempts did not yet meet this exercise’s four-check target. That is a reason to pause, study or explore another task; it does not establish whether you are suited for a job.');
    const successes=history.filter(h=>h.correct);
    const p=appendText(box,'p','');let label,href;
    if(successes.some(h=>h.step===1||h.step===2)) {
      p.append(document.createTextNode('You correctly compared at least one printed total with its expected value. Build on that observed number-checking skill with '));label='cost-comparison practice';href='../prompts/compare-costs.html';
    } else if(successes.some(h=>h.step===3)) {
      p.append(document.createTextNode('You correctly identified at least one closed-day rule outcome. Build on that observed rule-checking skill with '));label='source and information auditing';href='../prompts/audit-information.html';
    } else if(successes.some(h=>h.step===4)) {
      p.append(document.createTextNode('You correctly calculated at least one weighted total. Try applying that arithmetic in '));label='technology-planning exercises';href='../technology-planning/index.html';
    } else {
      p.append(document.createTextNode('These four checks did not show a clear strength. Choose an interest and a small task rather than treating the result as a verdict: '));label='explore creative and technology tracks';href='../tracks/index.html';
    }
    rounds[rounds.length-1].nextPath={label,href};
    const link=appendText(p,'a',label);link.href=href;p.append(document.createTextNode('. These are learning suggestions, not assessments of abilities the exercise did not test.'));
    appendText(box,'p','You can return to the lessons or ask for human feedback. The two-attempt record applies to this page session only; download it before leaving if you want to discuss it with PIXIE.');
  }
  function finish() {
    form.hidden=true;
    const answers=history.filter(h=>h.round===round),correct=answers.filter(h=>h.correct).length;
    const result={round,exercise,answers,correct,passed:correct===4};rounds.push(result);
    const box=document.getElementById('capstone-results');box.replaceChildren();
    document.getElementById('capstone-progress').textContent='Attempt '+round+': '+correct+'/4 correct; '+(result.passed?'practice target met.':'practice target not met.');
    appendText(box,'p','Fictional response weighted score: '+exercise.score+' points. Practice target: all three PASS/FAIL checks and the raw score correct (4/4). This local practice target is not a qualification threshold.');
    const list=appendText(box,'ol','');exercise.criteria.forEach(c=>appendText(list,'li',(c.pass?'PASS':'FAIL')+'; '+c.weight+' weight; '+(c.pass?c.weight:0)+' points. '+c.evidence));
    if(!result.passed) studyGuide(result);
    if(!result.passed&&round===1) {
      appendText(box,'p','Review this guide, then take your second attempt. It keeps your fictional prices and vendors but changes the response mistakes, so check the evidence again.');
      retry.hidden=false;
    } else {
      completed=true;retry.hidden=true;
      if(!result.passed) alternativePaths();
      else appendText(box,'p','You met this practice target. Keep your record and one improvement, then choose another learning task or request human review. This is not certification or job eligibility.');
    }
    box.tabIndex=-1;box.focus();
  }
  next.addEventListener('click',()=>{
    stage++;
    if(stage<4) {renderQuestion();question.tabIndex=-1;question.focus();} else finish();
  });
  retry.addEventListener('click',()=>{
    round=2;stage=0;exercise=scenario(seed,1);retry.hidden=true;
    document.getElementById('capstone-results').replaceChildren();renderScenario();document.getElementById('capstone-id').focus();
  });
  function record() {
    if(!exercise) return '';
    const saved=rounds.slice();
    if(!saved.some(result=>result.round===round)) {
      const answers=history.filter(h=>h.round===round);
      saved.push({round,exercise,answers,correct:answers.filter(h=>h.correct).length,passed:false});
    }
    const sections=saved.map(result=>'\n### Attempt '+result.round+' · '+result.exercise.id+'\n'+result.exercise.prompt+'\n\nInput facts:\n'+result.exercise.facts.map(f=>'- '+f).join('\n')+'\n\nFictional response:\n'+result.exercise.response.map(f=>'- '+f).join('\n')+'\n\nExplicit criteria and answer key:\n'+result.exercise.criteria.map(c=>'- '+c.text+' Weight '+c.weight+'; '+(c.pass?'PASS':'FAIL')+'; '+(c.pass?c.weight:0)+' points. '+c.evidence).join('\n')+'\n\nAnswers:\n'+result.answers.map(h=>'Step '+h.step+': '+h.answer+'; '+(h.correct?'correct':'incorrect')).join('\n')+'\nPractice target: '+result.correct+'/4; '+(result.passed?'met':'not yet met or incomplete')+'\nFictional response weighted score: '+result.exercise.score+'\n\nScenario study guide:\n'+(result.studyGuide||[]).map(note=>'- '+note).join('\n')+'\nNext learning path: '+(result.nextPath?result.nextPath.label+' ('+result.nextPath.href+')':result.passed?'Choose another task or human review':'Study, then use the second attempt if available')+'\n');
    return '\n## Fresh synthetic classroom practice\nSeed: '+seed+'\nStatus: '+(completed?'finished':'in progress')+'\n'+sections.join('\n')+'\nLearner-produced local practice record; not independently verified, accepted project work, certification or job suitability.\n\nFurther study: Cornell Using rubrics — '+cornell+'\n\n### One improvement after feedback\n[Describe what you changed and why before sharing.]\n';
  }
  document.addEventListener('training-artifact-request',event=>{event.detail.sections.push(record());});
  document.getElementById('capstone-download').addEventListener('click',()=>{
    const url=URL.createObjectURL(new Blob(['# Synthetic classroom practice\n'+record()],{type:'text/markdown'}));
    const link=document.createElement('a');link.href=url;link.download='synthetic-classroom-'+exercise.id+'.md';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  document.getElementById('capstone-new').addEventListener('click',()=>{fresh();document.getElementById('capstone-id').focus();});
  fresh();root.hidden=false;
})();
