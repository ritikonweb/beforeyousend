import { GoogleGenAI, Type } from "@google/genai";

export async function POST(req) {
  try {
    const { subject, body } = await req.json();

    if (!subject && !body) {
      return new Response(JSON.stringify({ error: "Empty content" }), { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_API_KEY });
    
    // Priority List: Gemini 3 -> Flash Lite -> Flash
    const modelPriority = [
      'gemini-3-flash-preview',
      'gemini-2.5-flash-lite-latest',
      'gemini-2.5-flash-latest'
    ];

    const systemInstruction = `You are a High-Precision Email Auditor.

    CRITICAL INSTRUCTION:
    - You will see the marker [[ORIGINAL_TABLE_PLACEHOLDER]]. 
    - DO NOT REMOVE, CHANGE, OR REFORMAT THIS MARKER.
    - Leave it exactly where it is in the suggested_body.
    - Do not attempt to describe or recreate the table data.

    TASK:
    - Check for contextual typos (e.g., 'ear' vs 'Dear').
    - Check for professional tone.
    - Do not add a signature; we restore the original HTML signature automatically.

    OUTPUT:
    - Return valid JSON matching the schema.`;

    let lastError = null;
    
    // Failover Loop
    for (const modelName of modelPriority) {
      try {
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

        // If successful, return immediately
        return new Response(response.text, { 
          headers: { 
            "Content-Type": "application/json",
            "X-Model-Used": modelName 
          } 
        });
      } catch (err) {
        lastError = err;
        console.warn(`Model ${modelName} failed or exhausted. Trying next...`, err.message);
        // If it's a 429 (Quota) or 503 (Overloaded), continue to next model
        if (err.message.includes("429") || err.message.includes("503") || err.message.includes("exhausted")) {
          continue;
        }
        // For other errors, break and throw
        break;
      }
    }

    throw lastError || new Error("All models failed to respond.");

  } catch (err) {
    console.error("BYS Final API Error:", err);
    return new Response(JSON.stringify({ 
      error: "Audit failed", 
      details: err.message,
      suggestion: "Please try again in a few moments or use 'Send Anyway'."
    }), { status: 500 });
  }
}