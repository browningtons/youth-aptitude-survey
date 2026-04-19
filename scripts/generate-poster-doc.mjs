// Generate an editable .docx of the trifold poster text.
// Drop the file into Google Drive → Open with Google Docs to edit,
// then File → Download → PDF when you're happy with it.
//
// Run with: node scripts/generate-poster-doc.mjs
// Output:   ~/Downloads/Student-Paths-Poster.docx

import {
  Document, Packer, Paragraph, TextRun,
  HeadingLevel, AlignmentType, PageBreak,
} from 'docx';
import { writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

// ---------- helpers ----------
const banner = (text) => new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 0, after: 240 },
  children: [
    new TextRun({ text, bold: true, size: 56, color: '1E3A8A' }), // 28pt navy
  ],
});

const panelTitle = (text) => new Paragraph({
  spacing: { before: 480, after: 120 },
  border: { bottom: { color: 'EC4899', size: 12, space: 4, style: 'single' } },
  children: [
    new TextRun({ text, bold: true, size: 36, color: '4F46E5' }), // 18pt indigo
  ],
});

const sectionHead = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_2,
  spacing: { before: 280, after: 80 },
  children: [
    new TextRun({ text, bold: true, size: 32, color: '1E293B' }), // 16pt slate
  ],
});

const body = (text) => new Paragraph({
  spacing: { after: 160, line: 320 },
  children: [
    new TextRun({ text, size: 24 }), // 12pt
  ],
});

const placeholder = (text) => new Paragraph({
  spacing: { after: 160 },
  children: [
    new TextRun({ text: `[${text}]`, italics: true, size: 22, color: '94A3B8' }),
  ],
});

const bullet = (text) => new Paragraph({
  bullet: { level: 0 },
  spacing: { after: 80 },
  children: [
    new TextRun({ text, size: 24 }),
  ],
});

const quote = (text, author) => [
  new Paragraph({
    spacing: { before: 120, after: 40 },
    indent: { left: 360 },
    children: [
      new TextRun({ text: `“${text}”`, italics: true, size: 24, color: '334155' }),
    ],
  }),
  new Paragraph({
    spacing: { after: 200 },
    indent: { left: 360 },
    children: [
      new TextRun({ text: `— ${author}`, bold: true, size: 22, color: '4F46E5' }),
    ],
  }),
];

const pageBreak = () => new Paragraph({ children: [new PageBreak()] });

// ---------- content ----------
const children = [
  banner('LEARN SMARTER, NOT HARDER'),

  // ----- Panel 1 -----
  panelTitle('Panel 1 — Left Wing'),
  sectionHead('Who?'),
  body("We're helping students from elementary through high school discover what they're great at — and find the careers that fit how they actually think."),

  sectionHead('Why?'),
  body("Most kids leave school without a clear sense of what they're built for. They pick paths from movies, family pressure, or pure guesswork — and end up changing course years later. The earlier you understand your own aptitude, the smarter you can learn."),

  sectionHead('Facts'),
  bullet('The average person changes careers 5–7 times in their lifetime.'),
  bullet('Most kids can name 5 brands before they can name 5 career paths.'),
  bullet('Workers in jobs that match their personality are far more likely to stay, grow, and feel fulfilled.'),
  bullet("The Holland RIASEC model has guided career counselors for more than 60 years — it's the backbone of this survey."),

  pageBreak(),

  // ----- Panel 2 -----
  panelTitle('Panel 2 — Center'),
  sectionHead('The Pathway Finder Survey'),
  body("In just 15 age-adjusted questions, the Pathway Finder figures out how you think and matches you to one of 6 aptitude profiles. You get a list of careers that fit, plus a personalized action plan with books to read, people to look up, and activities to try — built for your age. Works in English and Spanish."),

  placeholder('Place the QR code here — print one from the live app, or use the QR shown in the Poster tab'),

  pageBreak(),

  // ----- Panel 3 -----
  panelTitle('Panel 3 — Right Wing'),
  sectionHead('Future'),
  body("If education changed, students would understand the world — and themselves — sooner and better. They wouldn't just memorize information; they'd learn by doing, together. The future would have more confident, creative people solving real-world challenges."),

  sectionHead('Robert Kiyosaki'),
  ...quote("Schools teach you to work for money, but don't teach you how money works.", 'Robert Kiyosaki'),

  sectionHead('Elon Musk'),
  ...quote("Don't confuse schooling with education. I think colleges are basically for fun and to prove you can do your chores, but they're not for learning.", 'Elon Musk'),
];

// ---------- build ----------
const doc = new Document({
  creator: 'Student Paths',
  title: 'Trifold Poster — Learn Smarter, Not Harder',
  styles: {
    default: {
      document: {
        run: { font: 'Helvetica' },
      },
    },
  },
  sections: [{
    properties: {
      page: {
        margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 }, // 0.75"
      },
    },
    children,
  }],
});

const out = join(homedir(), 'Downloads', 'Student-Paths-Poster.docx');
const buf = await Packer.toBuffer(doc);
writeFileSync(out, buf);
console.log(`✅ Saved: ${out}`);
console.log('\nNext steps:');
console.log('  1. Open https://drive.google.com');
console.log('  2. Drag the .docx file into Drive');
console.log('  3. Right-click → Open with → Google Docs');
console.log('  4. Edit the words you want to change');
console.log('  5. File → Download → PDF Document (.pdf)');
