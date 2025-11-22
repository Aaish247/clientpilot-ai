"use client";

import { useState } from "react";

const TOP_COUNTRIES = ["USA", "UK", "UAE", "Canada", "Australia"];

const ALL_COUNTRIES = {
  A: ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola"],
  B: ["Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belgium"],
  C: ["Cambodia", "Cameroon", "Canada", "Chad", "Chile"],
  D: ["Denmark", "Dominica", "Dominican Republic"],
  E: ["Ecuador", "Egypt", "El Salvador", "Estonia"],
  F: ["Fiji", "Finland", "France"],
  G: ["Gabon", "Gambia", "Georgia", "Germany", "Ghana"],
  H: ["Haiti", "Honduras", "Hungary"],
  I: ["Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Italy"],
  J: ["Jamaica", "Japan", "Jordan"],
  K: ["Kazakhstan", "Kenya", "Kuwait", "Kyrgyzstan"],
  L: ["Laos", "Latvia", "Lebanon", "Liberia", "Libya", "Lithuania"],
  M: ["Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Mexico", "Morocco"],
  N: ["Namibia", "Nepal", "Netherlands", "New Zealand", "Nigeria", "Norway"],
  O: ["Oman"],
  P: ["Pakistan", "Palestine", "Panama", "Paraguay", "Peru", "Philippines", "Poland", "Portugal"],
  Q: ["Qatar"],
  R: ["Romania", "Russia", "Rwanda"],
  S: ["Saudi Arabia", "Senegal", "Serbia", "Singapore", "Slovakia", "Slovenia", "Somalia", "Spain", "Sri Lanka", "Sweden", "Switzerland"],
  T: ["Taiwan", "Tajikistan", "Tanzania", "Thailand", "Tunisia", "Turkey"],
  U: ["Uganda", "Ukraine", "UAE", "UK", "USA", "Uruguay", "Uzbekistan"],
  V: ["Vanuatu", "Venezuela", "Vietnam"],
  W: ["West Bank"],
  Y: ["Yemen"],
  Z: ["Zambia", "Zimbabwe"],
};

const APPS = [
  "Instagram",
  "LinkedIn",
  "TikTok",
  "Facebook",
  "Upwork",
  "Fiverr",
  "Freelancer",
  "Behance",
  "Dribbble",
  "Email",
  "YouTube",
  "Pinterest",
  "Twitter",
  "Guru",
  "PeoplePerHour",
];

export default function ToolPage() {
  const [openLetter, setOpenLetter] = useState(null);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedApps, setSelectedApps] = useState([]);
  const [service, setService] = useState("");

  const MAX_FREE_APPS = 3;

  const toggleLetter = (letter) => {
    setOpenLetter(openLetter === letter ? null : letter);
  };

  const toggleCountry = (c) => {
    setSelectedCountries((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  const toggleApp = (app) => {
    if (!selectedApps.includes(app)) {
      if (selectedApps.length >= MAX_FREE_APPS) return;
    }
    setSelectedApps((prev) =>
      prev.includes(app) ? prev.filter((x) => x !== app) : [...prev, app]
    );
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Your Client Finder
      </h1>

      {/* Service Input */}
      <div className="mb-6">
        <label className="font-semibold">Your Service</label>
        <input
          type="text"
          placeholder="Example: Social Media Manager"
          className="w-full mt-2 p-3 rounded border bg-white"
          value={service}
          onChange={(e) => setService(e.target.value)}
        />
      </div>

      {/* Top Countries */}
      <div className="mb-4">
        <p className="font-semibold mb-2">Top Countries</p>
        <div className="flex flex-wrap gap-2">
          {TOP_COUNTRIES.map((c) => (
            <button
              key={c}
              onClick={() => toggleCountry(c)}
              className={`px-3 py-2 rounded border ${
                selectedCountries.includes(c) ? "border-blue-500" : ""
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* A-Z Countries */}
      <div className="border rounded p-3 bg-white">
        <p className="font-semibold mb-2">Choose Countries</p>

        <div className="max-h-48 overflow-y-scroll pr-2">
          {Object.keys(ALL_COUNTRIES).map((letter) => (
            <div key={letter} className="mb-2">
              <button
                className="w-full text-left font-semibold py-1"
                onClick={() => toggleLetter(letter)}
              >
                {letter} {openLetter === letter ? "▼" : "▶"}
              </button>

              {openLetter === letter && (
                <div className="ml-3">
                  {ALL_COUNTRIES[letter].map((c) => (
                    <button
                      key={c}
                      onClick={() => toggleCountry(c)}
                      className={`block w-full text-left py-1 px-2 rounded ${
                        selectedCountries.includes(c)
                          ? "bg-blue-100 border-blue-500 border"
                          : "border"
                      } mb-1`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Apps */}
      <div className="mt-6">
        <p className="font-semibold mb-2">Where should AI search clients?</p>
        <p className="text-sm text-gray-500 mb-1">
          (Free plan: select up to {MAX_FREE_APPS})
        </p>

        <div className="border bg-white rounded p-2 max-h-40 overflow-y-scroll">
          {APPS.map((app) => (
            <button
              key={app}
              onClick={() => toggleApp(app)}
              className={`w-full text-left py-2 px-2 mb-1 rounded border ${
                selectedApps.includes(app) ? "border-blue-500" : ""
              }`}
            >
              {app}
            </button>
          ))}
        </div>
      </div>

      {/* Continue */}
      <button className="w-full bg-blue-600 text-white py-3 rounded mt-6">
        Continue
      </button>
    </div>
  );
}
