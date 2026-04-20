import { useState, useEffect, useRef } from 'react';
import type { Aptitude, AgeGroup, Question, Step, Theme } from '../types';
import { QUESTIONS } from '../data/questions';
import { THEMES } from '../data/themes';
import { trackCompletion } from '../utils/analytics';

const INITIAL_SCORES: Record<Aptitude, number> = {
  Builder: 0, Thinker: 0, Creator: 0, Helper: 0, Persuader: 0, Organizer: 0
};

const THEME_KEYS = Object.keys(THEMES) as Theme[];
const randomTheme = () => THEME_KEYS[Math.floor(Math.random() * THEME_KEYS.length)];

const AGE_GROUPS: AgeGroup[] = ['elementary', 'jrHigh', 'highSchool'];

// Bump the version whenever the saved shape changes so old blobs are
// safely ignored instead of crashing the app.
const STORAGE_KEY = 'student-paths:v1';

interface SavedState {
  v: 1;
  step: Step;
  themeKey: Theme;
  name: string;
  ageGroup: AgeGroup;
  currentQuestionIndex: number;
  scores: Record<Aptitude, number>;
  shuffledQuestions: Question[];
  answerHistory: Aptitude[];
  // Unix ms — captured when startSurvey runs. Null until the student begins
  // (or if we're resuming a blob written before this field existed).
  surveyStartedAt: number | null;
}

function loadSavedState(): SavedState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.v !== 1) return null;
    // Validate the shape — a stale deploy could have removed a theme or
    // age group, and we don't want to feed the app an unknown key.
    if (!THEME_KEYS.includes(parsed.themeKey)) return null;
    if (!AGE_GROUPS.includes(parsed.ageGroup)) return null;
    if (!parsed.step || !parsed.scores || !Array.isArray(parsed.shuffledQuestions)) return null;
    // answerHistory is optional for forward-compat with older blobs — default to empty.
    if (!Array.isArray(parsed.answerHistory)) parsed.answerHistory = [];
    // surveyStartedAt is optional for forward-compat. A resume from a pre-field
    // blob will report null duration on completion — that's accepted.
    if (typeof parsed.surveyStartedAt !== 'number') parsed.surveyStartedAt = null;
    return parsed as SavedState;
  } catch {
    return null;
  }
}

function clearSavedState() {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage disabled — nothing to do.
  }
}

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
  // Default to jrHigh — primary audience is Mount Ogden Junior High.
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('jrHigh');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<Aptitude, number>>({ ...INITIAL_SCORES });
  const [isDownloading, setIsDownloading] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState(QUESTIONS['jrHigh']);
  // Ordered list of aptitudes the student has awarded, one per answered question.
  // Enables goBack() to rewind scores without recomputing from scratch.
  const [answerHistory, setAnswerHistory] = useState<Aptitude[]>([]);
  // Wall-clock ms when the student hit "Start" — used to compute completion time
  // for the analytics payload. Kept in state (not a ref) so it survives
  // sessionStorage hydration when a student resumes after closing the tab.
  const [surveyStartedAt, setSurveyStartedAt] = useState<number | null>(null);

  const currentQuestions = shuffledQuestions;

  // Gates the persist-on-change effect until we've had a chance to read from
  // the URL and sessionStorage — otherwise the first render would clobber
  // any saved blob with default state.
  const hydratedRef = useRef(false);

  // Mount: URL shared results take priority, then resume from sessionStorage.
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
          // Shared link wins — drop any stale mid-flight run on this device.
          clearSavedState();
          hydratedRef.current = true;
          return;
        }
      } catch {
        // Invalid shared link, fall through to storage resume.
      }
    }

    const saved = loadSavedState();
    if (saved) {
      setThemeKey(saved.themeKey);
      setName(saved.name);
      setAgeGroup(saved.ageGroup);
      setCurrentQuestionIndex(saved.currentQuestionIndex);
      setScores(saved.scores);
      setShuffledQuestions(saved.shuffledQuestions);
      setAnswerHistory(saved.answerHistory);
      setSurveyStartedAt(saved.surveyStartedAt);
      setStep(saved.step);
    }
    hydratedRef.current = true;
  }, []);

  // Persist on state change. Skips:
  //   - pre-hydration renders (don't overwrite a saved blob with defaults)
  //   - the results step (clear so the next student on a shared iPad starts fresh)
  //   - the admin step (transient navigation, not a resume point)
  useEffect(() => {
    if (!hydratedRef.current) return;
    if (step === 'results') {
      clearSavedState();
      return;
    }
    if (step === 'admin') return;
    try {
      const blob: SavedState = {
        v: 1,
        step,
        themeKey,
        name,
        ageGroup,
        currentQuestionIndex,
        scores,
        shuffledQuestions,
        answerHistory,
        surveyStartedAt,
      };
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(blob));
    } catch {
      // Storage full or disabled — degrade silently.
    }
  }, [step, themeKey, name, ageGroup, currentQuestionIndex, scores, shuffledQuestions, answerHistory, surveyStartedAt]);

  const startSurvey = () => {
    if (!name || !ageGroup) return;
    setShuffledQuestions(
      shuffle(QUESTIONS[ageGroup]).map(q => ({
        ...q,
        options: shuffle(q.options)
      }))
    );
    // Fresh run — drop any leftover history and scores from a retake.
    setAnswerHistory([]);
    setScores({ ...INITIAL_SCORES });
    setCurrentQuestionIndex(0);
    setSurveyStartedAt(Date.now());
    setStep('survey');
  };

  const handleAnswer = (aptitude: Aptitude) => {
    const newScores = { ...scores, [aptitude]: scores[aptitude] + 1 };
    setScores(newScores);
    setAnswerHistory(prev => [...prev, aptitude]);
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      let topApt: Aptitude = 'Builder';
      let max = -1;
      for (const [a, s] of Object.entries(newScores)) {
        if (s > max) { max = s; topApt = a as Aptitude; }
      }
      // Duration is null for resumes from a pre-duration blob; we prefer to log
      // nothing over logging a misleading short time.
      const durationSec = surveyStartedAt !== null
        ? Math.max(1, Math.round((Date.now() - surveyStartedAt) / 1000))
        : null;
      trackCompletion(name, ageGroup, topApt, themeKey, durationSec);
      setStep('results');
    }
  };

  // Undo the most recent answer: subtract it from scores, rewind the index.
  const goBack = () => {
    if (answerHistory.length === 0 || currentQuestionIndex === 0) return;
    const last = answerHistory[answerHistory.length - 1];
    setScores(prev => ({ ...prev, [last]: Math.max(0, prev[last] - 1) }));
    setAnswerHistory(prev => prev.slice(0, -1));
    setCurrentQuestionIndex(prev => prev - 1);
  };

  const canGoBack = currentQuestionIndex > 0 && answerHistory.length > 0;

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
    clearSavedState();
    setName('');
    setAgeGroup('jrHigh');
    setCurrentQuestionIndex(0);
    setScores({ ...INITIAL_SCORES });
    setShuffledQuestions(QUESTIONS['jrHigh']);
    setAnswerHistory([]);
    setSurveyStartedAt(null);
    // Clear URL params
    window.history.replaceState({}, '', window.location.pathname);
    setStep('onboarding');
  };

  return {
    themeKey, setThemeKey,
    step, setStep,
    name, setName,
    ageGroup, setAgeGroup,
    currentQuestionIndex,
    currentQuestions,
    scores,
    isDownloading, setIsDownloading,
    startSurvey,
    handleAnswer,
    goBack,
    canGoBack,
    getRankedAptitudes,
    getShareableURL,
    resetSurvey,
  };
}
