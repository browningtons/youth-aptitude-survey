import { useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import type { AgeGroup, Aptitude, Question, ThemeStyles } from '../types';
import { useI18n } from '../i18n';
import FlowIndicator from './FlowIndicator';

interface Props {
  t: ThemeStyles;
  currentQuestionIndex: number;
  currentQuestions: Question[];
  ageGroup: AgeGroup;
  onAnswer: (aptitude: Aptitude) => void;
  onBack: () => void;
  canGoBack: boolean;
}

export default function Survey({ t, currentQuestionIndex, currentQuestions, ageGroup, onAnswer, onBack, canGoBack }: Props) {
  const { t: tr } = useI18n();
  const question = currentQuestions[currentQuestionIndex];
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [currentQuestionIndex]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key >= '1' && key <= '4') {
        const idx = parseInt(key) - 1;
        if (idx < question.options.length) {
          onAnswer(question.options[idx].aptitude);
        }
      } else if ((key === 'Backspace' || key === 'ArrowLeft') && canGoBack) {
        // Ignore if the user is typing in an input (future-proofing).
        const target = e.target as HTMLElement | null;
        if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
        e.preventDefault();
        onBack();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [question, onAnswer, onBack, canGoBack]);

  const questionLabel = tr('survey.questionOf')
    .replace('{current}', String(currentQuestionIndex + 1))
    .replace('{total}', String(currentQuestions.length));

  const ageLabel = tr(`survey.ageGroup.${ageGroup}`);

  return (
    <section className={`w-full max-w-3xl p-6 sm:p-12 ${t.card}`} role="form" aria-label={questionLabel}>
      <FlowIndicator t={t} active={3} className="mb-6" />
      <div className="flex justify-between items-center mb-6">
        <span className="font-semibold opacity-70" aria-live="polite">{questionLabel}</span>
        <span className={`font-bold px-3 py-1 rounded-full text-sm ${t.progressBarBg} ${t.accentText}`}>
          {ageLabel}
        </span>
      </div>
      <div className={`w-full h-3 mb-10 overflow-hidden ${t.progressBarBg}`} role="progressbar" aria-valuenow={currentQuestionIndex + 1} aria-valuemin={1} aria-valuemax={currentQuestions.length} aria-label={questionLabel}>
        <div
          className={`h-full transition-all duration-500 ease-out ${t.progressBarFill}`}
          style={{ width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%` }}
        />
      </div>

      <h2 ref={headingRef} tabIndex={-1} className="text-2xl sm:text-3xl font-extrabold mb-8 text-center leading-tight outline-none">
        {question.text}
      </h2>

      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6" role="group" aria-label={tr('survey.keyboardHint')}>
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(option.aptitude)}
            className={`p-6 text-lg font-semibold text-left flex items-start gap-4 min-h-[120px] relative focus:ring-2 focus:ring-current focus:ring-offset-2 ${t.buttonOption}`}
            aria-label={`${idx + 1}: ${option.text}`}
          >
            <span className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold ${t.progressBarFill} text-white`} aria-hidden="true">
              {idx + 1}
            </span>
            <span>{option.text}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          disabled={!canGoBack}
          className={`flex items-center gap-1.5 text-sm font-semibold opacity-60 hover:opacity-100 disabled:opacity-20 disabled:cursor-not-allowed transition-opacity focus:ring-2 focus:ring-current focus:ring-offset-2 rounded px-2 py-1 ${t.iconColor}`}
          aria-label={tr('survey.previous')}
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" /> {tr('survey.previous')}
        </button>
        <p className="text-sm opacity-40 font-medium text-right" aria-hidden="true">
          {tr('survey.keyboardHint')}
        </p>
      </div>
    </section>
  );
}
