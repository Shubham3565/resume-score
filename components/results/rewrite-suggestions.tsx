import type { Rewrite } from "@/types/analysis";

interface RewriteSuggestionsProps {
  rewrites: Rewrite[];
}

/**
 * Side-by-side (stacked on mobile) before/after rewrite suggestions
 * for weak resume bullet points.
 */
export default function RewriteSuggestions({ rewrites }: RewriteSuggestionsProps) {
  if (!rewrites.length) return null;

  return (
    <div className="rounded-xl border border-border-light bg-surface px-4 py-4 max-[480px]:px-3.5">
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
        Rewrite Suggestions
      </h3>
      <div className="space-y-3">
        {rewrites.map((rw, i) => (
          <div
            key={i}
            className="rounded-lg border border-border-light bg-surface-2 p-3"
          >
            <div className="mb-2 flex flex-col gap-2">
              <div>
                <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-score-red-text">
                  Before
                </span>
                <p className="text-[13px] leading-relaxed text-muted line-through decoration-score-red-mid/40">
                  {rw.original}
                </p>
              </div>
              <div>
                <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-score-green-text">
                  After
                </span>
                <p className="text-[13px] leading-relaxed text-foreground">
                  {rw.improved}
                </p>
              </div>
            </div>
            <p className="border-t border-border-light pt-2 text-[11px] text-muted">
              {rw.reason}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
