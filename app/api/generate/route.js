import { NextResponse } from "next/server";

export async function POST(req){
  try{
    const body = await req.json();
    const { name,email,service,countries,apps,budget,extra } = body;

    if(!process.env.OPENAI_API_KEY) return NextResponse.json({error:'Missing OPENAI_API_KEY'}, {status:500});

    const prompt = `Write 5 friendly, professional outreach emails (subject + body) tailored to the user's service and market.\n\nUser:\nName: ${name}\nEmail: ${email}\nService: ${service}\nCountries: ${countries.join(', ')}\nApps: ${apps.join(', ')}\nBudget: ${budget}\nExtra: ${extra || 'None'}\n\nRequirements:\n- Each email: subject line + ~120-170 words.\n- Use a professional friendly tone.\n- No fake data.\n- Number them 1-5.`;

    const res = await fetch('https://api.openai.com/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${process.env.OPENAI_API_KEY}`},body:JSON.stringify({model:'gpt-4o-mini',messages:[{role:'user',content:prompt}],max_tokens:800})});

    const data = await res.json();
    if(data.error) return NextResponse.json({error:data.error}, {status:400});

    const output = data.choices?.[0]?.message?.content || 'No output';
    return NextResponse.json({emails:output});
  }catch(err){
    return NextResponse.json({error:String(err)}, {status:500});
  }
}
