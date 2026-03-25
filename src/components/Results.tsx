import { User, Rocket, Sparkles, RefreshCcw, Download } from 'lucide-react';
import type { AgeGroup, Aptitude, Theme, ThemeStyles } from '../types';
import { APTITUDE_DETAILS } from '../data/aptitudes';
import { handleDownload } from '../utils/download';

interface Props {
  t: ThemeStyles;
  themeKey: Theme;
  name: string;
  ageGroup: AgeGroup;
  getTopAptitude: () => Aptitude;
  isDownloading: boolean;
  setIsDownloading: (v: boolean) => void;
  onReset: () => void;
}

export default function Results({ t, themeKey, name, ageGroup, getTopAptitude, isDownloading, setIsDownloading, onReset }: Props) {
  const result = APTITUDE_DETAILS[getTopAptitude()];
  const Icon = result.icon;

  return (
    <div id="capture-area" className={`w-full max-w-4xl p-6 sm:p-12 text-center ${t.card}`}>
      <div className="mb-6 inline-block">
        <span className={`px-4 py-1.5 rounded-full text-sm font-bold tracking-wider uppercase ${t.progressBarBg} ${t.accentText}`}>
          Survey Complete
        </span>
      </div>

      <h2 className="text-3xl sm:text-4xl font-medium mb-4">
        Awesome job, <span className="font-extrabold">{name}</span>!
      </h2>
      <p className="opacity-80 mb-12 text-lg">Based on your choices, your primary aptitude profile is:</p>

      <div className="text-left w-full">
        <div className="flex flex-col gap-10">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-current/10 pb-8">
            <div className={`p-6 rounded-3xl ${t.progressBarBg}`}>
              <Icon className={`w-16 h-16 ${t.iconColor}`} />
            </div>
            <div className="text-center sm:text-left">
              <h1 className={`text-4xl sm:text-5xl font-extrabold mb-3 ${t.accentText}`}>{result.name}</h1>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
                {result.strengths.map((strength, idx) => (
                  <span key={idx} className="px-3 py-1 text-sm font-semibold rounded-full bg-current/5 border border-current/10 opacity-90">
                    {strength}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="grid md:grid-cols-12 gap-8">
            {/* Who You Are */}
            <div className="md:col-span-12 flex flex-col justify-center mb-2 border-b border-current/10 pb-8">
              <h3 className="text-xl font-bold mb-4 opacity-90 flex items-center gap-2">
                <User className="w-5 h-5" /> Who You Are
              </h3>
              <p className="text-lg opacity-80 leading-relaxed">
                {result.description}
              </p>
            </div>

            {/* Action Plan */}
            <div className="md:col-span-6 rounded-2xl p-6 sm:p-8 border border-current/10 bg-current/5">
              <h3 className="text-xl font-bold mb-2 opacity-90 flex items-center gap-2">
                <Rocket className="w-5 h-5" /> Your Action Plan
              </h3>
              <p className="text-sm opacity-60 mb-6 font-bold uppercase tracking-wider">
                {ageGroup === 'elementary' ? 'For Elementary Students:' : ageGroup === 'jrHigh' ? 'For Middle Schoolers:' : 'For High Schoolers:'}
              </p>
              <ul className="space-y-5">
                {result.nextSteps[ageGroup].map((step, idx) => (
                  <li key={idx} className="flex items-start gap-4 opacity-90 font-medium">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm shadow-sm ${t.progressBarFill}`}>
                      {idx + 1}
                    </div>
                    <span className="leading-snug pt-0.5">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Career Paths */}
            <div className="md:col-span-6 rounded-2xl p-6 sm:p-8 border border-current/10 bg-current/5">
              <h3 className="text-xl font-bold mb-6 opacity-90 flex items-center gap-2">
                <Sparkles className="w-5 h-5" /> Future Career Paths
              </h3>
              <ul className="flex flex-col gap-4">
                {result.careers.map((career, idx) => (
                  <li key={idx} className="relative group">
                    <div className="flex items-center gap-3 opacity-80 group-hover:opacity-100 font-medium text-sm sm:text-base cursor-help transition-all">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${t.progressBarFill}`} />
                      <span className="border-b border-dashed border-current/30 group-hover:border-current/100 pb-0.5">{career.title}</span>
                    </div>

                    {/* Hover Tooltip */}
                    <div className="absolute left-0 sm:left-auto sm:right-full sm:mr-4 top-full sm:top-1/2 sm:-translate-y-1/2 mt-2 sm:mt-0 z-10 w-80 sm:w-96 p-5 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 sm:translate-y-0 sm:translate-x-2 group-hover:translate-x-0 group-hover:translate-y-0 backdrop-blur-xl border border-current/10 bg-white/95 dark:bg-slate-800/95 text-slate-900 dark:text-white">
                      <p className="font-bold mb-3 text-xs uppercase tracking-wider opacity-60">
                        Core Degree Courses & Skills
                      </p>
                      <div className="overflow-hidden rounded-lg border border-current/10">
                        <table className="w-full text-left text-xs sm:text-sm">
                          <thead className="bg-current/5 border-b border-current/10">
                            <tr>
                              <th className="py-2 px-3 font-semibold opacity-80 w-1/2">Course</th>
                              <th className="py-2 px-3 font-semibold opacity-80 w-1/2">Concept / Skill</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-current/5">
                            {career.courses.map((course, cIdx) => (
                              <tr key={cIdx} className="hover:bg-current/5 transition-colors">
                                <td className="py-2 px-3 opacity-90 font-medium">{course.name}</td>
                                <td className="py-2 px-3 opacity-70">{course.concept}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div id="action-buttons" className="mt-12 flex flex-col-reverse sm:flex-row items-center justify-center gap-4 w-full">
        <button
          onClick={onReset}
          className={`px-8 py-4 text-lg font-bold flex items-center justify-center gap-3 w-full sm:w-auto ${t.buttonOption}`}
        >
          <RefreshCcw className="w-5 h-5" /> Retake Survey
        </button>
        <button
          onClick={() => handleDownload(name, themeKey, setIsDownloading)}
          disabled={isDownloading}
          className={`px-8 py-4 text-lg font-bold flex items-center justify-center gap-3 w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed ${t.buttonPrimary}`}
        >
          {isDownloading ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
          {isDownloading ? 'Saving...' : 'Save as Image'}
        </button>
      </div>
    </div>
  );
}
