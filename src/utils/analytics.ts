import type { AgeGroup, Aptitude, Theme } from '../types';

const SHEETS_WEBHOOK_URL = import.meta.env.VITE_SHEETS_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbwA2bTUr03lF4CWaJoitwU5UlfQ120Bp-UfFLPbWltbtZwboNcygR5ckKakoGTQjKA/exec';

export function trackCompletion(
  name: string,
  ageGroup: AgeGroup,
  aptitude: Aptitude,
  theme: Theme,
  durationSec: number | null
) {
  if (!SHEETS_WEBHOOK_URL) return;

  // Privacy: never ship the full name or DOB off-device. First initial only.
  const initial = (name.trim().charAt(0) || '').toUpperCase();

  const payload = {
    initial,
    ageGroup,
    aptitude,
    theme,
    timestamp: new Date().toISOString(),
    // Null when we couldn't measure (e.g. resume from a pre-duration save);
    // the sheet gets a blank cell rather than a misleading zero.
    durationSec
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
