import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const prompt = `
Create a highly personalized outreach email.

Service: ${body.service}
Client Country: ${body.country}
Client Type: ${body.clientType}
Search Sources: ${body.searchSources.join(", ")}
Goal: ${body.goal}
Extra: ${body.extra || "None"}

Tone: Warm, helpful, value-first.
Length: 120–170 words.
Include a strong CTA.
    `;

    const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await aiRes.json();
    return NextResponse.json({ output: data.choices[0].message.content });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
