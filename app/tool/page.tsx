"use client";
import { useState } from "react";

export default function ToolPage() {
  const [service, setService] = useState("");
  const [client, setClient] = useState("");
  const [extra, setExtra] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ service, client, extra }),
    });

    const data = await res.json();
    setResult(data.output || "Something went wrong.");
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>ClientPilot AI</h1>
      <p style={{ textAlign: "center", marginBottom: "20px" }}>
        Generate perfect client emails instantly.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        
        <input
          type="text"
          placeholder="What service are you offering?"
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
          style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc" }}
        />

        <input
          type="text"
          placeholder="Client name, business or website"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          required
          style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc" }}
        />

        <textarea
          placeholder="Extra details (optional)"
          value={extra}
          onChange={(e) => setExtra(e.target.value)}
          rows={4}
          style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc" }}
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
