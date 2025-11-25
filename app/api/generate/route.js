import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      service,
      countries,
      apps,
      budget,
      extra,
      tone
    } = body;

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Missing GROQ_API_KEY" },
        { status: 500 }
      );
    }

    const prompt = `
Write 5 different outreach emails (1–5).
Each email must have:
- A subject line
- 120–170 word body
- Style variations: friendly, motivated, money-focused, professional, simple

User:
Name: ${name}
Email: ${email}
Service: ${service}
Countries: ${countries?.join(", ") || "None"}
Apps: ${apps?.join(", ") || "None"}
Budget: ${budget}
Tone: ${tone}
Extra notes: ${extra || "None"}

Return plain text numbered: 
1.
2.
3.
4.
5.
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
          model: "mixtral-8x7b-32768",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 1500,
        }),
      }
    );

    const data = await groqRes.json();

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 500 });
    }

    const output = data.choices?.[0]?.message?.content;
    if (!output) {
      return NextResponse.json(
        { error: "AI returned nothing." },
        { status: 500 }
      );
    }

    return NextResponse.json({ emails: output });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
