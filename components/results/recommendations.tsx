import type { Tip } from "@/types/analysis";

interface RecommendationsProps {
  tips: Tip[];
}

const ICON_CONFIG: Record<string, { bg: string; icon: React.ReactNode }> = {
  warn: {
    bg: "bg-score-amber-bg text-score-amber-text",
    icon: (
      <svg className="h-[10px] w-[10px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      </svg>
    ),
  },
  ok: {
    bg: "bg-score-green-bg text-score-green-text",
    icon: (
      <svg className="h-[10px] w-[10px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  info: {
    bg: "bg-score-blue-bg text-score-blue-text",
    icon: (
      <svg className="h-[10px] w-[10px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
  },
};

/**
 * Ordered list of actionable tips with categorized icon tiles and hover states.
 */
export default function Recommendations({ tips }: RecommendationsProps) {
  if (!tips.length) return null;

  return (
    <div className="rounded-xl border border-border-light bg-surface px-4 py-4 shadow-[var(--shadow-card)]">
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
        Recommendations
      </h3>
      <ul>
        {tips.map((tip, i) => {
          const config = ICON_CONFIG[tip.type] ?? ICON_CONFIG.info;
          return (
            <li
              key={i}
              className="flex items-start gap-2.5 rounded-lg border-b border-border-light px-1 py-2.5 transition-colors last:border-b-0 hover:bg-surface-bright"
            >
              <span className={`mt-0.5 flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-md ${config.bg}`}>
                {config.icon}
              </span>
              <span className="text-[13px] leading-relaxed text-fg2">{tip.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
