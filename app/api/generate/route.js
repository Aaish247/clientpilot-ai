import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, service, countries, apps, budget, extra } = body;

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "Missing OPENAI_API_KEY" }, { status: 500 });
    }

    // FORCE OpenAI to return ARRAY of 5 emails cleanly
    const prompt = `
Generate exactly 5 separate outreach emails as JSON array.
Return only pure JSON, no extra text.

User:
Name: ${name}
Email: ${email}
Service: ${service}
Countries: ${countries.join(", ")}
Apps: ${apps.join(", ")}
Budget: ${budget}
Extra: ${extra || "None"}

Each email must contain:
- "subject"
- "body" (120–170 words)
- friendly professional tone

Return format:
[
  { "subject": "...", "body": "..." },
  { "subject": "...", "body": "..." },
  { "subject": "...", "body": "..." },
  { "subject": "...", "body": "..." },
  { "subject": "...", "body": "..." }
]
`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1200,
        temperature: 0.7
      })
    });

    const data = await res.json();
    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 400 });
    }

    // AI returns JSON array → parse it
    let text = data.choices?.[0]?.message?.content || "[]";

    let emails;
    try {
      emails = JSON.parse(text);
    } catch {
      // fallback: try to extract JSON
      const match = text.match(/\[[\s\S]*\]/);
      emails = match ? JSON.parse(match[0]) : [];
    }

    if (!Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json({ error: "No emails generated" }, { status: 400 });
    }

    // Convert each email into one block for frontend
    const formatted = emails.map((e, i) =>
      `Subject: ${e.subject}\n\n${e.body}`
    );

    return NextResponse.json({ emails: formatted.slice(0, 5) });

  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
