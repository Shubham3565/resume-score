/**
 * Card-style analyze bar with icon tile, contextual text, and gradient CTA.
 */

interface AnalyzeButtonProps {
  onClick: () => void;
  loading: boolean;
  disabled?: boolean;
  hasResults?: boolean;
}

export default function AnalyzeButton({
  onClick,
  loading,
  disabled,
  hasResults,
}: AnalyzeButtonProps) {
  const ready = !disabled && !loading;

  const title = loading
    ? "Analyzing…"
    : hasResults
      ? "Analysis complete"
      : ready
        ? "Ready to analyze"
        : "Add a job description and resume to begin";

  const subtitle = loading
    ? "Parsing resume, extracting keywords, scoring alignment."
    : hasResults
      ? "Rerun anytime after editing your resume or job description."
      : "Results update below — no page reload required.";

  return (
    <div
      className={`relative my-3.5 flex items-center gap-3 overflow-hidden rounded-lg border border-border-light bg-surface px-4 py-3.5 transition-all max-[480px]:flex-col max-[480px]:gap-2.5 max-[480px]:px-3.5 ${ready ? "shadow-[var(--shadow-hover)]" : ""}`}
    >
      {ready && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(circle at 10% 50%, rgba(99,102,241,0.06), transparent 60%)" }}
        />
      )}
      <div className="flex flex-1 items-center gap-3 max-[480px]:w-full">
        <div
          className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-lg"
          style={{ background: "color-mix(in srgb, var(--sky) 12%, transparent)", color: "var(--sky)" }}
        >
          <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </div>
        <div className="min-w-0">
          <div className="text-[13.5px] font-semibold text-foreground">{title}</div>
          <div className="text-[11.5px] text-muted">{subtitle}</div>
        </div>
      </div>
      <button
        onClick={onClick}
        disabled={loading || disabled}
        className="relative z-10 inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_1px_2px_rgba(15,23,42,0.2),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all hover:-translate-y-px hover:shadow-[0_4px_12px_-2px_rgba(67,56,202,0.35)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 max-[480px]:w-full max-[480px]:justify-center"
        style={{ background: "linear-gradient(135deg, var(--navy) 0%, #07006c 100%)" }}
      >
        {loading && (
          <span
            className="h-[14px] w-[14px] rounded-full border-2 border-white/25 border-t-white"
            style={{ animation: "spin 0.7s linear infinite" }}
          />
        )}
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          {hasResults ? (
            <><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></>
          ) : (
            <polygon points="5 3 19 12 5 21 5 3" />
          )}
        </svg>
        <span>{loading ? "Analyzing…" : hasResults ? "Re-analyze" : "Analyze match"}</span>
      </button>
    </div>
  );
}
