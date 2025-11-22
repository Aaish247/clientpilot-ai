export default function PricingPage(){
  return (
    <main className="container">
      <header className="header"><div className="logo"><div className="logo-dot"/><div className="brand">ClientPilot AI</div></div></header>

      <section style={{marginTop:18}}>
        <h1>Pricing Plans</h1>
        <p className="small-muted">Choose the plan that fits you. Payments handled by Gumroad (link later).</p>

        <div className="plans-grid">
          <div className="plan-card">
            <h3>Free</h3>
            <h2>$0 / forever</h2>
            <ul>
              <li>20 emails / day</li>
              <li>Choose up to 3 apps</li>
              <li>Basic AI messages</li>
              <li>Email inbox demo</li>
            </ul>
            <a href="/"> <button className="btn-primary">Get Free</button></a>
          </div>

          <div className="plan-card" style={{border:'2px solid #2563EB',boxShadow:'0 16px 40px rgba(37,99,235,0.12)'}}>
            <h3>Monthly</h3>
            <h2>$49.99 / month</h2>
            <ul>
              <li>200 emails / day</li>
              <li>Unlimited apps & countries</li>
              <li>Follow-up automation (paid)</li>
              <li>Priority processing</li>
              <li>50 saved campaigns</li>
            </ul>
            <a href="#"><button className="btn-primary">Buy Monthly</button></a>
          </div>

          <div className="plan-card">
            <h3>Lifetime</h3>
            <h2>$149.99</h2>
            <ul>
              <li>Everything in Monthly</li>
              <li>Lifetime updates</li>
              <li>VIP support</li>
            </ul>
            <a href="#"><button className="btn-primary">Buy Lifetime</button></a>
          </div>
        </div>
      </section>

      <footer className="footer">© {new Date().getFullYear()} ClientPilot AI</footer>
    </main>
  );
}
