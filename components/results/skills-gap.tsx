interface SkillsGapProps {
  skills: string[];
}

/**
 * Chip list of skills the resume is missing, with add-icon per chip.
 */
export default function SkillsGap({ skills }: SkillsGapProps) {
  if (!skills.length) return null;

  return (
    <div className="rounded-xl border border-border-light bg-surface px-4 py-4 shadow-[var(--shadow-card)]">
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
        Skills to Add
      </h3>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-1 rounded-full bg-score-red-bg px-2.5 py-[3px] text-[11.5px] font-medium text-score-red-text"
          >
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
