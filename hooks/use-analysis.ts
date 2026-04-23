"use client";

import { useState, useCallback } from "react";
import type { AnalysisResult } from "@/types/analysis";

export interface TruncationInfo {
  resumeTruncated: boolean;
  jdTruncated: boolean;
  maxChars: number;
  resumeOriginalLength: number;
  jdOriginalLength: number;
}

interface UseAnalysisReturn {
  /** The analysis result, or null if not yet run. */
  result: AnalysisResult | null;
  /** Whether the analysis is currently in progress. */
  loading: boolean;
  /** Error message from the last run, or null. */
  error: string | null;
  /** Truncation details from the last run, or null. */
  truncation: TruncationInfo | null;
  /** Trigger analysis with the given inputs. */
  analyze: (jobDescription: string, resume: string) => Promise<void>;
  /** Clear results and error state. */
  reset: () => void;
}

/**
 * Custom hook that manages the fetch to /api/analyze, including
 * loading, error, and truncation state.
 *
 * Returns:
 *   Object with result, loading, error, truncation, analyze, and reset.
 */
export function useAnalysis(): UseAnalysisReturn {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [truncation, setTruncation] = useState<TruncationInfo | null>(null);

  const analyze = useCallback(
    async (jobDescription: string, resume: string) => {
      setLoading(true);
      setError(null);
      setResult(null);
      setTruncation(null);

      try {
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jobDescription, resume }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Something went wrong. Please try again.");
          return;
        }

        const { truncation: truncInfo, ...analysisData } = data;
        setResult(analysisData as AnalysisResult);
        if (truncInfo) {
          setTruncation(truncInfo as TruncationInfo);
        }
      } catch {
        setError("Network error. Please check your connection and try again.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setTruncation(null);
  }, []);

  return { result, loading, error, truncation, analyze, reset };
}
