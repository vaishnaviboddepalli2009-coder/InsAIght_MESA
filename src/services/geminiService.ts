import { GoogleGenAI, Type } from "@google/genai";
import { BusinessProfile, KPIProposal, Insight, POSData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function discoverKPIs(profile: BusinessProfile): Promise<KPIProposal[]> {
  const prompt = `
    Analyze this business profile and suggest 4 subjective, non-generic KPIs that would actually drive growth for this specific niche.
    
    Business Name: ${profile.name}
    Business Type: ${profile.type}
    Location: ${profile.location}
    Priority: ${profile.priority}
    Menu Context: ${profile.menuContent}
    
    Format the output as a JSON array of objects with keys: id, name, description, rationale, benchmark, unit.
    The rationale should explain why this KPI is better than a generic "Revenue" metric for this specific business.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              rationale: { type: Type.STRING },
              benchmark: { type: Type.STRING },
              unit: { type: Type.STRING },
            },
            required: ["id", "name", "description", "rationale", "benchmark", "unit"],
          },
        },
      },
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("KPI Discovery Error:", error);
    return [];
  }
}

export async function generateAdaptiveInsights(
  profile: BusinessProfile,
  kpis: KPIProposal[],
  data: POSData[]
): Promise<Insight[]> {
  const prompt = `
    Based on the business profile, identified subjective KPIs, and recent POS data, generate 3-4 actionable insights.
    
    Business: ${profile.name} (${profile.type})
    Priority: ${profile.priority}
    
    KPIs: ${JSON.stringify(kpis)}
    
    Data Summary: ${JSON.stringify(data.slice(-5))} (Sample of recent data)
    
    For each insight, provide:
    - kpiId: reference to which KPI it belongs to
    - title: short descriptive title
    - value: current performance value (numeric or string)
    - trend: 'up', 'down', or 'stable'
    - actionableStep: specific growth step to take
    - context: why this matters now
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              kpiId: { type: Type.STRING },
              title: { type: Type.STRING },
              value: { type: Type.STRING },
              trend: { type: Type.STRING, enum: ["up", "down", "stable"] },
              actionableStep: { type: Type.STRING },
              context: { type: Type.STRING },
            },
            required: ["id", "kpiId", "title", "value", "trend", "actionableStep", "context"],
          },
        },
      },
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Insight Generation Error:", error);
    return [];
  }
}
