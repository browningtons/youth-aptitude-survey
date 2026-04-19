import { QRCodeSVG } from 'qrcode.react';
import { Printer } from 'lucide-react';
import type { ThemeStyles } from '../types';
import { useI18n } from '../i18n';

interface Props {
  t: ThemeStyles;
}

export default function Poster({ t }: Props) {
  const { t: tr } = useI18n();
  const appUrl = window.location.origin + window.location.pathname;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Printer className={`w-8 h-8 ${t.iconColor}`} aria-hidden="true" />
          <h1 className="text-3xl sm:text-4xl font-extrabold">{tr('poster.title')}</h1>
        </div>
        <p className="opacity-70 text-sm sm:text-base max-w-2xl">{tr('poster.subtitle')}</p>
      </div>

      {/* Preview — 3 panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PanelPreview label="Panel 1 — The Problem">
          <PanelHeader label="Panel 1 of 3 — The Problem" />
          <div className="p-5 text-slate-800">
            <SectionTitle>Who?</SectionTitle>
            <p className="text-sm leading-relaxed mb-5">
              We're helping young kids from 1st through 3rd grade become more prepared for real life.
            </p>

            <SectionTitle>Why?</SectionTitle>
            <p className="text-sm leading-relaxed mb-5">
              Kids don't learn important real-life skills like how taxes work, budgeting, money, building credit, or understanding loans. These gaps can affect their entire adulthood.
            </p>

            <SectionTitle>Facts</SectionTitle>
            <ul className="text-sm space-y-2 mb-5">
              <Bullet>1 in 3 U.S. adults can't cover a $400 emergency.</Bullet>
              <Bullet>Most kids name 5 brands before 5 career paths.</Bullet>
              <Bullet>Average person changes careers 5–7 times.</Bullet>
              <Bullet>Only 26 states require personal finance to graduate.</Bullet>
            </ul>

            <div className="relative rounded-lg bg-slate-100 p-4 italic text-sm text-slate-700">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-pink-500 rounded-l-lg" />
              <p className="pl-2">
                If kids learned one real-life skill every week of elementary school, they'd graduate with 180 of them.
              </p>
            </div>
          </div>
        </PanelPreview>

        <PanelPreview label="Panel 2 — The Solution">
          <PanelHeader label="Panel 2 of 3 — The Solution" />
          <div className="p-5 text-slate-800">
            <SectionTitle>The Pathway Finder</SectionTitle>
            <p className="text-sm leading-relaxed mb-4">
              Our app asks a handful of questions about how you think, then suggests careers that match — plus books to read, people to learn from, and activities to try at your age.
            </p>
            <ul className="text-sm space-y-1.5 mb-5">
              <Bullet>15 age-adjusted questions.</Bullet>
              <Bullet>Based on Holland RIASEC — 6 aptitudes.</Bullet>
              <Bullet>Personalized action plan for every result.</Bullet>
              <Bullet>Works in English and Spanish.</Bullet>
            </ul>

            <div className="flex flex-col items-center">
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                <QRCodeSVG value={appUrl} size={160} level="H" />
              </div>
              <p className="mt-3 font-bold text-slate-800">Scan to take the survey</p>
              <p className="text-xs text-slate-500 mt-1 break-all text-center">{appUrl}</p>
            </div>
          </div>
        </PanelPreview>

        <PanelPreview label="Panel 3 — The Future">
          <PanelHeader label="Panel 3 of 3 — The Future" />
          <div className="p-5 text-slate-800">
            <SectionTitle>Imagine If...</SectionTitle>
            <p className="text-sm leading-relaxed mb-5">
              If education changed, students would understand the real world sooner and better. They wouldn't just memorize information — they'd learn by doing, together. The future would have more confident, creative people solving real-world challenges.
            </p>

            <QuotePreview author="Robert Kiyosaki">
              Schools teach you to work for money, but don't teach you how money works.
            </QuotePreview>

            <div className="h-3" />

            <QuotePreview author="Elon Musk">
              Don't confuse schooling with education. Colleges are basically for fun and to prove you can do your chores — they're not for learning.
            </QuotePreview>

            <p className="mt-5 text-center text-xs text-slate-500">
              Built with React, TypeScript & Tailwind • Deployed on GitHub Pages
            </p>
          </div>
        </PanelPreview>
      </div>
    </div>
  );
}

function PanelPreview({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] font-bold uppercase tracking-wider opacity-50 mb-2">{label}</div>
      <div
        className="rounded-lg overflow-hidden shadow-xl border border-current/10 bg-white"
        style={{ aspectRatio: '8.5 / 11' }}
      >
        <div className="w-full h-full overflow-hidden flex flex-col">{children}</div>
      </div>
    </div>
  );
}

function PanelHeader({ label }: { label: string }) {
  return (
    <div className="bg-indigo-600 text-white px-4 py-3 flex-shrink-0">
      <div className="flex items-center justify-between text-[10px] font-bold tracking-wider">
        <span>STUDENT PATHS</span>
        <span className="opacity-80">{label.toUpperCase()}</span>
      </div>
      <div className="h-px bg-white/30 my-1.5" />
      <h3 className="text-lg font-extrabold text-center">Learn Smarter, Not Harder</h3>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="flex items-center gap-2 text-base font-extrabold mb-2">
      <span className="w-1.5 h-5 bg-pink-500 rounded-sm" />
      {children}
    </h4>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 flex-shrink-0" />
      <span>{children}</span>
    </li>
  );
}

function QuotePreview({ author, children }: { author: string; children: React.ReactNode }) {
  return (
    <div className="relative rounded-lg bg-slate-100 p-4">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-pink-500 rounded-l-lg" />
      <p className="italic text-sm text-slate-700 pl-2 mb-2">"{children}"</p>
      <p className="text-xs font-bold text-indigo-600 pl-2">— {author}</p>
    </div>
  );
}
