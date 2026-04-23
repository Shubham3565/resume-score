import Groq from "groq-sdk";

export const MAX_INPUT_CHARS = 12000;

let _client: Groq | null = null;

/**
 * Returns a singleton Groq SDK client.
 *
 * Throws:
 *   Error: If GROQ_API_KEY is not set.
 */
function getClient(): Groq {
  if (!_client) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error("GROQ_API_KEY environment variable is not configured");
    }
    _client = new Groq({ apiKey });
  }
  return _client;
}

/**
 * Builds the analysis prompt from job description and resume text.
 *
 * Args:
 *   jobDescription: The full job description text.
 *   resume: The full resume text.
 *
 * Returns:
 *   Formatted prompt string for the LLM.
 */
function buildPrompt(jobDescription: string, resume: string): string {
  return `You are an elite recruiter and ATS (Applicant Tracking System) expert performing a thorough evaluation of a candidate's resume against a job description.

KEYWORD MATCHING RULES:
- Before listing any keyword as "missing" or any skill in "skills_gap", you MUST search the ENTIRE resume text for that word or its synonyms/variations (e.g. "Python", "python", "PYTHON", "Python3" all count as the same skill).
- A keyword is "matched" if it appears ANYWHERE in the resume — skills sections, project descriptions, work experience, or education.
- A keyword is "partial" only if a closely related but not exact term appears (e.g. JD says "Kubernetes" but resume says "Docker").
- A keyword is "missing" ONLY if neither the exact term nor any reasonable synonym/variation appears anywhere in the resume.
- "skills_gap" must ONLY contain skills genuinely absent from the entire resume. Double-check each one.
- Do NOT hallucinate missing skills that are actually present.

EVALUATION DIMENSIONS:
1. **skill_score** (0-100): How well do the candidate's technical/functional skills match the JD requirements?
2. **experience_score** (0-100): Does the seniority level, years of experience, and domain relevance match?
3. **education_score** (0-100): Does the education background meet JD requirements?
4. **keyword_density_score** (0-100): What percentage of JD keywords appear in the resume?
5. **impact_score** (0-100): Does the resume quantify achievements with numbers, metrics, percentages, or measurable outcomes? (e.g. "Reduced latency by 40%" scores high; "Worked on performance" scores low)
6. **tailoring_score** (0-100): How customized is this resume for THIS specific job? Does it mirror the JD language, reference similar goals, or feel like a generic resume?
7. **title_alignment_score** (0-100): How well do the candidate's previous job titles align with the target role?

RED FLAGS — Identify any of these if present:
- Job hopping (multiple roles < 1 year without explanation)
- Employment gaps
- Title demotions (going from senior to junior roles)
- Overqualification or severe underqualification
- Missing critical sections (no skills, no experience)
- Buzzword stuffing without substance
Each red flag should have type "critical" (dealbreaker) or "warning" (concern but not disqualifying).

SECTION COMPLETENESS — Check whether the resume contains these sections:
- summary (professional summary/objective)
- experience (work history)
- education
- skills (explicit skills list)
- projects (personal/professional projects)

REWRITE SUGGESTIONS — Find 2-3 weak bullet points or phrases in the resume and rewrite them to be stronger. Each should include:
- "original": the weak text from the resume
- "improved": a stronger version with action verbs and quantified impact
- "reason": why the rewrite is better

STRONG POINTS — List 3-5 things the resume does well for this role.

Return ONLY a valid JSON object — no markdown, no backticks. Schema:
{
  "score": <0-100 overall ATS match score>,
  "verdict": "<Strong Match|Good Match|Fair Match|Weak Match>",
  "verdict_reason": "<1 sentence>",
  "keywords_matched": ["..."],
  "keywords_missing": ["..."],
  "keywords_partial": ["..."],
  "keywords_bonus": ["..."],
  "skill_score": <0-100>,
  "experience_score": <0-100>,
  "education_score": <0-100>,
  "keyword_density_score": <0-100>,
  "impact_score": <0-100>,
  "tailoring_score": <0-100>,
  "title_alignment_score": <0-100>,
  "total_keywords_in_jd": <integer>,
  "total_keywords_matched": <integer>,
  "tips": [{ "type": "<warn|ok|info>", "text": "<specific actionable tip>" }],
  "skills_gap": ["..."],
  "red_flags": [{ "type": "<critical|warning>", "label": "<short label>", "detail": "<explanation>" }],
  "section_check": { "summary": <bool>, "experience": <bool>, "education": <bool>, "skills": <bool>, "projects": <bool> },
  "rewrites": [{ "original": "<weak text from resume>", "improved": "<stronger version>", "reason": "<why this is better>" }],
  "strong_points": ["<what the resume does well>"]
}

Be strict, accurate, and honest. Give 5-7 tips. If there are no red flags, return an empty array.

JOB DESCRIPTION:
${jobDescription.slice(0, MAX_INPUT_CHARS)}

RESUME:
${resume.slice(0, MAX_INPUT_CHARS)}`;
}

/**
 * Calls the Groq API to analyze a resume against a job description.
 *
 * Args:
 *   jobDescription: Job description text.
 *   resume: Resume text.
 *
 * Returns:
 *   Raw JSON string from the model response.
 *
 * Throws:
 *   Error: On API failure or missing configuration.
 */
export async function analyzeMatch(
  jobDescription: string,
  resume: string
): Promise<string> {
  const client = getClient();
  const prompt = buildPrompt(jobDescription, resume);

  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
    response_format: { type: "json_object" },
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Empty response from Groq API");
  }

  return content;
}
