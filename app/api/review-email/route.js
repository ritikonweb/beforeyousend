
import { GoogleGenAI, Type } from "@google/genai";

export async function POST(req) {
  try {
    const { subject, body } = await req.json();

    if (!subject && !body) {
      return new Response(JSON.stringify({ error: "Empty content" }), { status: 400 });
    }

    // Initialize the AI with your environment variable
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Subject: ${subject}\nBody: ${body}`,
      config: {
        systemInstruction: `You are a Professional Corporate Communication Safety Assistant. 
        
        CRITICAL TASK: Catch "Contextual Typos". These are valid English words used in the wrong place. 
        Example: Starting an email with "ear [Name]" instead of "Dear [Name]". 
        Example: Using "form" instead of "from".
        
        YOUR GOAL:
        1. Fix all grammar and spelling (including contextual typos).
        2. Detect harsh or passive-aggressive tones.
        3. Ensure call-to-actions and timelines are clear.
        
        STRICT RULES:
        - Do not change the original intent.
        - If an issue is not present, return "Not detected".
        - Return ONLY valid JSON.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            issues_detected: {
              type: Type.OBJECT,
              properties: {
                grammar_spelling: { type: Type.STRING, description: "Must catch contextual typos like 'ear' instead of 'Dear'." },
                tone: { type: Type.STRING },
                action_clarity: { type: Type.STRING },
                timeline: { type: Type.STRING }
              },
              required: ["grammar_spelling", "tone"]
            },
            tone_score: { type: Type.STRING, description: "Harsh, Neutral, or Professional" },
            suggested_subject: { type: Type.STRING },
            suggested_body: { type: Type.STRING }
          },
          required: ["issues_detected", "tone_score", "suggested_body"]
        }
      }
    });

    return new Response(response.text, {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    console.error("API Error:", err);
    return new Response(JSON.stringify({ error: "Audit failed" }), { status: 500 });
  }
}
