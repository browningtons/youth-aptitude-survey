import { ArrowRight, CheckCircle2, Info } from 'lucide-react';
import type { AgeGroup, ThemeStyles } from '../types';
import { useI18n, LanguageToggle } from '../i18n';
import FlowIndicator from './FlowIndicator';

const LOGO_URL = `${import.meta.env.BASE_URL}logo.png`;

const AGE_GROUPS: AgeGroup[] = ['elementary', 'jrHigh', 'highSchool'];

interface Props {
  t: ThemeStyles;
  name: string;
  setName: (v: string) => void;
  ageGroup: AgeGroup;
  setAgeGroup: (v: AgeGroup) => void;
  onStart: () => void;
  onAdmin: () => void;
}

export default function Onboarding({ t, name, setName, ageGroup, setAgeGroup, onStart, onAdmin }: Props) {
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

      <img
        src={LOGO_URL}
        alt="Mount Ogden Junior High"
        className="w-24 h-24 mx-auto mb-6 object-contain drop-shadow-md"
      />

      <FlowIndicator t={t} active={2} className="mb-8" />

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
          <p className="text-xs opacity-60 mt-2 pl-2">{tr('onboarding.nameHint')}</p>
        </div>
        <div>
          <span id="age-group-label" className="block text-sm font-semibold mb-2 opacity-90 pl-2">{tr('onboarding.ageGroupLabel')}</span>
          <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-labelledby="age-group-label">
            {AGE_GROUPS.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setAgeGroup(key)}
                role="radio"
                aria-checked={ageGroup === key}
                className={`p-3 text-sm font-semibold flex items-center justify-center gap-1.5 focus:ring-2 focus:ring-current focus:ring-offset-2 ${t.buttonOption} ${ageGroup === key ? 'ring-2 ring-current ring-offset-2 ring-offset-transparent' : ''}`}
              >
                {ageGroup === key && <CheckCircle2 className={`w-4 h-4 ${t.iconColor}`} aria-hidden="true" />}
                <span>{tr(`survey.ageGroup.${key}`)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={onStart}
        disabled={!name || !ageGroup}
        className={`w-full py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-current focus:ring-offset-2 ${t.buttonPrimary}`}
      >
        {tr('onboarding.start')} <ArrowRight className="w-5 h-5" aria-hidden="true" />
      </button>
    </section>
  );
}
