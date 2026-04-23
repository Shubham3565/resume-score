interface SkillsGapProps {
  skills: string[];
}

/**
 * Chip list of skills the resume is missing that the JD requires.
 */
export default function SkillsGap({ skills }: SkillsGapProps) {
  if (!skills.length) return null;

  return (
    <div className="rounded-xl border border-border-light bg-surface px-4 py-4">
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
        Skills to Add
      </h3>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-score-red-bg px-2.5 py-1 text-xs font-medium text-score-red-text"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
