#!/usr/bin/env node
/**
 * Dry-run the live analytics pipeline by sending N fake survey completions
 * to the Apps Script webhook. Use before the science fair to populate the
 * dashboard with sample data so you can see what judges will see.
 *
 * Usage:
 *   node scripts/dry-run-submissions.mjs           # send 20 randomized rows
 *   node scripts/dry-run-submissions.mjs 50        # send 50
 *   node scripts/dry-run-submissions.mjs 10 --dry  # print payloads only, no network
 *
 * Override the webhook URL without editing this file:
 *   SHEETS_WEBHOOK_URL=https://... node scripts/dry-run-submissions.mjs
 *
 * NOTE: these rows land in your real Google Sheet. Delete them before the
 * fair (filter Column A === 'Z' — the test initial — and delete).
 */

const DEFAULT_URL = 'https://script.google.com/macros/s/AKfycbwA2bTUr03lF4CWaJoitwU5UlfQ120Bp-UfFLPbWltbtZwboNcygR5ckKakoGTQjKA/exec';
const URL = process.env.SHEETS_WEBHOOK_URL || DEFAULT_URL;

const APTITUDES = ['Builder', 'Thinker', 'Creator', 'Helper', 'Persuader', 'Organizer'];
const AGE_GROUPS = ['elementary', 'jrHigh', 'highSchool'];
const THEMES = ['neon', 'glass', 'minimal', 'sunset', 'forest'];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDuration() {
  // Realistic spread: 75% finish in 90-240s, 25% slower.
  const fast = Math.random() < 0.75;
  return fast
    ? 90 + Math.floor(Math.random() * 150)
    : 240 + Math.floor(Math.random() * 180);
}

function randomPayload() {
  return {
    // 'Z' makes the rows easy to filter-and-delete after the dry run.
    initial: 'Z',
    ageGroup: pick(AGE_GROUPS),
    aptitude: pick(APTITUDES),
    theme: pick(THEMES),
    timestamp: new Date().toISOString(),
    durationSec: randomDuration(),
  };
}

async function send(payload) {
  // Mirror the client: no-cors isn't a thing in Node, but a regular POST with
  // a text/plain content-type matches how Apps Script receives browser calls.
  const res = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(payload),
  });
  return res.ok;
}

async function main() {
  const count = Number(process.argv[2]) || 20;
  const isDry = process.argv.includes('--dry');

  console.log(`Generating ${count} fake submissions${isDry ? ' (dry-run, no network)' : ''}...`);
  console.log(`Webhook: ${URL}\n`);

  let ok = 0;
  let fail = 0;
  for (let i = 0; i < count; i++) {
    const payload = randomPayload();
    if (isDry) {
      console.log(JSON.stringify(payload));
      ok++;
      continue;
    }
    try {
      const success = await send(payload);
      if (success) ok++; else fail++;
      process.stdout.write(success ? '.' : 'x');
      // Small jitter so timestamps aren't identical.
      await new Promise(r => setTimeout(r, 120 + Math.random() * 200));
    } catch (err) {
      fail++;
      process.stdout.write('!');
    }
  }

  if (!isDry) console.log('\n');
  console.log(`\nDone. Success: ${ok}, Failed: ${fail}`);
  if (!isDry) console.log('Filter Column A === \'Z\' in your sheet to find and delete these rows after the dry run.');
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
