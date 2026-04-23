"use client";

import { useState } from "react";

import FileDropZone from "@/components/file-drop-zone";
import { usePdfExtract } from "@/hooks/use-pdf-extract";

type ResumeTab = "upload" | "paste";

interface ResumePanelProps {
  /** Current pasted resume text (controlled by parent). */
  pasteValue: string;
  /** Called when pasted text changes. */
  onPasteChange: (value: string) => void;
  /** Called whenever the effective resume text changes (from either tab). */
  onResumeReady: (text: string) => void;
}

/**
 * Panel for providing the resume via PDF upload or text paste.
 * Manages its own tab state and PDF extraction, but reports the final
 * resume text upward via onResumeReady.
 */
export default function ResumePanel({
  pasteValue,
  onPasteChange,
  onResumeReady,
}: ResumePanelProps) {
  const [activeTab, setActiveTab] = useState<ResumeTab>("upload");
  const pdf = usePdfExtract();

  const handleTabSwitch = (tab: ResumeTab) => {
    setActiveTab(tab);
    if (tab === "upload") {
      onResumeReady(pdf.text);
    } else {
      onResumeReady(pasteValue);
    }
  };

  const handleFile = async (file: File) => {
    await pdf.handleFile(file);
  };

  /* Sync extracted PDF text upward once extraction completes */
  const prevPdfText = pdf.text;
  if (activeTab === "upload" && prevPdfText) {
    onResumeReady(prevPdfText);
  }

  return (
    <div className="flex flex-col gap-2.5 rounded-xl border border-border-light bg-surface p-3.5">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
        Your Resume
      </span>

      {/* Tab switcher */}
      <div className="flex gap-px rounded-lg border border-border-light bg-surface-2 p-0.5">
        {(["upload", "paste"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabSwitch(tab)}
            className={`flex-1 rounded-md px-2 py-1.5 text-xs font-medium transition-all ${
              activeTab === tab
                ? "bg-surface text-foreground shadow-sm"
                : "text-muted hover:text-foreground"
            }`}
          >
            {tab === "upload" ? "Upload PDF" : "Paste Text"}
          </button>
        ))}
      </div>

      {/* Upload tab */}
      {activeTab === "upload" && (
        <div className="flex flex-col gap-2">
          {!pdf.fileName ? (
            <FileDropZone onFile={handleFile} />
          ) : (
            <div>
              <div className="flex items-center gap-2 rounded-lg bg-score-green-bg px-3 py-2.5">
                <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[5px] bg-score-green-mid">
                  <svg
                    className="h-[11px] w-[11px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-xs font-medium text-score-green-text">
                    {pdf.fileName}
                  </div>
                  <div className="text-[11px] text-score-green-text/70">
                    {pdf.fileInfo}
                  </div>
                </div>
                <button
                  onClick={pdf.clearFile}
                  className="text-sm text-score-green-text/55 hover:text-score-green-text"
                >
                  ✕
                </button>
              </div>
              {pdf.extracting && (
                <div className="mt-1 h-[3px] overflow-hidden rounded-sm bg-surface-2">
                  <div
                    className="h-full rounded-sm bg-score-blue-mid"
                    style={{ animation: "pulse-bar 1.2s ease-in-out infinite" }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Paste tab */}
      {activeTab === "paste" && (
        <div>
          <textarea
            className="h-[180px] w-full resize-y rounded-lg border border-border-light bg-surface-2 px-3 py-2.5 text-[13px] leading-relaxed text-foreground outline-none placeholder:text-faint focus:border-border-md"
            placeholder="Paste your resume text here…"
            value={pasteValue}
            onChange={(e) => {
              onPasteChange(e.target.value);
              onResumeReady(e.target.value);
            }}
          />
          <span className="block text-right text-[11px] text-faint">
            {pasteValue.length.toLocaleString()} characters
          </span>
        </div>
      )}
    </div>
  );
}
