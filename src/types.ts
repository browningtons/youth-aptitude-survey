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
