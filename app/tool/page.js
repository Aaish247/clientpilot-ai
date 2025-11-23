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
  const [loading, setLoading] = useState(false);
  const [emails, setEmails] = useState([]);
  const [error, setError] = useState("");
  const [tone, setTone] = useState("friendly");
  const MAX_FREE_APPS = 3;

  const toggleCountry = (c) => {
    setSelectedCountries(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  };

  const toggleApp = (a) => {
    if (!selectedApps.includes(a)) {
      if (selectedApps.length >= MAX_FREE_APPS) {
        setError(`Free plan: max ${MAX_FREE_APPS} apps.`);
        return;
      }
    }
    setSelectedApps(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);
  };

  // ⭐ FIXED handleGenerate – clean, stable, correct split
  const handleGenerate = async () => {
    setError("");
    if (!service || !email || !name) {
      setError("Please enter name, email and service.");
      return;
    }
    if (selectedApps.length === 0) {
      setError("Select at least one app.");
      return;
    }
    if (selectedCountries.length === 0) {
      setError("Select at least one country.");
      return;
    }

    setLoading(true);
    setEmails([]);

    try {
      const payload = {
        name,
        email,
        service,
        selectedCountries,
        selectedApps,
        budget,
        tone
      };

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data || !data.emails) {
        setError("AI returned nothing.");
        setLoading(false);
        return;
      }

      // ⭐ SUPER SAFE SPLIT
      const emailList = data.emails
        .split(/(?:^|\n)(?=\d+\.)/)
        .map(e => e.trim())
        .filter(e => /^\d+\./.test(e))
        .slice(0, 5);

      if (emailList.length === 0) {
        setError("AI returned nothing.");
        setLoading(false);
        return;
      }

      setEmails(emailList);
    } catch (err) {
      console.error(err);
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 12 }}>Your Client Finder</h1>

      <div style={{ background: "#fff", borderRadius: 12, padding: 16, boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}>
        
        {/* Name */}
        <label style={{ fontWeight: 700 }}>Your Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name"
               style={{ width:"100%", padding:12, marginTop:8, borderRadius:10, border:"1px solid #E6EAF2" }} />

        {/* Email */}
        <label style={{ fontWeight:700, marginTop:12, display:"block" }}>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"
               style={{ width:"100%", padding:12, marginTop:8, borderRadius:10, border:"1px solid #E6EAF2" }} />

        {/* Service */}
        <label style={{ fontWeight:700, marginTop:12, display:"block" }}>Your Service</label>
        <input value={service} onChange={e=>setService(e.target.value)} placeholder="e.g., Social media ads"
               style={{ width:"100%", padding:12, marginTop:8, borderRadius:10, border:"1px solid #E6EAF2" }} />

        {/* Generate button */}
        <button onClick={handleGenerate} style={{ marginTop:16, width:"100%", padding:12, borderRadius:10, border:"none",
          background:"linear-gradient(135deg,#2563EB,#1D4ED8)", color:"#fff", fontWeight:800 }}>
          {loading ? "Generating..." : "Create Emails"}
        </button>

        {error && <div style={{ color:"red", marginTop:12 }}>{error}</div>}
      </div>

      {/* RESULT CARDS */}
      {emails.length > 0 && (
        <div style={{ marginTop: 20, display:"grid", gap:12 }}>
          {emails.map((raw, i) => (
            <div key={i} style={{ background:"#fff", padding:12, borderRadius:10, border:"2px solid #E6EAF2" }}>
              <div style={{ fontWeight:800 }}>Option {i + 1}</div>
              <pre style={{ whiteSpace:"pre-wrap" }}>{raw}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
