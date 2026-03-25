import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { Theme, ThemeStyles } from '../types';
import { THEMES } from '../data/themes';

interface Props {
  t: ThemeStyles;
  themeKey: Theme;
  setThemeKey: (key: Theme) => void;
  onContinue: () => void;
}

export default function ThemeSelect({ t, themeKey, setThemeKey, onContinue }: Props) {
  return (
    <div className={`w-full max-w-2xl p-8 sm:p-12 text-center ${t.card}`}>
      <Sparkles className={`w-16 h-16 mx-auto mb-6 ${t.iconColor}`} />
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">Select a Prototype</h1>
      <p className="opacity-80 mb-8 max-w-md mx-auto">
        Before we begin, choose which visual style you'd like to test for the Aptitude App.
      </p>

      <div className="flex flex-col gap-4 mb-8">
        {(Object.keys(THEMES) as Theme[]).map((key) => (
          <button
            key={key}
            onClick={() => setThemeKey(key)}
            className={`p-4 flex items-center justify-between text-left ${t.buttonOption} ${themeKey === key ? 'ring-2 ring-current ring-offset-2 ring-offset-transparent' : ''}`}
          >
            <span className="font-semibold text-lg">{THEMES[key].name}</span>
            {themeKey === key && <CheckCircle2 className={`w-6 h-6 ${t.iconColor}`} />}
          </button>
        ))}
      </div>

      <button
        onClick={onContinue}
        className={`w-full py-4 text-lg flex items-center justify-center gap-2 ${t.buttonPrimary}`}
      >
        Confirm & Continue <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
