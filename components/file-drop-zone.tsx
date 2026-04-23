"use client";

import { useCallback, useRef, useState } from "react";

interface FileDropZoneProps {
  /** Called when a valid PDF file is selected or dropped. */
  onFile: (file: File) => void;
}

/**
 * Drag-and-drop zone for PDF file uploads with a hidden file input fallback.
 */
export default function FileDropZone({ onFile }: FileDropZoneProps) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file?.type === "application/pdf") {
        onFile(file);
      }
    },
    [onFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) onFile(file);
    },
    [onFile]
  );

  return (
    <div
      className={`relative cursor-pointer rounded-lg border-[1.5px] border-dashed bg-surface-2 px-3 py-6 text-center transition-colors ${
        dragOver
          ? "border-faint bg-surface"
          : "border-border-md hover:border-faint hover:bg-surface"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleChange}
      />
      <div className="mx-auto mb-2 flex h-[30px] w-[30px] items-center justify-center rounded-lg border border-border-light bg-surface">
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--text2)"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      </div>
      <p className="text-[13px] text-muted">
        <span className="font-medium text-foreground">Drop PDF here</span> or
        click to browse
      </p>
    </div>
  );
}
