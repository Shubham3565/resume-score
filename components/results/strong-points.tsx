interface StrongPointsProps {
  points: string[];
}

/**
 * List of things the resume does well for the target role.
 */
export default function StrongPoints({ points }: StrongPointsProps) {
  if (!points.length) return null;

  return (
    <div className="rounded-xl border border-border-light bg-surface px-4 py-4 max-[480px]:px-3.5">
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
        Strong Points
      </h3>
      <ul>
        {points.map((point, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 border-b border-border-light py-2 text-[13px] leading-relaxed last:border-b-0"
          >
            <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-score-green-bg text-[10px] font-semibold text-score-green-text">
              ✓
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
