"use client";
import { useState } from "react";

export default function ToolPage() {
  const [service, setService] = useState("");
  const [country, setCountry] = useState("");
  const [clientType, setClientType] = useState("");
  const [searchSources, setSearchSources] = useState([]);
  const [goal, setGoal] = useState("");
  const [extra, setExtra] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const toggleSource = (src) => {
    if (searchSources.includes(src)) {
      setSearchSources(searchSources.filter((s) => s !== src));
    } else {
      setSearchSources([...searchSources, src]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service,
        country,
        clientType,
        searchSources,
        goal,
        extra,
      }),
    });

    const data = await res.json();
    setResult(data.output || "Something went wrong.");
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "750px", margin: "40px auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", fontSize: "32px", fontWeight: "bold" }}>
        ClientPilot AI – Outreach Generator
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          marginTop: "25px",
        }}
      >
        <input
          type="text"
          placeholder="1) What service do you offer?"
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
          style={inputStyle}
        />

        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
          style={inputStyle}
        >
          <option value="">2) Client's country</option>
          <option>United States</option>
          <option>United Kingdom</option>
          <option>Canada</option>
          <option>Australia</option>
          <option>India</option>
          <option>Germany</option>
          <option>France</option>
          <option>UAE</option>
        </select>

        <select
          value={clientType}
          onChange={(e) => setClientType(e.target.value)}
          required
          style={inputStyle}
        >
          <option value="">3) Who are you targeting?</option>
          <option>Local businesses</option>
          <option>E-commerce brands</option>
          <option>Real estate agents</option>
          <option>Coaches / consultants</option>
          <option>Agencies</option>
          <option>Startups</option>
        </select>

        <div style={{ fontWeight: "bold" }}>
          4) Where should we search (AAPS)?
        </div>

        <div style={checkboxWrap}>
          {["Instagram", "LinkedIn", "Facebook", "Website", "Google Maps"].map(
            (src) => (
              <label key={src} style={checkboxRow}>
                <input
                  type="checkbox"
                  checked={searchSources.includes(src)}
                  onChange={() => toggleSource(src)}
                />
                {src}
              </label>
            )
          )}
        </div>

        <input
          type="text"
          placeholder="5) What’s your goal? (Book a call, sell a service, etc.)"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          required
          style={inputStyle}
        />

        <textarea
          placeholder="6) Extra details (optional)"
          value={extra}
          onChange={(e) => setExtra(e.target.value)}
          rows={4}
          style={inputStyle}
        ></textarea>

        <button type="submit" style={buttonStyle}>
          {loading ? "Generating..." : "Generate Outreach Email"}
        </button>
      </form>

      {result && (
        <div style={resultBox}>
          <h2>Generated Email</h2>
          <pre style={{ whiteSpace: "pre-wrap" }}>{result}</pre>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px",
};

const buttonStyle = {
  padding: "14px",
  background: "#0038ff",
  color: "white",
  borderRadius: "8px",
  border: "none",
  fontSize: "17px",
  cursor: "pointer",
  fontWeight: "bold",
};

const checkboxWrap = {
  display: "flex",
  gap: "15px",
  flexWrap: "wrap",
};

const checkboxRow = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
};

const resultBox = {
  marginTop: "30px",
  padding: "20px",
  background: "#f5f5f5",
  borderRadius: "10px",
};
