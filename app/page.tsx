import AnalysisForm from "@/components/analysis-form";

/**
 * Home page — server component shell that renders the hero heading
 * and the client-side AnalysisForm.
 */
export default function Home() {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-6 pb-10 pt-5 max-[480px]:px-3.5 max-[480px]:pt-4">
      <div className="mb-4">
        <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-sky">
          ATS Match Report
        </div>
        <h1 className="font-display text-[1.75rem] font-bold leading-tight tracking-tight max-[480px]:text-[1.35rem]">
          Tailor your resume in one screen.
        </h1>
        <p className="mt-1 max-w-[560px] text-[13px] text-muted">
          Paste a job description, drop your resume. See exactly where you
          match, what&apos;s missing, and how to fix it.
        </p>
      </div>
      <AnalysisForm />
    </main>
  );
}
