/**
 * Sticky top navigation bar with the app logo and a server-status indicator.
 * The indicator shows green when the GROQ_API_KEY is configured server-side.
 */

interface NavbarProps {
  /** Whether the Groq API key is configured on the server. */
  apiConfigured: boolean;
}

export default function Navbar({ apiConfigured }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 flex h-[52px] items-center justify-between border-b border-border-light bg-surface px-6">
      <div className="flex items-center gap-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground">
          <svg
            className="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--bg)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        </div>
        <span className="text-sm font-semibold tracking-tight">
          ATS Matcher
        </span>
      </div>
      <div className="flex items-center gap-1.5 rounded-full border border-border-md bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            apiConfigured ? "bg-score-green-mid" : "bg-faint"
          }`}
        />
        <span>{apiConfigured ? "Connected" : "Not configured"}</span>
      </div>
    </nav>
  );
}
