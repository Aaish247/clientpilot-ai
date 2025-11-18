"use client";
import React, { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [client, setClient] = useState("");

  const handleStart = () => {
    alert("Demo only — backend will be added next.");
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#F7F9FC",
        padding: "28px 18px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#2563EB,#7C3AED)",
              }}
            />
            <strong>ClientPilot AI</strong>
          </div>

          <a
            href="/plans"
            style={{
              padding: "8px 12px",
              border: "1px solid #2563EB",
              borderRadius: 10,
              color: "#2563EB",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            See Plans →
          </a>
        </header>

        <section
          style={{
            background: "white",
            padding: 20,
            borderRadius: 16,
            border: "1px solid #E6EAF2",
            boxShadow: "0 6px 12px rgba(0,0,0,0.06)",
          }}
        >
          <h1 style={{ fontSize: 28, marginBottom: 8 }}>
            Find Clients While You Sleep 😴
          </h1>
          <p style={{ color: "#475569", marginBottom: 20 }}>
            Tell us what you offer — we find clients for you.
          </p>

          <label style={{ display: "block", marginBottom: 12 }}>
            <strong>Your Name</strong>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Aaish"
              style={inputStyle}
            />
          </label>

          <label style={{ display: "block", marginBottom: 12 }}>
            <strong>Your Service</strong>
            <input
              value={service}
              onChange={(e) => setService(e.target.value)}
              placeholder="Video editing / SMM / Websites"
              style={inputStyle}
            />
          </label>

          <label style={{ display: "block", marginBottom: 12 }}>
            <strong>Your Ideal Client</strong>
            <input
              value={client}
              onChange={(e) => setClient(e.target.value)}
              placeholder="Fitness influencers / DTC brands"
              style={inputStyle}
            />
          </label>

          <button onClick={handleStart} style={startBtn}>
            Start (Demo)
          </button>
        </section>
      </div>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #DCE3EF",
  marginTop: 6,
};

const startBtn: React.CSSProperties = {
  marginTop: 12,
  width: "100%",
  padding: "12px 16px",
  background: "linear-gradient(135deg,#2563EB,#1D4ED8)",
  color: "white",
  border: "none",
  borderRadius: 12,
  fontWeight: 700,
  cursor: "pointer",
};
