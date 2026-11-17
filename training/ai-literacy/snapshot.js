/* A dated static snapshot remains useful offline; no refresh request is made. */
(() => {
  'use strict';
  const verified = Date.UTC(2026, 10, 7);
  const days = Math.max(0, Math.floor((Date.now() - verified) / 86400000));
  document.getElementById('snapshot-age').textContent = 'Static snapshot verified 7 November 2026 (' + days + ' days ago). ' + (days > 180 ? 'This snapshot is over 180 days old; check the linked sources for newer evidence.' : 'Check source dates before relying on it.');
})();
