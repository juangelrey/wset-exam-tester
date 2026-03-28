"use client";

import { Question, WsetLevel } from "@/types/quiz";
import { Translations } from "@/data/translations";

interface QuizResultsProps {
  questions: Question[];
  answers: number[];
  level: WsetLevel;
  onRestart: () => void;
  onReview: () => void;
  translations: Translations;
}

export default function QuizResults({
  questions,
  answers,
  level,
  onRestart,
  onReview,
  translations,
}: QuizResultsProps) {
  const correctCount = questions.filter(
    (q, i) => answers[i] === q.correctAnswer
  ).length;
  const percentage = Math.round((correctCount / questions.length) * 100);
  const passed = percentage >= 70;

  // Group results by category
  const categoryResults = questions.reduce<
    Record<string, { correct: number; total: number }>
  >((acc, q, i) => {
    if (!acc[q.category]) acc[q.category] = { correct: 0, total: 0 };
    acc[q.category].total++;
    if (answers[i] === q.correctAnswer) acc[q.category].correct++;
    return acc;
  }, {});

  const levelLabel = level === "level1" ? translations.level1Title : translations.level2Title;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-accent mb-2">
          {translations.quizComplete}
        </h1>
      </div>

      {/* Score card */}
      <div className="bg-card-bg rounded-2xl shadow-sm border border-border p-8 mb-6 text-center">
        <div
          className={`inline-flex items-center justify-center w-32 h-32 rounded-full border-4 mb-4 ${
            passed ? "border-success text-success" : "border-error text-error"
          }`}
        >
          <span className="text-4xl font-bold">{percentage}%</span>
        </div>
        <p className="text-xl font-semibold mb-1">
          {correctCount} / {questions.length} {translations.correctSuffix}
        </p>
        <p
          className={`text-lg font-medium ${
            passed ? "text-success" : "text-error"
          }`}
        >
          {passed ? translations.pass : translations.needsMorePractice}
        </p>
        <p className="text-sm text-muted mt-2">
          {levelLabel} {translations.passMarkLabel}
        </p>
      </div>

      {/* Category breakdown */}
      <div className="bg-card-bg rounded-2xl shadow-sm border border-border p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">{translations.topicBreakdown}</h2>
        <div className="space-y-3">
          {Object.entries(categoryResults).map(([category, result]) => {
            const catPercent = Math.round(
              (result.correct / result.total) * 100
            );
            return (
              <div key={category}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{category}</span>
                  <span className="text-muted">
                    {result.correct}/{result.total} ({catPercent}%)
                  </span>
                </div>
                <div className="h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      catPercent >= 70 ? "bg-success" : "bg-error"
                    }`}
                    style={{ width: `${catPercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={onReview}
          className="py-4 bg-card-bg border border-border hover:border-accent text-foreground rounded-2xl text-base font-semibold transition-colors"
        >
          {translations.reviewAnswers}
        </button>
        <button
          onClick={onRestart}
          className="py-4 bg-accent hover:bg-accent-light text-white rounded-2xl text-base font-semibold transition-colors shadow-sm"
        >
          {translations.newQuiz}
        </button>
      </div>
    </div>
  );
}
