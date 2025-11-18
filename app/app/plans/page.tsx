export default function Plans() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#F7F9FC",
        padding: "28px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontSize: 32, marginBottom: 10, textAlign: "center" }}>
          Choose Your Plan
        </h1>

        <p
          style={{
            textAlign: "center",
            marginBottom: 30,
            color: "#475569",
          }}
        >
          More features. More clients. Faster results.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
          }}
        >
          {/* Free Plan */}
          <div style={card}>
            <h2>Free Plan</h2>
            <p style={price}>$0</p>
            <ul>
              <li>20 outreach emails</li>
              <li>Basic ClientPilot AI</li>
              <li>Email templates</li>
            </ul>
            <button style={btn}>Start Free</button>
          </div>

          {/* Monthly */}
          <div style={card}>
            <h2>Monthly</h2>
            <p style={price}>$49.99 / month</p>
            <ul>
              <li>Unlimited outreach</li>
              <li>Premium AI</li>
              <li>Follow-up emails</li>
              <li>Smart client finder</li>
              <li>Priority support</li>
            </ul>
            <button style={btn}>Buy Monthly</button>
          </div>

          {/* Yearly */}
          <div style={card}>
            <h2>Yearly</h2>
            <p style={price}>$99.99 / year</p>
            <ul>
              <li>Everything in Monthly</li>
              <li>Save money (best value)</li>
              <li>Bonus templates</li>
            </ul>
            <button style={btn}>Buy Yearly</button>
          </div>

          {/* Lifetime */}
          <div style={card}>
            <h2>Lifetime</h2>
            <p style={price}>$129.99 once</p>
            <ul>
              <li>Lifetime access</li>
              <li>All future features</li>
              <li>VIP AI mode</li>
            </ul>
            <button style={btn}>Buy Lifetime</button>
          </div>
        </div>
      </div>
    </main>
  );
}

const card: React.CSSProperties = {
  background: "white",
  padding: 22,
  borderRadius: 16,
  border: "1px solid #E6EAF2",
  boxShadow: "0 6px 12px rgba(0,0,0,0.06)",
};

const price: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 700,
  marginBottom: 8,
};

const btn: React.CSSProperties = {
  marginTop: 14,
  width: "100%",
  padding: "12px 16px",
  background: "linear-gradient(135deg,#2563EB,#1D4ED8)",
  color: "white",
  border: "none",
  borderRadius: 12,
  fontWeight: 700,
  cursor: "pointer",
};
