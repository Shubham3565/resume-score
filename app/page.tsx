import AnalysisForm from "@/components/analysis-form";

/**
 * Home page — server component shell that renders the hero heading
 * and the client-side AnalysisForm.
 */
export default function Home() {
  return (
    <main className="mx-auto w-full max-w-[980px] px-6 pb-18 pt-8 max-[480px]:px-3.5 max-[480px]:pt-5 max-[480px]:pb-10">
      <div className="mb-6 max-[480px]:mb-4">
        <h1 className="text-[26px] font-bold tracking-tight max-[480px]:text-[22px]">
          ATS Resume Matcher
        </h1>
        <p className="mt-1 text-sm text-muted max-[480px]:text-[13px]">
          Upload your resume and paste a job description to get an AI-powered
          match score.
        </p>
      </div>
      <AnalysisForm />
    </main>
  );
}
