import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    // safe defaults
    const {
      name = "",
      email = "",
      services = [],
      countries = [],
      platforms = [],
      plan = "free",
      budget = "< $500",
      goal = "",
      extra = ""
    } = body || {};

    // Build prompt for OpenAI — ask for multiple pieces
    const prompt = `
You are a professional outreach copywriter. Based on the following user data, generate:

1) A short attention-grabbing SUBJECT line (one)
2) FIVE alternative subject line options (comma separated)
3) MAIN EMAIL (120-170 words) personalized and referencing the user's name/email when appropriate and including a single clear CTA (book a call / reply / calendar link)
4) Icebreaker sentence (one or two short sentences)
5) FOLLOW-UP #1 (short, friendly reminder)
6) FOLLOW-UP #2 (final gentle nudge)
7) A DM-friendly short outreach version (for Instagram/LinkedIn direct message)
Make the tone friendly, confident, value-first. Tailor details to the user's selected services and target client. Keep the output clean and clearly labeled sections.

User details:
Name: ${name}
Reply email: ${email}
Services: ${services.join(", ") || "Not provided"}
Target countries: ${countries.join(", ") || "Global"}
Platforms to search: ${platforms.join(", ") || "Websites"}
Selected plan: ${plan}
Target client budget: ${budget}
Primary goal: ${goal}
Extra info: ${extra || "None"}

Output format EXACTLY:
SUBJECT: <single subject line>
SUBJECT_OPTIONS: <opt1> | <opt2> | <opt3> | <opt4> | <opt5>
ICEBREAKER: <one-two sentences>
BODY:
<email body>

FOLLOW_UP_1:
<text>

FOLLOW_UP_2:
<text>

DM:
<short dm version>

Keep language professional and natural. Don't include internal commentary.
`;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing OPENAI_API_KEY on server." }, { status: 500 });
    }

    const openAIres = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 900,
        temperature: 0.18
      })
    });

    const data = await openAIres.json();

    const text = data?.choices?.[0]?.message?.content || data?.error?.message || null;
    if (!text) {
      return NextResponse.json({ error: "AI returned no output" }, { status: 500 });
    }

    return NextResponse.json({ output: text });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
