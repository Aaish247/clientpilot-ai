import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, service, countries, apps, budget, extra } = body;

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "Missing OPENAI_API_KEY" }, { status: 500 });
    }

    const prompt = `
Generate 5 outreach email variations. Each email must include:
- Subject line
- 120–170 word body
- Tone types: Friendly, Motivated, Greedy/Money-focused, Professional, Simple

User details:
- Name: ${name}
- Email: ${email}
- Service: ${service}
- Countries: ${countries.join(", ")}
- Apps/Sources: ${apps.join(", ")}
- Budget: ${budget}
- Extra Notes: ${extra || "None"}

Format strictly like:

1.
Subject: ...
Body: ...

2.
Subject: ...
Body: ...

3.
...
    `.trim();

    // ⭐ NEW OPENAI API FORMAT
    const res = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: prompt,
        max_output_tokens: 1200,
      }),
    });

    const data = await res.json();

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 400 });
    }

    // ⭐ NEW FIELD = data.output_text
    const output = data.output_text?.[0] || "";

    if (!output || output.length < 10) {
      return NextResponse.json({ error: "EMPTY_RESPONSE" }, { status: 500 });
    }

    return NextResponse.json({ emails: output });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
