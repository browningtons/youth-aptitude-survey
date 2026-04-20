import { useEffect, useState } from 'react';
import { User, Rocket, Sparkles, RefreshCcw, Download, Share2, QrCode, FileText, BookOpen, Users, Zap, Compass, ChevronDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import confetti from 'canvas-confetti';
import type { AgeGroup, Aptitude, Theme, ThemeStyles } from '../types';
import type { RankedAptitude } from '../hooks/useSurvey';
import { APTITUDE_DETAILS } from '../data/aptitudes';
import { handleDownload } from '../utils/download';
import { generatePDF } from '../utils/pdf';
import QRModal from './QRModal';
import { useI18n } from '../i18n';

const CHART_COLORS: Record<Aptitude, string> = {
  Builder: '#f59e0b',
  Thinker: '#6366f1',
  Creator: '#ec4899',
  Helper: '#10b981',
  Persuader: '#ef4444',
  Organizer: '#06b6d4'
};

interface Props {
  t: ThemeStyles;
  themeKey: Theme;
  name: string;
  ageGroup: AgeGroup;
  getRankedAptitudes: () => RankedAptitude[];
  getShareableURL: () => string;
  isDownloading: boolean;
  setIsDownloading: (v: boolean) => void;
  onReset: () => void;
}

export default function Results({ t, themeKey, name, ageGroup, getRankedAptitudes, getShareableURL, isDownloading, setIsDownloading, onReset }: Props) {
  const { t: tr } = useI18n();
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expandedCareer, setExpandedCareer] = useState<number | null>(null);

  const ranked = getRankedAptitudes();
  const primary = ranked[0];
  const secondary = ranked[1];
  const primaryInfo = APTITUDE_DETAILS[primary.aptitude];
  const secondaryInfo = APTITUDE_DETAILS[secondary.aptitude];
  const PrimaryIcon = primaryInfo.icon;
  const SecondaryIcon = secondaryInfo.icon;

  const chartData = ranked.map(r => ({
    name: r.aptitude,
    score: r.score
  }));

  // Celebratory burst on mount, colored by the student's primary aptitude.
  useEffect(() => {
    const primaryColor = CHART_COLORS[primary.aptitude];
    const secondaryColor = CHART_COLORS[secondary.aptitude];
    confetti({
      particleCount: 90,
      spread: 70,
      startVelocity: 35,
      origin: { y: 0.3 },
      colors: [primaryColor, secondaryColor, '#ffffff'],
      disableForReducedMotion: true,
    });
    // Only fires on initial mount; we intentionally don't refire on re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasSecondary = secondary && secondary.score > 0;
  const comboLine = hasSecondary
    ? tr('results.combo')
        .replace('{primary}', tr(`aptitude.${primary.aptitude}`))
        .replace('{secondary}', tr(`aptitude.${secondary.aptitude}`))
        .replace('{primaryStrength}', tr(`strength.${primaryInfo.strengths[0]}`))
        .replace('{secondaryStrength}', tr(`strength.${secondaryInfo.strengths[0]}`))
    : null;

  const handleShare = async () => {
    const url = getShareableURL();
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePDF = () => {
    generatePDF(name, ageGroup, ranked);
  };

  return (
    <>
      <div id="capture-area" className={`w-full max-w-4xl p-6 sm:p-12 text-center ${t.card}`} role="main" aria-label="Survey Results">
        <div className="mb-6 inline-block">
          <span className={`px-4 py-1.5 rounded-full text-sm font-bold tracking-wider uppercase ${t.progressBarBg} ${t.accentText}`} role="status">
            {tr('results.complete')}
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-medium mb-4">
          {tr('results.greeting').replace('{name}', '')} <span className="font-extrabold">{name}</span>!
        </h2>
        <p className="opacity-80 mb-8 text-lg">{tr('results.subtitle')}</p>

        {/* Score Breakdown Chart */}
        <section className="mb-10 rounded-2xl p-4 sm:p-6 border border-current/10 bg-current/5" aria-label="Score breakdown">
          <h3 className={`text-lg font-bold mb-4 ${t.accentText}`}>{tr('results.scoreBreakdown')}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 30 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} horizontal={false} />
              <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={80} />
              <Tooltip />
              <Bar dataKey="score" name="Score" radius={[0, 6, 6, 0]} barSize={20}>
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={CHART_COLORS[entry.name as Aptitude]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </section>

        <div className="text-left w-full">
          <div className="flex flex-col gap-10">
            {/* Primary Aptitude Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-current/10 pb-8">
              <div className={`p-6 rounded-3xl ${t.progressBarBg}`}>
                <PrimaryIcon className={`w-16 h-16 ${t.iconColor}`} aria-hidden="true" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-sm font-bold uppercase tracking-wider opacity-50 mb-1">{tr('results.primaryLabel')}</p>
                <h1 className={`text-4xl sm:text-5xl font-extrabold mb-3 ${t.accentText}`}>{primaryInfo.name}</h1>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4" role="list" aria-label="Strengths">
                  {primaryInfo.strengths.map((strength, idx) => (
                    <span key={idx} role="listitem" className="px-3 py-1 text-sm font-semibold rounded-full bg-current/5 border border-current/10 opacity-90">
                      {strength}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Primary × Secondary combo line — the "this quiz actually gets me" moment */}
            {comboLine && (
              <p className={`text-lg sm:text-xl font-semibold leading-snug text-center -mt-4 ${t.accentText}`} aria-label="Your aptitude blend">
                {comboLine}
              </p>
            )}

            {/* Who You Are */}
            <section className="md:col-span-12 flex flex-col justify-center mb-2 border-b border-current/10 pb-8" aria-label="Primary aptitude description">
              <h3 className="text-xl font-bold mb-4 opacity-90 flex items-center gap-2">
                <User className="w-5 h-5" aria-hidden="true" /> {tr('results.whoYouAre')}
              </h3>
              <p className="text-lg opacity-80 leading-relaxed">
                {primaryInfo.description}
              </p>
            </section>

            {/* Aligned Career Paths */}
            <section className="rounded-2xl p-6 sm:p-8 border border-current/10 bg-current/5" aria-label="Aligned career paths">
              <h3 className="text-xl font-bold mb-6 opacity-90 flex items-center gap-2">
                <Sparkles className="w-5 h-5" aria-hidden="true" /> {tr('results.alignedCareerPaths')}
              </h3>
              <ul className="flex flex-col gap-2">
                {primaryInfo.careers.map((career, idx) => {
                  const isOpen = expandedCareer === idx;
                  const panelId = `career-panel-${idx}`;
                  return (
                    <li key={idx}>
                      <button
                        type="button"
                        onClick={() => setExpandedCareer(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        className={`w-full flex items-center justify-between gap-3 p-3 rounded-xl text-left font-medium text-sm sm:text-base transition-all focus:ring-2 focus:ring-current focus:ring-offset-2 focus:ring-offset-transparent hover:bg-current/5 ${isOpen ? 'bg-current/5' : ''}`}
                      >
                        <span className="flex items-center gap-3">
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${t.progressBarFill}`} aria-hidden="true" />
                          <span>{career.title}</span>
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 opacity-60 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                          aria-hidden="true"
                        />
                      </button>
                      {isOpen && (
                        <div
                          id={panelId}
                          className="mt-2 p-4 sm:p-5 rounded-xl border border-current/10 bg-current/5"
                        >
                          <p className="font-bold mb-3 text-xs uppercase tracking-wider opacity-60">{tr('results.coursesLabel')}</p>
                          <div className="overflow-hidden rounded-lg border border-current/10">
                            <table className="w-full text-left text-xs sm:text-sm">
                              <thead className="bg-current/10 border-b border-current/10">
                                <tr>
                                  <th className="py-2 px-3 font-semibold opacity-80 w-1/2" scope="col">{tr('results.courseCol')}</th>
                                  <th className="py-2 px-3 font-semibold opacity-80 w-1/2" scope="col">{tr('results.conceptCol')}</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-current/5">
                                {career.courses.map((course, cIdx) => (
                                  <tr key={cIdx}>
                                    <td className="py-2 px-3 opacity-90 font-medium">{course.name}</td>
                                    <td className="py-2 px-3 opacity-70">{course.concept}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* Action Plan */}
            <section className="rounded-2xl p-6 sm:p-8 border border-current/10 bg-current/5 space-y-8" aria-label="Action plan">
              <div>
                <h3 className="text-xl font-bold mb-2 opacity-90 flex items-center gap-2">
                  <Rocket className="w-5 h-5" aria-hidden="true" /> {tr('results.actionPlan')}
                </h3>
                <p className="text-sm opacity-60 font-bold uppercase tracking-wider">
                  {ageGroup === 'elementary' ? tr('results.forElementary') : ageGroup === 'jrHigh' ? tr('results.forJrHigh') : tr('results.forHighSchool')}
                </p>
              </div>

              {/* Books to Read */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider opacity-60 mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" aria-hidden="true" /> {tr('results.booksToRead')}
                </h4>
                <ul className="space-y-3">
                  {primaryInfo.nextSteps[ageGroup].books.map((book, idx) => (
                    <li key={idx} className="opacity-90">
                      <p className="font-bold text-sm">{book.title}</p>
                      <p className="text-xs opacity-70 mt-0.5">{book.why}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* People to Look Up */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider opacity-60 mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" aria-hidden="true" /> {tr('results.peopleToLookUp')}
                </h4>
                <ul className="space-y-3">
                  {primaryInfo.nextSteps[ageGroup].people.map((person, idx) => (
                    <li key={idx} className="opacity-90">
                      <p className="font-bold text-sm">{person.name}</p>
                      <p className="text-xs opacity-70 mt-0.5">{person.why}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Activities to Try */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider opacity-60 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4" aria-hidden="true" /> {tr('results.activitiesToTry')}
                </h4>
                <ul className="space-y-2">
                  {primaryInfo.nextSteps[ageGroup].activities.map((activity, idx) => (
                    <li key={idx} className="flex items-start gap-3 opacity-90 text-sm">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-[10px] mt-0.5 ${t.progressBarFill}`} aria-hidden="true">
                        {idx + 1}
                      </div>
                      <span className="leading-snug">{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interests to Explore */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider opacity-60 mb-3 flex items-center gap-2">
                  <Compass className="w-4 h-4" aria-hidden="true" /> {tr('results.interestsToExplore')}
                </h4>
                <ul className="space-y-2">
                  {primaryInfo.nextSteps[ageGroup].interests.map((interest, idx) => (
                    <li key={idx} className="flex items-start gap-3 opacity-90 text-sm">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-[10px] mt-0.5 ${t.progressBarFill}`} aria-hidden="true">
                        {idx + 1}
                      </div>
                      <span className="leading-snug">{interest}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Secondary Aptitude */}
            {secondary.score > 0 && (
              <section className="border-t border-current/10 pt-8" aria-label="Secondary aptitude">
                <p className="text-sm font-bold uppercase tracking-wider opacity-40 mb-4">{tr('results.secondaryLabel')}</p>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6">
                  <div className={`p-4 rounded-2xl ${t.progressBarBg}`}>
                    <SecondaryIcon className={`w-10 h-10 ${t.iconColor} opacity-70`} aria-hidden="true" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className={`text-2xl sm:text-3xl font-extrabold mb-2 ${t.accentText} opacity-80`}>{secondaryInfo.name}</h3>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                      {secondaryInfo.strengths.map((s, i) => (
                        <span key={i} className="px-2 py-0.5 text-xs font-semibold rounded-full bg-current/5 border border-current/10 opacity-70">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="opacity-60 leading-relaxed">{secondaryInfo.description}</p>
              </section>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div id="action-buttons" className="mt-12 flex flex-wrap items-center justify-center gap-3 w-full" role="toolbar" aria-label="Result actions">
          <button
            onClick={onReset}
            className={`px-6 py-3 text-sm font-bold flex items-center justify-center gap-2 ${t.buttonOption}`}
            aria-label="Retake the survey"
          >
            <RefreshCcw className="w-4 h-4" aria-hidden="true" /> {tr('results.retake')}
          </button>
          <button
            onClick={() => handleDownload(name, themeKey, setIsDownloading)}
            disabled={isDownloading}
            className={`px-6 py-3 text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed ${t.buttonOption}`}
            aria-label="Save results as image"
          >
            {isDownloading ? <RefreshCcw className="w-4 h-4 animate-spin" aria-hidden="true" /> : <Download className="w-4 h-4" aria-hidden="true" />}
            {isDownloading ? tr('results.saving') : tr('results.image')}
          </button>
          <button
            onClick={handlePDF}
            className={`px-6 py-3 text-sm font-bold flex items-center justify-center gap-2 ${t.buttonOption}`}
            aria-label="Download PDF report"
          >
            <FileText className="w-4 h-4" aria-hidden="true" /> {tr('results.pdf')}
          </button>
          <button
            onClick={handleShare}
            className={`px-6 py-3 text-sm font-bold flex items-center justify-center gap-2 ${t.buttonPrimary}`}
            aria-label="Copy shareable link"
          >
            <Share2 className="w-4 h-4" aria-hidden="true" /> {copied ? tr('results.copied') : tr('results.share')}
          </button>
          <button
            onClick={() => setShowQR(true)}
            className={`px-4 py-3 text-sm font-bold flex items-center justify-center ${t.buttonOption}`}
            aria-label="Show QR code"
          >
            <QrCode className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {showQR && <QRModal t={t} url={getShareableURL()} onClose={() => setShowQR(false)} />}
    </>
  );
}
