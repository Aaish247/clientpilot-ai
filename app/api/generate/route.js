import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, service, countries, apps, budget, extra } = body;

    if (!process.env.OPENAI_API_KEY)
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY" },
        { status: 500 }
      );

    const prompt = `
Write 5 outreach emails (subject + body) for a freelancer.

User Info:
Name: ${name}
Email: ${email}
Service: ${service}
Countries: ${countries.join(", ")}
Apps: ${apps.join(", ")}
Budget: ${budget}
Extra Details: ${extra || "None"}

Rules:
- Each email MUST start with "1.", "2.", "3.", "4.", "5."
- Each email must have:
  • Subject line
  • 120–170 word body
- No fake data.
`;

    // NEW OPENAI API ENDPOINT for sk-proj keys
    const res = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: prompt,
        max_output_tokens: 1000,
      }),
    });

    const data = await res.json();

    // Check for OpenAI error
    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 400 });
    }

    // NEW API returns "output_text"
    const output =
      data.output_text?.[0] ||
      data.output_text ||
      data.choices?.[0]?.message?.content ||
      "";

    if (!output.trim()) {
      return NextResponse.json({ error: "No output" }, { status: 400 });
    }

    return NextResponse.json({ emails: output });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
