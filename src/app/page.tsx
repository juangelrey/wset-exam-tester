"use client";

import { useState, useMemo, useCallback } from "react";
import questionsData from "@/data/questions.json";
import { Question } from "@/types/quiz";
import QuizSetup from "@/components/QuizSetup";
import QuizQuestion from "@/components/QuizQuestion";
import QuizResults from "@/components/QuizResults";
import QuizReview from "@/components/QuizReview";

type Screen = "setup" | "quiz" | "results" | "review";

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function Home() {
  const allQuestions = questionsData as Question[];

  const categories = useMemo(() => {
    return [...new Set(allQuestions.map((q) => q.category))];
  }, [allQuestions]);

  const [screen, setScreen] = useState<Screen>("setup");
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleStart = useCallback(
    (selectedCategories: string[], count: number) => {
      const filtered =
        selectedCategories.length === 0
          ? allQuestions
          : allQuestions.filter((q) => selectedCategories.includes(q.category));

      const selected = shuffle(filtered).slice(0, count);
      setQuizQuestions(selected);
      setCurrentIndex(0);
      setAnswers([]);
      setScreen("quiz");
    },
    [allQuestions]
  );

  const handleAnswer = useCallback((selectedIndex: number) => {
    setAnswers((prev) => [...prev, selectedIndex]);
  }, []);

  const handleNext = useCallback(() => {
    if (currentIndex + 1 >= quizQuestions.length) {
      setScreen("results");
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, quizQuestions.length]);

  const handleRestart = useCallback(() => {
    setScreen("setup");
    setQuizQuestions([]);
    setAnswers([]);
    setCurrentIndex(0);
  }, []);

  return (
    <main className="flex-1 px-4 py-8 sm:py-12">
      {screen === "setup" && (
        <QuizSetup
          categories={categories}
          questions={allQuestions}
          onStart={handleStart}
        />
      )}

      {screen === "quiz" && quizQuestions[currentIndex] && (
        <QuizQuestion
          key={quizQuestions[currentIndex].id}
          question={quizQuestions[currentIndex]}
          questionNumber={currentIndex + 1}
          totalQuestions={quizQuestions.length}
          onAnswer={handleAnswer}
          onNext={handleNext}
        />
      )}

      {screen === "results" && (
        <QuizResults
          questions={quizQuestions}
          answers={answers}
          onRestart={handleRestart}
          onReview={() => setScreen("review")}
        />
      )}

      {screen === "review" && (
        <QuizReview
          questions={quizQuestions}
          answers={answers}
          onBack={() => setScreen("results")}
        />
      )}
    </main>
  );
}
