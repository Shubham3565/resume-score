"use client";

import { useCallback } from "react";

interface JobDescriptionPanelProps {
  value: string;
  onChange: (value: string) => void;
}

const SAMPLE_JD = `We are looking for a Senior Full-Stack Engineer to join our product team. You will work on building scalable web applications using React, Next.js, TypeScript, and Node.js.

Requirements:
- 4+ years of professional software development experience
- Strong proficiency in React, TypeScript, and modern CSS
- Experience with server-side rendering (Next.js preferred)
- Familiarity with REST APIs and GraphQL
- Experience with PostgreSQL or similar relational databases
- Knowledge of CI/CD pipelines and cloud platforms (AWS/GCP/Vercel)
- Strong communication skills and ability to work in an agile team

Nice to have:
- Experience with Python, Docker, or Kubernetes
- Contributions to open source projects
- Experience building design systems`;

/**
 * Panel for entering the job description text with word/character count
 * and a sample-text loader button.
 */
export default function JobDescriptionPanel({
  value,
  onChange,
}: JobDescriptionPanelProps) {
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  const loadSample = useCallback(() => {
    onChange(SAMPLE_JD);
  }, [onChange]);

  return (
    <div className="flex flex-col gap-2.5 rounded-xl border border-border-light bg-surface p-3.5 shadow-[var(--shadow-card)] max-[480px]:p-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
          Job Description
        </span>
        <button
          onClick={loadSample}
          className="cursor-pointer rounded-md border border-border-light px-2 py-0.5 text-[10.5px] font-medium text-muted transition-colors hover:border-border-md hover:text-foreground"
        >
          Sample
        </button>
      </div>
      <textarea
        className="h-[180px] resize-y rounded-lg border border-border-light bg-surface-2 px-3 py-2.5 text-[13px] leading-relaxed text-foreground outline-none placeholder:text-faint focus:border-sky/40 max-[480px]:h-[140px]"
        placeholder="Paste the full job description here…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="flex justify-between text-[11px] text-faint">
        <span>{wordCount.toLocaleString()} words</span>
        <span>{value.length.toLocaleString()} chars</span>
      </div>
    </div>
  );
}
