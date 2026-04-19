// Generate a 3-page letter-portrait PDF of the trifold poster panels.
// Run with: node scripts/generate-poster-pdf.mjs
// Output:  ~/Downloads/Student-Paths-Poster.pdf

import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const APP_URL = 'https://browningtons.github.io/youth-aptitude-survey/';

// Brand palette (RGB)
const INDIGO = [79, 70, 229];
const SLATE  = [30, 41, 59];
const GRAY   = [100, 116, 139];
const LIGHT  = [241, 245, 249];
const WHITE  = [255, 255, 255];
const ACCENT = [236, 72, 153]; // pink

// ---------- helpers ----------
const fill = (d, c) => d.setFillColor(c[0], c[1], c[2]);
const text = (d, c) => d.setTextColor(c[0], c[1], c[2]);
const draw = (d, c) => d.setDrawColor(c[0], c[1], c[2]);

function header(d, W, M, panelLabel) {
  fill(d, INDIGO);
  d.rect(0, 0, W, 34, 'F');
  text(d, WHITE);
  d.setFont('helvetica', 'bold');
  d.setFontSize(12);
  d.text('STUDENT PATHS', M, 12);
  d.setFont('helvetica', 'normal');
  d.setFontSize(10);
  d.text(panelLabel.toUpperCase(), W - M, 12, { align: 'right' });
  d.setFont('helvetica', 'bold');
  d.setFontSize(26);
  d.text('LEARN SMARTER, NOT HARDER', W / 2, 26, { align: 'center' });
}

function footer(d, W, H, label) {
  text(d, GRAY);
  d.setFont('helvetica', 'normal');
  d.setFontSize(9);
  d.text('Student Paths — Aptitude Survey Project', 14, H - 8);
  d.text(label, W - 14, H - 8, { align: 'right' });
}

function sectionHead(d, x, y, title) {
  fill(d, ACCENT);
  d.rect(x, y, 6, 12, 'F');
  text(d, SLATE);
  d.setFont('helvetica', 'bold');
  d.setFontSize(30);
  d.text(title, x + 12, y + 10);
  return y + 22;
}

function paragraph(d, x, y, w, body, size = 19) {
  text(d, SLATE);
  d.setFont('helvetica', 'normal');
  d.setFontSize(size);
  const lines = d.splitTextToSize(body, w);
  const lineH = size * 0.50; // mm
  d.text(lines, x, y + size * 0.35);
  return y + lines.length * lineH + 4;
}

function bullets(d, x, y, w, items, size = 18) {
  text(d, SLATE);
  d.setFont('helvetica', 'normal');
  d.setFontSize(size);
  for (const item of items) {
    fill(d, INDIGO);
    d.circle(x + 2, y + size * 0.3, 1.7, 'F');
    text(d, SLATE);
    const lines = d.splitTextToSize(item, w - 9);
    d.text(lines, x + 8, y + size * 0.35);
    y += lines.length * (size * 0.5) + 4;
  }
  return y + 2;
}

function quoteCard(d, x, y, w, body, author) {
  const bodySize = 17;
  d.setFontSize(bodySize);
  d.setFont('helvetica', 'italic');
  const lines = d.splitTextToSize(`"${body}"`, w - 18);
  const h = lines.length * (bodySize * 0.55) + 22;
  fill(d, LIGHT);
  d.roundedRect(x, y, w, h, 4, 4, 'F');
  fill(d, ACCENT);
  d.rect(x, y, 3, h, 'F');
  text(d, SLATE);
  d.text(lines, x + 10, y + 12);
  text(d, INDIGO);
  d.setFont('helvetica', 'bold');
  d.setFontSize(14);
  d.text(`— ${author}`, x + 10, y + h - 7);
  return y + h;
}

// ---------- panels ----------
function drawPanel1(d, W, H, M) {
  header(d, W, M, 'Panel 1 of 3 — Left Wing');
  let y = 50;

  y = sectionHead(d, M, y, 'Who?');
  y = paragraph(d, M, y, W - 2 * M,
    'We are trying to get young kids from 1st – 3rd grade to be more prepared for real life action.'
  );
  y += 8;

  y = sectionHead(d, M, y, 'Why?');
  y = paragraph(d, M, y, W - 2 * M,
    "Kids don't learn important real life skills like how taxes work, budgeting, money, building credit, or understanding loans. This all can affect a kid's adulthood."
  );
  y += 8;

  y = sectionHead(d, M, y, 'Facts');
  y = bullets(d, M, y, W - 2 * M, [
    "1 in 3 U.S. adults can't cover a $400 emergency.",
    'Most kids name 5 brands before 5 career paths.',
    'Average person changes careers 5–7 times.',
    'Only 26 states require personal finance to graduate.',
  ]);

  footer(d, W, H, 'Page 1 of 3');
}

async function drawPanel2(d, W, H, M) {
  header(d, W, M, 'Panel 2 of 3 — Center');
  let y = 50;

  y = sectionHead(d, M, y, 'The Pathway Finder');
  y = paragraph(d, M, y, W - 2 * M,
    'This survey asks questions to get a better understanding about you so it can reach multiple jobs. It will explain why it gave you those jobs and give books and people to look up too.'
  );
  y += 12;

  // QR
  const qrDataUrl = await QRCode.toDataURL(APP_URL, {
    width: 800,
    margin: 1,
    errorCorrectionLevel: 'H',
    color: { dark: '#1E293B', light: '#FFFFFF' },
  });
  const qrSize = 115;
  const qrX = (W - qrSize) / 2;
  fill(d, WHITE);
  draw(d, [220, 220, 220]);
  d.setLineWidth(0.6);
  d.roundedRect(qrX - 6, y - 6, qrSize + 12, qrSize + 12, 4, 4, 'FD');
  d.addImage(qrDataUrl, 'PNG', qrX, y, qrSize, qrSize);
  y += qrSize + 16;

  text(d, SLATE);
  d.setFont('helvetica', 'bold');
  d.setFontSize(24);
  d.text('Scan to take the survey', W / 2, y, { align: 'center' });
  y += 9;
  text(d, GRAY);
  d.setFont('helvetica', 'normal');
  d.setFontSize(11);
  d.text(APP_URL, W / 2, y, { align: 'center' });

  footer(d, W, H, 'Page 2 of 3');
}

function drawPanel3(d, W, H, M) {
  header(d, W, M, 'Panel 3 of 3 — Right Wing');
  let y = 50;

  y = sectionHead(d, M, y, 'Future');
  y = paragraph(d, M, y, W - 2 * M,
    "If education changed, students would get to understand the real world sooner and better. They wouldn't just memorize information but learn with others. The future world would have more confident, creative people that can solve real-world challenges."
  );
  y += 12;

  y = quoteCard(d, M, y, W - 2 * M,
    "Schools teach you to work for money, but don't teach you how money works.",
    'Robert Kiyosaki'
  );
  y += 8;
  y = quoteCard(d, M, y, W - 2 * M,
    "Don't confuse schooling with education. I think colleges are basically for fun and to prove you can do your chores, but they're not for learning.",
    'Elon Musk'
  );

  footer(d, W, H, 'Page 3 of 3');
}

// ---------- build ----------
async function build() {
  const doc = new jsPDF({ format: 'letter', orientation: 'portrait', unit: 'mm' });
  const W = doc.internal.pageSize.getWidth();   // ~215.9 mm (8.5")
  const H = doc.internal.pageSize.getHeight();  // ~279.4 mm (11")
  const M = 14;

  drawPanel1(doc, W, H, M);
  doc.addPage();
  await drawPanel2(doc, W, H, M);
  doc.addPage();
  drawPanel3(doc, W, H, M);

  const out = join(homedir(), 'Downloads', 'Student-Paths-Poster.pdf');
  const ab = doc.output('arraybuffer');
  writeFileSync(out, Buffer.from(ab));
  console.log(`✅ Saved: ${out}`);
}

build().catch(err => {
  console.error('Failed to build PDF:', err);
  process.exit(1);
});
