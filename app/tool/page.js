"use client";

import { useState } from "react";

export default function ToolPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [selectedApps, setSelectedApps] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [budget, setBudget] = useState("");
  const [tone, setTone] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [emails, setEmails] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const appsList = [
    "Facebook Groups",
    "Instagram",
    "LinkedIn",
    "Upwork",
    "Fiverr",
    "Reddit",
    "Twitter (X)",
    "Facebook Marketplace",
    "Freelancer.com",
    "Telegram"
  ];

  const countriesList = [
    "USA", "UK", "Canada", "Australia", "UAE",
    "Germany", "France", "India", "Pakistan",
    "Saudi Arabia", "South Africa"
  ];

  const toggleApp = (app) => {
    setSelectedApps((prev) =>
      prev.includes(app) ? prev.filter((a) => a !== app) : [...prev, app]
    );
  };

  const toggleCountry = (c) => {
    setSelectedCountries((prev) =>
      prev.includes(c) ? prev.filter((a) => a !== c) : [...prev, c]
    );
  };

  const generateEmails = async () => {
    setError("");
    if (!name || !email || !service) {
      setError("All fields are required.");
      return;
    }
    if (selectedApps.length === 0) {
      setError("Select at least one app.");
      return;
    }
    if (selectedCountries.length === 0) {
      setError("Select at least one country.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        service,
        selectedApps,
        selectedCountries,
        budget,
        extraInfo,
        tone,
      }),
    });

    const data = await res.json();

    if (data.error) {
      setError("AI Error: " + JSON.stringify(data.error));
      setLoading(false);
      return;
    }

    const text = data.emails;
    const splitEmails = text.split(/\n(?=\d\.)/g);

    setEmails(splitEmails);
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Your Client Finder</h1>

      <div className="space-y-4 bg-white p-4 rounded-xl shadow">
        <label>Your Name</label>
        <input className="input" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Email</label>
        <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Your Service</label>
        <input className="input" value={service} onChange={(e) => setService(e.target.value)} />

        <label>Choose Apps</label>
        <div className="flex flex-wrap gap-2">
          {appsList.map((a) => (
            <button
              key={a}
              className={`px-3 py-1 rounded-lg border ${
                selectedApps.includes(a) ? "bg-blue-600 text-white" : "bg-gray-100"
              }`}
              onClick={() => toggleApp(a)}
            >
              {a}
            </button>
          ))}
        </div>

        <label>Select Countries</label>
        <div className="flex flex-wrap gap-2">
          {countriesList.map((c) => (
            <button
              key={c}
              className={`px-3 py-1 rounded-lg border ${
                selectedCountries.includes(c)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
              onClick={() => toggleCountry(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <label>Budget</label>
        <input className="input" value={budget} onChange={(e) => setBudget(e.target.value)} />

        <label>Tone Preference</label>
        <input className="input" value={tone} onChange={(e) => setTone(e.target.value)} />

        <label>Extra Info</label>
        <textarea className="input" value={extraInfo} onChange={(e) => setExtraInfo(e.target.value)} />

        <button
          onClick={generateEmails}
          className="w-full bg-blue-600 text-white p-3 rounded-xl mt-2"
        >
          {loading ? "Creating..." : "Create Emails"}
        </button>

        {error && <p className="text-red-500">{error}</p>}
      </div>

      {emails.length > 0 && (
        <div className="mt-6 space-y-4">
          {emails.map((e, i) => (
            <div key={i} className="p-4 bg-white shadow rounded-xl">
              <h2 className="font-bold mb-2">Option {i + 1}</h2>
              <pre className="whitespace-pre-wrap">{e}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
