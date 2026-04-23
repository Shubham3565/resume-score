import type { AnalysisResult } from "@/types/analysis";

interface BreakdownSectionProps {
  result: AnalysisResult;
}

interface BarData {
  label: string;
  value: number;
}

function barGradient(v: number): string {
  if (v >= 75) return "from-emerald-400 to-emerald-500";
  if (v >= 55) return "from-blue-400 to-blue-500";
  if (v >= 35) return "from-amber-400 to-amber-500";
  return "from-red-400 to-red-500";
}

/**
 * Three-column grid breakdown: label | gradient bar | score value.
 * Shows all seven scoring dimensions with gradient-filled progress bars.
 */
export default function BreakdownSection({ result }: BreakdownSectionProps) {
  const bars: BarData[] = [
    { label: "Skills", value: result.skill_score },
    { label: "Experience", value: result.experience_score },
    { label: "Education", value: result.education_score },
    { label: "Keywords", value: result.keyword_density_score },
    { label: "Impact & Metrics", value: result.impact_score },
    { label: "Tailoring", value: result.tailoring_score },
    { label: "Title Alignment", value: result.title_alignment_score },
  ];

  return (
    <div className="rounded-xl border border-border-light bg-surface px-4 py-4 shadow-[var(--shadow-card)]">
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
        Breakdown
      </h3>
      <div className="space-y-2.5">
        {bars.map((bar) => (
          <div key={bar.label} className="grid grid-cols-[100px_1fr_36px] items-center gap-2.5 max-[480px]:grid-cols-[80px_1fr_32px]">
            <span className="truncate text-[12px] font-medium text-fg2">{bar.label}</span>
            <div className="h-[6px] overflow-hidden rounded-full bg-surface-2">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${barGradient(bar.value)}`}
                style={{ width: `${bar.value}%`, transition: "width 0.6s ease-out" }}
              />
            </div>
            <span className="text-right text-[12px] font-bold tabular-nums text-foreground">{bar.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
