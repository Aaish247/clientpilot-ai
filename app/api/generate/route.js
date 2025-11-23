// app/api/generate/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      service,
      selectedCountries,
      selectedApps,
      budget,
      extraInfo
    } = body;

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Missing GROQ_API_KEY" },
        { status: 500 }
      );
    }

    const prompt = `
Generate 5 outreach email options (1-5). 
Each email MUST include:
- Subject line
- 120-170 word body
- Vary tone: friendly, motivated, money-focused, professional, simple

User Details:
Name: ${name}
Email: ${email}
Service: ${service}
Countries: ${selectedCountries?.join(", ") || "none"}
Platforms: ${selectedApps?.join(", ") || "none"}
Budget: ${budget}
Extra notes: ${extraInfo || "none"}

Rules:
- Do NOT create fake claims.
- Do NOT use fake numbers.
- Format EXACTLY like:

1.
Subject: ...
Body: ...

2.
Subject: ...
Body: ...
`;

    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-70b-versatile",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 1500,
        }),
      }
    );

    const data = await groqRes.json();

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 500 });
    }

    const output = data.choices?.[0]?.message?.content || null;

    if (!output || output.length < 10) {
      return NextResponse.json(
        { error: "AI returned no output." },
        { status: 500 }
      );
    }

    return NextResponse.json({ emails: output });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
