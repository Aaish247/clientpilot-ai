// app/tool/page.js
"use client";

import { useState } from "react";

const TOP_COUNTRIES = ["USA", "UK", "UAE", "Canada", "Australia"];
const ALL_COUNTRIES = {
  A: ["Afghanistan","Albania","Algeria","Andorra","Angola"],
  B: ["Bahamas","Bahrain","Bangladesh","Barbados","Belgium"],
  C: ["Cambodia","Cameroon","Canada","Chad","Chile","China","Colombia"],
  D: ["Denmark","Dominica","Dominican Republic"],
  E: ["Ecuador","Egypt","El Salvador","Estonia"],
  F: ["Fiji","Finland","France"],
  G: ["Gabon","Gambia","Georgia","Germany","Ghana"],
  H: ["Haiti","Honduras","Hungary"],
  I: ["Iceland","India","Indonesia","Iran","Iraq","Ireland","Italy"],
  J: ["Jamaica","Japan","Jordan"],
  K: ["Kazakhstan","Kenya","Kuwait","Kyrgyzstan"],
  L: ["Laos","Latvia","Lebanon","Liberia","Libya","Lithuania"],
  M: ["Madagascar","Malawi","Malaysia","Maldives","Mali","Mexico","Morocco"],
  N: ["Namibia","Nepal","Netherlands","New Zealand","Nigeria","Norway"],
  O: ["Oman"],
  P: ["Pakistan","Panama","Paraguay","Peru","Philippines","Poland","Portugal"],
  Q: ["Qatar"],
  R: ["Romania","Russia","Rwanda"],
  S: ["Saudi Arabia","Senegal","Serbia","Singapore","Slovakia","Slovenia","Somalia","Spain","Sri Lanka","Sweden","Switzerland"],
  T: ["Taiwan","Tajikistan","Tanzania","Thailand","Tunisia","Turkey"],
  U: ["Uganda","Ukraine","UAE","UK","USA","Uruguay","Uzbekistan"],
  V: ["Vanuatu","Venezuela","Vietnam"],
  W: ["West Bank"],
  Y: ["Yemen"],
  Z: ["Zambia","Zimbabwe"]
};

const APPS = ["LinkedIn","Instagram","TikTok","Facebook","Upwork","Fiverr","Freelancer","YouTube","Google Maps","Crunchbase"];

export default function ToolPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("$0–500");
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedApps, setSelectedApps] = useState([]);
  const [openLetter, setOpenLetter] = useState(null);
  const [openApps, setOpenApps] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emails, setEmails] = useState([]);
  const [error, setError] = useState("");
  const [tone, setTone] = useState("friendly"); // friendly, motivated, greedy, professional, simple
  const MAX_FREE_APPS = 3;

  const toggleCountry = (c) => {
    setSelectedCountries(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  };
  const toggleApp = (a) => {
    if (!selectedApps.includes(a)) {
      if (selectedApps.length >= MAX_FREE_APPS) {
        setError(`Free plan: max ${MAX_FREE_APPS} apps. Upgrade for more.`);
        return;
      }
    }
    setSelectedApps(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);
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
    try {
      const payload = {
        name,
        email,
        service,
        selectedCountry: selectedCountries[0] || selectedCountries.join(", "),
        selectedApps,
        budget,
        extraInfo: "", // optional extra field
        tone
      };

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.error) {
        setError("AI Error: " + (typeof data.error === "string" ? data.error : JSON.stringify(data.error)));
        setLoading(false);
        return;
      }

      const raw = data.emails || "";
      if (!raw || raw.trim().length < 5) {
        setError("AI returned nothing. Try again.");
        setLoading(false);
        return;
      }

      // Split by numbered items (1., 2., 3., ...)
      const emailList = raw
        .split(/\n(?=\d\.)/) // split at newlines that precede "1.", "2." etc
        .map(e => e.trim())
        .filter(Boolean)
        .slice(0, 5);

      if (emailList.length === 0) {
        setError("AI returned nothing. Try again.");
        setLoading(false);
        return;
      }

      setEmails(emailList);
    } catch (err) {
      console.error(err);
      setError("Server or network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 12 }}>Your Client Finder</h1>

      <div style={{ background: "#fff", borderRadius: 12, padding: 16, boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}>
        <label style={{ fontWeight: 700 }}>Your Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" style={{ width:"100%", padding:12, marginTop:8, borderRadius:10, border:"1px solid #E6EAF2", background:"#fff" }} />

        <label style={{ fontWeight:700, marginTop:12, display:"block" }}>Email (for outreach)</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" style={{ width:"100%", padding:12, marginTop:8, borderRadius:10, border:"1px solid #E6EAF2", background:"#fff" }} />

        <label style={{ fontWeight:700, marginTop:12, display:"block" }}>What service do you offer?</label>
        <input value={service} onChange={e=>setService(e.target.value)} placeholder="e.g., Social media ads management" style={{ width:"100%", padding:12, marginTop:8, borderRadius:10, border:"1px solid #E6EAF2", background:"#fff" }} />

        <div style={{ display:"flex", gap:12, marginTop:12 }}>
          <div style={{ flex:1 }}>
            <label style={{ fontWeight:700 }}>Target Countries (Top picks)</label>
            <div style={{ display:"flex", gap:8, marginTop:8, flexWrap:"wrap" }}>
              {TOP_COUNTRIES.map(c => (
                <button key={c} onClick={()=>toggleCountry(c)} style={{ padding:"8px 10px", borderRadius:8, border: selectedCountries.includes(c) ? `2px solid var(--accent)` : "1px solid #E6EAF2", background:"#fff" }}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div style={{ width:220 }}>
            <label style={{ fontWeight:700 }}>Budget</label>
            <select value={budget} onChange={e=>setBudget(e.target.value)} style={{ width:"100%", padding:10, borderRadius:8, marginTop:8 }}>
              <option>$0–500</option>
              <option>$500–1500</option>
              <option>$1500–5000</option>
              <option>$5000+</option>
            </select>
          </div>
        </div>

        {/* A → Z collapsible list with scroll (shows 5 items at a time height) */}
        <div style={{ marginTop:14, border:"1px solid #E6EAF2", borderRadius:10, padding:10, maxHeight:220, overflowY:"auto" }}>
          {Object.keys(ALL_COUNTRIES).map(letter => (
            <div key={letter} style={{ marginBottom:8 }}>
              <div onClick={()=>setOpenLetter(openLetter===letter?null:letter)} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", fontWeight:700, padding:"6px 8px", background:"#fff", borderRadius:8 }}>
                <div>{letter}</div>
                <div>{openLetter===letter ? "▼" : "▶"}</div>
              </div>

              {openLetter===letter && (
                <div style={{ paddingLeft:10, paddingTop:8 }}>
                  {ALL_COUNTRIES[letter].map(c => (
                    <div key={c} onClick={()=>toggleCountry(c)} style={{ padding:"6px", borderRadius:8, cursor:"pointer", background: selectedCountries.includes(c) ? "#EFF6FF" : "transparent", border: "1px solid transparent", marginBottom:6 }}>
                      {c}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Apps selection */}
        <div style={{ marginTop: 14 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <label style={{ fontWeight:700 }}>Where should AI search?</label>
            <div style={{ fontSize:12, color:"var(--muted)" }}>Free: max {MAX_FREE_APPS} apps</div>
          </div>

          <div style={{ marginTop:8, border:"1px solid #E6EAF2", borderRadius:10, padding:8, maxHeight:200, overflowY:"auto" }}>
            {APPS.map(a => (
              <div key={a} onClick={() => toggleApp(a)} style={{ padding:"8px", borderRadius:8, cursor:"pointer", background: selectedApps.includes(a) ? "#EFF6FF" : "transparent", marginBottom:6 }}>
                {a}
              </div>
            ))}
          </div>
        </div>

        {/* Tone */}
        <div style={{ marginTop:12 }}>
          <label style={{ fontWeight:700 }}>Email Voice</label>
          <div style={{ display:"flex", gap:8, marginTop:8 }}>
            {[
              ["friendly","Friendly"],
              ["motivated","Motivated"],
              ["greedy","Greedy"],
              ["professional","Professional"],
              ["simple","Simple"]
            ].map(([val,label]) => (
              <button key={val} onClick={()=>setTone(val)} style={{ padding:"8px 10px", borderRadius:8, border: tone===val ? `2px solid var(--accent)` : "1px solid #E6EAF2", background:"#fff" }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div style={{ display:"flex", gap:10, marginTop:16 }}>
          <button onClick={handleGenerate} style={{ flex:1, padding:12, borderRadius:10, background:"linear-gradient(135deg,#2563EB,#1D4ED8)", color:"#fff", border:"none", fontWeight:800 }}>
            {loading ? "Generating..." : "Create Emails"}
          </button>
          <button onClick={()=>{ setEmails([]); setError(""); }} style={{ padding:12, borderRadius:10, border:"1px solid #E6EAF2", background:"#fff" }}>
            Clear
          </button>
        </div>

        {error && <div style={{ color:"crimson", marginTop:12 }}>{error}</div>}
      </div>

      {/* Results */}
      <div style={{ marginTop: 18 }}>
        {emails.length > 0 && (
          <div style={{ display:"grid", gap:12 }}>
            {emails.map((raw, i) => (
              <div key={i} style={{ background:"#fff", padding:12, borderRadius:10, border: "2px solid #E6EAF2" }}>
                <div style={{ fontWeight:800, marginBottom:8 }}>Option {i+1}</div>
                <pre style={{ whiteSpace:"pre-wrap", fontFamily:"inherit" }}>{raw}</pre>
                <div style={{ display:"flex", gap:8, marginTop:8 }}>
                  <button style={{ padding:8, borderRadius:8, background:"#2563EB", color:"#fff" }} onClick={()=>alert("Selected Option " + (i+1))}>Select</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
