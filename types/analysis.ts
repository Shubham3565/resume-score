import { z } from "zod/v4";

export const TipSchema = z.object({
  type: z.enum(["warn", "ok", "info"]),
  text: z.string(),
});

export const RedFlagSchema = z.object({
  type: z.enum(["critical", "warning"]),
  label: z.string(),
  detail: z.string(),
});

export const RewriteSchema = z.object({
  original: z.string(),
  improved: z.string(),
  reason: z.string(),
});

export const SectionCheckSchema = z.object({
  summary: z.boolean(),
  experience: z.boolean(),
  education: z.boolean(),
  skills: z.boolean(),
  projects: z.boolean(),
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
  impact_score: z.number().min(0).max(100),
  tailoring_score: z.number().min(0).max(100),
  title_alignment_score: z.number().min(0).max(100),
  total_keywords_in_jd: z.number().int(),
  total_keywords_matched: z.number().int(),
  tips: z.array(TipSchema),
  skills_gap: z.array(z.string()),
  red_flags: z.array(RedFlagSchema),
  section_check: SectionCheckSchema,
  rewrites: z.array(RewriteSchema),
  strong_points: z.array(z.string()),
});

export const AnalyzeRequestSchema = z.object({
  jobDescription: z.string().min(1, "Job description is required"),
  resume: z.string().min(1, "Resume text is required"),
});

export type Tip = z.infer<typeof TipSchema>;
export type RedFlag = z.infer<typeof RedFlagSchema>;
export type Rewrite = z.infer<typeof RewriteSchema>;
export type SectionCheck = z.infer<typeof SectionCheckSchema>;
export type AnalysisResult = z.infer<typeof AnalysisResultSchema>;
export type AnalyzeRequest = z.infer<typeof AnalyzeRequestSchema>;

export type KeywordCategory = "matched" | "missing" | "partial" | "bonus";

export interface KeywordCategories {
  matched: string[];
  missing: string[];
  partial: string[];
  bonus: string[];
}
