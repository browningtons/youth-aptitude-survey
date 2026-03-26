import { User, ArrowRight, Info } from 'lucide-react';
import type { ThemeStyles } from '../types';
import { useI18n, LanguageToggle } from '../i18n';

interface Props {
  t: ThemeStyles;
  name: string;
  setName: (v: string) => void;
  dob: string;
  setDob: (v: string) => void;
  onStart: () => void;
  onAdmin: () => void;
}

export default function Onboarding({ t, name, setName, dob, setDob, onStart, onAdmin }: Props) {
  const { t: tr } = useI18n();

  return (
    <section className={`w-full max-w-lg p-8 sm:p-12 text-center relative ${t.card}`} aria-label={tr('onboarding.title')}>
      <div className="absolute top-6 right-6 flex items-center gap-3">
        <LanguageToggle />
        <button
          onClick={onAdmin}
          className={`flex items-center gap-2 text-sm font-semibold opacity-60 hover:opacity-100 transition-opacity hover:scale-105 focus:ring-2 focus:ring-current focus:ring-offset-2 rounded ${t.iconColor}`}
          aria-label={tr('onboarding.admin')}
        >
          <Info className="w-5 h-5" aria-hidden="true" /> {tr('onboarding.admin')}
        </button>
      </div>

      <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${t.progressBarBg}`} aria-hidden="true">
        <User className={`w-10 h-10 ${t.iconColor}`} />
      </div>
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">{tr('onboarding.title')}</h1>
      <p className="opacity-80 mb-8">{tr('onboarding.subtitle')}</p>

      <div className="space-y-5 mb-8 text-left">
        <div>
          <label htmlFor="student-name" className="block text-sm font-semibold mb-2 opacity-90 pl-2">{tr('onboarding.nameLabel')}</label>
          <input
            id="student-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={tr('onboarding.namePlaceholder')}
            autoComplete="given-name"
            className={`w-full p-4 outline-none transition-all focus:ring-2 focus:ring-current ${t.input}`}
          />
        </div>
        <div>
          <label htmlFor="student-dob" className="block text-sm font-semibold mb-2 opacity-90 pl-2">{tr('onboarding.dobLabel')}</label>
          <input
            id="student-dob"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className={`w-full p-4 outline-none transition-all focus:ring-2 focus:ring-current ${t.input}`}
          />
        </div>
      </div>

      <button
        onClick={onStart}
        disabled={!name || !dob}
        className={`w-full py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-current focus:ring-offset-2 ${t.buttonPrimary}`}
      >
        {tr('onboarding.start')} <ArrowRight className="w-5 h-5" aria-hidden="true" />
      </button>
    </section>
  );
}
