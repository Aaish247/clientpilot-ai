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
      extraInfo,
      tone,
    } = body;

    // basic validation
    if (!name || !email || !service) {
      return NextResponse.json(
        { error: "Missing name, email or service." },
        { status: 400 }
      );
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Missing GROQ_API_KEY" },
        { status: 500 }
      );
    }

    // prompt for AI
    const prompt = `
You are an expert outreach email writer.

Write 5 different emails (subject + body) using:

Name: ${name}
Email: ${email}
Service: ${service}
Target Countries: ${selectedCountries?.join(", ")}
Platforms: ${selectedApps?.join(", ")}
Budget: ${budget}
Tone: ${tone}
Extra Notes: ${extraInfo || "None"}

Rules:
- Must return 5 emails.
- Each must be numbered 1, 2, 3, 4, 5.
- Each must include a subject line.
- Body length: 120–170 words.
- DO NOT return markdown, ONLY plain text.
`;

    // GROQ API CALL (CORRECT!!)
    const ai = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1200,
        temperature: 0.8,
      }),
    });

    const data = await ai.json();

    if (data.error) {
      return NextResponse.json(
        { error: data.error.message || "Groq API error" },
        { status: 500 }
      );
    }

    const output = data?.choices?.[0]?.message?.content;

    if (!output || output.length < 10) {
      return NextResponse.json(
        { error: "AI returned nothing." },
        { status: 500 }
      );
    }

    return NextResponse.json({ emails: output });
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
