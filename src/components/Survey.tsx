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
            className={`p-6 text-lg font-semibold text-center flex items-center justify-center min-h-[120px] ${t.buttonOption}`}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}
