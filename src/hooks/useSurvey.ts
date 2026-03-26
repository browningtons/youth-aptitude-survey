import { useState, useEffect } from 'react';
import type { Aptitude, AgeGroup, Step, Theme } from '../types';
import { QUESTIONS } from '../data/questions';
import { THEMES } from '../data/themes';
import { trackCompletion } from '../utils/analytics';

const INITIAL_SCORES: Record<Aptitude, number> = {
  Builder: 0, Thinker: 0, Creator: 0, Helper: 0, Persuader: 0, Organizer: 0
};

const THEME_KEYS = Object.keys(THEMES) as Theme[];
const randomTheme = () => THEME_KEYS[Math.floor(Math.random() * THEME_KEYS.length)];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export interface RankedAptitude {
  aptitude: Aptitude;
  score: number;
}

export function useSurvey() {
  const [themeKey, setThemeKey] = useState<Theme>(randomTheme);
  const [step, setStep] = useState<Step>('theme_select');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('elementary');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<Aptitude, number>>({ ...INITIAL_SCORES });
  const [isDownloading, setIsDownloading] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState(QUESTIONS['elementary']);

  const currentQuestions = shuffledQuestions;

  // Check for shared results in URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shared = params.get('r');
    if (shared) {
      try {
        const decoded = JSON.parse(atob(shared));
        if (decoded.scores && decoded.name && decoded.ageGroup && decoded.themeKey) {
          setScores(decoded.scores);
          setName(decoded.name);
          setAgeGroup(decoded.ageGroup);
          setThemeKey(decoded.themeKey);
          setStep('results');
        }
      } catch {
        // Invalid shared link, ignore
      }
    }
  }, []);

  const startSurvey = () => {
    if (!name || !dob) return;
    const today = new Date();
    const birth = new Date(dob);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    let group: AgeGroup;
    if (age <= 11) group = 'elementary';
    else if (age >= 12 && age <= 14) group = 'jrHigh';
    else group = 'highSchool';
    setAgeGroup(group);
    setShuffledQuestions(
      shuffle(QUESTIONS[group]).map(q => ({
        ...q,
        options: shuffle(q.options)
      }))
    );
    setStep('survey');
  };

  const handleAnswer = (aptitude: Aptitude) => {
    const newScores = { ...scores, [aptitude]: scores[aptitude] + 1 };
    setScores(newScores);
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      let topApt: Aptitude = 'Builder';
      let max = -1;
      for (const [a, s] of Object.entries(newScores)) {
        if (s > max) { max = s; topApt = a as Aptitude; }
      }
      trackCompletion(name, dob, topApt, themeKey);
      setStep('results');
    }
  };

  const getRankedAptitudes = (): RankedAptitude[] => {
    return (Object.entries(scores) as [Aptitude, number][])
      .map(([aptitude, score]) => ({ aptitude, score }))
      .sort((a, b) => b.score - a.score);
  };

  const getShareableURL = (): string => {
    const data = { scores, name, ageGroup, themeKey };
    const encoded = btoa(JSON.stringify(data));
    const base = window.location.origin + window.location.pathname;
    return `${base}?r=${encoded}`;
  };

  const resetSurvey = () => {
    setName('');
    setDob('');
    setCurrentQuestionIndex(0);
    setScores({ ...INITIAL_SCORES });
    setShuffledQuestions(QUESTIONS['elementary']);
    // Clear URL params
    window.history.replaceState({}, '', window.location.pathname);
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
    getRankedAptitudes,
    getShareableURL,
    resetSurvey,
  };
}
