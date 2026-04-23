import type { AnalysisResult } from "@/types/analysis";
import ScoreBanner from "./score-banner";
import KeywordTabs from "./keyword-tabs";
import BreakdownSection from "./breakdown-section";
import StrongPoints from "./strong-points";
import RedFlags from "./red-flags";
import SectionCheck from "./section-check";
import RewriteSuggestions from "./rewrite-suggestions";
import Recommendations from "./recommendations";
import SkillsGap from "./skills-gap";

interface ResultsDashboardProps {
  result: AnalysisResult;
}

/**
 * Two-column results layout. Score banner spans full width, then
 * left column gets skills/breakdown/strong-points/sections,
 * right column gets rewrites/recommendations/skills-gap.
 */
export default function ResultsDashboard({ result }: ResultsDashboardProps) {
  const keywords = {
    matched: result.keywords_matched,
    missing: result.keywords_missing,
    partial: result.keywords_partial,
    bonus: result.keywords_bonus,
  };

  return (
    <div className="space-y-3" style={{ animation: "fadeIn 0.4s ease-out" }}>
      <ScoreBanner result={result} />
      <RedFlags flags={result.red_flags} />

      <div className="grid grid-cols-2 gap-3 max-[1100px]:grid-cols-1">
        <div className="space-y-3">
          <KeywordTabs keywords={keywords} />
          <BreakdownSection result={result} />
          <StrongPoints points={result.strong_points} />
          <SectionCheck sections={result.section_check} />
        </div>
        <div className="space-y-3">
          <RewriteSuggestions rewrites={result.rewrites} />
          <Recommendations tips={result.tips} />
          <SkillsGap skills={result.skills_gap} />
        </div>
      </div>
    </div>
  );
}
