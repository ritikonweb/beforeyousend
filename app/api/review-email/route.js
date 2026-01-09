import { GoogleGenAI, Type } from "@google/genai";

export async function POST(req) {
  try {
    const { subject, body, mode } = await req.json();

    if (!subject && !body) {
      return new Response(JSON.stringify({ error: "Empty content" }), { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_API_KEY });
    
    const systemInstruction = `You are a High-Precision Email Auditor.

    SPECIAL INSTRUCTION ON PLACEHOLDERS:
    You may see markers like [[ORIGINAL_TABLE_PLACEHOLDER]]. 
    DO NOT REMOVE THEM. Keep them in your suggested output exactly where they are. 
    Do not try to invent the table content; just leave the marker.

    DO NOT include a signature (e.g. "Best regards, [Name]") in your suggested_body if the user didn't write a personalized one, as we restore the original HTML signature automatically.

    TASK:
    Analyze for contextual typos (e.g. 'ear' vs 'Dear') and professional tone.

    JSON SCHEMA:
    - issues_detected: { grammar_spelling: string, tone: string }
    - tone_score: string
    - suggested_body: string (The audited text preserving any [[PLACEHOLDERS]])`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
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
    console.error("Gemini API Error:", err);
    return new Response(JSON.stringify({ error: "Audit failed", details: err.message }), { status: 500 });
  }
}