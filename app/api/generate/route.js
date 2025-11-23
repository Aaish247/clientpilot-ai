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

    // Validations
    if (!name || !email || !service) {
      return NextResponse.json(
        { error: "Missing name, email, or service." },
        { status: 400 }
      );
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Missing GROQ_API_KEY" },
        { status: 500 }
      );
    }

    // Prompt
    const prompt = `
Create 5 outreach emails. Each must include:
- Subject line
- Body 120–170 words
- Numbered 1–5
- Styles: friendly, motivated, money-focused, professional, simple

User Details:
Name: ${name}
Email: ${email}
Service: ${service}
Countries: ${selectedCountries?.join(", ") || "None"}
Apps: ${selectedApps?.join(", ") || "None"}
Budget: ${budget}
Tone: ${tone}
Extra Info: ${extraInfo || "None"}

Return only plain text with emails numbered 1 to 5.
`;

    // GROQ API call
    const aiRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1400,
      }),
    });

    const data = await aiRes.json();

    if (data.error) {
      return NextResponse.json(
        { error: data.error },
        { status: 500 }
      );
    }

    const output = data.choices?.[0]?.message?.content;
    if (!output) {
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
