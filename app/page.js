import Link from "next/link";

export default function Home() {
  return (
    <main className="container">
      <header className="header">
        <div className="logo">
          <div className="logo-dot" />
          <div className="brand">ClientPilot AI</div>
        </div>
        <nav>
          <Link href="/pricing">See plans & upgrade →</Link>
        </nav>
      </header>

      <section className="hero">
        <h1 style={{fontSize:28}}>Find clients while you sleep</h1>
        <p style={{marginTop:8,color:'#475569'}}>Tell us what you do — our AI will search the web and return leads for outreach.</p>
      </section>

      <section style={{marginTop:18}}>
        <div className="card">
          <h2 style={{fontSize:18}}>Quick start</h2>
          <p className="small-muted">Fill the form on the <strong>Tool</strong> page to generate outreach emails. Scroll down to see plans.</p>

          <div style={{display:'flex',gap:12,marginTop:14}}>
            <Link href="/tool"><button className="btn-primary">Open tool (demo)</button></Link>
            <Link href="/pricing"><button className="btn-ghost">See plans & upgrade</button></Link>
          </div>
        </div>
      </section>

      <footer className="footer">© {new Date().getFullYear()} ClientPilot AI</footer>
    </main>
  );
}
