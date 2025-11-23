import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, service, countries, apps, budget, extra } = body;

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "Missing GROQ_API_KEY" }, { status: 500 });
    }

    const prompt = `
Write 5 outreach emails.

User Info:
Name: ${name}
Email: ${email}
Service: ${service}
Countries: ${countries.join(", ")}
Apps: ${apps.join(", ")}
Budget: ${budget}
Extra: ${extra || "None"}

Requirements:
- 5 unique email versions
- Format EXACTLY like:

1. SUBJECT: ...
BODY:
...

2. SUBJECT: ...
BODY:
...
`;

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1500,
      }),
    });

    const data = await groqRes.json();

    const output = data?.choices?.[0]?.message?.content || "";

    if (!output) {
      return NextResponse.json({ error: "EMPTY_RESPONSE" }, { status: 400 });
    }

    return NextResponse.json({ emails: output });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
