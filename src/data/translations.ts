import { Language } from "@/types/quiz";

const translations = {
  en: {
    // Setup screen
    level1Title: "WSET Level 1",
    level2Title: "WSET Level 2",
    level1Subtitle: "Award in Wines — Practice Exam",
    level2Subtitle: "Award in Wines and Spirits — Practice Exam",
    selectLevel: "Select Level",
    selectLanguage: "Language",
    level1Label: "Level 1",
    level2Label: "Level 2",
    foundations: "Foundations",
    intermediate: "Intermediate",
    selectTopics: "Select Topics",
    topicsHint: "Leave all unselected to include every topic, or pick specific ones.",
    clearSelection: "Clear selection (use all topics)",
    numberOfQuestions: "Number of Questions",
    questionsAvailable: "questions available",
    startQuiz: "Start Quiz",
    // Quiz screen
    correct: "Correct!",
    incorrect: "Incorrect",
    seeResults: "See Results",
    nextQuestion: "Next Question",
    // Results screen
    quizComplete: "Quiz Complete",
    correctSuffix: "correct",
    pass: "PASS",
    needsMorePractice: "NEEDS MORE PRACTICE",
    passMarkLabel: "pass mark: 70%",
    topicBreakdown: "Topic Breakdown",
    reviewAnswers: "Review Answers",
    newQuiz: "New Quiz",
    // Review screen
    backToResults: "Back to Results",
  },
  es: {
    // Setup screen
    level1Title: "WSET Nivel 1",
    level2Title: "WSET Nivel 2",
    level1Subtitle: "Certificado en Vinos — Examen de Práctica",
    level2Subtitle: "Certificado en Vinos y Licores — Examen de Práctica",
    selectLevel: "Seleccionar Nivel",
    selectLanguage: "Idioma",
    level1Label: "Nivel 1",
    level2Label: "Nivel 2",
    foundations: "Fundamentos",
    intermediate: "Intermedio",
    selectTopics: "Seleccionar Temas",
    topicsHint: "Deja todos sin seleccionar para incluir todos los temas, o elige los que prefieras.",
    clearSelection: "Limpiar selección (usar todos los temas)",
    numberOfQuestions: "Número de Preguntas",
    questionsAvailable: "preguntas disponibles",
    startQuiz: "Iniciar Examen",
    // Quiz screen
    correct: "¡Correcto!",
    incorrect: "Incorrecto",
    seeResults: "Ver Resultados",
    nextQuestion: "Siguiente Pregunta",
    // Results screen
    quizComplete: "Examen Completado",
    correctSuffix: "correctas",
    pass: "APROBADO",
    needsMorePractice: "NECESITA MÁS PRÁCTICA",
    passMarkLabel: "nota de aprobación: 70%",
    topicBreakdown: "Desglose por Tema",
    reviewAnswers: "Revisar Respuestas",
    newQuiz: "Nuevo Examen",
    // Review screen
    backToResults: "Volver a Resultados",
  },
} as const;

export type Translations = (typeof translations)["en"];

export function t(lang: Language): Translations {
  return translations[lang];
}
