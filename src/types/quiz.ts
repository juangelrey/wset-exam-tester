export interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export type QuizMode = "all" | "category";
export type QuizState = "setup" | "quiz" | "results";
