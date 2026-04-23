import { NextRequest, NextResponse } from "next/server";

import { AnalyzeRequestSchema, AnalysisResultSchema } from "@/types/analysis";
import { analyzeMatch, MAX_INPUT_CHARS } from "@/lib/groq";

/**
 * POST /api/analyze
 *
 * Accepts { jobDescription, resume } in the request body, calls the Groq API
 * to analyze the match, validates the response, and returns typed JSON.
 *
 * Returns:
 *   200 with AnalysisResult on success.
 *   400 for invalid input.
 *   500 for Groq or parsing failures.
 *   503 if GROQ_API_KEY is not configured.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json(
      { error: "GROQ_API_KEY is not configured on the server." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body." },
      { status: 400 }
    );
  }

  const parsed = AnalyzeRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", details: parsed.error.issues },
      { status: 400 }
    );
  }

  const { jobDescription, resume } = parsed.data;

  const jdTruncated = jobDescription.length > MAX_INPUT_CHARS;
  const resumeTruncated = resume.length > MAX_INPUT_CHARS;

  try {
    const rawJson = await analyzeMatch(jobDescription, resume);
    const analysisData = JSON.parse(rawJson);
    const validated = AnalysisResultSchema.safeParse(analysisData);

    if (!validated.success) {
      return NextResponse.json(
        { error: "The AI returned an unexpected response format. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ...validated.data,
      truncation: {
        resumeTruncated,
        jdTruncated,
        maxChars: MAX_INPUT_CHARS,
        resumeOriginalLength: resume.length,
        jdOriginalLength: jobDescription.length,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";

    if (message.includes("401") || message.includes("authentication")) {
      return NextResponse.json(
        { error: "Invalid Groq API key. Please check your server configuration." },
        { status: 500 }
      );
    }
    if (message.includes("429") || message.includes("rate")) {
      return NextResponse.json(
        { error: "Rate limit reached. Please wait a moment and try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Analysis failed. Please try again." },
      { status: 500 }
    );
  }
}
