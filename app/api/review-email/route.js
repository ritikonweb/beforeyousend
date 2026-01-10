import { GoogleGenAI, Type } from "@google/genai";

export async function POST(req) {
  try {
    const { subject, body } = await req.json();

    if (!subject && !body) {
      return new Response(JSON.stringify({ error: "Empty content" }), { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_API_KEY });
    
    // Primary stable model
    const modelName = 'gemini-3-flash-preview';

    const systemInstruction = `You are a Senior Corporate Email Auditor.

    CRITICAL RULES FOR STRUCTURE:
    - You will see [[ORIGINAL_TABLE_PLACEHOLDER]] in the input. 
    - DO NOT REMOVE, RENAME, OR ATTEMPT TO RECONSTRUCT THIS MARKER. 
    - Keep it in the exact same relative position in your suggested_body.
    - Do not add a signature (e.g., "Best regards, [Name]") if the user has a professional block already, as we re-inject the HTML signature automatically.

    CORE AUDIT TASKS:
    1. Fix all contextual typos (e.g., 'your' vs 'you're').
    2. Suggest improvements for professional clarity and tone.
    3. Ensure the result follows the provided JSON schema perfectly.`;

    const response = await ai.models.generateContent({
      model: modelName,
      contents: `Subject: ${subject}\nBody: ${body}`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            issues_detected: {
              type: Type.OBJECT,
              properties: {
                grammar_spelling: { type: Type.STRING },
                tone: { type: Type.STRING }
              }
            },
            tone_score: { type: Type.STRING },
            suggested_body: { type: Type.STRING }
          },
          required: ["issues_detected", "tone_score", "suggested_body"]
        }
      }
    });

    return new Response(response.text, { headers: { "Content-Type": "application/json" } });

  } catch (err) {
    console.error("Gemini 3 Audit Fault:", err);
    return new Response(JSON.stringify({ 
      error: "Audit Engine Failure", 
      details: err.message 
    }), { status: 500 });
  }
}