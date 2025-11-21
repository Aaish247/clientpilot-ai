export default function Home() {
  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px" }}>
      <h1 style={{ fontSize: "40px", textAlign: "center", marginBottom: "20px" }}>
        ClientPilot AI
      </h1>

      <p style={{ textAlign: "center", fontSize: "18px", marginBottom: "30px" }}>
        Generate high-converting client outreach emails in seconds.
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <a
          href="/tool"
          style={{
            padding: "12px 20px",
            background: "#0038ff",
            borderRadius: "8px",
            color: "white",
            fontSize: "18px",
            textDecoration: "none",
          }}
        >
          Launch Tool
        </a>

        <a
          href="/pricing"
          style={{
            padding: "12px 20px",
            background: "#eee",
            borderRadius: "8px",
            color: "#333",
            fontSize: "18px",
            textDecoration: "none",
          }}
        >
          Pricing
        </a>
      </div>
    </div>
  );
          }
