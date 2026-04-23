"use client";

import { useState, useCallback } from "react";

interface PdfExtractState {
  /** Extracted plain text from the PDF. */
  text: string;
  /** Name of the uploaded file. */
  fileName: string;
  /** Human-readable info string (e.g. "1,200 chars · 2 pages"). */
  fileInfo: string;
  /** Whether extraction is currently in progress. */
  extracting: boolean;
  /** Error message if extraction failed. */
  error: string | null;
}

interface UsePdfExtractReturn extends PdfExtractState {
  /** Process a File object, sending it to the server for text extraction. */
  handleFile: (file: File) => Promise<void>;
  /** Clear the current file and reset state. */
  clearFile: () => void;
}

/**
 * Custom hook that uploads a PDF to /api/extract for server-side text
 * extraction via docutext. Keeps the same public interface as before
 * so no component changes are needed.
 *
 * Returns:
 *   Object with extraction state and control functions.
 */
export function usePdfExtract(): UsePdfExtractReturn {
  const [state, setState] = useState<PdfExtractState>({
    text: "",
    fileName: "",
    fileInfo: "",
    extracting: false,
    error: null,
  });

  const handleFile = useCallback(async (file: File) => {
    setState({
      text: "",
      fileName: file.name,
      fileInfo: "Extracting…",
      extracting: true,
      error: null,
    });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/extract", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setState((prev) => ({
          ...prev,
          fileInfo: data.error ?? "Could not extract — try Paste Text",
          extracting: false,
          error: data.error ?? "PDF extraction failed",
        }));
        return;
      }

      const { text, pages } = data as { text: string; pages: number };
      const charCount = text.length.toLocaleString();
      const pageLabel = pages === 1 ? "page" : "pages";

      setState({
        text,
        fileName: file.name,
        fileInfo: `${charCount} chars · ${pages} ${pageLabel}`,
        extracting: false,
        error: null,
      });
    } catch {
      setState((prev) => ({
        ...prev,
        fileInfo: "Could not extract — try Paste Text",
        extracting: false,
        error: "Network error during PDF extraction",
      }));
    }
  }, []);

  const clearFile = useCallback(() => {
    setState({
      text: "",
      fileName: "",
      fileInfo: "",
      extracting: false,
      error: null,
    });
  }, []);

  return { ...state, handleFile, clearFile };
}
