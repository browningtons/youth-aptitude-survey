import { useState } from 'react';
import { ArrowLeft, BookOpen, Sparkles, BarChart3, Printer } from 'lucide-react';
import type { Aptitude, ThemeStyles } from '../types';
import { APTITUDE_DETAILS } from '../data/aptitudes';
import Dashboard from './Dashboard';
import Poster from './Poster';
import { useI18n } from '../i18n';

type Tab = 'methodology' | 'dashboard' | 'poster';

interface Props {
  t: ThemeStyles;
  onBack: () => void;
}

export default function Admin({ t, onBack }: Props) {
  const { t: tr } = useI18n();
  const [tab, setTab] = useState<Tab>('methodology');

  return (
    <section className={`w-full max-w-5xl p-6 sm:p-12 text-left ${t.card} relative overflow-hidden`} aria-label={tr('admin.methodologyTitle')}>
      <nav>
        <button
          onClick={onBack}
          className={`mb-6 flex items-center gap-2 font-bold opacity-80 hover:opacity-100 transition-opacity focus:ring-2 focus:ring-current focus:ring-offset-2 rounded ${t.accentText}`}
        >
          <ArrowLeft className="w-5 h-5" aria-hidden="true" /> {tr('admin.back')}
        </button>

        <div className="flex gap-2 mb-8 border-b border-current/10 pb-4" role="tablist">
          <button
            onClick={() => setTab('methodology')}
            role="tab"
            aria-selected={tab === 'methodology'}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all focus:ring-2 focus:ring-current focus:ring-offset-2 ${
              tab === 'methodology' ? t.buttonPrimary : 'opacity-60 hover:opacity-100'
            }`}
          >
            <BookOpen className="w-4 h-4" aria-hidden="true" /> {tr('admin.methodology')}
          </button>
          <button
            onClick={() => setTab('dashboard')}
            role="tab"
            aria-selected={tab === 'dashboard'}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all focus:ring-2 focus:ring-current focus:ring-offset-2 ${
              tab === 'dashboard' ? t.buttonPrimary : 'opacity-60 hover:opacity-100'
            }`}
          >
            <BarChart3 className="w-4 h-4" aria-hidden="true" /> {tr('admin.dashboard')}
          </button>
          <button
            onClick={() => setTab('poster')}
            role="tab"
            aria-selected={tab === 'poster'}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all focus:ring-2 focus:ring-current focus:ring-offset-2 ${
              tab === 'poster' ? t.buttonPrimary : 'opacity-60 hover:opacity-100'
            }`}
          >
            <Printer className="w-4 h-4" aria-hidden="true" /> {tr('admin.poster')}
          </button>
        </div>
      </nav>

      <div role="tabpanel">
        {tab === 'methodology' && <MethodologyContent t={t} />}
        {tab === 'dashboard' && <Dashboard t={t} />}
        {tab === 'poster' && <Poster t={t} />}
      </div>
    </section>
  );
}

function MethodologyContent({ t }: { t: ThemeStyles }) {
  const { t: tr } = useI18n();

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <BookOpen className={`w-10 h-10 ${t.iconColor}`} aria-hidden="true" />
        <h1 className="text-3xl sm:text-4xl font-extrabold">{tr('admin.methodologyTitle')}</h1>
      </div>

      <div className="prose prose-lg max-w-none opacity-90 mb-12">
        <p className="mb-4">{tr('admin.methodologyP1')}</p>
        <p>{tr('admin.methodologyP2')}</p>
      </div>

      <h2 className="text-2xl font-bold mb-6 border-b border-current/10 pb-4">{tr('admin.outcomesTitle')}</h2>

      <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
        {(Object.keys(APTITUDE_DETAILS) as Aptitude[]).map((key) => {
          const apt = APTITUDE_DETAILS[key];
          const Icon = apt.icon;
          return (
            <div key={key} className="p-6 rounded-3xl border border-current/10 bg-current/5 flex flex-col h-full hover:bg-current/10 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-4 rounded-2xl ${t.progressBarBg}`}>
                  <Icon className={`w-8 h-8 ${t.iconColor}`} aria-hidden="true" />
                </div>
                <div>
                  <h3 className={`text-2xl font-extrabold ${t.accentText}`}>{tr(`aptitude.${key}`)}</h3>
                  <p className="text-sm font-semibold opacity-60 uppercase tracking-wider">
                    {tr('admin.hollandEquivalent')}: {tr(`holland.${key}`)}
                  </p>
                </div>
              </div>

              <p className="opacity-80 mb-6 flex-grow leading-relaxed">
                {tr(`aptitude.${key}.desc`)}
              </p>

              <div className="mt-auto">
                <h4 className="font-bold text-sm uppercase tracking-wide opacity-70 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" aria-hidden="true" /> {tr('admin.coreStrengths')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {apt.strengths.map((str, idx) => (
                    <span key={idx} className="px-3 py-1 text-sm font-semibold rounded-full border border-current/10 bg-white/50 dark:bg-black/20 opacity-90">
                      {tr(`strength.${str}`)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
