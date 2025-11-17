import OpenAI from "openai";

// This is using Replit's AI Integrations service, which provides OpenAI-compatible API access without requiring your own OpenAI API key.
// Charges are billed to your Replit credits.
function getOpenAIClient(): OpenAI | null {
  if (!process.env.AI_INTEGRATIONS_OPENAI_BASE_URL || !process.env.AI_INTEGRATIONS_OPENAI_API_KEY) {
    console.warn("OpenAI integration not configured - AI summarization will be unavailable");
    return null;
  }
  
  return new OpenAI({
    baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
    apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY
  });
}

export async function summarizeResearchArticle(
  title: string,
  abstract: string
): Promise<{ summary: string; whyItMatters: string }> {
  const openai = getOpenAIClient();
  
  if (!openai) {
    return {
      summary: abstract.substring(0, 150) + "...",
      whyItMatters: "Full article available at source",
    };
  }
  
  try {
    const prompt = `You are a diabetes research expert. Analyze this research article and provide:
1. A concise one-sentence summary (max 150 characters)
2. A "why it matters" insight explaining the real-world significance (max 200 characters)

Article Title: ${title}

Abstract: ${abstract}

Respond in JSON format:
{
  "summary": "one sentence summary",
  "whyItMatters": "why this research matters"
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-5", // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      max_completion_tokens: 500,
    });

    const content = response.choices[0]?.message?.content || "{}";
    const parsed = JSON.parse(content);

    return {
      summary: parsed.summary || "Research summary unavailable",
      whyItMatters: parsed.whyItMatters || "Significance analysis unavailable",
    };
  } catch (error) {
    console.error("Error summarizing article:", error);
    return {
      summary: "AI summarization temporarily unavailable",
      whyItMatters: "Please refer to the full abstract for details",
    };
  }
}
