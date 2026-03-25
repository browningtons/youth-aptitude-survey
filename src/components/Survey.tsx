import { useEffect } from 'react';
import type { AgeGroup, Aptitude, Question, ThemeStyles } from '../types';

interface Props {
  t: ThemeStyles;
  currentQuestionIndex: number;
  currentQuestions: Question[];
  ageGroup: AgeGroup;
  onAnswer: (aptitude: Aptitude) => void;
}

export default function Survey({ t, currentQuestionIndex, currentQuestions, ageGroup, onAnswer }: Props) {
  const question = currentQuestions[currentQuestionIndex];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key >= '1' && key <= '4') {
        const idx = parseInt(key) - 1;
        if (idx < question.options.length) {
          onAnswer(question.options[idx].aptitude);
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [question, onAnswer]);

  return (
    <div className={`w-full max-w-3xl p-6 sm:p-12 ${t.card}`}>
      <div className="flex justify-between items-center mb-6">
        <span className="font-semibold opacity-70">Question {currentQuestionIndex + 1} of {currentQuestions.length}</span>
        <span className={`font-bold px-3 py-1 rounded-full text-sm ${t.progressBarBg} ${t.accentText}`}>
          {ageGroup === 'elementary' ? 'Elementary' : ageGroup === 'jrHigh' ? 'Jr. High' : 'High School'}
        </span>
      </div>
      <div className={`w-full h-3 mb-10 overflow-hidden ${t.progressBarBg}`}>
        <div
          className={`h-full transition-all duration-500 ease-out ${t.progressBarFill}`}
          style={{ width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%` }}
        />
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold mb-8 text-center leading-tight">
        {question.text}
      </h2>

      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(option.aptitude)}
            className={`p-6 text-lg font-semibold text-left flex items-start gap-4 min-h-[120px] relative ${t.buttonOption}`}
          >
            <span className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold ${t.progressBarFill} text-white`}>
              {idx + 1}
            </span>
            <span>{option.text}</span>
          </button>
        ))}
      </div>

      <p className="text-center mt-6 text-sm opacity-40 font-medium">
        Press 1–4 to answer with keyboard
      </p>
    </div>
  );
}
