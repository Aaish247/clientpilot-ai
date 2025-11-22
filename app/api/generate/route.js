import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, service, countries, apps, budget, extra } =
      await req.json();

    const prompt = `
User Details:
Name: ${name}
Email: ${email}

Service: ${service}
Target Countries: ${countries.join(", ")}
Search Apps: ${apps.join(", ")}
Budget: ${budget}
Extra: ${extra || "None"}

Write 5 different outreach emails, each with:
- Subject line
- 120–170 words
- Friendly + professional tone
- Based on the user's service + target market
- Do NOT send follow-ups
- Do NOT generate fake information
`;

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    const data = await response.json();

    // If OpenAI returns an error
    if (data.error) {
      return NextResponse.json(
        { error: data.error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      emails: data.choices[0].message.content,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
