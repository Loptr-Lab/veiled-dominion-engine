// Default markup retains dated records in a collapsed archive, even without JS.
export function eventIsCurrent(expires, now = Date.now()) {
  const end = Date.parse(expires);
  return Number.isFinite(end) && now < end;
}
export function refreshEvents(root = document, now = Date.now()) {
  for (const section of root.querySelectorAll('#magenta-muraca')) {
    const current = section.querySelector('[data-current-events]');
    const archive = section.querySelector('[data-event-archive]');
    for (const event of section.querySelectorAll('[data-training-event]')) {
      const active = eventIsCurrent(event.dataset.expires, now);
      const destination = active ? current : archive;
      if (event.parentElement !== destination) destination.append(event);
      event.querySelector('[data-event-register]').hidden = !active;
      event.querySelector('[data-event-ended]').hidden = active;
    }
    current.hidden = !current.querySelector('[data-training-event]');
  }
}
if (typeof document !== 'undefined') {
  const refresh = () => refreshEvents();
  refresh();
  // Include the exact expiry boundary; also refresh after suspended tabs resume.
  for (const event of document.querySelectorAll('[data-training-event]')) {
    const remaining = Date.parse(event.dataset.expires) - Date.now();
    if (remaining > 0 && remaining <= 2147483647) setTimeout(refresh, remaining);
  }
  setInterval(refresh, 60000);
  document.addEventListener('visibilitychange', refresh);
  window.addEventListener('pageshow', refresh);
}
