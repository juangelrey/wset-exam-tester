"use client";

import { Question } from "@/types/quiz";
import { useState } from "react";

interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (selectedIndex: number) => void;
  onNext: () => void;
}

export default function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onNext,
}: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleSelect = (index: number) => {
    if (hasAnswered) return;
    setSelectedAnswer(index);
    setHasAnswered(true);
    onAnswer(index);
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted mb-2">
          <span className="font-medium">{question.category}</span>
          <span>
            {questionNumber} / {totalQuestions}
          </span>
        </div>
        <div className="h-2 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-card-bg rounded-2xl shadow-sm border border-border p-6 mb-4">
        <h2 className="text-lg sm:text-xl font-semibold mb-6">
          {question.question}
        </h2>

        <div className="space-y-3">
          {question.options.map((option, index) => {
            let style = "bg-card-bg border-border hover:border-accent-light hover:bg-accent-bg/30";

            if (hasAnswered) {
              if (index === question.correctAnswer) {
                style = "bg-success-bg border-success text-success";
              } else if (index === selectedAnswer && !isCorrect) {
                style = "bg-error-bg border-error text-error";
              } else {
                style = "bg-card-bg border-border opacity-50";
              }
            } else if (selectedAnswer === index) {
              style = "bg-accent-bg border-accent";
            }

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={hasAnswered}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm sm:text-base font-medium transition-all ${style} ${
                  hasAnswered ? "cursor-default" : "cursor-pointer"
                }`}
              >
                <span className="inline-flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold shrink-0">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation */}
      {hasAnswered && (
        <div
          className={`rounded-2xl border p-5 mb-4 ${
            isCorrect
              ? "bg-success-bg/50 border-success/30"
              : "bg-error-bg/50 border-error/30"
          }`}
        >
          <p className="font-semibold mb-1">
            {isCorrect ? "Correct!" : "Incorrect"}
          </p>
          <p className="text-sm leading-relaxed">{question.explanation}</p>
        </div>
      )}

      {/* Next button */}
      {hasAnswered && (
        <button
          onClick={onNext}
          className="w-full py-4 bg-accent hover:bg-accent-light text-white rounded-2xl text-lg font-semibold transition-colors shadow-sm"
        >
          {questionNumber === totalQuestions ? "See Results" : "Next Question"}
        </button>
      )}
    </div>
  );
}
