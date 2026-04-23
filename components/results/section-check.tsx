import type { SectionCheck as SectionCheckType } from "@/types/analysis";

interface SectionCheckProps {
  sections: SectionCheckType;
}

const SECTION_LABELS: Record<keyof SectionCheckType, string> = {
  summary: "Summary / Objective",
  experience: "Work Experience",
  education: "Education",
  skills: "Skills List",
  projects: "Projects",
};

/**
 * Grid showing present/missing resume sections with subtle visual treatment:
 * neutral bg for present, red accent for missing.
 */
export default function SectionCheck({ sections }: SectionCheckProps) {
  const entries = Object.entries(sections) as [keyof SectionCheckType, boolean][];

  return (
    <div className="rounded-xl border border-border-light bg-surface px-4 py-4 shadow-[var(--shadow-card)]">
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
        Resume Sections
      </h3>
      <div className="grid grid-cols-2 gap-2 max-[480px]:grid-cols-1">
        {entries.map(([key, present]) => (
          <div
            key={key}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-medium ${
              present
                ? "bg-surface-2 text-fg2"
                : "bg-score-red-bg text-score-red-text"
            }`}
          >
            {present ? (
              <svg className="h-3.5 w-3.5 shrink-0 text-score-green-mid" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            )}
            <span>{SECTION_LABELS[key]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
