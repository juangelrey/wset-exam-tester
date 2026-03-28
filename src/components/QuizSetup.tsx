"use client";

import { Question } from "@/types/quiz";

interface QuizSetupProps {
  categories: string[];
  questions: Question[];
  onStart: (selectedCategories: string[], questionCount: number) => void;
}

import { useState } from "react";

export default function QuizSetup({ categories, questions, onStart }: QuizSetupProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [questionCount, setQuestionCount] = useState(20);

  const availableQuestions = selectedCategories.length === 0
    ? questions
    : questions.filter((q) => selectedCategories.includes(q.category));

  const maxQuestions = availableQuestions.length;

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const selectAll = () => setSelectedCategories([]);

  const getCategoryCount = (category: string) =>
    questions.filter((q) => q.category === category).length;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-accent mb-2">
          WSET Level 1
        </h1>
        <p className="text-lg text-muted">Award in Wines — Practice Exam</p>
      </div>

      <div className="bg-card-bg rounded-2xl shadow-sm border border-border p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Select Topics</h2>
        <p className="text-sm text-muted mb-4">
          Leave all unselected to include every topic, or pick specific ones.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                selectedCategories.includes(cat)
                  ? "bg-accent text-white border-accent"
                  : selectedCategories.length === 0
                  ? "bg-accent-bg/50 border-border hover:border-accent-light"
                  : "bg-card-bg border-border hover:border-accent-light opacity-60"
              }`}
            >
              {cat}
              <span className="ml-2 opacity-70">({getCategoryCount(cat)})</span>
            </button>
          ))}
        </div>
        {selectedCategories.length > 0 && (
          <button
            onClick={selectAll}
            className="mt-3 text-sm text-accent underline hover:no-underline"
          >
            Clear selection (use all topics)
          </button>
        )}
      </div>

      <div className="bg-card-bg rounded-2xl shadow-sm border border-border p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Number of Questions</h2>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={5}
            max={maxQuestions}
            value={Math.min(questionCount, maxQuestions)}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            className="flex-1 accent-accent"
          />
          <span className="text-lg font-bold text-accent w-12 text-center">
            {Math.min(questionCount, maxQuestions)}
          </span>
        </div>
        <p className="text-sm text-muted mt-2">
          {maxQuestions} questions available
        </p>
      </div>

      <button
        onClick={() => onStart(selectedCategories, Math.min(questionCount, maxQuestions))}
        className="w-full py-4 bg-accent hover:bg-accent-light text-white rounded-2xl text-lg font-semibold transition-colors shadow-sm"
      >
        Start Quiz
      </button>
    </div>
  );
}
