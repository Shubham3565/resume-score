import type { AnalysisResult } from "@/types/analysis";
import { scoreTextClass, verdictClasses } from "@/lib/colors";
import ScoreRing from "./score-ring";

interface ScoreBannerProps {
  result: AnalysisResult;
}

/**
 * Top banner showing the circular score, verdict badge, and reason text.
 */
export default function ScoreBanner({ result }: ScoreBannerProps) {
  return (
    <div className="flex items-center gap-5 rounded-xl border border-border-light bg-surface px-6 py-5 max-[480px]:flex-col max-[480px]:items-start max-[480px]:gap-3 max-[480px]:px-4 max-[480px]:py-4">
      <div className="relative shrink-0 max-[480px]:self-center">
        <ScoreRing score={result.score} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={`text-2xl font-bold leading-none tracking-tight ${scoreTextClass(result.score)}`}
          >
            {result.score}
          </span>
          <small className="text-[11px] text-muted">/100</small>
        </div>
      </div>
      <div className="max-[480px]:text-center max-[480px]:self-center">
        <h2 className="text-[17px] font-semibold">ATS Match Score</h2>
        <p className="mt-1 max-w-[420px] text-[13px] leading-relaxed text-muted">
          {result.verdict_reason}
        </p>
        <span
          className={`mt-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${verdictClasses(result.verdict)}`}
        >
          {result.verdict}
        </span>
      </div>
    </div>
  );
}
