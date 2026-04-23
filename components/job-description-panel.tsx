/**
 * Panel for entering the job description text.
 */

interface JobDescriptionPanelProps {
  value: string;
  onChange: (value: string) => void;
}

export default function JobDescriptionPanel({
  value,
  onChange,
}: JobDescriptionPanelProps) {
  return (
    <div className="flex flex-col gap-2.5 rounded-xl border border-border-light bg-surface p-3.5">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
        Job Description
      </span>
      <textarea
        className="h-[180px] resize-y rounded-lg border border-border-light bg-surface-2 px-3 py-2.5 text-[13px] leading-relaxed text-foreground outline-none placeholder:text-faint focus:border-border-md"
        placeholder="Paste the full job description here…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="text-right text-[11px] text-faint">
        {value.length.toLocaleString()} characters
      </span>
    </div>
  );
}
