interface StrongPointsProps {
  points: string[];
}

/**
 * Lists the strongest aspects of the resume with check-mark icons
 * and subtle hover states.
 */
export default function StrongPoints({ points }: StrongPointsProps) {
  if (!points.length) return null;

  return (
    <div className="rounded-xl border border-border-light bg-surface px-4 py-4 shadow-[var(--shadow-card)]">
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
        Strong Points
      </h3>
      <ul>
        {points.map((point, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 rounded-lg border-b border-border-light px-1 py-2.5 transition-colors last:border-b-0 hover:bg-surface-bright"
          >
            <span className="mt-0.5 flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-md bg-score-green-bg text-score-green-text">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span className="text-[13px] leading-relaxed text-fg2">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
