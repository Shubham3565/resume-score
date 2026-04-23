import type { AnalysisResult } from "@/types/analysis";
import ScoreRing from "./score-ring";

interface ScoreBannerProps {
  result: AnalysisResult;
}

interface MetricPill {
  label: string;
  value: number;
}

function PillBar({ value }: { value: number }) {
  const color =
    value >= 75
      ? "from-emerald-400 to-emerald-500"
      : value >= 55
        ? "from-blue-400 to-blue-500"
        : value >= 35
          ? "from-amber-400 to-amber-500"
          : "from-red-400 to-red-500";

  return (
    <div className="mt-1 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
      <div
        className={`h-full rounded-full bg-gradient-to-r ${color}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

/**
 * Dark gradient banner showing the score ring, verdict, reason,
 * and metric pills — the hero section of the results.
 */
export default function ScoreBanner({ result }: ScoreBannerProps) {
  const pills: MetricPill[] = [
    { label: "Skills", value: result.skill_score },
    { label: "Experience", value: result.experience_score },
    { label: "Keywords", value: result.keyword_density_score },
    { label: "Impact", value: result.impact_score },
    { label: "Tailoring", value: result.tailoring_score },
    { label: "Title Fit", value: result.title_alignment_score },
  ];

  const verdictColor =
    result.verdict === "Strong Match"
      ? "bg-emerald-400/20 text-emerald-300"
      : result.verdict === "Good Match"
        ? "bg-blue-400/20 text-blue-300"
        : result.verdict === "Fair Match"
          ? "bg-amber-400/20 text-amber-300"
          : "bg-red-400/20 text-red-300";

  return (
    <div
      className="overflow-hidden rounded-xl p-5 max-[480px]:p-4"
      style={{
        background: "linear-gradient(135deg, #0F172A 0%, #1e1b4b 50%, #312e81 100%)",
      }}
    >
      <div className="flex items-center gap-5 max-[480px]:flex-col max-[480px]:items-center max-[480px]:gap-3">
        <div className="relative shrink-0">
          <ScoreRing score={result.score} dark />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[28px] font-bold leading-none tracking-tight text-white">
              {result.score}
            </span>
            <small className="text-[11px] font-medium text-white/50">/100</small>
          </div>
        </div>

        <div className="min-w-0 max-[480px]:text-center">
          <div className="mb-1 flex items-center gap-2 max-[480px]:justify-center">
            <div
              className="h-[6px] w-[6px] rounded-full bg-indigo-400"
              style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
            />
            <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-white/60">
              Match Assessment
            </span>
          </div>
          <h2 className="font-display text-[19px] font-bold leading-tight text-white">
            ATS Match Score
          </h2>
          <p className="mt-1 max-w-[420px] text-[13px] leading-relaxed text-white/65">
            {result.verdict_reason}
          </p>
          <span
            className={`mt-2 inline-flex items-center rounded-full px-2.5 py-[3px] text-[11px] font-semibold ${verdictColor}`}
          >
            {result.verdict}
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-6 gap-2 max-[900px]:grid-cols-3 max-[480px]:grid-cols-2">
        {pills.map((pill) => (
          <div
            key={pill.label}
            className="rounded-lg px-2.5 py-2"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-white/50">{pill.label}</span>
              <span className="text-[12px] font-bold text-white">{pill.value}</span>
            </div>
            <PillBar value={pill.value} />
          </div>
        ))}
      </div>
    </div>
  );
}
