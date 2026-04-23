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
  const [hasResume, setHasResume] = useState(false);
  const resumeTextRef = useRef("");
  const resultsRef = useRef<HTMLDivElement>(null);

  const { result, loading, error, truncation, analyze } = useAnalysis();
  const [formError, setFormError] = useState<string | null>(null);

  const handleResumeReady = useCallback((text: string) => {
    resumeTextRef.current = text;
    setHasResume(!!text.trim());
  }, []);

  const handleAnalyze = async () => {
    setFormError(null);
    const resume = resumeTextRef.current;

    if (!jd.trim()) {
      setFormError("Please paste a job description first.");
      return;
    }
    if (!resume.trim()) {
      setFormError(
        "No resume text detected. Try pasting your resume text directly using the Paste Text tab."
      );
      return;
    }

    await analyze(jd, resume);

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 100);
  };

  const displayError = formError || error;

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
        disabled={!jd.trim() && !hasResume}
        hasResults={!!result}
      />

      {displayError && (
        <div className="mt-2.5 rounded-lg border border-score-red-mid bg-score-red-bg px-3.5 py-2.5 text-[13px] text-score-red-text">
          {displayError}
        </div>
      )}

      {truncation && (truncation.resumeTruncated || truncation.jdTruncated) && (
        <div className="mt-2.5 rounded-lg border border-score-amber-mid bg-score-amber-bg px-3.5 py-2.5 text-[13px] text-score-amber-text">
          <span className="font-semibold">Partial analysis:</span>{" "}
          {truncation.resumeTruncated && truncation.jdTruncated
            ? `Both your resume (${truncation.resumeOriginalLength.toLocaleString()} chars) and job description (${truncation.jdOriginalLength.toLocaleString()} chars) exceeded the ${truncation.maxChars.toLocaleString()}-character limit and were trimmed.`
            : truncation.resumeTruncated
              ? `Your resume (${truncation.resumeOriginalLength.toLocaleString()} chars) exceeded the ${truncation.maxChars.toLocaleString()}-character limit and was trimmed. Some content at the end may not have been analyzed.`
              : `The job description (${truncation.jdOriginalLength.toLocaleString()} chars) exceeded the ${truncation.maxChars.toLocaleString()}-character limit and was trimmed.`}
        </div>
      )}

      <div ref={resultsRef}>
        {result && <ResultsDashboard result={result} />}
      </div>
    </>
  );
}
