import { ChevronRight } from 'lucide-react';
import type { ThemeStyles } from '../types';
import { useI18n } from '../i18n';

interface Props {
  t: ThemeStyles;
  /** Which step (1–3) the user is currently on */
  active: 1 | 2 | 3;
  className?: string;
}

const STEPS: { num: 1 | 2 | 3; labelKey: string }[] = [
  { num: 1, labelKey: 'theme.stepStyle' },
  { num: 2, labelKey: 'theme.stepInfo' },
  { num: 3, labelKey: 'theme.stepSurvey' },
];

export default function FlowIndicator({ t, active, className = '' }: Props) {
  const { t: tr } = useI18n();

  return (
    <ol
      className={`flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] font-bold uppercase tracking-wider ${className}`}
      aria-label="Survey flow"
    >
      {STEPS.map((step, idx) => {
        const isActive = step.num === active;
        const isDone = step.num < active;
        const stateClass = isActive
          ? `${t.progressBarFill} text-white shadow-sm`
          : isDone
            ? `${t.progressBarBg} ${t.accentText}`
            : 'opacity-50 border border-current/20';

        return (
          <span key={step.num} className="flex items-center gap-1.5 sm:gap-2">
            <li
              className={`px-3 py-1 rounded-full ${stateClass}`}
              aria-current={isActive ? 'step' : undefined}
            >
              {step.num}. {tr(step.labelKey)}
            </li>
            {idx < STEPS.length - 1 && (
              <ChevronRight className="w-3 h-3 opacity-40" aria-hidden="true" />
            )}
          </span>
        );
      })}
    </ol>
  );
}
