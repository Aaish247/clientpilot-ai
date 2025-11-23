// app/api/generate/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {
      name,
      email,
      service,
      selectedCountries,
      selectedApps,
      budget,
      extraInfo,
      tone
    } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Missing GROQ_API_KEY" },
        { status: 500 }
      );
    }

    const prompt = `
Write 5 outreach emails (numbered 1–5).
Each email MUST include:
- Subject line
- 120–170 word body
- Different styles: Friendly, Motivated, Money-Focused, Professional, Simple

Details:
Name: ${name}
Email: ${email}
Service: ${service}
Countries: ${selectedCountries.join(", ")}
Platforms: ${selectedApps.join(", ")}
Budget: ${budget}
Tone: ${tone}
Extra Notes: ${extraInfo || "None"}
    `;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1500,
      }),
    });

    const data = await response.json();

    if (!data.choices?.[0]?.message?.content) {
      return NextResponse.json(
        { error: "AI returned no output." },
        { status: 500 }
      );
    }

    return NextResponse.json({ emails: data.choices[0].message.content });

  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
