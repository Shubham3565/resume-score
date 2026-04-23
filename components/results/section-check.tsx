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
 * Grid showing which resume sections are present or missing.
 */
export default function SectionCheck({ sections }: SectionCheckProps) {
  const entries = Object.entries(sections) as [keyof SectionCheckType, boolean][];

  return (
    <div className="rounded-xl border border-border-light bg-surface px-4 py-4 max-[480px]:px-3.5">
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
        Resume Sections
      </h3>
      <div className="grid grid-cols-2 gap-2 max-[480px]:grid-cols-1">
        {entries.map(([key, present]) => (
          <div
            key={key}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-medium ${
              present
                ? "bg-score-green-bg text-score-green-text"
                : "bg-score-red-bg text-score-red-text"
            }`}
          >
            <span className="text-[11px]">{present ? "✓" : "✗"}</span>
            <span>{SECTION_LABELS[key]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
