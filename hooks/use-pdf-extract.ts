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
  /** Process a File object, extracting text from the PDF. */
  handleFile: (file: File) => Promise<void>;
  /** Clear the current file and reset state. */
  clearFile: () => void;
}

/**
 * Configures the pdf.js worker with fallbacks for environments where
 * module workers are unsupported (e.g. iOS Safari).
 */
async function initPdfWorker(
  pdfjsLib: typeof import("pdfjs-dist")
): Promise<void> {
  try {
    const workerUrl = new URL(
      "pdfjs-dist/build/pdf.worker.min.mjs",
      import.meta.url
    ).toString();

    pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;
  } catch {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "";
  }
}

/**
 * Custom hook that wraps pdf.js to extract text from uploaded PDF files.
 * Includes a fallback for iOS Safari where module workers may not load.
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
      const pdfjsLib = await import("pdfjs-dist");
      await initPdfWorker(pdfjsLib);

      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;

      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        fullText +=
          content.items
            .map((item) => ("str" in item ? item.str : ""))
            .join(" ") + "\n";
      }

      const trimmed = fullText.trim();

      if (!trimmed) {
        setState((prev) => ({
          ...prev,
          fileInfo: "No text found in PDF — try Paste Text instead",
          extracting: false,
          error: "PDF contained no extractable text",
        }));
        return;
      }

      const charCount = trimmed.length.toLocaleString();
      const pageLabel = pdf.numPages === 1 ? "page" : "pages";

      setState({
        text: trimmed,
        fileName: file.name,
        fileInfo: `${charCount} chars · ${pdf.numPages} ${pageLabel}`,
        extracting: false,
        error: null,
      });
    } catch {
      setState((prev) => ({
        ...prev,
        fileInfo: "Could not extract — try Paste Text",
        extracting: false,
        error: "PDF extraction failed",
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
