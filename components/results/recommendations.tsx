import type { Tip } from "@/types/analysis";

interface RecommendationsProps {
  tips: Tip[];
}

const ICON_STYLES: Record<string, { className: string; char: string }> = {
  warn: {
    className: "bg-score-amber-bg text-score-amber-text",
    char: "!",
  },
  ok: {
    className: "bg-score-green-bg text-score-green-text",
    char: "✓",
  },
  info: {
    className: "bg-score-blue-bg text-score-blue-text",
    char: "i",
  },
};

/**
 * Ordered list of actionable tips with categorized icons.
 */
export default function Recommendations({ tips }: RecommendationsProps) {
  if (!tips.length) return null;

  return (
    <div className="rounded-xl border border-border-light bg-surface px-4 py-4 max-[480px]:px-3.5">
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
        Recommendations
      </h3>
      <ul>
        {tips.map((tip, i) => {
          const icon = ICON_STYLES[tip.type] ?? ICON_STYLES.info;
          return (
            <li
              key={i}
              className="flex items-start gap-2.5 border-b border-border-light py-2 text-[13px] leading-relaxed last:border-b-0"
            >
              <span
                className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${icon.className}`}
              >
                {icon.char}
              </span>
              <span>{tip.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
