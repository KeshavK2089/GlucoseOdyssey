import { z } from "zod";

// Simulator Schemas
export const simulatorParametersSchema = z.object({
  weight: z.number().min(20).max(300),
  carbIntake: z.number().min(0).max(500),
  insulinSensitivityFactor: z.number().min(10).max(200),
  basalRate: z.number().min(0).max(10),
  targetGlucose: z.number().min(70).max(180),
  correctionFactor: z.number().min(10).max(100),
});

export const scenarioSchema = z.object({
  type: z.enum(['exercise', 'meal', 'stress', 'missed_bolus', 'normal']),
  intensity: z.number().min(0).max(1),
});

export const simulationDataPointSchema = z.object({
  time: z.number(),
  glucose: z.number(),
  insulin: z.number(),
  carbs: z.number().optional(),
});

export const simulationResultSchema = z.object({
  id: z.string(),
  parameters: simulatorParametersSchema,
  scenario: scenarioSchema,
  dataPoints: z.array(simulationDataPointSchema),
  algorithmLogs: z.array(z.string()),
  createdAt: z.string(),
});

// Research Article Schemas
export const researchArticleSchema = z.object({
  id: z.string(),
  title: z.string(),
  authors: z.array(z.string()),
  source: z.string(),
  pubDate: z.string(),
  abstract: z.string(),
  summary: z.string(),
  whyItMatters: z.string(),
  url: z.string().url(),
  topics: z.array(z.string()),
});

export const researchFilterSchema = z.object({
  topics: z.array(z.string()).optional(),
  dateRange: z.object({
    from: z.string(),
    to: z.string(),
  }).optional(),
  searchQuery: z.string().optional(),
});

// Type exports
export type SimulatorParameters = z.infer<typeof simulatorParametersSchema>;
export type Scenario = z.infer<typeof scenarioSchema>;
export type SimulationDataPoint = z.infer<typeof simulationDataPointSchema>;
export type SimulationResult = z.infer<typeof simulationResultSchema>;
export type ResearchArticle = z.infer<typeof researchArticleSchema>;
export type ResearchFilter = z.infer<typeof researchFilterSchema>;

// Insert schemas (for API validation)
export const insertSimulatorParametersSchema = simulatorParametersSchema;
export const insertResearchFilterSchema = researchFilterSchema;

export type InsertSimulatorParameters = z.infer<typeof insertSimulatorParametersSchema>;
export type InsertResearchFilter = z.infer<typeof insertResearchFilterSchema>;
