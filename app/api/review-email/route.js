
import { GoogleGenAI, Type } from "@google/genai";

export async function POST(req) {
  try {
    const { subject, body, mode } = await req.json();

    if (!subject && !body) {
      return new Response(JSON.stringify({ error: "Empty content" }), { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_API_KEY });
    
    const isGrammarOnly = mode === 'grammar_only';
    
    const systemInstruction = `You are a High-Precision Email Auditor.
    
    STRICT RULES ON SIGNATURES:
    If the email contains a signature (e.g., "Best regards, [Name]", or contact details at the bottom), DO NOT touch it. Keep the signature exactly as it is in the output.
    
    TASK:
    ${isGrammarOnly ? 
      "GRAMMAR-ONLY MODE: The user has already applied AI suggestions and made final tweaks. DO NOT rewrite the content. ONLY fix clear spelling mistakes and objective grammar errors. Maintain the user's specific wording and tone exactly." : 
      "FULL AUDIT MODE: Catch contextual typos (e.g., 'ear' vs 'Dear') and professional tone issues. Provide an improved draft."}
    
    TONE PRESERVATION:
    Always respect the user's intended tone. If it's direct and formal, don't make it overly friendly. If it's warm, don't make it cold.
    
    JSON SCHEMA:
    - issues_detected: { grammar_spelling: string, tone: string }
    - tone_score: Single word (e.g., Formal, Direct, Warm, Professional)
    - suggested_body: The finalized email body (including original signature).`;

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
    console.error("Backend Error:", err);
    return new Response(JSON.stringify({ error: "Audit failed" }), { status: 500 });
  }
}
