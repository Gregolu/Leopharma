export interface Option {
  id: string;
  label: string;
  points?: number; // Pour le calcul du score (0, 1, 2...)
}

export type QuestionType = 'single' | 'multiple';

export interface Question {
  id: number;
  text: string;
  type: QuestionType;
  options: Option[];
}

export interface QuestionnaireState {
  currentStep: number;
  totalSteps: number;
  answers: Record<number, string | string[]>;
  score: number;
}