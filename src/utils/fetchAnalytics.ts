import type { AnalyticsData } from '../types';

const SHEETS_WEBHOOK_URL = import.meta.env.VITE_SHEETS_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbwA2bTUr03lF4CWaJoitwU5UlfQ120Bp-UfFLPbWltbtZwboNcygR5ckKakoGTQjKA/exec';

export async function fetchAnalytics(): Promise<AnalyticsData | null> {
  if (!SHEETS_WEBHOOK_URL) return null;

  try {
    const res = await fetch(SHEETS_WEBHOOK_URL);
    if (!res.ok) return null;
    return await res.json() as AnalyticsData;
  } catch {
    return null;
  }
}
