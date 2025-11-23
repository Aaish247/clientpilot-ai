// app/pricing/page.js
export default function PricingPage() {
  const monthly = "https://aishmuhammad.gumroad.com/l/npihx";
  const lifetime = "https://aishmuhammad.gumroad.com/l/rfssks";
  return (
    <div className="container" style={{ marginTop: 40 }}>
      <h1 style={{ textAlign: "center", marginBottom: 8 }}>Choose your plan</h1>
      <p style={{ textAlign: "center", color: "var(--muted)" }}>Start free. Upgrade anytime.</p>

      <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
        <div style={{ width: 280, padding: 18, borderRadius: 12, background: "var(--card)", border: "2px solid #E6EAF2" }}>
          <h3>Free</h3>
          <p>15 emails/week • Test features</p>
          <h4>$0</h4>
          <a href="/"><button style={{ width: "100%", padding: 10 }}>Get Started</button></a>
        </div>

        <div style={{ width: 280, padding: 18, borderRadius: 12, background: "linear-gradient(135deg,#f7fbff,#ffffff)", border: "2px solid var(--accent)" }}>
          <h3>Monthly</h3>
          <p>200 emails/day • Follow-ups • Priority</p>
          <h4>$49.99 / month</h4>
          <a href={monthly} target="_blank"><button style={{ width: "100%", padding: 10 }}>Buy Monthly</button></a>
        </div>

        <div style={{ width: 280, padding: 18, borderRadius: 12, background: "var(--card)", border: "2px solid #E6EAF2" }}>
          <h3>Lifetime</h3>
          <p>One-time payment • Unlimited</p>
          <h4>$149.99</h4>
          <a href={lifetime} target="_blank"><button style={{ width: "100%", padding: 10 }}>Buy Lifetime</button></a>
        </div>
      </div>
    </div>
  );
}
