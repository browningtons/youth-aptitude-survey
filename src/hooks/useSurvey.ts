import { useState } from 'react';
import type { Aptitude, AgeGroup, Step, Theme } from '../types';
import { QUESTIONS } from '../data/questions';

const INITIAL_SCORES: Record<Aptitude, number> = {
  Builder: 0, Thinker: 0, Creator: 0, Helper: 0, Persuader: 0, Organizer: 0
};

export function useSurvey() {
  const [themeKey, setThemeKey] = useState<Theme>('glass');
  const [step, setStep] = useState<Step>('theme_select');
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('elementary');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<Aptitude, number>>({ ...INITIAL_SCORES });
  const [isDownloading, setIsDownloading] = useState(false);

  const currentQuestions = QUESTIONS[ageGroup];

  const startSurvey = () => {
    if (!name || !age) return;
    const numAge = Number(age);
    if (numAge <= 11) setAgeGroup('elementary');
    else if (numAge >= 12 && numAge <= 14) setAgeGroup('jrHigh');
    else setAgeGroup('highSchool');
    setStep('survey');
  };

  const handleAnswer = (aptitude: Aptitude) => {
    setScores(prev => ({ ...prev, [aptitude]: prev[aptitude] + 1 }));
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setStep('results');
    }
  };

  const getTopAptitude = (): Aptitude => {
    let topAptitude: Aptitude = 'Builder';
    let maxScore = -1;
    for (const [aptitude, score] of Object.entries(scores)) {
      if (score > maxScore) {
        maxScore = score;
        topAptitude = aptitude as Aptitude;
      }
    }
    return topAptitude;
  };

  const resetSurvey = () => {
    setName('');
    setAge('');
    setCurrentQuestionIndex(0);
    setScores({ ...INITIAL_SCORES });
    setStep('onboarding');
  };

  return {
    themeKey, setThemeKey,
    step, setStep,
    name, setName,
    age, setAge,
    ageGroup,
    currentQuestionIndex,
    currentQuestions,
    scores,
    isDownloading, setIsDownloading,
    startSurvey,
    handleAnswer,
    getTopAptitude,
    resetSurvey,
  };
}
