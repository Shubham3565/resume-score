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
  return `You are an ATS (Applicant Tracking System) expert. Carefully analyze how well the RESUME matches the JOB DESCRIPTION.

CRITICAL RULES:
- Before listing any keyword as "missing" or any skill in "skills_gap", you MUST search the ENTIRE resume text for that word or its synonyms/variations (e.g. "Python", "python", "PYTHON", "Python3" all count as the same skill).
- A keyword is "matched" if it appears ANYWHERE in the resume, even once — in skills sections, project descriptions, work experience, or education.
- A keyword is "partial" only if a closely related but not exact term appears (e.g. JD says "Kubernetes" but resume says "Docker" or "containerization").
- A keyword is "missing" ONLY if neither the exact term nor any reasonable synonym/variation appears anywhere in the resume.
- "skills_gap" must ONLY contain skills that are required in the JD and genuinely do NOT appear anywhere in the resume. Double-check each one.
- "keywords_bonus" are skills in the resume that are relevant but not explicitly in the JD.

Return ONLY a valid JSON object — no markdown, no backticks. Schema:
{
  "score": <0-100>,
  "verdict": "<Strong Match|Good Match|Fair Match|Weak Match>",
  "verdict_reason": "<1 sentence explaining the overall match>",
  "keywords_matched": ["<keywords from JD found in resume>"],
  "keywords_missing": ["<keywords from JD NOT found in resume — verify each one>"],
  "keywords_partial": ["<keywords with related but not exact matches>"],
  "keywords_bonus": ["<relevant resume skills not explicitly in JD>"],
  "skill_score": <0-100>,
  "experience_score": <0-100>,
  "education_score": <0-100>,
  "keyword_density_score": <0-100>,
  "total_keywords_in_jd": <integer>,
  "total_keywords_matched": <integer>,
  "tips": [{ "type": "<warn|ok|info>", "text": "<specific actionable tip>" }],
  "skills_gap": ["<skills required in JD but truly absent from the entire resume>"]
}

Be accurate and honest — not generous. Give 5-7 tips. Do NOT hallucinate missing skills that are actually present in the resume.

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
