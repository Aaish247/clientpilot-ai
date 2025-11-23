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

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Missing GROQ_API_KEY" },
        { status: 500 }
      );
    }

    const prompt = `
Write 5 outreach emails. Each email must start EXACTLY like this:

1. Subject: ...
Body: ...

2. Subject: ...
Body: ...

Details:
Name: ${name}
Email: ${email}
Service: ${service}
Countries: ${selectedCountries.join(", ")}
Apps: ${selectedApps.join(", ")}
Budget: ${budget}
Tone: ${tone}
Extra Notes: ${extraInfo || "None"}

Rules:
- 5 different emails.
- Each must include subject + 120-170 word body.
- Keep results plain text.
`;

    const aiRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
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
    });

    const data = await aiRes.json();

    if (data.error) {
      return NextResponse.json(
        { error: data.error.message || "Groq API Error" },
        { status: 500 }
      );
    }

    const output = data.choices?.[0]?.message?.content || "";

    if (!output || output.trim().length < 10) {
      return NextResponse.json(
        { error: "Groq returned empty output." },
        { status: 500 }
      );
    }

    return NextResponse.json({ emails: output });
  } catch (err) {
    return NextResponse.json({ error: err.toString() }, { status: 500 });
  }
}
