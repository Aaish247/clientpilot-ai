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
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY" },
        { status: 500 }
      );
    }

    // Build Prompt
    const prompt = `
You are an expert cold-email copywriter.

Write **5 different outreach emails**.
Each email must include:
- subject line
- 120–170 word body
- written in this tone: ${tone}
- personalized for this service: ${service}
- targeting: ${selectedCountry}
- platforms: ${selectedApps?.join(", ") || "None"}
- budget: ${budget}
- extra notes: ${extraInfo || "None"}
- no fake details
- no long intros
- make each email different style

Number them 1 to 5.
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
        max_tokens: 900,
      }),
    });

    const data = await res.json();
    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 400 });
    }

    const output = data.choices?.[0]?.message?.content || null;

    if (!output) {
      return NextResponse.json({ error: "AI returned no output." }, { status: 400 });
    }

    return NextResponse.json({ emails: output });

  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
