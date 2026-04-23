import type { RedFlag } from "@/types/analysis";

interface RedFlagsProps {
  flags: RedFlag[];
}

const FLAG_CONFIG: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  critical: {
    bg: "bg-score-red-bg border-score-red-mid/30",
    text: "text-score-red-text",
    icon: (
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
        <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
  },
  warning: {
    bg: "bg-score-amber-bg border-score-amber-mid/30",
    text: "text-score-amber-text",
    icon: (
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
};

/**
 * Alert-style list of recruiter-identified red flags with severity icons.
 */
export default function RedFlags({ flags }: RedFlagsProps) {
  if (!flags.length) return null;

  return (
    <div className="rounded-xl border border-border-light bg-surface px-4 py-4 shadow-[var(--shadow-card)]">
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-score-red-text">
        Red Flags
      </h3>
      <div className="space-y-2">
        {flags.map((flag, i) => {
          const config = FLAG_CONFIG[flag.type] ?? FLAG_CONFIG.warning;
          return (
            <div
              key={i}
              className={`flex items-start gap-2.5 rounded-lg border px-3 py-2.5 ${config.bg}`}
            >
              <span className={`mt-0.5 shrink-0 ${config.text}`}>{config.icon}</span>
              <div className="min-w-0">
                <span className={`text-[13px] font-semibold ${config.text}`}>{flag.label}</span>
                <p className="mt-0.5 text-[12px] leading-relaxed text-fg2">{flag.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
