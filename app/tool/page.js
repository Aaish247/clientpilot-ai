"use client";

import { useState } from "react";

/**
 * ClientPilot - /app/tool/page.js
 * Paste entire file contents here to replace your old one.
 *
 * This is plain React (no TypeScript). It calls POST /api/generate
 * to create 5 email variants. Make sure your /api/generate accepts
 * { name, email, service, countries, apps, budget, extra } payload.
 */

const TOP_COUNTRIES = ["USA", "UK", "UAE", "Canada", "Australia"];

const ALL_COUNTRIES = {
  A: ["Afghanistan","Albania","Algeria","Andorra","Angola"],
  B: ["Bahamas","Bahrain","Bangladesh","Barbados","Belgium"],
  C: ["Cambodia","Cameroon","Canada","Chad","Chile"],
  D: ["Denmark","Djibouti","Dominica","Dominican Republic"],
  E: ["Ecuador","Egypt","El Salvador","Estonia"],
  F: ["Fiji","Finland","France","French Guiana"],
  G: ["Gabon","Gambia","Georgia","Germany","Ghana"],
  H: ["Haiti","Honduras","Hungary"],
  I: ["Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy"],
  J: ["Jamaica","Japan","Jordan"],
  K: ["Kazakhstan","Kenya","Kuwait","Kyrgyzstan"],
  L: ["Laos","Latvia","Lebanon","Liberia","Libya","Lithuania","Luxembourg"],
  M: ["Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mexico","Morocco"],
  N: ["Namibia","Nepal","Netherlands","New Zealand","Nicaragua","Nigeria","Norway"],
  O: ["Oman"],
  P: ["Pakistan","Palestine","Panama","Paraguay","Peru","Philippines","Poland","Portugal"],
  Q: ["Qatar"],
  R: ["Romania","Russia","Rwanda"],
  S: ["Saudi Arabia","Senegal","Serbia","Singapore","Slovakia","Slovenia","Somalia","South Africa","South Korea","Spain","Sri Lanka","Sweden","Switzerland"],
  T: ["Taiwan","Tajikistan","Tanzania","Thailand","Tunisia","Turkey","Turkmenistan"],
  U: ["Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan"],
  V: ["Vanuatu","Venezuela","Vietnam"],
  W: ["West Bank"],
  Y: ["Yemen"],
  Z: ["Zambia","Zimbabwe"]
};

const APPS = [
  "LinkedIn",
  "Instagram",
  "Facebook",
  "TikTok",
  "Upwork",
  "Fiverr",
  "Freelancer",
  "Behance",
  "Dribbble",
  "Google Maps"
];

export default function ToolPage() {
  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("$0–$500");
  const [extra, setExtra] = useState("");

  // selections
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedApps, setSelectedApps] = useState([]);

  // UI
  const [openLetter, setOpenLetter] = useState(null);
  const [appsOpen, setAppsOpen] = useState(true);
  const [countriesOpen, setCountriesOpen] = useState(true);

  // mode demo (replace with real auth & payment later)
  const [isPaid, setIsPaid] = useState(false); // toggle to simulate subscription state

  // generation
  const [loading, setLoading] = useState(false);
  const [emails, setEmails] = useState([]); // list of generated email strings
  const [selectedEmailIndex, setSelectedEmailIndex] = useState(null);
  const [error, setError] = useState("");

  // limits
  const FREE_MAX_APPS = 3;
  const FREE_MAX_COUNTRIES = 3;

  const toggleCountry = (c) => {
    const already = selectedCountries.includes(c);
    if (!isPaid && !already && selectedCountries.length >= FREE_MAX_COUNTRIES) {
      return; // ignore, free limit reached
    }
    setSelectedCountries(prev => prev.includes(c) ? prev.filter(x=>x!==c) : [...prev, c]);
  };

  const toggleApp = (a) => {
    const already = selectedApps.includes(a);
    if (!isPaid && !already && selectedApps.length >= FREE_MAX_APPS) {
      return; // ignore
    }
    setSelectedApps(prev => prev.includes(a) ? prev.filter(x=>x!==a) : [...prev, a]);
  };

  const handleGenerate = async () => {
    setError("");
    if (!service || !email || !name) {
      setError("Please enter name, email and service to continue.");
      return;
    }
    if (selectedApps.length === 0) {
      setError("Select at least one app/source to search.");
      return;
    }
    if (selectedCountries.length === 0) {
      setError("Select at least one country to search in.");
      return;
    }

    setLoading(true);
    setEmails([]);
    setSelectedEmailIndex(null);

    try {
      const payload = {
        name, email, service, budget, extra,
        countries: selectedCountries,
        apps: selectedApps,
        request: "generate_variants", // tells backend to return N variants
        variants: 5
      };

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      // Expecting { output: "..." } or { outputs: ["...","..."] } depending on your API
      let outs = [];
      if (data.outputs && Array.isArray(data.outputs)) outs = data.outputs;
      else if (data.output && typeof data.output === "string") {
        // try to split into variants if backend returned a single blob
        // assume backend uses separators like "###" or numbered list — keep simple:
        outs = data.output.split("\n\n").filter(Boolean).slice(0,5);
      } else if (Array.isArray(data)) {
        outs = data.slice(0,5);
      } else {
        outs = [data.output || "AI returned nothing. Try again."];
      }

      // ensure at least 1 entry
      if (outs.length === 0) outs = ["AI couldn't make emails. Try again."];

      setEmails(outs.slice(0,5));
    } catch (err) {
      console.error(err);
      setError("Server or network error. Check console and API.");
    } finally {
      setLoading(false);
    }
  };

  const copySelectedEmail = async () => {
    if (selectedEmailIndex === null) return;
    const t = emails[selectedEmailIndex];
    try {
      await navigator.clipboard.writeText(t);
      alert("Email copied to clipboard.");
    } catch {
      alert("Copy failed — please select text and copy manually.");
    }
  };

  const resetForm = () => {
    setName(""); setEmail(""); setService(""); setExtra("");
    setSelectedApps([]); setSelectedCountries([]); setEmails([]); setSelectedEmailIndex(null);
  };

  // small helpers for UI
  const isCountryDisabled = (c) => (!isPaid && !selectedCountries.includes(c) && selectedCountries.length >= FREE_MAX_COUNTRIES);
  const isAppDisabled = (a) => (!isPaid && !selectedApps.includes(a) && selectedApps.length >= FREE_MAX_APPS);

  return (
    <div style={{
      padding: 18,
      maxWidth: 900,
      margin: "0 auto",
      fontFamily: "Inter, Arial, sans-serif",
      color: "#0F172A"
    }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8, textAlign: "center" }}>Your Client Finder</h1>
        <p style={{ color: "#55606A", textAlign: "center", marginBottom: 18 }}>
          Fill the quick form — we’ll search and create outreach for real clients.
        </p>

        {/* Demo toggle (simulate free / paid) */}
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <label style={{ fontWeight: 700 }}>Mode:</label>
            <button onClick={()=>setIsPaid(false)} style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: !isPaid ? "2px solid #2563EB" : "1px solid #DDD",
              background: !isPaid ? "#eef6ff" : "#fff",
              cursor: "pointer"
            }}>Free</button>
            <button onClick={()=>setIsPaid(true)} style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: isPaid ? "2px solid #2563EB" : "1px solid #DDD",
              background: isPaid ? "#eef6ff" : "#fff",
              cursor: "pointer"
            }}>Paid</button>
          </div>
        </div>

        {/* Basic inputs */}
        <div style={{ display: "grid", gap: 10 }}>
          <div>
            <label style={{ fontWeight: 700 }}>Your name</label>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g., Aaish" style={inputStyle} />
          </div>

          <div>
            <label style={{ fontWeight: 700 }}>Your email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" style={inputStyle} />
          </div>

          <div>
            <label style={{ fontWeight: 700 }}>What service do you offer?</label>
            <input value={service} onChange={e=>setService(e.target.value)} placeholder="e.g., Social media ads management" style={inputStyle} />
          </div>

          <div>
            <label style={{ fontWeight: 700 }}>Target budget</label>
            <select value={budget} onChange={e=>setBudget(e.target.value)} style={inputStyle}>
              <option>$0–$500</option>
              <option>$500–$1500</option>
              <option>$1500–$5000</option>
              <option>$5000+</option>
            </select>
          </div>

          <div>
            <label style={{ fontWeight: 700 }}>Extra details (optional)</label>
            <textarea value={extra} onChange={e=>setExtra(e.target.value)} placeholder="Tone, niche, examples..." style={{ ...inputStyle, minHeight: 80 }} />
          </div>
        </div>

        {/* Top countries */}
        <div style={{ marginTop: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label style={{ fontWeight: 800 }}>Top countries</label>
            <small style={{ color: "#6B7280" }}>{isPaid ? "Unlimited" : `Free: ${FREE_MAX_COUNTRIES} countries`}</small>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
            {TOP_COUNTRIES.map(c => (
              <button key={c} onClick={()=>toggleCountry(c)} style={{
                padding: "8px 12px",
                borderRadius: 10,
                border: selectedCountries.includes(c) ? "2px solid #2563EB" : "1px solid #E6EAF2",
                background: selectedCountries.includes(c) ? "#eef6ff" : "#fff",
                cursor: isCountryDisabled(c) ? "not-allowed" : "pointer",
                opacity: isCountryDisabled(c) ? 0.5 : 1
              }}>{c}</button>
            ))}
          </div>
        </div>

        {/* A-Z countries block */}
        <div style={{ marginTop: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label style={{ fontWeight: 800 }}>All countries (A–Z)</label>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={()=>setCountriesOpen(prev=>!prev)} style={smallBtnStyle}>{countriesOpen ? "Hide" : "Show"}</button>
            </div>
          </div>

          {countriesOpen && (
            <div style={{
              marginTop: 10,
              border: "1px solid #E6EAF2",
              borderRadius: 12,
              padding: 10,
              maxHeight: 220, // shows ~5 items height
              overflowY: "auto",
              background: "#fff"
            }}>
              {Object.keys(ALL_COUNTRIES).map(letter => (
                <div key={letter} style={{ marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <button onClick={() => setOpenLetter(openLetter===letter?null:letter)} style={{ ...linkBtn }}>{letter} {openLetter===letter ? "▼" : "▶"}</button>
                    <small style={{ color: "#6B7280" }}>{ALL_COUNTRIES[letter].length} countries</small>
                  </div>
                  {openLetter === letter && (
                    <div style={{ marginTop: 6, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px,1fr))", gap: 6 }}>
                      {ALL_COUNTRIES[letter].map(c => {
                        const disabled = isCountryDisabled(c);
                        return (
                          <div key={c} onClick={() => !disabled && toggleCountry(c)} style={{
                            padding: 8,
                            borderRadius: 8,
                            border: selectedCountries.includes(c) ? "2px solid #2563EB" : "1px solid #E6EAF2",
                            background: selectedCountries.includes(c) ? "#eef6ff" : "#fff",
                            cursor: disabled ? "not-allowed" : "pointer",
                            opacity: disabled ? 0.5 : 1
                          }}>{c}</div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Apps */}
        <div style={{ marginTop: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label style={{ fontWeight: 800 }}>Where should AI search clients?</label>
            <small style={{ color: "#6B7280" }}>{isPaid ? "Unlimited sources" : `Free: select up to ${FREE_MAX_APPS} apps`}</small>
          </div>

          <div style={{
            marginTop: 8,
            border: "1px solid #E6EAF2",
            borderRadius: 12,
            padding: 8,
            maxHeight: 200,
            overflowY: "auto",
            background: "#fff"
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px,1fr))", gap: 8 }}>
              {APPS.map(a => {
                const disabled = isAppDisabled(a);
                return (
                  <div key={a} onClick={() => !disabled && toggleApp(a)} style={{
                    padding: 10,
                    borderRadius: 10,
                    border: selectedApps.includes(a) ? "2px solid #2563EB" : "1px solid #E6EAF2",
                    background: selectedApps.includes(a) ? "#eef6ff" : "#fff",
                    cursor: disabled ? "not-allowed" : "pointer",
                    opacity: disabled ? 0.5 : 1,
                    textAlign: "center"
                  }}>
                    {a}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* error */}
        {error && <div style={{ marginTop: 12, color: "crimson", fontWeight: 700 }}>{error}</div>}

        {/* Actions */}
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button onClick={handleGenerate} style={{ flex: 1, padding: 12, borderRadius: 10, background: "#2563EB", color: "#fff", fontWeight: 800 }}>
            {loading ? "Generating..." : "Generate 5 Emails"}
          </button>
          <button onClick={resetForm} style={{ flex: 1, padding: 12, borderRadius: 10, border: "1px solid #E6EAF2", background: "#fff" }}>
            Reset
          </button>
        </div>

        {/* Emails result */}
        {emails.length > 0 && (
          <div style={{ marginTop: 18 }}>
            <h3 style={{ marginBottom: 8, fontWeight: 800 }}>Pick one email</h3>
            <div style={{ display: "grid", gap: 10 }}>
              {emails.map((e, i) => (
                <div key={i} onClick={() => setSelectedEmailIndex(i)} style={{
                  padding: 12,
                  borderRadius: 12,
                  border: selectedEmailIndex === i ? "3px solid #2563EB" : "1px solid #E6EAF2",
                  background: "#fff",
                  cursor: "pointer",
                  whiteSpace: "pre-wrap"
                }}>
                  <div style={{ fontWeight: 800, marginBottom: 8 }}>Option {i+1}</div>
                  <div style={{ color: "#334155" }}>{e}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button onClick={copySelectedEmail} disabled={selectedEmailIndex===null} style={{ flex: 1, padding: 12, borderRadius: 10, background: selectedEmailIndex===null ? "#94A3B8" : "#10B981", color: "#fff", fontWeight: 700, border: "none", cursor: selectedEmailIndex===null ? "not-allowed" : "pointer" }}>
                Copy Selected
              </button>
              <button onClick={()=>alert("Send action not implemented in demo — later we'll wire Gmail / send service")} style={{ padding: 12, borderRadius: 10, border: "1px solid #E6EAF2", background: "#fff" }}>
                Send (demo)
              </button>
            </div>
          </div>
        )}

        {/* footer note */}
        <div style={{ marginTop: 18, color: "#6B7280", fontSize: 13 }}>
          <div><strong>Free</strong>: limited selections and 20 emails/day simulated. <strong>Paid</strong>: unlimited (real enforcement will be added after payment & auth hookup).</div>
        </div>

      </div>
    </div>
  );
}

/* --- small inline style helpers --- */
const inputStyle = {
  width: "100%",
  padding: 12,
  borderRadius: 10,
  border: "1px solid #E6EAF2",
  marginTop: 6,
  background: "#fff"
};

const smallBtnStyle = {
  padding: "6px 10px",
  borderRadius: 8,
  border: "1px solid #E6EAF2",
  background: "#fff",
  cursor: "pointer"
};

const linkBtn = {
  background: "transparent",
  border: "none",
  fontWeight: 700,
  padding: 0,
  cursor: "pointer"
};
