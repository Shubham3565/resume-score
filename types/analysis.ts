import { z } from "zod/v4";

export const TipSchema = z.object({
  type: z.enum(["warn", "ok", "info"]),
  text: z.string(),
});

export const AnalysisResultSchema = z.object({
  score: z.number().min(0).max(100),
  verdict: z.enum(["Strong Match", "Good Match", "Fair Match", "Weak Match"]),
  verdict_reason: z.string(),
  keywords_matched: z.array(z.string()),
  keywords_missing: z.array(z.string()),
  keywords_partial: z.array(z.string()),
  keywords_bonus: z.array(z.string()),
  skill_score: z.number().min(0).max(100),
  experience_score: z.number().min(0).max(100),
  education_score: z.number().min(0).max(100),
  keyword_density_score: z.number().min(0).max(100),
  total_keywords_in_jd: z.number().int(),
  total_keywords_matched: z.number().int(),
  tips: z.array(TipSchema),
  skills_gap: z.array(z.string()),
});

export const AnalyzeRequestSchema = z.object({
  jobDescription: z.string().min(1, "Job description is required"),
  resume: z.string().min(1, "Resume text is required"),
});

export type Tip = z.infer<typeof TipSchema>;
export type AnalysisResult = z.infer<typeof AnalysisResultSchema>;
export type AnalyzeRequest = z.infer<typeof AnalyzeRequestSchema>;

export type KeywordCategory = "matched" | "missing" | "partial" | "bonus";

export interface KeywordCategories {
  matched: string[];
  missing: string[];
  partial: string[];
  bonus: string[];
}
