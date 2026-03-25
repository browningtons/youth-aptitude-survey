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
  const [dob, setDob] = useState('');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('elementary');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<Aptitude, number>>({ ...INITIAL_SCORES });
  const [isDownloading, setIsDownloading] = useState(false);

  const currentQuestions = QUESTIONS[ageGroup];

  const startSurvey = () => {
    if (!name || !dob) return;
    const today = new Date();
    const birth = new Date(dob);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    if (age <= 11) setAgeGroup('elementary');
    else if (age >= 12 && age <= 14) setAgeGroup('jrHigh');
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
      trackCompletion(name, dob, topApt, themeKey);
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
    setDob('');
    setCurrentQuestionIndex(0);
    setScores({ ...INITIAL_SCORES });
    setStep('onboarding');
  };

  return {
    themeKey, setThemeKey,
    step, setStep,
    name, setName,
    dob, setDob,
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
