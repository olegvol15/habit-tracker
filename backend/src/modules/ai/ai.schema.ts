import {z} from "zod";

export const aiSchema = z.object({
  summary: z.string(),
  patterns: z.array(z.object({ title: z.string(), evidence: z.string(), impact: z.enum(["low", "medium", "high"]) })),
  recommendations: z.array(z.object({ action: z.string(), rationale: z.string(), difficulty: z.enum(["easy", "medium", "hard"]) })),
  confidence: z.enum(["low", "medium", "high"]),
  markdown: z.string().optional(),
  warnings: z.array(z.string())
});