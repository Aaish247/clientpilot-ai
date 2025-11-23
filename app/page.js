// app/page.js
import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: 24, display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 920 }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h1 style={{ fontSize: 28 }}>ClientPilot AI</h1>
          <Link href="/pricing"><button style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #DCE3EF" }}>See plans & upgrade →</button></Link>
        </header>

        <section style={{ background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 12px 28px rgba(15,23,42,0.06)" }}>
          <h2 style={{ marginBottom: 8 }}>Find clients while you sleep</h2>
          <p style={{ color: "var(--muted)" }}>Tell us about your service. Our AI will search platforms and generate personalized outreach for your target countries.</p>

          <div style={{ marginTop: 18 }}>
            <Link href="/tool"><button style={{ background: "linear-gradient(135deg,#2563EB,#1D4ED8)", color: "#fff", padding: "12px 16px", borderRadius: 10, border: "none" }}>Start My Setup</button></Link>
          </div>
        </section>
      </div>
    </main>
  );
  }
