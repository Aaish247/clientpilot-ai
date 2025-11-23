import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, service, countries, apps, budget, extra } = body;

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY" },
        { status: 500 }
      );
    }

    const prompt = `
Write 5 outreach emails. Each email must include:
- A subject line
- 120–170 words
- Tone variations: friendly, motivated, money-focused, professional, simple
- Number them 1 to 5

User Info:
Name: ${name}
Email: ${email}
Service: ${service}
Countries: ${countries.join(", ")}
Apps: ${apps.join(", ")}
Budget: ${budget}
Extra: ${extra || "None"}
    `;

    const res = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini", // stable + guaranteed output
        input: prompt,
        max_output_tokens: 1200
      }),
    });

    const data = await res.json();

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 400 });
    }

    const output =
      data.output_text ||
      data.choices?.[0]?.message?.content ||
      "No output";

    return NextResponse.json({ emails: output });
  } catch (err) {
    return NextResponse.json(
      { error: String(err) },
      { status: 500 }
    );
  }
}
