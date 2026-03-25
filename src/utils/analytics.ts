import type { AgeGroup, Aptitude, Theme } from '../types';

const SHEETS_WEBHOOK_URL = import.meta.env.VITE_SHEETS_WEBHOOK_URL || '';

export function trackCompletion(
  name: string,
  ageGroup: AgeGroup,
  aptitude: Aptitude,
  theme: Theme
) {
  if (!SHEETS_WEBHOOK_URL) return;

  const payload = {
    name,
    ageGroup,
    aptitude,
    theme,
    timestamp: new Date().toISOString()
  };

  // Fire-and-forget — don't block the UI
  fetch(SHEETS_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(payload)
  }).catch(() => {
    // Silently fail — analytics should never break the app
  });
}
