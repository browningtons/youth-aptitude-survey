import type { Aptitude, Theme } from '../types';

const SHEETS_WEBHOOK_URL = import.meta.env.VITE_SHEETS_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbxb-yoy2NkSSZY2S3quKvrahWZD2ao-G52BDLXhR2nremwERkZjn0-lkx5MQiOVZtPY/exec';

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

  // Fire-and-forget — don't block the UI
  fetch(SHEETS_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(payload)
  }).catch(() => {
    // Silently fail — analytics should never break the app
  });
}
