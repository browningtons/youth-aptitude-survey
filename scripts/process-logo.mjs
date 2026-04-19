// Take the raw MOJH ram logo, knock out the white background,
// trim transparent edges, and emit favicon + app-icon sizes.
// Run with: node scripts/process-logo.mjs

import sharp from 'sharp';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC = join(ROOT, 'public', 'MOJH_logo_2022.png');
const PUB = join(ROOT, 'public');

// Threshold: anything brighter than this on all RGB channels becomes transparent.
const WHITE_THRESHOLD = 240;

async function knockOutWhite(srcPath) {
  const img = sharp(srcPath).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const px = Buffer.from(data); // RGBA
  for (let i = 0; i < px.length; i += 4) {
    const r = px[i], g = px[i + 1], b = px[i + 2];
    if (r >= WHITE_THRESHOLD && g >= WHITE_THRESHOLD && b >= WHITE_THRESHOLD) {
      px[i + 3] = 0; // fully transparent
    }
  }
  // Re-wrap as a sharp instance and trim away empty edges.
  return sharp(px, {
    raw: { width: info.width, height: info.height, channels: 4 }
  }).trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } });
}

async function emit(label, size, basePipeline) {
  const out = join(PUB, label);
  await basePipeline
    .clone()
    .resize(size, size, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log(`  ✓ ${label} (${size}×${size})`);
}

async function build() {
  console.log('Knocking out white background and trimming…');
  const cleaned = await knockOutWhite(SRC);
  // Materialize once so the pipeline branches can clone cheaply
  const pngBuffer = await cleaned.png().toBuffer();
  const base = sharp(pngBuffer);

  console.log('Writing icons:');
  await emit('logo.png', 512, base);              // app use
  await emit('apple-touch-icon.png', 180, base);  // iOS home screen
  await emit('favicon-32.png', 32, base);         // standard tab favicon
  await emit('favicon-16.png', 16, base);         // small tab favicon

  console.log('\n✅ All logo assets written to /public');
}

build().catch(err => {
  console.error('Failed:', err);
  process.exit(1);
});
