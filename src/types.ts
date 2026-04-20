export type Aptitude = 'Builder' | 'Thinker' | 'Creator' | 'Helper' | 'Persuader' | 'Organizer';

export interface Question {
  text: string;
  options: { text: string; aptitude: Aptitude }[];
}

export interface CourseDetail {
  name: string;
  concept: string;
}

export interface CareerPath {
  title: string;
  courses: CourseDetail[];
}

export interface ActionPlan {
  books: { title: string; why: string }[];
  people: { name: string; why: string }[];
  activities: string[];
  interests: string[];
}

export interface AptitudeInfo {
  name: string;
  icon: React.ElementType;
  description: string;
  strengths: string[];
  careers: CareerPath[];
  nextSteps: {
    elementary: ActionPlan;
    jrHigh: ActionPlan;
    highSchool: ActionPlan;
  };
}

export type Theme = 'neon' | 'glass' | 'minimal' | 'sunset' | 'forest';

export type AgeGroup = 'elementary' | 'jrHigh' | 'highSchool';

export type Step = 'theme_select' | 'onboarding' | 'survey' | 'results' | 'admin';

export interface AnalyticsData {
  total: number;
  byAptitude: Record<string, number>;
  byTheme: Record<string, number>;
  byAgeGroup: Record<string, number>;
  byDate: { date: string; count: number }[];
  // Cross-tab: one row per age group with a count per aptitude. Used to
  // render the stacked bar showing how each grade level's preferences differ.
  byAgeGroupAptitude: { ageGroup: string; Builder: number; Thinker: number; Creator: number; Helper: number; Persuader: number; Organizer: number }[];
  // Rolling mean completion time in seconds across all rows that have a
  // duration logged. Legacy rows without a duration are excluded from the mean.
  avgDurationSec: number | null;
}

export interface ThemeStyles {
  name: string;
  appBg: string;
  card: string;
  input: string;
  buttonPrimary: string;
  buttonOption: string;
  progressBarBg: string;
  progressBarFill: string;
  accentText: string;
  iconColor: string;
}
