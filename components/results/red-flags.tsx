import type { RedFlag } from "@/types/analysis";

interface RedFlagsProps {
  flags: RedFlag[];
}

const FLAG_STYLES: Record<string, { className: string; icon: string }> = {
  critical: {
    className: "bg-score-red-bg text-score-red-text",
    icon: "!!",
  },
  warning: {
    className: "bg-score-amber-bg text-score-amber-text",
    icon: "!",
  },
};

/**
 * Displays recruiter-identified red flags with severity levels.
 */
export default function RedFlags({ flags }: RedFlagsProps) {
  if (!flags.length) return null;

  return (
    <div className="rounded-xl border border-border-light bg-surface px-4 py-4 max-[480px]:px-3.5">
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
        Red Flags
      </h3>
      <ul>
        {flags.map((flag, i) => {
          const style = FLAG_STYLES[flag.type] ?? FLAG_STYLES.warning;
          return (
            <li
              key={i}
              className="flex items-start gap-2.5 border-b border-border-light py-2.5 last:border-b-0"
            >
              <span
                className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${style.className}`}
              >
                {style.icon}
              </span>
              <div className="min-w-0">
                <span className="text-[13px] font-medium text-foreground">
                  {flag.label}
                </span>
                <p className="mt-0.5 text-[12px] leading-relaxed text-muted">
                  {flag.detail}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
