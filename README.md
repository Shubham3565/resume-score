<div align="center">

# ATS Resume Matcher

**AI-powered resume analysis that tells you exactly how well you match a job description.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Groq](https://img.shields.io/badge/Groq-LLaMA_3.3_70B-F55036?style=flat-square)](https://groq.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

<br />

```
  ┌─────────────────────────────────────────────────────┐
  │                  ATS Resume Matcher                  │
  │                                                     │
  │  ┌──────────────────┐  ┌──────────────────┐        │
  │  │ Job Description  │  │  Your Resume     │        │
  │  │                  │  │  ┌─── PDF ───┐   │        │
  │  │  Paste the full  │  │  │ Upload or │   │        │
  │  │  job description │  │  │ Paste Text│   │        │
  │  │  here...         │  │  └───────────┘   │        │
  │  └──────────────────┘  └──────────────────┘        │
  │                                                     │
  │  ┌─────────── Analyze Match ─────────────┐         │
  │  └───────────────────────────────────────┘         │
  │                                                     │
  │  ╔═══════════════════════════════════════╗          │
  │  ║   Score: 82/100  ●  Strong Match     ║          │
  │  ╚═══════════════════════════════════════╝          │
  │                                                     │
  │  Skills 85%  ██████████░░  Experience 78%           │
  │  Keywords ✓ matched  ✗ missing  ~ partial           │
  └─────────────────────────────────────────────────────┘
```

</div>

---

## Highlights

| Feature | Description |
|---|---|
| **PDF Upload** | Drag-and-drop or click-to-browse with client-side text extraction via pdf.js |
| **Paste Text** | Alternative input for plain-text resumes |
| **AI Scoring** | Overall match score (0-100) powered by Groq's LLaMA 3.3 70B |
| **Multi-Dimensional Breakdown** | Skills, experience, education, and keyword density scores |
| **Keyword Analysis** | Matched, missing, partial, and bonus keyword categories |
| **Actionable Tips** | 5-7 specific recommendations to improve your match |
| **Skills Gap** | Exact list of skills you're missing from the job description |
| **Dark Mode** | Automatic system-preference-based theming |
| **Mobile Responsive** | Fully optimized for phones and tablets |
| **Secure** | API key stays server-side — never exposed to the browser |

---

## Quick Start

### Prerequisites

- **Node.js 20+** and npm
- A **[Groq API key](https://console.groq.com)** (free tier available)

### Installation

```bash
# Clone the repository
git clone https://github.com/Shubham3565/resume-score.git
cd resume-score

# Install dependencies
npm install

# Configure your API key
cp .env.local.example .env.local
# Edit .env.local and add: GROQ_API_KEY=gsk_your_key_here

# Start the dev server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** and start analyzing!

---

## How It Works

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐     ┌──────────────┐
│   Upload /   │────▶│  Client-side │────▶│  POST to    │────▶│  Groq LLM    │
│   Paste      │     │  PDF Parse   │     │  /api/analyze│     │  Analysis    │
└─────────────┘     └──────────────┘     └─────────────┘     └──────┬───────┘
                                                                     │
┌─────────────┐     ┌──────────────┐     ┌─────────────┐            │
│  Dashboard   │◀────│  Zod Schema  │◀────│  JSON       │◀───────────┘
│  Renders     │     │  Validation  │     │  Response   │
└─────────────┘     └──────────────┘     └─────────────┘
```

1. **Input** — Paste a job description and upload your resume (PDF or text)
2. **Extract** — pdf.js extracts text client-side (no server upload needed)
3. **Analyze** — Your server calls Groq's LLaMA 3.3 70B with a structured prompt
4. **Validate** — Response is validated against a strict Zod schema
5. **Display** — Results render in a rich dashboard with scores, keywords, and tips

---

## Project Structure

```
resume-score/
├── app/
│   ├── layout.tsx               # Root layout with Navbar
│   ├── page.tsx                 # Home page (server component)
│   ├── globals.css              # Tailwind v4 theme + CSS custom properties
│   └── api/analyze/
│       └── route.ts             # POST endpoint — Groq analysis
│
├── components/
│   ├── navbar.tsx               # Sticky nav with API status indicator
│   ├── analysis-form.tsx        # Client state orchestrator
│   ├── job-description-panel.tsx
│   ├── resume-panel.tsx         # Upload PDF / Paste Text tabs
│   ├── file-drop-zone.tsx       # Drag-and-drop PDF upload
│   ├── analyze-button.tsx       # CTA with loading spinner
│   └── results/
│       ├── results-dashboard.tsx # Composes all result sections
│       ├── score-banner.tsx     # Score ring + verdict badge
│       ├── score-ring.tsx       # SVG circular progress
│       ├── mini-cards.tsx       # Skills / Experience / Keywords cards
│       ├── keyword-tabs.tsx     # Tabbed keyword breakdown
│       ├── breakdown-section.tsx # Progress bar breakdown
│       ├── recommendations.tsx  # Categorized actionable tips
│       └── skills-gap.tsx       # Missing skills chip list
│
├── hooks/
│   ├── use-analysis.ts          # API fetch with loading/error states
│   └── use-pdf-extract.ts       # Client-side PDF text extraction
│
├── lib/
│   ├── groq.ts                  # Server-only Groq client + prompt
│   └── colors.ts                # Score-to-color mapping utilities
│
└── types/
    └── analysis.ts              # TypeScript types + Zod schemas
```

---

## Tech Stack

<table>
  <tr>
    <td align="center" width="96"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" width="48" height="48" alt="Next.js" /><br /><sub><b>Next.js 16</b></sub></td>
    <td align="center" width="96"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="48" height="48" alt="TypeScript" /><br /><sub><b>TypeScript</b></sub></td>
    <td align="center" width="96"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" width="48" height="48" alt="Tailwind" /><br /><sub><b>Tailwind 4</b></sub></td>
    <td align="center" width="96"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="48" height="48" alt="React" /><br /><sub><b>React 19</b></sub></td>
  </tr>
  <tr>
    <td align="center" width="96"><b>Groq</b><br /><sub>LLaMA 3.3 70B</sub></td>
    <td align="center" width="96"><b>pdf.js</b><br /><sub>PDF Parsing</sub></td>
    <td align="center" width="96"><b>Zod</b><br /><sub>Validation</sub></td>
    <td align="center" width="96"><b>Geist</b><br /><sub>Typography</sub></td>
  </tr>
</table>

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GROQ_API_KEY` | Yes | Your Groq API key ([get one free](https://console.groq.com)) |

Create a `.env.local` file in the project root:

```env
GROQ_API_KEY=gsk_your_key_here
```

---

## Deployment

### Vercel (Recommended)

The easiest way to deploy — Vercel is built for Next.js:

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repo
3. Add `GROQ_API_KEY` as an environment variable
4. Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Shubham3565/resume-score&env=GROQ_API_KEY&envDescription=Get%20a%20free%20Groq%20API%20key%20at%20console.groq.com)

### Other Platforms

Any Node.js hosting that supports Next.js will work (Railway, Render, Fly.io, etc.). Just make sure to set the `GROQ_API_KEY` environment variable.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with [Next.js](https://nextjs.org/) and [Groq](https://groq.com/)**

</div>
