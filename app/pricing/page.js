// app/pricing/page.js
export default function Pricing() {
  return (
    <div className="container">
      <div className="hero center">
        <h1 style={{ fontSize: 32 }}>Pricing Plans</h1>
        <p style={{ color: "#475569" }}>Pick the right plan for your outreach.</p>
      </div>

      <div className="plans">
        <div className="plan">
          <h3>Free</h3>
          <h2 style={{ marginTop: 6 }}>$0</h2>
          <ul style={{ marginTop: 10, color: "#475569" }}>
            <li>20 emails/day</li>
            <li>AI-generated outreach</li>
            <li>Basic follow-up email</li>
            <li>Limited priority</li>
            <li>Testing & trial</li>
          </ul>
          <a href="/tool" className="btn btn-primary" style={{ display: "block", marginTop: 12 }}>Start Free</a>
        </div>

        <div className="plan highlight">
          <h3>Monthly</h3>
          <h2 style={{ marginTop: 6 }}>$49.99 / month</h2>
          <ul style={{ marginTop: 10, color: "#475569" }}>
            <li>200 emails/day</li>
            <li>AI-crafted personalization</li>
            <li>3-step follow-up automation</li>
            <li>Multi-platform searching</li>
            <li>Priority support</li>
          </ul>
          {/* Put Gumroad link later */}
          <a href="/tool" className="btn btn-primary" style={{ display: "block", marginTop: 12 }}>Get Monthly</a>
        </div>

        <div className="plan">
          <h3>Lifetime</h3>
          <h2 style={{ marginTop: 6 }}>$99.99 one-time</h2>
          <ul style={{ marginTop: 10, color: "#475569" }}>
            <li>200 emails/day</li>
            <li>All Monthly features</li>
            <li>Lifetime updates</li>
            <li>VIP support</li>
            <li>Commercial use</li>
          </ul>
          <a href="/tool" className="btn btn-primary" style={{ display: "block", marginTop: 12 }}>Buy Lifetime</a>
        </div>
      </div>
    </div>
  );
}    </div>
  );
}        }}>
          <h2>Monthly</h2>
          <p style={{ fontSize: "14px" }}>Best for professionals.</p>
          <h3 style={{ marginTop: "10px" }}>$49.99 / month</h3>
          <ul style={{ textAlign: "left", marginTop: "15px", fontSize: "14px", lineHeight: "22px" }}>
            <li>• Unlimited Emails</li>
            <li>• Smart Follow-Up AI</li>
            <li>• Multi-Platform Client Search</li>
            <li>• Priority Speed</li>
          </ul>

          <a href="YOUR_GUMROAD_MONTHLY_LINK_HERE" style={{ textDecoration: "none" }}>
            <button style={{ marginTop: "20px", width: "100%" }}>Buy Now</button>
          </a>
        </div>

        {/* LIFETIME PLAN */}
        <div style={{
          border: "2px solid #0038ff",
          padding: "20px",
          width: "260px",
          borderRadius: "14px"
        }}>
          <h2>Lifetime</h2>
          <p style={{ fontSize: "14px" }}>Pay once, use forever.</p>
          <h3 style={{ marginTop: "10px" }}>$129.99 / once</h3>
          <ul style={{ textAlign: "left", marginTop: "15px", fontSize: "14px", lineHeight: "22px" }}>
            <li>• Everything in Monthly</li>
            <li>• Lifetime Updates</li>
            <li>• VIP Support</li>
          </ul>

          <a href="YOUR_GUMROAD_LIFETIME_LINK_HERE" style={{ textDecoration: "none" }}>
            <button style={{ marginTop: "20px", width: "100%" }}>Buy Lifetime</button>
          </a>
        </div>

      </div>
    </div>
  );
            }
