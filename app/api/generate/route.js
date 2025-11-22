import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      service,
      countries,     // your frontend sends this
      apps,          // your frontend sends this
      budget,
      extra,
      variants
    } = body;

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY" },
        { status: 500 }
      );
    }

    const prompt = `
Write ${variants || 5} outreach emails.
Each email must include:
- Subject line
- 120-170 words
- Tone: friendly professional
- Service: ${service}
- Target countries: ${countries?.join(", ") || "None"}
- Platforms: ${apps?.join(", ") || "None"}
- Budget: ${budget}
- Extra notes: ${extra || "None"}
- No fake info
- Number the emails 1 to ${variants || 5}
    `;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1200,
      }),
    });

    const data = await res.json();

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 400 });
    }

    const text = data.choices?.[0]?.message?.content || "";

    if (!text.trim()) {
      return NextResponse.json(
        { error: "AI returned nothing." },
        { status: 400 }
      );
    }

    // split by numbering
    const emails = text
      .split(/\n\s*\d+\.\s*/g)
      .filter(x => x.trim().length > 0)
      .slice(0, variants || 5);

    return NextResponse.json({ outputs: emails });

  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
