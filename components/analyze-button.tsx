/**
 * Primary CTA button that triggers the ATS analysis.
 * Shows a spinner when loading.
 */

interface AnalyzeButtonProps {
  onClick: () => void;
  loading: boolean;
  disabled?: boolean;
}

export default function AnalyzeButton({
  onClick,
  loading,
  disabled,
}: AnalyzeButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-35"
    >
      {loading && (
        <span
          className="h-[15px] w-[15px] rounded-full border-2 border-white/25 border-t-white"
          style={{ animation: "spin 0.7s linear infinite" }}
        />
      )}
      <span>{loading ? "Analyzing…" : "Analyze Match"}</span>
    </button>
  );
}
