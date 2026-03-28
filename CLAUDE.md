# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `pnpm dev` — start dev server (http://localhost:3000)
- `pnpm build` — production build
- `pnpm lint` — run ESLint
- `pnpm format` — format all files with Prettier
- `pnpm format:check` — check formatting without writing
- No test framework is configured yet.

## Architecture

Next.js 16 app (App Router) with React 19, TypeScript, and Tailwind CSS v4. The entire app is a client-side quiz engine — the main page (`src/app/page.tsx`) is a `"use client"` component that manages all state.

**Flow:** Setup → Quiz → Results → Review, driven by a `screen` state machine in `page.tsx`.

**Key pieces:**
- `src/types/quiz.ts` — `Question` interface and type aliases used across all components
- `src/data/questions.json` — static question bank (id, category, question, options, correctAnswer index, explanation)
- `src/components/` — four screen components: `QuizSetup`, `QuizQuestion`, `QuizResults`, `QuizReview`
- Path alias: `@/*` maps to `./src/*`

**Data flow:** Questions are loaded from JSON at the top of `page.tsx`, filtered/shuffled on start, and answers are tracked as an `index[]` parallel to the questions array.
