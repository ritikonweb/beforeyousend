export async function GET() {
  return new Response(
    JSON.stringify({
      status: "API is live",
      note: "Use POST method"
    }),
    {
      headers: { "Content-Type": "application/json" }
    }
  );
}

export async function POST(req) {
  try {
    const { subject, body } = await req.json();

    if (!subject && !body) {
      return new Response(
        JSON.stringify({ error: "Empty email content" }),
        { status: 400 }
      );
    }

    const systemPrompt = `
You are a Professional Corporate Communication Safety Assistant.

Your job is NOT to change intent or meaning.

You ONLY:
- Fix grammar and spelling
- Soften harsh or passive-aggressive tone
- Detect missing attachments when referenced
- Detect unclear action items
- Detect vague timelines

STRICT RULES:
1. Do NOT add new intent
2. Do NOT add urgency
3. Do NOT add deadlines
4. Do NOT remove authority
5. If something is missing, say "Not detected"

Return ONLY valid JSON in this exact format:

{
  "issues_detected": {
    "grammar_spelling": "",
    "tone": "",
    "attachment_check": "",
    "action_clarity": "",
    "timeline_clarity": ""
  },
  "tone_score": "Harsh | Neutral | Over-Polite",
  "suggested_subject": "",
  "suggested_body": ""
}
`;

    const userPrompt = `
Subject:
${subject}

Body:
${body}
`;

    const geminiResponse = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
        process.env.GOOGLE_AI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: systemPrompt + "\n\n" + userPrompt }]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 800
          }
        })
      }
    );

    const data = await geminiResponse.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

    return new Response(text, {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Gemini processing failed" }),
      { status: 500 }
    );
  }
}

