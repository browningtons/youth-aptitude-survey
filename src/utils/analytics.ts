import type { Aptitude, Theme } from '../types';

const SHEETS_WEBHOOK_URL = import.meta.env.VITE_SHEETS_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbwA2bTUr03lF4CWaJoitwU5UlfQ120Bp-UfFLPbWltbtZwboNcygR5ckKakoGTQjKA/exec';

export function trackCompletion(
  name: string,
  dob: string,
  aptitude: Aptitude,
  theme: Theme
) {
  if (!SHEETS_WEBHOOK_URL) return;

  const payload = {
    name,
    dob,
    aptitude,
    theme,
    timestamp: new Date().toISOString()
  };

  // Fire-and-forget — no-cors needed for Google Apps Script redirects
  fetch(SHEETS_WEBHOOK_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(payload)
  }).catch(() => {
    // Silently fail — analytics should never break the app
  });
}
