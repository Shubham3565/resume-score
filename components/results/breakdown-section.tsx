import type { AnalysisResult } from "@/types/analysis";
import { scoreBarClass } from "@/lib/colors";

interface BreakdownSectionProps {
  result: AnalysisResult;
}

interface BarData {
  label: string;
  value: number;
}

/**
 * Section with labeled progress bars for each scoring dimension.
 */
export default function BreakdownSection({ result }: BreakdownSectionProps) {
  const bars: BarData[] = [
    { label: "Skills", value: result.skill_score },
    { label: "Experience", value: result.experience_score },
    { label: "Education", value: result.education_score },
    { label: "Keywords", value: result.keyword_density_score },
  ];

  return (
    <div className="rounded-xl border border-border-light bg-surface px-4 py-4 max-[480px]:px-3.5">
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
        Breakdown
      </h3>
      <div className="space-y-2">
        {bars.map((bar) => (
          <div key={bar.label}>
            <div className="mb-1 flex justify-between text-xs text-muted">
              <span>{bar.label}</span>
              <span>{bar.value}%</span>
            </div>
            <div className="h-[5px] overflow-hidden rounded-sm bg-surface-2">
              <div
                className={`h-full rounded-sm ${scoreBarClass(bar.value)}`}
                style={{ width: `${bar.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
