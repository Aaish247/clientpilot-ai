"use client";
import { useState } from "react";

export default function ToolPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");

  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedApps, setSelectedApps] = useState([]);

  const [budget, setBudget] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [tone, setTone] = useState("");

  const [loading, setLoading] = useState(false);
  const [emails, setEmails] = useState([]);
  const [selectedEmailIndex, setSelectedEmailIndex] = useState(null);
  const [error, setError] = useState("");

  const APPS = [
    "Upwork", "Fiverr", "LinkedIn", "Instagram", "Facebook",
    "Freelancer", "PeoplePerHour", "Guru", "Reddit", "YouTube"
  ];

  const ALL_COUNTRIES = [
    "USA","UK","UAE","Canada","Australia","Afghanistan","Albania","Algeria",
    "Argentina","Armenia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh",
    "Belarus","Belgium","Bolivia","Bosnia","Brazil","Bulgaria","Cambodia",
    "China","Colombia","Costa Rica","Croatia","Denmark","Egypt","Estonia","Finland",
    "France","Georgia","Germany","Ghana","Greece","Hong Kong","Hungary","Iceland",
    "India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Japan","Jordan",
    "Kazakhstan","Kenya","Kuwait","Kyrgyzstan","Latvia","Lebanon","Lithuania",
    "Luxembourg","Malaysia","Maldives","Mexico","Mongolia","Morocco","Nepal",
    "Netherlands","New Zealand","Nigeria","Norway","Oman","Pakistan","Panama",
    "Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Saudi Arabia",
    "Serbia","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain",
    "Sri Lanka","Sweden","Switzerland","Thailand","Turkey","Ukraine","Vietnam","Yemen"
  ];

  const toggleCountry = (c) => {
    if (selectedCountries.includes(c)) {
      setSelectedCountries(selectedCountries.filter((x) => x !== c));
    } else {
      setSelectedCountries([...selectedCountries, c]);
    }
  };

  const toggleApp = (app) => {
    if (selectedApps.includes(app)) {
      setSelectedApps(selectedApps.filter((x) => x !== app));
    } else {
      setSelectedApps([...selectedApps, app]);
    }
  };

  const handleGenerate = async () => {
    setError("");

    if (!name || !email || !service) {
      setError("Please enter name, email and service.");
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
    setEmails([]);
    setSelectedEmailIndex(null);

    const payload = {
      name,
      email,
      service,
      selectedCountries,
      selectedApps,
      budget,
      extraInfo,
      tone,
    };

    try {
      const r = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await r.json();

      if (data.error) {
        setError("AI Error: " + JSON.stringify(data.error));
        setLoading(false);
        return;
      }

      let raw = data.emails || "";
      if (!raw || raw.length < 5) {
        setError("AI returned nothing.");
        setLoading(false);
        return;
      }

      const emailList = raw
        .split(/(?:\n\n|^)(?=\d\.)/g)
        .map((e) => e.trim())
        .filter((x) => x.length > 0)
        .slice(0, 5);

      if (emailList.length === 0) {
        setError("AI returned nothing.");
        setLoading(false);
        return;
      }

      setEmails(emailList);
    } catch (err) {
      setError("Server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Client Finder</h1>

      {/* FORM BOX */}
      <div className="bg-white shadow-lg p-5 rounded-2xl space-y-4">

        <div>
          <label className="font-semibold">Your Name</label>
          <input
            className="w-full mt-1 p-3 border rounded-xl"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="font-semibold">Email</label>
          <input
            className="w-full mt-1 p-3 border rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
          />
        </div>

        <div>
          <label className="font-semibold">Your Service</label>
          <input
            className="w-full mt-1 p-3 border rounded-xl"
            value={service}
            onChange={(e) => setService(e.target.value)}
            placeholder="Example: Social Media Management"
          />
        </div>

        {/* APPS */}
        <div>
          <label className="font-semibold">Select Platforms</label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {APPS.map((app) => (
              <button
                key={app}
                onClick={() => toggleApp(app)}
                className={`p-2 rounded-xl border ${
                  selectedApps.includes(app)
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
              >
                {app}
              </button>
            ))}
          </div>
        </div>

        {/* COUNTRIES */}
        <div>
          <label className="font-semibold block">Target Countries</label>
          <div className="h-40 overflow-y-scroll border p-3 rounded-xl">
            {ALL_COUNTRIES.map((c) => (
              <div
                key={c}
                onClick={() => toggleCountry(c)}
                className={`p-2 rounded-lg cursor-pointer ${
                  selectedCountries.includes(c)
                    ? "bg-blue-100"
                    : "bg-gray-100"
                } mb-1`}
              >
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* BUDGET */}
        <div>
          <label className="font-semibold block">Client Budget (optional)</label>
          <input
            className="w-full mt-1 p-3 border rounded-xl"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Example: $500–$1500"
          />
        </div>

        {/* EXTRA INFO */}
        <div>
          <label className="font-semibold block">Extra Instructions (optional)</label>
          <textarea
            className="w-full mt-1 p-3 border rounded-xl"
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
            placeholder="Anything special?"
          />
        </div>

        {/* TONE */}
        <div>
          <label className="font-semibold block">Email Tone</label>
          <select
            className="w-full mt-1 p-3 border rounded-xl"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option value="">Choose tone</option>
            <option value="Friendly">Friendly</option>
            <option value="Motivated">Motivated</option>
            <option value="Money-focused">Money Focused</option>
            <option value="Professional">Professional</option>
            <option value="Simple">Simple</option>
          </select>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl mt-4"
        >
          {loading ? "Generating..." : "Create Emails"}
        </button>

        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>

      {/* EMAIL RESULTS */}
      {emails.length > 0 && (
        <div className="mt-6 space-y-3">
          <h2 className="text-xl font-semibold">Pick One Email</h2>

          {emails.map((em, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedEmailIndex(idx)}
              className={`p-4 rounded-xl border cursor-pointer ${
                selectedEmailIndex === idx
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              <p className="font-semibold">Option {idx + 1}</p>
              <p className="text-sm mt-2 whitespace-pre-wrap">{em}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
