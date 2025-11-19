export default function PricingPage() {
  return (
    <div className="container" style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Pricing Plans</h1>
      <p>Choose the right plan for your growth.</p>

      <div style={{ display: "flex", gap: "20px", marginTop: "40px", justifyContent: "center", flexWrap: "wrap" }}>

        {/* FREE PLAN */}
        <div style={{
          border: "2px solid #0038ff",
          padding: "20px",
          width: "260px",
          borderRadius: "14px"
        }}>
          <h2>Free</h2>
          <p style={{ fontSize: "14px" }}>Perfect for testing.</p>
          <h3 style={{ marginTop: "10px" }}>$0 / forever</h3>
          <ul style={{ textAlign: "left", marginTop: "15px", fontSize: "14px", lineHeight: "22px" }}>
            <li>• 20 Emails Per Day</li>
            <li>• Basic AI Replies</li>
            <li>• No Follow-Up Automation</li>
          </ul>

          <a href="/" style={{ textDecoration: "none" }}>
            <button style={{ marginTop: "20px", width: "100%" }}>Get Started</button>
          </a>
        </div>

        {/* MONTHLY PLAN */}
        <div style={{
          border: "2px solid #0038ff",
          padding: "20px",
          width: "260px",
          borderRadius: "14px",
          background: "#f7faff"
        }}>
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
