export async function POST(req) {
  try {
    const { subject, body } = await req.json();

    return new Response(
      JSON.stringify({
        issues_detected: {
          grammar_spelling: "Not checked",
          tone: "Not checked",
          attachment_check: "Not checked",
          action_clarity: "Not checked",
          timeline_clarity: "Not checked"
        },
        tone_score: "Neutral",
        suggested_subject: subject,
        suggested_body: body
      }),
      {
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
  }
}
