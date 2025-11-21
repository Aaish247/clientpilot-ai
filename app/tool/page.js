// app/tool/page.js
"use client";
import { useState } from "react";

export default function ToolPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [idealClient, setIdealClient] = useState("");
  const [country, setCountry] = useState("");
  const [searchPlatforms, setSearchPlatforms] = useState({
    instagram: false,
    linkedin: false,
    tiktok: false,
    twitter: false,
    websites: false,
  });
  const [extra, setExtra] = useState("");
  const [plan, setPlan] = useState("free");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  function togglePlatform(key) {
    setSearchPlatforms((s) => ({ ...s, [key]: !s[key] }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    // collect platform string
    const platforms = Object.entries(searchPlatforms)
      .filter(([k, v]) => v)
      .map(([k]) => k)
      .join(", ") || "websites";

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          service,
          idealClient,
          country,
          platforms,
          plan,
          extra,
        }),
      });

      const data = await res.json();

      if (data?.output) {
        setResult(data.output);
      } else if (data?.error) {
        setResult("Error: " + (data.error || "Unknown error"));
      } else {
        setResult("Something went wrong.");
      }
    } catch (err) {
      setResult("Network error. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div className="hero center">
        <h1>ClientPilot — Find clients, send outreach</h1>
        <p style={{ color: "#475569" }}>
          Fill the details below and we’ll generate high-converting outreach emails.
        </p>
      </div>

      <div className="card">
        <form className="form-grid" onSubmit={handleSubmit}>
          <label>
            Your name
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </label>

          <label>
            Your email (for replies)
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@domain.com" />
          </label>

          <label>
            What service do you offer?
            <input type="text" value={service} onChange={(e) => setService(e.target.value)} placeholder="e.g. Video Editing, SMM, Web Design" required />
          </label>

          <label>
            Who is your ideal client?
            <input type="text" value={idealClient} onChange={(e) => setIdealClient(e.target.value)} placeholder="e.g. Fitness influencers, DTC brands" />
          </label>

          <label>
            Target country / location
            <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="USA, UK, Europe or city" />
          </label>

          <div>
            <label style={{ display: "block", marginBottom: 8, fontWeight: 700 }}>Where should we search for clients? (choose all)</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <label style={{ fontWeight: 600 }}>
                <input type="checkbox" checked={searchPlatforms.instagram} onChange={() => togglePlatform("instagram")} /> Instagram
              </label>
              <label style={{ fontWeight: 600 }}>
                <input type="checkbox" checked={searchPlatforms.linkedin} onChange={() => togglePlatform("linkedin")} /> LinkedIn
              </label>
              <label style={{ fontWeight: 600 }}>
                <input type="checkbox" checked={searchPlatforms.tiktok} onChange={() => togglePlatform("tiktok")} /> TikTok
              </label>
              <label style={{ fontWeight: 600 }}>
                <input type="checkbox" checked={searchPlatforms.twitter} onChange={() => togglePlatform("twitter")} /> Twitter/X
              </label>
              <label style={{ fontWeight: 600 }}>
                <input type="checkbox" checked={searchPlatforms.websites} onChange={() => togglePlatform("websites")} /> Websites / Google
              </label>
            </div>
          </div>

          <label>
            Choose plan
            <select value={plan} onChange={(e) => setPlan(e.target.value)}>
              <option value="free">Free — 20 emails/day</option>
              <option value="monthly">Monthly — 200 emails/day</option>
              <option value="lifetime">Lifetime — 200 emails/day</option>
            </select>
          </label>

          <label>
            Extra details (optional)
            <textarea value={extra} onChange={(e) => setExtra(e.target.value)} placeholder="Tone, examples, notes..." rows={4} />
          </label>

          <button className="btn btn-primary" type="submit" style={{ marginTop: 8 }}>
            {loading ? "Generating..." : "Generate Email"}
          </button>
        </form>

        {result && <div className="result">{result}</div>}
      </div>
    </div>
  );
                                              }        <input
          type="text"
          placeholder="What service are you offering?"
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="text"
          placeholder="Client name, business or website"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          required
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <textarea
          placeholder="Extra details (optional)"
          value={extra}
          onChange={(e) => setExtra(e.target.value)}
          rows={4}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        ></textarea>

        <button
          type="submit"
          style={{
            padding: "12px",
            background: "#0038ff",
            color: "white",
            borderRadius: "8px",
            border: "none",
            fontSize: "16px",
          }}
        >
          {loading ? "Generating..." : "Generate Email"}
        </button>
      </form>

      {result && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            background: "#f5f5f5",
            borderRadius: "10px",
            whiteSpace: "pre-wrap",
          }}
        >
          {result}
        </div>
      )}
    </div>
  );
}
