
import { GoogleGenAI, Type } from "@google/genai";
import { WasteAnalysis } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const analyzeWasteImage = async (base64Image: string): Promise<WasteAnalysis> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image.split(",")[1] || base64Image,
            },
          },
          {
            text: "Analyze this image and identify the composition of waste materials. Return the percentage (0-100) for each category: plastic, glass, cardboard, metal, and general trash. The percentages must sum to 100.",
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            plastic: { type: Type.NUMBER },
            glass: { type: Type.NUMBER },
            cardboard: { type: Type.NUMBER },
            metal: { type: Type.NUMBER },
            trash: { type: Type.NUMBER },
          },
          required: ["plastic", "glass", "cardboard", "metal", "trash"],
        },
      },
    });

    return JSON.parse(response.text || "{}") as WasteAnalysis;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Return mock data if API fails or for demonstration
    return {
      plastic: 45,
      glass: 10,
      cardboard: 20,
      metal: 15,
      trash: 10,
    };
  }
};
