import { THEMES } from './data/themes';
import { useSurvey } from './hooks/useSurvey';
import { useI18n } from './i18n';
import ThemeSelect from './components/ThemeSelect';
import Onboarding from './components/Onboarding';
import Survey from './components/Survey';
import Results from './components/Results';
import Admin from './components/Admin';

export default function App() {
  const survey = useSurvey();
  const t = THEMES[survey.themeKey];
  const { t: tr } = useI18n();

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8 transition-colors duration-500 ${t.appBg}`}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded">
        Skip to main content
      </a>

      <main id="main-content">
        {survey.step === 'theme_select' && (
          <ThemeSelect
            t={t}
            themeKey={survey.themeKey}
            setThemeKey={survey.setThemeKey}
            onContinue={() => survey.setStep('onboarding')}
          />
        )}

        {survey.step === 'onboarding' && (
          <Onboarding
            t={t}
            name={survey.name}
            setName={survey.setName}
            ageGroup={survey.ageGroup}
            setAgeGroup={survey.setAgeGroup}
            onStart={survey.startSurvey}
            onAdmin={() => survey.setStep('admin')}
          />
        )}

        {survey.step === 'survey' && survey.currentQuestions.length > 0 && (
          <Survey
            t={t}
            currentQuestionIndex={survey.currentQuestionIndex}
            currentQuestions={survey.currentQuestions}
            ageGroup={survey.ageGroup}
            onAnswer={survey.handleAnswer}
          />
        )}

        {survey.step === 'results' && (
          <Results
            t={t}
            themeKey={survey.themeKey}
            name={survey.name}
            ageGroup={survey.ageGroup}
            getRankedAptitudes={survey.getRankedAptitudes}
            getShareableURL={survey.getShareableURL}
            isDownloading={survey.isDownloading}
            setIsDownloading={survey.setIsDownloading}
            onReset={survey.resetSurvey}
          />
        )}

        {survey.step === 'admin' && (
          <Admin
            t={t}
            onBack={() => survey.setStep('onboarding')}
          />
        )}
      </main>

      <footer className="mt-8 text-center text-xs opacity-60 px-4">
        {tr('app.credit')}
      </footer>
    </div>
  );
}
