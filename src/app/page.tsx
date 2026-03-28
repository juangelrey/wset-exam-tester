"use client";

import { useState, useMemo, useCallback } from "react";
import level1Data from "@/data/questions.json";
import level2Data from "@/data/questions-l2.json";
import level1DataEs from "@/data/questions-es.json";
import level2DataEs from "@/data/questions-l2-es.json";
import level1DataFr from "@/data/questions-fr.json";
import level2DataFr from "@/data/questions-l2-fr.json";
import { Question, WsetLevel, Language } from "@/types/quiz";
import { t } from "@/data/translations";
import QuizSetup from "@/components/QuizSetup";
import QuizQuestion from "@/components/QuizQuestion";
import QuizResults from "@/components/QuizResults";
import QuizReview from "@/components/QuizReview";

type Screen = "setup" | "quiz" | "results" | "review";

const questionsByLevelAndLang: Record<Language, Record<WsetLevel, Question[]>> = {
  en: {
    level1: level1Data as Question[],
    level2: level2Data as Question[],
  },
  es: {
    level1: level1DataEs as Question[],
    level2: level2DataEs as Question[],
  },
  fr: {
    level1: level1DataFr as Question[],
    level2: level2DataFr as Question[],
  },
};

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function Home() {
  const [level, setLevel] = useState<WsetLevel>("level1");
  const [language, setLanguage] = useState<Language>("en");
  const allQuestions = questionsByLevelAndLang[language][level];
  const translations = t(language);

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
    <>
      {/* Header — always visible */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={handleRestart}
            className="text-accent font-bold text-lg hover:text-accent-light transition-colors"
          >
            WSET Practice
          </button>
          <button
            onClick={() => setLanguage(language === "en" ? "es" : language === "es" ? "fr" : "en")}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border bg-card-bg hover:border-accent-light transition-colors"
            title={language === "en" ? "Cambiar a español" : language === "es" ? "Passer en français" : "Switch to English"}
          >
            {/* UK flag */}
            <svg className={`w-6 h-4 rounded-sm ${language === "en" ? "opacity-100 ring-1 ring-accent" : "opacity-40"}`} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
              <rect width="60" height="40" fill="#012169"/>
              <path d="M0 0L60 40M60 0L0 40" stroke="#fff" strokeWidth="8"/>
              <path d="M0 0L60 40M60 0L0 40" stroke="#C8102E" strokeWidth="4"/>
              <path d="M30 0V40M0 20H60" stroke="#fff" strokeWidth="12"/>
              <path d="M30 0V40M0 20H60" stroke="#C8102E" strokeWidth="6"/>
            </svg>
            {/* Spain flag */}
            <svg className={`w-6 h-4 rounded-sm ${language === "es" ? "opacity-100 ring-1 ring-accent" : "opacity-40"}`} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
              <rect width="60" height="10" fill="#AA151B"/>
              <rect y="10" width="60" height="20" fill="#F1BF00"/>
              <rect y="30" width="60" height="10" fill="#AA151B"/>
            </svg>
            {/* France flag */}
            <svg className={`w-6 h-4 rounded-sm ${language === "fr" ? "opacity-100 ring-1 ring-accent" : "opacity-40"}`} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
              <rect width="20" height="40" fill="#002395"/>
              <rect x="20" width="20" height="40" fill="#fff"/>
              <rect x="40" width="20" height="40" fill="#ED2939"/>
            </svg>
          </button>
        </div>
      </header>

    <main className="flex-1 px-4 py-8 sm:py-12">
      {screen === "setup" && (
        <QuizSetup
          categories={categories}
          questions={allQuestions}
          level={level}
          onLevelChange={setLevel}
          onStart={handleStart}
          translations={translations}
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
          translations={translations}
        />
      )}

      {screen === "results" && (
        <QuizResults
          questions={quizQuestions}
          answers={answers}
          level={level}
          onRestart={handleRestart}
          onReview={() => setScreen("review")}
          translations={translations}
        />
      )}

      {screen === "review" && (
        <QuizReview
          questions={quizQuestions}
          answers={answers}
          onBack={() => setScreen("results")}
          translations={translations}
        />
      )}
    </main>
    </>
  );
}
