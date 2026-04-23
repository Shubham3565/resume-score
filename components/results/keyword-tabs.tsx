"use client";

import { useState } from "react";
import type { KeywordCategory, KeywordCategories } from "@/types/analysis";

interface KeywordTabsProps {
  keywords: KeywordCategories;
}

const TABS: { key: KeywordCategory; label: string }[] = [
  { key: "matched", label: "Matched" },
  { key: "missing", label: "Missing" },
  { key: "partial", label: "Partial" },
  { key: "bonus", label: "Bonus" },
];

const CHIP_STYLES: Record<KeywordCategory, string> = {
  matched: "bg-score-green-bg text-score-green-text",
  missing: "bg-score-red-bg text-score-red-text",
  partial: "bg-score-amber-bg text-score-amber-text",
  bonus: "bg-score-blue-bg text-score-blue-text",
};

const EMPTY_MESSAGES: Record<KeywordCategory, string> = {
  matched: "All key terms found ✓",
  missing: "No missing keywords",
  partial: "No partial matches",
  bonus: "No bonus keywords",
};

/**
 * Tabbed keyword display with Matched / Missing / Partial / Bonus categories.
 */
export default function KeywordTabs({ keywords }: KeywordTabsProps) {
  const [active, setActive] = useState<KeywordCategory>("matched");

  const items = keywords[active] ?? [];

  return (
    <div className="rounded-xl border border-border-light bg-surface px-4 py-4">
      <div className="mb-3 flex flex-wrap gap-1.5">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
              active === tab.key
                ? "border-foreground bg-foreground text-background"
                : "border-border-md bg-transparent text-muted hover:text-foreground"
            }`}
          >
            {tab.label} ({keywords[tab.key].length})
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="py-1 text-[13px] text-muted">
          {EMPTY_MESSAGES[active]}
        </p>
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {items.map((kw) => (
            <span
              key={kw}
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${CHIP_STYLES[active]}`}
            >
              {kw}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
