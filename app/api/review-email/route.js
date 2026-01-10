import { GoogleGenAI, Type } from "@google/genai";

export async function POST(req) {
  try {
    const { subject, body } = await req.json();

    if (!subject && !body) {
      return new Response(JSON.stringify({ error: "Empty content" }), { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_API_KEY });
    
    // Using your primary model as requested
    const modelName = 'gemini-3-flash-preview';

    const systemInstruction = `You are an Enterprise Email Auditor.

    CRITICAL: 
    - You will see [[ORIGINAL_TABLE_PLACEHOLDER]] in the text. 
    - DO NOT REMOVE, ALTER, OR EXPLAIN THIS MARKER. 
    - Simply leave it in the suggested_body in its original position.
    - Do not add a generic signature (e.g., "Regards, [Name]") as we restore the original HTML signature.

    TASK:
    1. Fix grammar and spelling errors.
    2. Audit for professional tone.
    3. Return structured JSON.`;

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
    console.error("Gemini 3 Error:", err);
    return new Response(JSON.stringify({ 
      error: "Audit failed", 
      details: err.message 
    }), { status: 500 });
  }
}