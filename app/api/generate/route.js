import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { service, client, extra } = await req.json();

    const prompt = `
Write a professional client email.
Service: ${service}
Client: ${client}
Extra: ${extra}
`;

    const apiRes = await fetch("https://api.openai.com/v1/chat/completions", {
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

    const data = await apiRes.json();

    return NextResponse.json({ output: data.choices?.[0]?.message?.content });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
