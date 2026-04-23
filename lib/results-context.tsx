"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { AnalysisResult } from "@/types/analysis";

interface ResultsContextValue {
  result: AnalysisResult | null;
  setResult: (r: AnalysisResult | null) => void;
  resetToken: number;
  requestReset: () => void;
}

const ResultsContext = createContext<ResultsContextValue | null>(null);

/**
 * Provides analysis-result state to the component tree so that
 * the Navbar can read results and trigger resets across sibling
 * component boundaries.
 */
export function ResultsProvider({ children }: { children: ReactNode }) {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [resetToken, setResetToken] = useState(0);

  const requestReset = useCallback(() => {
    setResult(null);
    setResetToken((t) => t + 1);
  }, []);

  return (
    <ResultsContext.Provider value={{ result, setResult, resetToken, requestReset }}>
      {children}
    </ResultsContext.Provider>
  );
}

/**
 * Hook to access the shared results context.
 *
 * Raises:
 *   Error: If called outside of a ResultsProvider.
 */
export function useResultsContext(): ResultsContextValue {
  const ctx = useContext(ResultsContext);
  if (!ctx) throw new Error("useResultsContext must be used within ResultsProvider");
  return ctx;
}
