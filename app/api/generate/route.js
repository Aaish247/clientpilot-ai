// app/api/generate/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    // expected fields from UI
    const {
      name = "",
      email = "",
      service = "",
      idealClient = "",
      country = "",
      platforms = "",
      plan = "free",
      extra = "",
    } = body;

    // build a strong prompt
    const prompt = `
You are an expert outreach copywriter. Write ONE cold outreach email (subject + body) for the user below.
Make it short, human, personalized and professional.
Use the details to tailor the email and include one clear CTA (call to action).
Keep length around 120-180 words for the body.

User details:
- Name: ${name}
- Email (reply-to): ${email}
- Service: ${service}
- Ideal client: ${idealClient}
- Target country/location: ${country}
- Platforms to search on: ${platforms}
- Selected plan: ${plan}
- Extra info: ${extra || "None"}

Output format (exactly):
Subject: <one-line subject>
Body:
<email body>

Make it friendly, confident, and short.
    `;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing OPENAI_API_KEY in server." }, { status: 500 });
    }

    const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 600,
        temperature: 0.2,
      }),
    });

    const data = await aiRes.json();

    const output = data?.choices?.[0]?.message?.content || data?.error?.message || null;

    if (!output) {
      return NextResponse.json({ error: "AI returned no output." }, { status: 500 });
    }

    return NextResponse.json({ output });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
