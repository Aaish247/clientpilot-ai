import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { service, client, extra } = await req.json();

    const prompt = `
Write a friendly client outreach email based on:

Service: ${service}
Client: ${client}
Extra details: ${extra || "None"}

Make it short, simple, professional, and human.
    `;

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing OpenAI API key" },
        { status: 500 }
      );
    }

    const completion = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
        }),
      }
    ).then((r) => r.json());

    const output =
      completion.choices?.[0]?.message?.content ||
      "AI could not generate email.";

    return NextResponse.json({ output });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error", details: String(error) },
      { status: 500 }
    );
  }
}
