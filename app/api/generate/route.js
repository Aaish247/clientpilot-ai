// app/api/generate/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      service,
      selectedCountry,
      selectedApps,
      budget,
      extraInfo,
      tone
    } = body;

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "Missing OPENAI_API_KEY" }, { status: 500 });
    }

    const model = "gpt-4o-mini"; // keep this or change to a model you have access to
    const prompt = `
You are a professional outreach copywriter. Produce 5 distinct outreach emails (numbered 1-5) for the following user.

Name: ${name}
Email: ${email}
Service: ${service}
Target country: ${selectedCountry}
Platforms: ${selectedApps?.join(", ") || "none"}
Budget: ${budget}
Tone: ${tone}
Extra notes: ${extraInfo || "none"}

Requirements:
- Each option must include a subject line and body.
- Body length: ~120-170 words.
- Vary the style between friendly, motivated, money-focused, professional, and simple.
- Do not invent fake contact info or claims.
- Return the output as plain text numbered 1. ... 2. ... up to 5.
`;

    const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1100,
      }),
    });

    const data = await aiRes.json();

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 500 });
    }

    const output = data.choices?.[0]?.message?.content || null;
    if (!output) {
      return NextResponse.json({ error: "AI returned no output." }, { status: 500 });
    }

    return NextResponse.json({ emails: output });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
