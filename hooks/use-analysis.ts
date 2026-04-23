"use client";

import { useState, useCallback } from "react";
import type { AnalysisResult } from "@/types/analysis";

interface UseAnalysisReturn {
  /** The analysis result, or null if not yet run. */
  result: AnalysisResult | null;
  /** Whether the analysis is currently in progress. */
  loading: boolean;
  /** Error message from the last run, or null. */
  error: string | null;
  /** Trigger analysis with the given inputs. */
  analyze: (jobDescription: string, resume: string) => Promise<void>;
  /** Clear results and error state. */
  reset: () => void;
}

/**
 * Custom hook that manages the fetch to /api/analyze, including
 * loading and error state.
 *
 * Returns:
 *   Object with result, loading, error, analyze, and reset.
 */
export function useAnalysis(): UseAnalysisReturn {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(
    async (jobDescription: string, resume: string) => {
      setLoading(true);
      setError(null);
      setResult(null);

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

        setResult(data as AnalysisResult);
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
  }, []);

  return { result, loading, error, analyze, reset };
}
