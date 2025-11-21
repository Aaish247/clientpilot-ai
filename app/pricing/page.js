export default function Pricing() {
  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px" }}>
      <h1 style={{ fontSize: "36px", textAlign: "center", marginBottom: "20px" }}>
        Pricing Plans
      </h1>

      <p style={{ textAlign: "center", marginBottom: "30px" }}>
        Simple and affordable plans for client outreach automation.
      </p>

      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px"
      }}>
        
        <div style={{
          padding: "20px",
          borderRadius: "10px",
          border: "1px solid #ccc"
        }}>
          <h2>Free Plan</h2>
          <p>✔ 10 emails per day<br/>✔ Basic tone<br/>✔ Standard speed</p>
        </div>

        <div style={{
          padding: "20px",
          borderRadius: "10px",
          border: "1px solid #ccc"
        }}>
          <h2>Pro Plan — $9/mo</h2>
          <p>✔ Unlimited emails<br/>✔ Premium tone options<br/>✔ Faster responses</p>
        </div>

      </div>
    </div>
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
