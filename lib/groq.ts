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
  return `You are an ATS expert. Analyze the match between the job description and resume.

Return ONLY a valid JSON object — no markdown, no backticks. Schema:
{
  "score": <0-100>,
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
  "total_keywords_in_jd": <integer>,
  "total_keywords_matched": <integer>,
  "tips": [{ "type": "<warn|ok|info>", "text": "<specific actionable tip>" }],
  "skills_gap": ["<missing skill>"]
}

Be accurate and honest — not generous. Give 5-7 tips.

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
