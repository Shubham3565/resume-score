"use client";

import { useState } from "react";
import type { Rewrite } from "@/types/analysis";

interface RewriteSuggestionsProps {
  rewrites: Rewrite[];
}

const IMPACT_COLORS: Record<string, string> = {
  high: "bg-score-green-bg text-score-green-text",
  medium: "bg-score-amber-bg text-score-amber-text",
  low: "bg-score-blue-bg text-score-blue-text",
};

function estimateImpact(reason: string): string {
  const lower = reason.toLowerCase();
  if (lower.includes("quantif") || lower.includes("metric") || lower.includes("measur") || lower.includes("impact") || lower.includes("result")) return "high";
  if (lower.includes("vague") || lower.includes("generic") || lower.includes("passive")) return "medium";
  return "low";
}

/**
 * Collapsible accordion list showing before/after rewrite suggestions
 * with numbered indices, impact tags, and animated expand/collapse.
 */
export default function RewriteSuggestions({ rewrites }: RewriteSuggestionsProps) {
  const [openIdx, setOpenIdx] = useState<number>(0);

  if (!rewrites.length) return null;

  const toggle = (i: number) => setOpenIdx(openIdx === i ? -1 : i);

  return (
    <div className="rounded-xl border border-border-light bg-surface shadow-[var(--shadow-card)]">
      <div className="px-4 pt-4 pb-1">
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted">
          Rewrite Suggestions
        </h3>
      </div>
      <div className="px-4 pb-4">
        {rewrites.map((rw, i) => {
          const isOpen = openIdx === i;
          const impact = estimateImpact(rw.reason);
          const impactColor = IMPACT_COLORS[impact] ?? IMPACT_COLORS.low;

          return (
            <div
              key={i}
              className={`mt-2 overflow-hidden rounded-lg border transition-all ${isOpen ? "border-border-md" : "border-border-light"}`}
            >
              <button
                onClick={() => toggle(i)}
                className="flex w-full cursor-pointer items-center gap-2.5 px-3 py-2.5 text-left transition-colors hover:bg-surface-bright"
              >
                <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md bg-surface-2 text-[11px] font-bold text-muted">
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-foreground">
                  {rw.original.length > 65 ? rw.original.slice(0, 65) + "…" : rw.original}
                </span>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${impactColor}`}>
                  {impact}
                </span>
                <svg
                  className={`h-4 w-4 shrink-0 text-faint transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              <div
                className="transition-all duration-200 ease-in-out"
                style={{
                  maxHeight: isOpen ? "500px" : "0px",
                  opacity: isOpen ? 1 : 0,
                  overflow: "hidden",
                }}
              >
                <div className="border-t border-border-light px-3 py-3">
                  <div className="mb-2.5 space-y-2">
                    <div className="rounded-md border-l-[3px] border-score-red-mid bg-score-red-bg/40 py-2 pl-3 pr-2">
                      <span className="mb-0.5 block text-[9.5px] font-semibold uppercase tracking-wider text-score-red-text">
                        Before
                      </span>
                      <p className="text-[12.5px] leading-relaxed text-fg2">
                        {rw.original}
                      </p>
                    </div>
                    <div className="rounded-md border-l-[3px] border-score-green-mid bg-score-green-bg/40 py-2 pl-3 pr-2">
                      <span className="mb-0.5 block text-[9.5px] font-semibold uppercase tracking-wider text-score-green-text">
                        After
                      </span>
                      <p className="text-[12.5px] leading-relaxed text-foreground font-medium">
                        {rw.improved}
                      </p>
                    </div>
                  </div>
                  <p className="text-[11px] text-muted">{rw.reason}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
