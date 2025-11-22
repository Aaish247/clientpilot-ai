"use client";
import { useState, useMemo } from "react";

// minimal country list in code — full list provided below the file if you want to paste it
const TOP_COUNTRIES = ["United States","United Kingdom","Canada","United Arab Emirates","Australia"];

// short apps list for demonstration (we include many in the UI)
const APPS = [
  "LinkedIn","Instagram","Facebook","YouTube","X/Twitter","Dribbble","Behance","Upwork","Fiverr","Guru",
  "Freelancer","Crunchbase","AngelList","Clutch","Yelp","Google Maps","Apollo","RocketReach","Shopify stores","Etsy",
  "Amazon sellers","TikTok","Pinterest","ProductHunt","GitHub"
];

export default function ToolPage(){
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [service,setService] = useState("");
  const [selectedCountries,setSelectedCountries] = useState([]);
  const [selectedApps,setSelectedApps] = useState([]);
  const [budget,setBudget] = useState("");
  const [extra,setExtra] = useState("");
  const [loading,setLoading] = useState(false);
  const [result,setResult] = useState("");

  // For demo: change to 'paid' to simulate paid user
  const userPlan = "free"; // 'free' or 'paid' — later replace with real auth logic

  const countryLimit = userPlan === 'free' ? 3 : 9999;

  function toggleCountry(c){
    if(selectedCountries.includes(c)){
      setSelectedCountries(selectedCountries.filter(x=>x!==c));
    } else {
      if(selectedCountries.length >= countryLimit){
        alert('Free plan limit: max ' + countryLimit + ' countries. Upgrade to unlock all.');
        return;
      }
      setSelectedCountries([...selectedCountries,c]);
    }
  }

  function toggleApp(a){
    if(selectedApps.includes(a)) setSelectedApps(selectedApps.filter(x=>x!==a));
    else {
      if(userPlan==='free' && selectedApps.length>=3){
        alert('Free plan can only choose 3 apps.');
        return;
      }
      setSelectedApps([...selectedApps,a]);
    }
  }

  async function handleSubmit(e){
    e.preventDefault();
    if(!name||!email||!service||selectedCountries.length===0||selectedApps.length===0){
      alert('Please fill name, email, service, choose at least 1 country and 1 app.');
      return;
    }

    setLoading(true);
    setResult('');

    try{
      const res = await fetch('/api/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
        name,email,service,countries:selectedCountries,apps:selectedApps,budget,extra
      })});
      const data = await res.json();
      if(data.error) setResult('Error: ' + (data.error.message || data.error));
      else setResult(data.emails || JSON.stringify(data));
    }catch(err){
      setResult('Network error');
    }finally{setLoading(false)}
  }

  const selectedTags = useMemo(()=>selectedCountries.concat(selectedApps),[selectedCountries,selectedApps]);

  return (
    <main className="container">
      <header className="header">
        <div className="logo"><div className="logo-dot"/><div className="brand">ClientPilot AI</div></div>
        <nav><a href="/pricing">See plans & upgrade →</a></nav>
      </header>

      <section style={{marginTop:14}}>
        <div className="card">
          <h2>Tell us what you do</h2>
          <p className="small-muted">We’ll search and send outreach emails based on this. This is a demo UI — sign up to use full features.</p>

          <form onSubmit={handleSubmit} style={{marginTop:12,display:'grid',gap:12}}>
            <div>
              <label><strong>Your name</strong></label>
              <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Your full name"/>
            </div>

            <div>
              <label><strong>Your email (for outreach)</strong></label>
              <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/>
            </div>

            <div>
              <label><strong>What service do you offer?</strong></label>
              <input className="input" value={service} onChange={e=>setService(e.target.value)} placeholder="E.g. Social media ads, Web design, Video editing"/>
            </div>

            <div>
              <label><strong>From where should we search clients?</strong></label>
              <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:8}}>
                {APPS.map(a=> (
                  <button type="button" key={a} onClick={()=>toggleApp(a)} className="tag" style={{border:selectedApps.includes(a)?'2px solid #2563EB':'none',background:selectedApps.includes(a)?'#EEF2FF':'#F7FAFF'}}>{a}</button>
                ))}
              </div>
              <div className="small-muted" style={{marginTop:8}}>Free plan: choose up to 3 apps. Paid: unlimited.</div>
            </div>

            <div>
              <label><strong>Target countries</strong></label>
              <div className="country-box" style={{marginTop:8}}>
                <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  {TOP_COUNTRIES.map(c=> (
                    <button key={c} type="button" onClick={()=>toggleCountry(c)} className="tag" style={{border:selectedCountries.includes(c)?'2px solid #2563EB':'none',background:selectedCountries.includes(c)?'#EEF2FF':'#F7FAFF'}}>{c}</button>
                  ))}
                </div>

                <div className="country-section">
                  {/* Alphabet groups A, B, C collapsed style — for demo we show small set. Replace with full list if needed */}
                  <div>
                    <div style={{marginTop:10,fontWeight:700}}>A ▼</div>
                    <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:6}}>
                      {['Afghanistan','Albania','Algeria','Andorra','Angola'].map(c=> (
                        <button key={c} type="button" onClick={()=>toggleCountry(c)} className="tag" style={{border:selectedCountries.includes(c)?'2px solid #2563EB':'none',background:selectedCountries.includes(c)?'#EEF2FF':'#F7FAFF'}}>{c}</button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div style={{marginTop:10,fontWeight:700}}>B ▼</div>
                    <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:6}}>
                      {['Bahamas','Bahrain','Bangladesh','Barbados','Belarus'].map(c=> (
                        <button key={c} type="button" onClick={()=>toggleCountry(c)} className="tag" style={{border:selectedCountries.includes(c)?'2px solid #2563EB':'none',background:selectedCountries.includes(c)?'#EEF2FF':'#F7FAFF'}}>{c}</button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div style={{marginTop:10,fontWeight:700}}>C ▶</div>
                    <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:6}}>
                      {['Cambodia','Cameroon','Canada','Cape Verde','Chad'].map(c=> (
                        <button key={c} type="button" onClick={()=>toggleCountry(c)} className="tag" style={{border:selectedCountries.includes(c)?'2px solid #2563EB':'none',background:selectedCountries.includes(c)?'#EEF2FF':'#F7FAFF'}}>{c}</button>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
              <div className="small-muted" style={{marginTop:8}}>Free plan: max 3 countries. Paid: select all.</div>
            </div>

            <div>
              <label><strong>Target budget</strong></label>
              <div style={{display:'flex',gap:8,marginTop:8}}>
                {['$0-$500','$500-$1500','$1500-$5000','$5000-$10000','$10000+'].map(b=> (
                  <button type="button" key={b} onClick={()=>setBudget(b)} className="tag" style={{border:budget===b?'2px solid #2563EB':'none',background:budget===b?'#EEF2FF':'#F7FAFF'}}>{b}</button>
                ))}
              </div>
            </div>

            <div>
              <label><strong>Anything else (optional)</strong></label>
              <textarea className="input" value={extra} onChange={e=>setExtra(e.target.value)} placeholder="Tone, niche details, examples..." style={{minHeight:110}} />
            </div>

            <div style={{display:'flex',gap:10}}>
              <button className="btn-primary" disabled={loading} type="submit">{loading? 'Working...':'Start (Demo)'}</button>
              <a href="/pricing"><button type="button" className="btn-ghost">See plans</button></a>
            </div>
          </form>

          {selectedTags.length>0 && (
            <div style={{marginTop:12}}>
              <strong>Selected:</strong>
              <div style={{marginTop:8}}>
                {selectedCountries.map(c=> <span key={c} className="tag">{c}</span>)}
                {selectedApps.map(a=> <span key={a} className="tag">{a}</span>)}
              </div>
            </div>
          )}

          {result && (
            <div style={{marginTop:14,padding:12,background:'#F8FAFF',borderRadius:10}}>
              <pre style={{whiteSpace:'pre-wrap'}}>{result}</pre>
            </div>
          )}

        </div>
      </section>

      <footer className="footer">© {new Date().getFullYear()} ClientPilot AI</footer>
    </main>
  );
}
