# ATS Resume Matcher

AI-powered resume-to-job-description matching tool built with Next.js, TypeScript, and Tailwind CSS. Uses Groq's LLM API to analyze how well a resume matches a given job description.

## Features

- **PDF upload** with client-side text extraction (pdf.js)
- **Paste text** alternative for resume input
- **AI analysis** via Groq API (llama-3.3-70b-versatile)
- **Detailed scoring**: overall match, skills, experience, education, keyword density
- **Keyword breakdown**: matched, missing, partial, and bonus keywords
- **Actionable recommendations** with categorized tips
- **Dark mode** support via system preference
- **Server-side API key** — your Groq key is never exposed to the browser

## Getting Started

### Prerequisites

- Node.js 20+ and npm
- A [Groq API key](https://console.groq.com) (free tier available)

### Setup

```bash
# Install dependencies
npm install

# Add your Groq API key
# Edit .env.local and set GROQ_API_KEY=gsk_...

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  layout.tsx          — Root layout with Navbar
  page.tsx            — Home page (server component)
  globals.css         — Tailwind + CSS custom properties
  api/analyze/route.ts — POST endpoint for Groq analysis

components/
  navbar.tsx          — Sticky navigation bar
  analysis-form.tsx   — Main client component (state orchestrator)
  job-description-panel.tsx
  resume-panel.tsx    — Upload PDF / Paste Text tabs
  file-drop-zone.tsx  — Drag-and-drop PDF upload
  analyze-button.tsx  — Submit button with loading state
  results/            — All result display components

hooks/
  use-analysis.ts     — Fetch to /api/analyze with loading/error state
  use-pdf-extract.ts  — Client-side PDF text extraction

lib/
  groq.ts             — Server-only Groq client + prompt
  colors.ts           — Score-to-color utility functions

types/
  analysis.ts         — TypeScript interfaces + Zod schemas
```

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS 4**
- **Groq SDK** (server-side LLM calls)
- **pdf.js** (client-side PDF parsing)
- **Zod** (request/response validation)
