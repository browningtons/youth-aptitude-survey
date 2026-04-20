import { ArrowRight, CheckCircle2 } from 'lucide-react';
import type { Theme, ThemeStyles } from '../types';
import { THEMES } from '../data/themes';
import { useI18n, LanguageToggle } from '../i18n';
import FlowIndicator from './FlowIndicator';

const LOGO_URL = `${import.meta.env.BASE_URL}logo.png`;

interface Props {
  t: ThemeStyles;
  themeKey: Theme;
  setThemeKey: (key: Theme) => void;
  onContinue: () => void;
}

export default function ThemeSelect({ t, themeKey, setThemeKey, onContinue }: Props) {
  const { t: tr } = useI18n();

  return (
    <section className={`w-full max-w-2xl p-8 sm:p-12 text-center relative ${t.card}`} aria-label={tr('theme.title')}>
      <LanguageToggle className="absolute top-6 right-6" />

      <img
        src={LOGO_URL}
        alt="Mount Ogden Junior High"
        className="w-24 h-24 mx-auto mb-6 object-contain drop-shadow-md"
      />

      <FlowIndicator t={t} active={1} className="mb-8" />

      <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">{tr('theme.title')}</h1>
      <p className="opacity-80 mb-8 max-w-md mx-auto">{tr('theme.subtitle')}</p>

      <div className="flex flex-col gap-4 mb-8" role="radiogroup" aria-label={tr('theme.title')}>
        {(Object.keys(THEMES) as Theme[]).map((key) => (
          <button
            key={key}
            onClick={() => setThemeKey(key)}
            role="radio"
            aria-checked={themeKey === key}
            className={`p-4 flex items-center justify-between text-left focus:ring-2 focus:ring-current focus:ring-offset-2 ${t.buttonOption} ${themeKey === key ? 'ring-2 ring-current ring-offset-2 ring-offset-transparent' : ''}`}
          >
            <span className="font-semibold text-lg">{THEMES[key].name}</span>
            {themeKey === key && <CheckCircle2 className={`w-6 h-6 ${t.iconColor}`} aria-hidden="true" />}
          </button>
        ))}
      </div>

      <button
        onClick={onContinue}
        className={`w-full py-4 text-lg flex items-center justify-center gap-2 focus:ring-2 focus:ring-current focus:ring-offset-2 ${t.buttonPrimary}`}
      >
        {tr('theme.confirm')} <ArrowRight className="w-5 h-5" aria-hidden="true" />
      </button>
    </section>
  );
}
