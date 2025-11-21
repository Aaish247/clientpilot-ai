"use client";
import { useState } from "react";

/**
 Tool page
 - multiple services
 - multi-country (select all)
 - free plan: only 3 platforms selectable
 - paid plans: many platforms
 - budget single select
 - returns many variants from API
*/

const COUNTRIES = [
  "United States","United Kingdom","Canada","Australia","United Arab Emirates","Germany","France","Italy",
  "Spain","Netherlands","Sweden","Norway","Denmark","Finland","Belgium","Switzerland","Austria","Ireland",
  "Poland","Portugal","Greece","Turkey","Saudi Arabia","Qatar","Kuwait","Bahrain","Egypt","South Africa",
  "Nigeria","Kenya","Morocco","Israel","India","Pakistan","Bangladesh","Sri Lanka","Nepal","Indonesia",
  "Malaysia","Singapore","Thailand","Vietnam","Philippines","Japan","South Korea","China","Hong Kong",
  "Taiwan","New Zealand","Mexico","Brazil","Argentina","Chile","Colombia","Peru","Costa Rica","Panama",
  "Romania","Czech Republic","Hungary","Slovakia","Slovenia","Croatia","Ukraine","Russia","Belarus",
  "Lithuania","Latvia","Estonia","Iceland","Argentina","Uruguay","Venezuela","Luxembourg","Monaco","Liechtenstein",
  "Albania","Bulgaria","Serbia","Bosnia and Herzegovina","North Macedonia","Montenegro","Armenia","Georgia",
  "Azerbaijan","Kazakhstan","Uzbekistan","Moldova","Ecuador","Paraguay","Bolivia","Guyana","Suriname",
  "El Salvador","Guatemala","Honduras","Nicaragua","Jamaica","Trinidad and Tobago","Bahamas"
];
// you can expand COUNTRIES to full 190+ later

const SERVICES = [
  "Social Media Manager","Paid Ads (Facebook/Instagram)","Paid Ads (TikTok)","Paid Ads (Google)",
  "Content Creator / UGC","Video Editing","Graphic Design","Brand Identity","Web Design / Development",
  "Landing Page + CRO","SEO","Email Marketing","Conversion Copywriting","Product Photography",
  "E-commerce Store Management","Shopify Development","Amazon Seller Support","Funnel Setup",
  "Local SEO & Maps","Real Estate Marketing","Lead Generation for Agencies","SaaS Growth Marketing",
  "Consulting / Coaching Marketing","PR & Media Outreach","App Store Optimization","Influencer Outreach",
  "Community Management","Customer Support Outsourcing","UX/UI Design","Productized Services",
  "Data Analysis & Reporting","Automation & Integrations (Zapier/Integromat)","AI Automations",
  "Chatbot Setup","Voiceover / Podcast Editing","Resume/CV Services","LinkedIn Outreach",
  "Event Marketing","Affiliate Management","Market Research","Sales Funnel Copy","Ad Creative",
  "Motion Design","3D Design","AR/VR Services","NFT Marketing","Crowdfunding Campaigns",
  "TikTok Growth Specialist","YouTube Channel Growth","Pinterest Marketing","Email Deliverability",
  "Cold Email Outreach","PR Outreach","Brand Partnerships","Wholesale/B2B Sales"
];
// you can extend SERVICES further

const ALL_PLATFORMS = [
  "Instagram","LinkedIn","Facebook","TikTok","X/Twitter","YouTube","Google Maps","Google Search","Yelp",
  "Etsy","Shopify Stores","Amazon Sellers","Upwork","Fiverr","Behance","Dribbble","Crunchbase","AngelList",
  "Product Hunt","Slack Communities","Discord Communities","Reddit","Medium","Quora","Forums","WhatsApp Groups",
  "Telegram Channels","Local Business Directories","Industry-specific listings","Clubhouse"
];

export default function ToolPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectAllCountries, setSelectAllCountries] = useState(false);
  const [platforms, setPlatforms] = useState([]); // selected platforms
  const [plan, setPlan] = useState("free"); // free / monthly / yearly / lifetime
  const [budget, setBudget] = useState("<$500");
  const [goal, setGoal] = useState("");
  const [extra, setExtra] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  // Toggle service selection (multiple)
  function toggleService(s) {
    setSelectedServices(prev => prev.includes(s) ? prev.filter(x => x!==s) : [...prev, s]);
  }

  // Toggle country
  function toggleCountry(c) {
    if (selectAllCountries) {
      setSelectAllCountries(false);
      setCountries([c]);
      return;
    }
    setCountries(prev => prev.includes(c) ? prev.filter(x => x!==c) : [...prev, c]);
  }

  function togglePlatform(p) {
    setPlatforms(prev => prev.includes(p) ? prev.filter(x => x!==p) : [...prev, p]);
  }

  // When "select all countries"
  function handleSelectAllCountries() {
    if (!selectAllCountries) {
      setSelectAllCountries(true);
      setCountries([...COUNTRIES]);
    } else {
      setSelectAllCountries(false);
      setCountries([]);
    }
  }

  // Platforms availability: free plan allowed only first 3 (INDEX)
  const allowedPlatforms = plan === "free" ? ALL_PLATFORMS.slice(0,3) : ALL_PLATFORMS;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || selectedServices.length === 0 || countries.length === 0 || !goal) {
      alert("Please fill name, email, at least one service, country, and goal.");
      return;
    }

    setLoading(true);
    setResult("");

    const body = {
      name, email, services: selectedServices, countries, platforms,
      plan, budget, goal, extra
    };

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data?.output) setResult(data.output);
      else setResult("Server error: " + (data?.error || "No output"));
    } catch (err) {
      setResult("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 1000, margin: "28px auto", padding: 18 }}>
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <h1 style={{ margin: 0 }}>ClientPilot — Find clients & send outreach</h1>
        <p style={{ color: "#475569", marginTop: 8 }}>Fill short form — AI will generate subject, main email, icebreaker, 2 follow-ups, DM version and subject options.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <div style={{ display: "flex", gap: 12 }}>
          <input placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} style={inputStyle} />
          <input placeholder="Your email (reply-to)" value={email} onChange={e=>setEmail(e.target.value)} style={inputStyle} />
        </div>

        <div>
          <div style={{ fontWeight: 800 }}>Choose services you offer (multiple)</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
            {SERVICES.map(s => (
              <label key={s} style={chipLabel(selectedServices.includes(s))}>
                <input type="checkbox" checked={selectedServices.includes(s)} onChange={()=>toggleService(s)} />
                <span style={{ marginLeft: 8 }}>{s}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 800 }}>Target countries (multiple) <small style={{ color: "#64748b" }}>(select all available)</small></div>
          <div style={{ marginTop:8, display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button type="button" onClick={handleSelectAllCountries} style={smallBtn}>{selectAllCountries ? "Unselect all" : "Select all"}</button>
            {COUNTRIES.map(c => (
              <label key={c} style={chipLabel(countries.includes(c))}>
                <input type="checkbox" checked={countries.includes(c)} onChange={()=>toggleCountry(c)} />
                <span style={{ marginLeft: 8 }}>{c}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 800 }}>Where should we search for clients?</div>
          <div style={{ marginTop:8, display: "flex", gap: 8, flexWrap: "wrap" }}>
            {allowedPlatforms.map(p => (
              <label key={p} style={chipLabel(platforms.includes(p))}>
                <input type="checkbox" checked={platforms.includes(p)} onChange={()=>togglePlatform(p)} />
                <span style={{ marginLeft: 8 }}>{p}</span>
              </label>
            ))}
          </div>
          {plan === "free" && <div style={{ color: "#c084fc", marginTop:6 }}>Free plan includes only the first 3 platforms. Upgrade to get all.</div>}
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <label style={{ flex: 1 }}>
            <div style={{ fontWeight: 800 }}>Plan</div>
            <select value={plan} onChange={e=>setPlan(e.target.value)} style={inputStyle}>
              <option value="free">Free — 20 emails/day</option>
              <option value="monthly">Monthly — $49.99 / month (200/day)</option>
              <option value="yearly">Yearly — $99.99 / year (200/day)</option>
              <option value="lifetime">Lifetime — $149.99 one-time (200/day)</option>
            </select>
          </label>

          <label style={{ flex: 1 }}>
            <div style={{ fontWeight: 800 }}>Target client budget (select one)</div>
            <select value={budget} onChange={e=>setBudget(e.target.value)} style={inputStyle}>
              <option value="< $100">&lt; $100</option>
              <option value="< $500">&lt; $500</option>
              <option value="$500 - $1500">$500 - $1500</option>
              <option value="$1500 - $5000">$1500 - $5000</option>
              <option value="$5000+">$5000+</option>
            </select>
          </label>
        </div>

        <div>
          <div style={{ fontWeight: 800 }}>What's your primary goal? (book a call, sell a service, get partnership...)</div>
          <input value={goal} onChange={e=>setGoal(e.target.value)} placeholder="eg. Book a 30-min call to show campaign results" style={inputStyle} required />
        </div>

        <div>
          <div style={{ fontWeight: 800 }}>Extra details (optional)</div>
          <textarea value={extra} onChange={e=>setExtra(e.target.value)} placeholder="Tone, examples, anything else..." rows={4} style={inputStyle} />
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn-primary" type="submit" disabled={loading} style={{ padding: "12px 18px" }}>
            {loading ? "Generating..." : "Generate outreach (subject, email, follow-ups, DM, 5 subjects)"}
          </button>
          <button type="button" onClick={()=>{ setResult(""); }} style={{ padding: "12px 18px", borderRadius: 8, border: "1px solid #e6eefc", background: "#fff" }}>
            Clear
          </button>
        </div>
      </form>

      {result && (
        <div style={{ marginTop: 18, padding: 16, borderRadius: 10, background: "#f6f9ff", whiteSpace: "pre-wrap" }}>
          <h3>AI Output</h3>
          <div>{result}</div>
        </div>
      )}
    </div>
  );
}

/* ---------- inline styles ---------- */
const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: 10,
  border: "1px solid #dfe8f6",
  outline: "none",
  fontSize: 15
};

const chipLabel = (active) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "8px 10px",
  borderRadius: 12,
  border: `1px solid ${active ? "#2563EB" : "#e6eefc"}`,
  background: active ? "#eef5ff" : "#fff",
  cursor: "pointer",
  fontWeight: 600,
});

const smallBtn = {
  padding: "8px 10px",
  borderRadius: 10,
  border: "1px solid #dfe8f6",
  background: "#fff",
  cursor: "pointer",
};
