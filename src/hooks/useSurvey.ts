import { useState } from 'react';
import type { Aptitude, AgeGroup, Step, Theme } from '../types';
import { QUESTIONS } from '../data/questions';
import { THEMES } from '../data/themes';
import { trackCompletion } from '../utils/analytics';

const INITIAL_SCORES: Record<Aptitude, number> = {
  Builder: 0, Thinker: 0, Creator: 0, Helper: 0, Persuader: 0, Organizer: 0
};

const THEME_KEYS = Object.keys(THEMES) as Theme[];
const randomTheme = () => THEME_KEYS[Math.floor(Math.random() * THEME_KEYS.length)];

export function useSurvey() {
  const [themeKey, setThemeKey] = useState<Theme>(randomTheme);
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
    const newScores = { ...scores, [aptitude]: scores[aptitude] + 1 };
    setScores(newScores);
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Compute top aptitude from final scores and track completion
      let topApt: Aptitude = 'Builder';
      let max = -1;
      for (const [a, s] of Object.entries(newScores)) {
        if (s > max) { max = s; topApt = a as Aptitude; }
      }
      trackCompletion(name, ageGroup, topApt, themeKey);
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
