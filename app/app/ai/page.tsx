"use client";
import { useState } from "react";

export default function AIPage() {
  const [service, setService] = useState("");
  const [client, setClient] = useState("");
  const [offer, setOffer] = useState("");
  const [result, setResult] = useState("");

  function generateEmail() {
    const email = `
Hi ${client},

I hope you're doing well.

My name is ____ and I help businesses with ${service}. 
I noticed that ${client} could benefit from ${offer}, and I would love to help you achieve better results.

If you're open to it, I can send you a quick demo or answer any questions.

Looking forward to hearing from you.

Best regards,
(Your Name)
    `;

    setResult(email);
  }

  return (
    <main
      style={{
        padding: 30,
        fontFamily: "Inter, sans-serif",
        maxWidth: 800,
        margin: "0 auto",
      }}
    >
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>ClientPilot AI</h1>

      <label>What service do you offer?</label>
      <input
        style={input}
        value={service}
        onChange={(e) => setService(e.target.value)}
      />

      <label>Client Name / Business Name:</label>
      <input
        style={input}
        value={client}
        onChange={(e) => setClient(e.target.value)}
      />

      <label>What can you help them with? (Your offer)</label>
      <input
        style={input}
        value={offer}
        onChange={(e) => setOffer(e.target.value)}
      />

      <button style={btn} onClick={generateEmail}>
        Generate Email
      </button>

      {result && (
        <textarea
          style={{
            width: "100%",
            marginTop: 20,
            height: 250,
            padding: 14,
            fontSize: 16,
          }}
          value={result}
        />
      )}
    </main>
  );
}

const input = {
  width: "100%",
  padding: 12,
  marginBottom: 15,
  borderRadius: 10,
  border: "1px solid #d1d5db",
};

const btn = {
  width: "100%",
  padding: 14,
  background: "linear-gradient(135deg,#2563EB,#1D4ED8)",
  color: "white",
  border: "none",
  borderRadius: 12,
  fontSize: 16,
  fontWeight: 600,
  cursor: "pointer",
};
