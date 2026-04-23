import type { AnalysisResult } from "@/types/analysis";
import ScoreBanner from "./score-banner";
import MiniCards from "./mini-cards";
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
 * Wrapper that composes all result sub-sections into a single dashboard.
 */
export default function ResultsDashboard({ result }: ResultsDashboardProps) {
  const keywords = {
    matched: result.keywords_matched,
    missing: result.keywords_missing,
    partial: result.keywords_partial,
    bonus: result.keywords_bonus,
  };

  return (
    <div className="space-y-2.5">
      <ScoreBanner result={result} />
      <MiniCards result={result} />
      <RedFlags flags={result.red_flags} />
      <StrongPoints points={result.strong_points} />
      <KeywordTabs keywords={keywords} />
      <BreakdownSection result={result} />
      <SectionCheck sections={result.section_check} />
      <RewriteSuggestions rewrites={result.rewrites} />
      <Recommendations tips={result.tips} />
      <SkillsGap skills={result.skills_gap} />
    </div>
  );
}
