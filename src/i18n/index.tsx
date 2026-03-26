import { createContext, useContext, useState, type ReactNode } from 'react';

export type Language = 'en' | 'es';

interface I18nContext {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
}

const I18nCtx = createContext<I18nContext>({
  lang: 'en',
  setLang: () => {},
  t: (k) => k,
});

// Lazy load translations
let translations: Record<Language, Record<string, string>> | null = null;

async function loadTranslations(): Promise<Record<Language, Record<string, string>>> {
  if (translations) return translations;
  const [en, es] = await Promise.all([
    import('./en').then(m => m.default),
    import('./es').then(m => m.default),
  ]);
  translations = { en, es };
  return translations;
}

// Eagerly load on module init
const translationsPromise = loadTranslations();

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en');
  const [dict, setDict] = useState<Record<Language, Record<string, string>> | null>(null);

  if (!dict) {
    translationsPromise.then(setDict);
  }

  const t = (key: string): string => {
    if (!dict) return key;
    return dict[lang][key] || dict['en'][key] || key;
  };

  return (
    <I18nCtx.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nCtx.Provider>
  );
}

export function useI18n() {
  return useContext(I18nCtx);
}

export function LanguageToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useI18n();
  return (
    <div className={`flex gap-1 ${className}`} role="radiogroup" aria-label="Language">
      <button
        onClick={() => setLang('en')}
        role="radio"
        aria-checked={lang === 'en'}
        className={`px-2 py-1 text-xs font-bold rounded transition-all ${lang === 'en' ? 'opacity-100 underline' : 'opacity-50 hover:opacity-80'}`}
      >
        EN
      </button>
      <button
        onClick={() => setLang('es')}
        role="radio"
        aria-checked={lang === 'es'}
        className={`px-2 py-1 text-xs font-bold rounded transition-all ${lang === 'es' ? 'opacity-100 underline' : 'opacity-50 hover:opacity-80'}`}
      >
        ES
      </button>
    </div>
  );
}
