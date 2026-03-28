"use client";

import { Question } from "@/types/quiz";
import { Translations } from "@/data/translations";

interface QuizReviewProps {
  questions: Question[];
  answers: number[];
  onBack: () => void;
  translations: Translations;
}

export default function QuizReview({ questions, answers, onBack, translations }: QuizReviewProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-accent">{translations.reviewAnswers}</h1>
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm font-medium bg-card-bg border border-border rounded-xl hover:border-accent transition-colors"
        >
          {translations.backToResults}
        </button>
      </div>

      <div className="space-y-4">
        {questions.map((q, i) => {
          const isCorrect = answers[i] === q.correctAnswer;
          return (
            <div
              key={q.id}
              className={`bg-card-bg rounded-2xl border p-5 ${
                isCorrect ? "border-success/30" : "border-error/30"
              }`}
            >
              <div className="flex items-start gap-3 mb-3">
                <span
                  className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                    isCorrect ? "bg-success" : "bg-error"
                  }`}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="text-xs text-muted mb-1">{q.category}</p>
                  <p className="font-medium text-sm sm:text-base">{q.question}</p>
                </div>
              </div>

              <div className="ml-10 space-y-1 mb-3">
                {q.options.map((opt, j) => {
                  let color = "text-muted";
                  let prefix = "";
                  if (j === q.correctAnswer) {
                    color = "text-success font-medium";
                    prefix = "✓ ";
                  } else if (j === answers[i] && !isCorrect) {
                    color = "text-error line-through";
                    prefix = "✗ ";
                  }
                  return (
                    <p key={j} className={`text-sm ${color}`}>
                      {prefix}{String.fromCharCode(65 + j)}. {opt}
                    </p>
                  );
                })}
              </div>

              <p className="ml-10 text-sm text-muted bg-background rounded-xl p-3">
                {q.explanation}
              </p>
            </div>
          );
        })}
      </div>

      <button
        onClick={onBack}
        className="w-full mt-6 py-4 bg-accent hover:bg-accent-light text-white rounded-2xl text-lg font-semibold transition-colors shadow-sm"
      >
        {translations.backToResults}
      </button>
    </div>
  );
}
