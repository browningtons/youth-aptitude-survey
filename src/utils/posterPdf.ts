import { jsPDF } from 'jspdf';

// Brand palette (RGB)
const INDIGO: RGB = [79, 70, 229];
const SLATE: RGB = [30, 41, 59];
const GRAY: RGB = [100, 116, 139];
const LIGHT: RGB = [241, 245, 249];
const WHITE: RGB = [255, 255, 255];
const ACCENT: RGB = [236, 72, 153];

type RGB = readonly [number, number, number];

const fill = (d: jsPDF, c: RGB) => d.setFillColor(c[0], c[1], c[2]);
const text = (d: jsPDF, c: RGB) => d.setTextColor(c[0], c[1], c[2]);
const draw = (d: jsPDF, c: RGB) => d.setDrawColor(c[0], c[1], c[2]);

function header(d: jsPDF, W: number, M: number, panelLabel: string) {
  // Colored band
  fill(d, INDIGO);
  d.rect(0, 0, W, 30, 'F');
  // Brand marks
  text(d, WHITE);
  d.setFont('helvetica', 'bold');
  d.setFontSize(10);
  d.text('STUDENT PATHS', M, 11);
  d.setFont('helvetica', 'normal');
  d.setFontSize(9);
  d.text(panelLabel.toUpperCase(), W - M, 11, { align: 'right' });
  // Hairline divider
  draw(d, WHITE);
  d.setLineWidth(0.2);
  d.line(M, 14, W - M, 14);
  // Tagline
  d.setFont('helvetica', 'bold');
  d.setFontSize(20);
  d.text('Learn Smarter, Not Harder', W / 2, 24, { align: 'center' });
}

function footer(d: jsPDF, W: number, H: number, label: string) {
  text(d, GRAY);
  d.setFont('helvetica', 'normal');
  d.setFontSize(8);
  d.text('Student Paths — Aptitude Survey Project', 15, H - 8);
  d.text(label, W - 15, H - 8, { align: 'right' });
}

function section(d: jsPDF, x: number, y: number, title: string): number {
  fill(d, ACCENT);
  d.rect(x, y, 5, 8, 'F');
  text(d, SLATE);
  d.setFont('helvetica', 'bold');
  d.setFontSize(18);
  d.text(title, x + 10, y + 7);
  return y + 14;
}

function paragraph(d: jsPDF, x: number, y: number, w: number, body: string, size = 12): number {
  text(d, SLATE);
  d.setFont('helvetica', 'normal');
  d.setFontSize(size);
  const lines = d.splitTextToSize(body, w) as string[];
  d.text(lines, x, y);
  return y + lines.length * (size * 0.42) + 2;
}

function bullets(d: jsPDF, x: number, y: number, w: number, items: string[]): number {
  text(d, SLATE);
  d.setFont('helvetica', 'normal');
  d.setFontSize(12);
  items.forEach(item => {
    fill(d, INDIGO);
    d.circle(x + 2, y - 1.5, 1.3, 'F');
    const lines = d.splitTextToSize(item, w - 8) as string[];
    d.text(lines, x + 7, y);
    y += lines.length * 5 + 3;
  });
  return y + 2;
}

function quoteCard(d: jsPDF, x: number, y: number, w: number, body: string, author: string): number {
  const lines = d.splitTextToSize(`"${body}"`, w - 20) as string[];
  const h = lines.length * 6 + 22;
  fill(d, LIGHT);
  d.roundedRect(x, y, w, h, 4, 4, 'F');
  fill(d, ACCENT);
  d.rect(x, y, 3, h, 'F');
  text(d, SLATE);
  d.setFont('helvetica', 'italic');
  d.setFontSize(13);
  d.text(lines, x + 10, y + 10);
  text(d, INDIGO);
  d.setFont('helvetica', 'bold');
  d.setFontSize(11);
  d.text(`— ${author}`, x + 10, y + h - 7);
  return y + h;
}

// Pull the hidden QR canvas rendered by the Poster component
function getQRDataURL(): string | null {
  const canvas = document.querySelector<HTMLCanvasElement>('#poster-qr-hidden canvas');
  if (!canvas) return null;
  try {
    return canvas.toDataURL('image/png');
  } catch {
    return null;
  }
}

function drawPanel1(d: jsPDF, W: number, H: number, M: number) {
  header(d, W, M, 'Panel 1 of 3 — The Problem');
  let y = 46;

  y = section(d, M, y, 'Who?');
  y = paragraph(d, M, y, W - 2 * M,
    "We're helping young kids from 1st through 3rd grade become more prepared for real life."
  );
  y += 8;

  y = section(d, M, y, 'Why?');
  y = paragraph(d, M, y, W - 2 * M,
    "Kids don't learn important real-life skills like how taxes work, budgeting, money, building credit, or understanding loans. These gaps can affect their entire adulthood."
  );
  y += 8;

  y = section(d, M, y, 'Facts');
  y = bullets(d, M, y + 2, W - 2 * M, [
    '1 in 3 U.S. adults can\'t cover a $400 emergency without borrowing.',
    'Most kids can name 5 brands before they can name 5 career paths.',
    'The average person changes careers 5–7 times in their lifetime.',
    'Only 26 states require a personal finance course to graduate high school.'
  ]);

  // Pull quote band near bottom
  const bandH = 42;
  const bandY = H - bandH - 18;
  fill(d, LIGHT);
  d.roundedRect(M, bandY, W - 2 * M, bandH, 4, 4, 'F');
  fill(d, ACCENT);
  d.rect(M, bandY, 3, bandH, 'F');
  text(d, SLATE);
  d.setFont('helvetica', 'italic');
  d.setFontSize(14);
  const pull = "If kids learned one real-life skill every week of elementary school, they'd graduate with 180 of them.";
  const pullLines = d.splitTextToSize(pull, W - 2 * M - 20) as string[];
  d.text(pullLines, W / 2, bandY + 14, { align: 'center' });

  footer(d, W, H, 'Page 1 of 3');
}

function drawPanel2(d: jsPDF, W: number, H: number, M: number, appUrl: string) {
  header(d, W, M, 'Panel 2 of 3 — The Solution');
  let y = 46;

  y = section(d, M, y, 'The Pathway Finder');
  y = paragraph(d, M, y, W - 2 * M,
    "Our app asks a handful of questions about how you think, then suggests careers that match — plus books to read, people to learn from, and activities to try at your age."
  );
  y += 4;

  // Feature bullets
  y = bullets(d, M, y, W - 2 * M, [
    '15 age-adjusted questions (elementary, jr. high, or high school).',
    'Based on the Holland RIASEC model — 6 aptitudes.',
    'Personalized action plan for every result.',
    'Works in English and Spanish.'
  ]);
  y += 6;

  // QR section — centered block
  const qrDataUrl = getQRDataURL();
  const qrSize = 95; // mm
  const qrX = (W - qrSize) / 2;

  // White tile behind QR
  fill(d, WHITE);
  draw(d, LIGHT);
  d.setLineWidth(0.6);
  d.roundedRect(qrX - 6, y - 6, qrSize + 12, qrSize + 12, 4, 4, 'FD');

  if (qrDataUrl) {
    d.addImage(qrDataUrl, 'PNG', qrX, y, qrSize, qrSize);
  } else {
    // Fallback: placeholder square
    fill(d, LIGHT);
    d.rect(qrX, y, qrSize, qrSize, 'F');
    text(d, GRAY);
    d.setFont('helvetica', 'bold');
    d.setFontSize(10);
    d.text('QR', W / 2, y + qrSize / 2, { align: 'center' });
  }
  y += qrSize + 14;

  text(d, SLATE);
  d.setFont('helvetica', 'bold');
  d.setFontSize(16);
  d.text('Scan to take the survey', W / 2, y, { align: 'center' });
  y += 7;
  text(d, GRAY);
  d.setFont('helvetica', 'normal');
  d.setFontSize(9);
  d.text(appUrl, W / 2, y, { align: 'center' });

  footer(d, W, H, 'Page 2 of 3');
}

function drawPanel3(d: jsPDF, W: number, H: number, M: number) {
  header(d, W, M, 'Panel 3 of 3 — The Future');
  let y = 46;

  y = section(d, M, y, 'Imagine If...');
  y = paragraph(d, M, y, W - 2 * M,
    "If education changed, students would understand the real world sooner and better. They wouldn't just memorize information — they'd learn by doing, together. The future would have more confident, creative people solving real-world challenges."
  );
  y += 8;

  y = quoteCard(d, M, y, W - 2 * M,
    'Schools teach you to work for money, but don\'t teach you how money works.',
    'Robert Kiyosaki'
  );
  y += 8;
  y = quoteCard(d, M, y, W - 2 * M,
    "Don't confuse schooling with education. Colleges are basically for fun and to prove you can do your chores — they're not for learning.",
    'Elon Musk'
  );

  // Credits footer band
  text(d, GRAY);
  d.setFont('helvetica', 'normal');
  d.setFontSize(10);
  d.text('Built with React, TypeScript & Tailwind • Deployed on GitHub Pages', W / 2, H - 18, { align: 'center' });

  footer(d, W, H, 'Page 3 of 3');
}

export async function generatePosterPDF(appUrl: string): Promise<void> {
  const doc = new jsPDF({ format: 'letter', orientation: 'portrait', unit: 'mm' });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const M = 15;

  drawPanel1(doc, W, H, M);
  doc.addPage();
  drawPanel2(doc, W, H, M, appUrl);
  doc.addPage();
  drawPanel3(doc, W, H, M);

  doc.save('Student-Paths-Poster.pdf');
}
