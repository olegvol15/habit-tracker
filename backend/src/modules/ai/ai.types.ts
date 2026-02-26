export type AIResponse = {
  summary: string
  patterns: Array<{
    title: string
    evidence: string
    impact: "low"|"medium"|"high"
  }>
  recommendations: Array<{ action: string; rationale: string; difficulty: "easy"|"medium"|"hard" }>
  confidence: "low"|"medium"|"high"
  markdown?: string
  warnings?: string[]
}