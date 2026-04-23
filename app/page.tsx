import AnalysisForm from "@/components/analysis-form";

/**
 * Home page — server component shell that renders the hero heading
 * and the client-side AnalysisForm.
 */
export default function Home() {
  return (
    <main className="mx-auto w-full max-w-[980px] px-6 pb-18 pt-8">
      <div className="mb-6">
        <h1 className="text-[26px] font-bold tracking-tight">
          ATS Resume Matcher
        </h1>
        <p className="mt-1 text-sm text-muted">
          Upload your resume and paste a job description to get an AI-powered
          match score.
        </p>
      </div>
      <AnalysisForm />
    </main>
  );
}
