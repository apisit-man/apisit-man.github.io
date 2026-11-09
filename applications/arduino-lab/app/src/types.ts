import type { LessonId } from './model';

export type Locale = 'th' | 'en';

export interface LocalizedString {
  th: string;
  en: string;
}

export interface ConnectionSpec {
  from: string;
  to: string;
  note?: LocalizedString;
}

export interface LessonData {
  id: LessonId;
  order: number;
  title: LocalizedString;
  objective: LocalizedString;
  overview: LocalizedString;
  challenge: LocalizedString;
  reflection: LocalizedString;
  components: string[];
  connections: ConnectionSpec[];
  defaultParams: Record<string, any>;
  defaultInputs: Record<string, any>;
  mode: string;
  codeGenerator: string;
  model: string;
}

export interface AppState {
  lessonId: LessonId;
  lang: Locale;
  isRunning: boolean;
  viewMode: '3d' | 'svg';
  params: Record<string, any>;
  inputs: Record<string, any>;
  completedLessons: string[];
  theme: 'dark' | 'light';
  simulationTimeMs: number;
  serialLogs: { time: string; text: string }[];
}
