import { ArrowLeft, BookOpen, Sparkles } from 'lucide-react';
import type { Aptitude, ThemeStyles } from '../types';
import { APTITUDE_DETAILS } from '../data/aptitudes';

const HOLLAND_MAP: Record<Aptitude, string> = {
  Builder: 'Realistic',
  Thinker: 'Investigative',
  Creator: 'Artistic',
  Helper: 'Social',
  Persuader: 'Enterprising',
  Organizer: 'Conventional'
};

interface Props {
  t: ThemeStyles;
  onBack: () => void;
}

export default function Admin({ t, onBack }: Props) {
  return (
    <div className={`w-full max-w-5xl p-6 sm:p-12 text-left ${t.card} relative overflow-hidden`}>
      <button
        onClick={onBack}
        className={`mb-8 flex items-center gap-2 font-bold opacity-80 hover:opacity-100 transition-opacity ${t.accentText}`}
      >
        <ArrowLeft className="w-5 h-5" /> Back to Setup
      </button>

      <div className="flex items-center gap-4 mb-6">
        <BookOpen className={`w-10 h-10 ${t.iconColor}`} />
        <h1 className="text-3xl sm:text-4xl font-extrabold">Methodology & Outcomes</h1>
      </div>

      <div className="prose prose-lg max-w-none opacity-90 mb-12">
        <p className="mb-4">
          This aptitude survey is structurally inspired by the <strong>Holland Occupational Themes (RIASEC)</strong>, a widely respected theory of careers and vocational choice based upon personality types. It posits that people are best suited to work environments that match their inherent preferences and problem-solving styles.
        </p>
        <p>
          To make the survey highly engaging and accessible for students across elementary, junior high, and high school, the core psychological categories have been adapted into six intuitive "Aptitude Profiles". The algorithm asks 15 dynamically age-adjusted questions, forcing choices between four distinct behavioral paths, ultimately calculating a dominant aptitude.
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-6 border-b border-current/10 pb-4">The 6 Possible Outcomes</h2>

      <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
        {(Object.keys(APTITUDE_DETAILS) as Aptitude[]).map((key) => {
          const apt = APTITUDE_DETAILS[key];
          const Icon = apt.icon;
          return (
            <div key={key} className="p-6 rounded-3xl border border-current/10 bg-current/5 flex flex-col h-full hover:bg-current/10 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-4 rounded-2xl ${t.progressBarBg}`}>
                  <Icon className={`w-8 h-8 ${t.iconColor}`} />
                </div>
                <div>
                  <h3 className={`text-2xl font-extrabold ${t.accentText}`}>{apt.name}</h3>
                  <p className="text-sm font-semibold opacity-60 uppercase tracking-wider">
                    Holland Equivalent: {HOLLAND_MAP[key]}
                  </p>
                </div>
              </div>

              <p className="opacity-80 mb-6 flex-grow leading-relaxed">
                {apt.description}
              </p>

              <div className="mt-auto">
                <h4 className="font-bold text-sm uppercase tracking-wide opacity-70 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Core Strengths
                </h4>
                <div className="flex flex-wrap gap-2">
                  {apt.strengths.map((str, idx) => (
                    <span key={idx} className="px-3 py-1 text-sm font-semibold rounded-full border border-current/10 bg-white/50 dark:bg-black/20 opacity-90">
                      {str}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
