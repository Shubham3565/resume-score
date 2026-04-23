"use client";

import { useState, useRef, useCallback } from "react";

import JobDescriptionPanel from "@/components/job-description-panel";
import ResumePanel from "@/components/resume-panel";
import AnalyzeButton from "@/components/analyze-button";
import ResultsDashboard from "@/components/results/results-dashboard";
import { useAnalysis } from "@/hooks/use-analysis";

/**
 * Top-level client component that orchestrates all interactive state:
 * job description text, resume text, analysis trigger, and results display.
 */
export default function AnalysisForm() {
  const [jd, setJd] = useState("");
  const [pasteResume, setPasteResume] = useState("");
  const resumeTextRef = useRef("");
  const resultsRef = useRef<HTMLDivElement>(null);

  const { result, loading, error, analyze } = useAnalysis();

  const handleResumeReady = useCallback((text: string) => {
    resumeTextRef.current = text;
  }, []);

  const handleAnalyze = async () => {
    const resume = resumeTextRef.current;

    if (!jd.trim()) return;
    if (!resume.trim()) return;

    await analyze(jd, resume);

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 100);
  };

  return (
    <>
      <div className="mb-3 grid grid-cols-2 gap-3 max-[620px]:grid-cols-1 max-[480px]:gap-2.5">
        <JobDescriptionPanel value={jd} onChange={setJd} />
        <ResumePanel
          pasteValue={pasteResume}
          onPasteChange={setPasteResume}
          onResumeReady={handleResumeReady}
        />
      </div>

      <AnalyzeButton
        onClick={handleAnalyze}
        loading={loading}
        disabled={!jd.trim()}
      />

      {error && (
        <div className="mb-2.5 rounded-lg border border-score-red-mid bg-score-red-bg px-3.5 py-2.5 text-[13px] text-score-red-text">
          {error}
        </div>
      )}

      <div ref={resultsRef}>
        {result && <ResultsDashboard result={result} />}
      </div>
    </>
  );
}
