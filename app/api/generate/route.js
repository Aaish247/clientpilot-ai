import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { service, client, extra } = await req.json();

    const prompt = `
Write a professional outreach email.

Service: ${service}
Client: ${client}
Extra details: ${extra || "None"}
Tone: Professional but friendly.
Length: 120–180 words.
Include a clear CTA.
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
