"use client";

import { useEffect, useState } from "react";

interface NavbarProps {
  apiConfigured: boolean;
}

/**
 * Sticky top navigation bar with glass blur, brand mark, dark mode toggle,
 * and server-status indicator.
 */
export default function Navbar({ apiConfigured }: NavbarProps) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <nav className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border-light px-6 backdrop-blur-xl max-[480px]:px-3.5"
      style={{ background: "color-mix(in srgb, var(--bg) 80%, transparent)" }}
    >
      <div className="flex items-center gap-2.5">
        <div
          className="flex h-[30px] w-[30px] items-center justify-center rounded-lg"
          style={{ background: "linear-gradient(135deg, var(--cobalt), #4338ca)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)" }}
        >
          <svg className="h-[17px] w-[17px]" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        </div>
        <div>
          <div className="font-display text-[15.5px] font-bold leading-none tracking-tight">
            ATS Matcher
          </div>
          <div className="mt-0.5 text-[10.5px] font-medium uppercase tracking-[0.04em] text-faint">
            Resume × Job Description
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <div className="flex items-center gap-1.5 rounded-full border border-border-md bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted max-[360px]:px-2 max-[360px]:text-[11px]">
          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${apiConfigured ? "bg-score-green-mid" : "bg-faint"}`} />
          <span>{apiConfigured ? "Connected" : "Not configured"}</span>
        </div>
        <button
          onClick={toggleTheme}
          className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-lg border border-transparent bg-transparent text-fg2 transition-all hover:border-border-md hover:bg-surface-bright hover:text-foreground"
          title="Toggle theme"
        >
          {dark ? (
            <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
}
