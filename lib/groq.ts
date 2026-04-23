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

EVALUATION DIMENSIONS (use these specific rubrics — do NOT default to safe middle numbers):

1. **skill_score** (0-100): How well do the candidate's technical/functional skills match the JD requirements?
   - 90-100: All or nearly all required skills present
   - 70-89: Most required skills present, missing a few
   - 50-69: About half the required skills present
   - Below 50: Major skill gaps

2. **experience_score** (0-100): Does the seniority level, years of experience, and domain relevance match?
   - 90-100: Years and seniority match exactly, same domain
   - 70-89: Close match in seniority, adjacent domain
   - 50-69: Some relevant experience but different level or domain
   - Below 50: Significant mismatch in seniority or experience

3. **education_score** (0-100): Score based on how well the resume education meets JD education requirements. Use this rubric strictly:
   - 95-100: Resume degree EXCEEDS JD requirement (e.g. JD asks Bachelor's, resume has Master's/PhD in same field)
   - 90-95: Resume degree EXACTLY matches JD requirement (same level + same or closely related field)
   - 75-89: Resume has the right degree level but in a somewhat different field
   - 60-74: Resume has a lower degree than required but in the right field
   - 40-59: Resume education is partially relevant
   - Below 40: Education doesn't match at all
   - If JD does NOT mention specific education requirements, give 85-90 if the resume has any relevant degree

4. **keyword_density_score** (0-100): What percentage of JD keywords appear in the resume? (matched_count / total_jd_keywords * 100)

5. **impact_score** (0-100): Does the resume quantify achievements with numbers, metrics, percentages, or measurable outcomes?
   - 90-100: Most bullet points have specific metrics (e.g. "Reduced latency by 40%", "Managed $2M budget")
   - 70-89: Some quantified achievements mixed with vague ones
   - 50-69: Mostly vague descriptions with rare metrics
   - Below 50: No measurable outcomes, uses weak phrases like "worked on", "helped with"

6. **tailoring_score** (0-100): How customized is this resume for THIS specific job? Does it mirror the JD language, reference similar goals, or feel like a generic resume?
   - 90-100: Summary and bullets directly mirror JD terminology and priorities
   - 70-89: Some JD-specific language but partially generic
   - Below 70: Generic resume not customized for this role

7. **title_alignment_score** (0-100): How well do the candidate's previous job titles align with the target role?
   - 90-100: Previous titles are the same or very similar to the target role
   - 70-89: Related titles at a similar level
   - 50-69: Tangentially related titles or different seniority level
   - Below 50: Completely different career track

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
