/* Applicant-controlled draft only. No network, identity verification, CRM or applicant storage. */
(() => {
  'use strict';
  const form = document.getElementById('application');
  if (!form) return;
  const department = document.getElementById('department');
  const proposal = document.getElementById('proposal');
  const work = document.getElementById('work');
  const availability = document.getElementById('availability');
  const acknowledge = document.getElementById('acknowledge');
  const errors = document.getElementById('application-errors');
  const review = document.getElementById('draft-review');
  const text = document.getElementById('draft-text');
  const email = document.getElementById('email-draft');
  const status = document.getElementById('draft-status');
  const departments = {
    strategy: 'Strategy & playtesting', production: 'Creative & technical production',
    operations: 'Operations & governance', community: 'Community & communication'
  };
  const times = ['one bounded task', 'occasional participation', 'a recurring commitment to discuss'];
  form.hidden = false;
  function invalidate() {
    review.hidden = true;
    text.value = '';
    email.removeAttribute('href');
    status.textContent = '';
  }
  form.addEventListener('input', invalidate);
  form.addEventListener('change', invalidate);
  form.addEventListener('reset', () => {
    invalidate(); errors.replaceChildren();
    form.querySelectorAll('[aria-invalid]').forEach(e => e.removeAttribute('aria-invalid'));
    status.textContent = 'Draft cleared. Nothing was sent or saved.';
  });
  document.querySelectorAll('[data-department]').forEach(link => link.addEventListener('click', () => {
    department.value = link.dataset.department;
    invalidate();
    department.focus({preventScroll:true});
  }));
  form.addEventListener('submit', event => {
    event.preventDefault(); invalidate(); errors.replaceChildren();
    form.querySelectorAll('[aria-invalid]').forEach(e => e.removeAttribute('aria-invalid'));
    const problems = [];
    if (!Object.hasOwn(departments, department.value)) problems.push([department, 'Choose a department.']);
    if (proposal.value.trim().length < 20 || proposal.value.length > 600) problems.push([proposal, 'Describe your contribution in 20–600 characters.']);
    if (work.value.trim()) {
      try {
        const url = new URL(work.value.trim());
        if (url.protocol !== 'https:' || url.username || url.password || work.value.length > 200) throw new Error();
      } catch { problems.push([work, 'Use a public HTTPS link without a username or password, up to 200 characters, or leave this blank.']); }
    }
    if (!times.includes(availability.value)) problems.push([availability, 'Choose your availability.']);
    if (!acknowledge.checked) problems.push([acknowledge, 'Confirm that you understand the participation and review terms.']);
    if (problems.length) {
      const heading = document.createElement('p'); heading.textContent = 'Please check these fields:'; errors.append(heading);
      const list = document.createElement('ul');
      problems.forEach(([field,message]) => {
        field.setAttribute('aria-invalid','true');
        const li = document.createElement('li'); const a = document.createElement('a');
        a.href = '#' + field.id; a.textContent = message;
        a.addEventListener('click', () => field.focus()); li.append(a); list.append(li);
      }); errors.append(list); errors.focus(); return;
    }
    const label = departments[department.value];
    const draft = [
      'Gods of Mayhem — leadership interest', '', 'Department: ' + label,
      'Participation: voluntary, unpaid interest; no membership or employment acceptance.', '',
      'Contribution proposal:', proposal.value.trim(), '',
      'Public work/profile: ' + (work.value.trim() || 'Not supplied'),
      'Availability: ' + availability.value, '',
      'Please discuss scope, credit, rights, public visibility and exit arrangements before work begins.'
    ].join('\n');
    text.value = draft;
    email.href = 'mailto:questions@loptrlab.com?subject=' + encodeURIComponent('Gods of Mayhem interest — ' + label) + '&body=' + encodeURIComponent(draft);
    review.hidden = false;
    document.getElementById('draft-title').focus();
    status.textContent = 'Draft prepared for your review. Nothing has been sent.';
  });
  document.getElementById('download-draft').addEventListener('click', () => {
    if (review.hidden || !text.value) return;
    const url = URL.createObjectURL(new Blob([text.value], {type:'text/plain;charset=utf-8'}));
    const a = document.createElement('a'); a.href = url; a.download = 'gods-of-mayhem-interest.txt';
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    status.textContent = 'Draft download requested. Nothing has been sent.';
  });
})();
