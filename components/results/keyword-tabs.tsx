"use client";

import { useState } from "react";
import type { KeywordCategory, KeywordCategories } from "@/types/analysis";

interface KeywordTabsProps {
  keywords: KeywordCategories;
}

const TABS: { key: KeywordCategory; label: string; dotColor: string; icon: React.ReactNode }[] = [
  {
    key: "matched",
    label: "Matched",
    dotColor: "bg-score-green-mid",
    icon: <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><polyline points="20 6 9 17 4 12" /></svg>,
  },
  {
    key: "missing",
    label: "Missing",
    dotColor: "bg-score-red-mid",
    icon: <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
  },
  {
    key: "partial",
    label: "Partial",
    dotColor: "bg-score-amber-mid",
    icon: <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>,
  },
  {
    key: "bonus",
    label: "Bonus",
    dotColor: "bg-score-blue-mid",
    icon: <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
  },
];

const CHIP_STYLES: Record<KeywordCategory, string> = {
  matched: "bg-score-green-bg text-score-green-text",
  missing: "bg-score-red-bg text-score-red-text",
  partial: "bg-score-amber-bg text-score-amber-text",
  bonus: "bg-score-blue-bg text-score-blue-text",
};

const EMPTY_MESSAGES: Record<KeywordCategory, string> = {
  matched: "All key terms found",
  missing: "No missing keywords — great match!",
  partial: "No partial matches",
  bonus: "No bonus keywords",
};

/**
 * Underline-style tabbed keyword display with colored dot indicators,
 * count badges, and chip icons per category.
 */
export default function KeywordTabs({ keywords }: KeywordTabsProps) {
  const [active, setActive] = useState<KeywordCategory>("matched");
  const items = keywords[active] ?? [];
  const activeTab = TABS.find((t) => t.key === active)!;

  return (
    <div className="rounded-xl border border-border-light bg-surface shadow-[var(--shadow-card)]">
      <div className="flex border-b border-border-light">
        {TABS.map((tab) => {
          const isActive = active === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`relative flex flex-1 cursor-pointer items-center justify-center gap-1.5 px-2 py-2.5 text-[12px] font-medium transition-colors ${
                isActive ? "text-foreground" : "text-faint hover:text-muted"
              }`}
            >
              <span className={`h-[6px] w-[6px] shrink-0 rounded-full ${isActive ? tab.dotColor : "bg-transparent"}`} />
              <span>{tab.label}</span>
              <span className={`rounded-full px-1.5 py-px text-[10px] font-semibold ${
                isActive ? "bg-surface-2 text-foreground" : "bg-transparent text-faint"
              }`}>
                {keywords[tab.key].length}
              </span>
              {isActive && (
                <span className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-sky" />
              )}
            </button>
          );
        })}
      </div>

      <div className="px-4 py-3.5">
        {items.length === 0 ? (
          <p className="py-1 text-[13px] text-muted">{EMPTY_MESSAGES[active]}</p>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {items.map((kw) => (
              <span
                key={kw}
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-[3px] text-[11.5px] font-medium ${CHIP_STYLES[active]}`}
              >
                {activeTab.icon}
                {kw}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
