/* Optional device-local reading preferences. No requests or participant data. */
(() => {
  'use strict';
  const root = document.documentElement;
  const key = 'loptr-training-display';
  let preferences = { theme: 'dark', size: 'standard' };
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    if (saved && ['dark', 'light', 'system'].includes(saved.theme)) preferences.theme = saved.theme;
    if (saved && ['standard', 'large', 'largest'].includes(saved.size)) preferences.size = saved.size;
  } catch (_) { /* Reading remains available when storage is blocked. */ }
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  function apply() {
    root.dataset.theme = preferences.theme === 'system' ? (system.matches ? 'dark' : 'light') : preferences.theme;
    root.dataset.textSize = preferences.size;
  }
  apply();
  system.addEventListener('change', apply);
  document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.masthead');
    if (!header) return;
    const settings = document.createElement('details');
    settings.className = 'display-settings';
    settings.innerHTML = '<summary>Reading settings</summary><div class="display-controls"><label>Theme<select name="training-theme"><option value="dark">Dark</option><option value="light">Dim light</option><option value="system">Use device setting</option></select></label><label>Text size<select name="training-text-size"><option value="standard">Standard</option><option value="large">Large</option><option value="largest">Largest</option></select></label></div>';
    header.prepend(settings);
    const theme = settings.querySelector('[name=training-theme]');
    const size = settings.querySelector('[name=training-text-size]');
    theme.value = preferences.theme;
    size.value = preferences.size;
    settings.addEventListener('change', () => {
      preferences = { theme: theme.value, size: size.value };
      apply();
      try { localStorage.setItem(key, JSON.stringify(preferences)); } catch (_) { /* Session-only fallback. */ }
    });
  });
})();
