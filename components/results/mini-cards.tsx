import type { AnalysisResult } from "@/types/analysis";
import { scoreTextClass } from "@/lib/colors";

interface MiniCardsProps {
  result: AnalysisResult;
}

interface CardData {
  label: string;
  value: number;
  subtitle: string;
}

/**
 * Three mini stat cards showing Skills, Experience, and Keywords scores.
 */
export default function MiniCards({ result }: MiniCardsProps) {
  const cards: CardData[] = [
    {
      label: "Skills",
      value: result.skill_score,
      subtitle: "Skill alignment",
    },
    {
      label: "Experience",
      value: result.experience_score,
      subtitle: "Seniority fit",
    },
    {
      label: "Keywords",
      value: result.keyword_density_score,
      subtitle: `${result.total_keywords_matched}/${result.total_keywords_in_jd} found`,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2.5 max-[480px]:grid-cols-2">
      {cards.map((card) => (
        <div key={card.label} className="rounded-lg bg-surface-2 px-4 py-3.5">
          <div className="mb-1 text-[11px] font-medium uppercase tracking-wide text-muted">
            {card.label}
          </div>
          <div
            className={`text-2xl font-bold tracking-tight ${scoreTextClass(card.value)}`}
          >
            {card.value}
            <span className="text-[13px] font-normal text-muted">%</span>
          </div>
          <div className="mt-0.5 text-xs text-muted">{card.subtitle}</div>
        </div>
      ))}
    </div>
  );
}
