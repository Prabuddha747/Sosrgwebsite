import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const analyzeScript = async (scriptText: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the following script and provide a breakdown in JSON format. 
    Include: 
    1. Characters (name, description, age range)
    2. Locations (name, interior/exterior)
    3. Props needed
    4. Estimated budget category (Low, Mid, High)
    5. Key emotional beats.
    
    Script: ${scriptText}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          characters: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                ageRange: { type: Type.STRING }
              }
            }
          },
          locations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                type: { type: Type.STRING }
              }
            }
          },
          props: { type: Type.ARRAY, items: { type: Type.STRING } },
          budget: { type: Type.STRING },
          emotionalBeats: { type: Type.ARRAY, items: { type: Type.STRING } }
        }
      }
    }
  });
  
  return JSON.parse(response.text || "{}");
};

export const evaluateAudition = async (transcript: string, roleDescription: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Evaluate this audition performance transcript against the role description.
    Role: ${roleDescription}
    Performance: ${transcript}
    
    Provide:
    1. Clarity score (0-100)
    2. Emotional resonance score (0-100)
    3. Character fit score (0-100)
    4. Constructive feedback
    5. Recommendation (Strong Match, Potential, Not a Fit)`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          clarity: { type: Type.NUMBER },
          resonance: { type: Type.NUMBER },
          fit: { type: Type.NUMBER },
          feedback: { type: Type.STRING },
          recommendation: { type: Type.STRING }
        }
      }
    }
  });
  
  return JSON.parse(response.text || "{}");
};

export const generateCastingRoles = async (scriptBreakdown: any) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Based on this script breakdown, generate detailed casting roles.
    Breakdown: ${JSON.stringify(scriptBreakdown)}
    
    For each role, provide:
    1. Role Type (Lead, Supporting, etc.)
    2. Age Range
    3. Physical Attributes
    4. Emotional Tone
    5. Required Skills (Acting style, dance, etc.)
    6. Language Fluency`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            type: { type: Type.STRING },
            ageRange: { type: Type.STRING },
            attributes: { type: Type.STRING },
            tone: { type: Type.STRING },
            skills: { type: Type.ARRAY, items: { type: Type.STRING } },
            languages: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    }
  });
  
  return JSON.parse(response.text || "[]");
};

export const predictArtValue = async (artDetails: any) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Predict the market value of this art piece/talent based on current industry trends.
    Details: ${JSON.stringify(artDetails)}
    
    Provide:
    1. Estimated Value Range (in ₹)
    2. Suggested Base Price for Auction
    3. Market Demand Score (0-100)
    4. 3 Reasons for this valuation
    5. Recommended Buyer Segments`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          valueRange: { type: Type.STRING },
          suggestedBasePrice: { type: Type.NUMBER },
          demandScore: { type: Type.NUMBER },
          valuationReasons: { type: Type.ARRAY, items: { type: Type.STRING } },
          targetSegments: { type: Type.ARRAY, items: { type: Type.STRING } }
        }
      }
    }
  });
  
  return JSON.parse(response.text || "{}");
};
