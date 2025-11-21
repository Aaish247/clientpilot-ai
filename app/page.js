// app/page.js
export default function Home() {
  return (
    <div className="container">
      <div className="hero center">
        <h1 style={{ fontSize: 36, marginBottom: 8 }}>ClientPilot AI</h1>
        <p style={{ color: "#475569", fontSize: 16 }}>
          AI finds clients and writes outreach emails for you. Simple, fast, and
          ready to scale.
        </p>
      </div>

      <div style={{ display: "flex", gap: 18, justifyContent: "center", marginBottom: 18 }}>
        <a className="btn btn-primary" href="/tool">Launch Tool</a>
        <a className="btn btn-ghost" href="/pricing">See Plans</a>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: 8 }}>How it works</h2>
        <ol style={{ paddingLeft: 18, color: "#475569" }}>
          <li>Choose a plan (Free / Monthly / Lifetime)</li>
          <li>Fill the form (service, country, target, where to search)</li>
          <li>We generate outreach emails — you copy/send or use automation later</li>
        </ol>
      </div>
    </div>
  );
}        >
          Pricing
        </a>
      </div>
    </div>
  );
          }
