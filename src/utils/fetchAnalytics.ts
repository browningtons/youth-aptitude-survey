import type { AnalyticsData } from '../types';

const SHEETS_WEBHOOK_URL = import.meta.env.VITE_SHEETS_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbxb-yoy2NkSSZY2S3quKvrahWZD2ao-G52BDLXhR2nremwERkZjn0-lkx5MQiOVZtPY/exec';

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
