"use client";
import { useState } from "react";

export default function ToolPage() {
  const [service, setService] = useState("");
  const [name, setName] = useState("");
  const [countriesOpen, setCountriesOpen] = useState({});
  const [appsOpen, setAppsOpen] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedApps, setSelectedApps] = useState([]);

  const countryGroups = {
    Top: ["United States", "United Kingdom", "United Arab Emirates", "Canada", "Australia"],
    A: ["Afghanistan", "Albania", "Algeria", "Andorra", "Argentina", "Armenia"],
    B: ["Bahamas", "Bahrain", "Bangladesh", "Belgium", "Bolivia", "Brazil"],
    C: ["Cambodia", "Cameroon", "Canada", "Chile", "China", "Colombia"],
    // Continue to Z later
  };

  const appsList = [
    "LinkedIn", "Apollo", "Lusha", "ZoomInfo",
    "Upwork", "Fiverr", "Freelancer", "PeoplePerHour",
    "Facebook Groups", "Instagram", "Twitter Search",
    "Crunchbase", "Google Maps", "G2", "Reddit"
  ];

  const toggleCountryGroup = (letter) => {
    setCountriesOpen((prev) => ({ ...prev, [letter]: !prev[letter] }));
  };

  const toggleAppList = () => {
    setAppsOpen((prev) => !prev);
  };

  const toggleCountry = (country) => {
    setSelectedCountries((prev) =>
      prev.includes(country) ? prev.filter((c) => c !== country) : [...prev, country]
    );
  };

  const toggleApp = (app) => {
    setSelectedApps((prev) =>
      prev.includes(app) ? prev.filter((a) => a !== app) : [...prev, app]
    );
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "10px", textAlign: "center" }}>
        Your Client Finder
      </h1>

      {/* SERVICE */}
      <label style={{ display: "block", marginTop: "15px", fontWeight: "600" }}>Your Service</label>
      <input
        value={service}
        onChange={(e) => setService(e.target.value)}
        placeholder="e.g., Social Media Management"
        style={{
          width: "100%", padding: "12px", border: "1px solid #ccc",
          borderRadius: "8px", marginTop: "6px"
        }}
      />

      {/* NAME */}
      <label style={{ display: "block", marginTop: "15px", fontWeight: "600" }}>Your Name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        style={{
          width: "100%", padding: "12px", border: "1px solid #ccc",
          borderRadius: "8px", marginTop: "6px"
        }}
      />

      {/* COUNTRIES */}
      <label style={{ display: "block", marginTop: "20px", fontWeight: "600" }}>
        Target Countries
      </label>

      <div style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "12px",
        marginTop: "8px",
        maxHeight: "220px",
        overflowY: "auto"
      }}>
        {Object.keys(countryGroups).map((letter) => (
          <div key={letter} style={{ marginBottom: "10px" }}>
            <div
              onClick={() => toggleCountryGroup(letter)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                cursor: "pointer",
                fontWeight: "600",
                background: "#f1f1f1",
                padding: "8px",
                borderRadius: "6px"
              }}
            >
              <span>{letter}</span>
              <span>{countriesOpen[letter] ? "▲" : "▼"}</span>
            </div>

            {countriesOpen[letter] && (
              <div style={{ paddingLeft: "10px", marginTop: "6px" }}>
                {countryGroups[letter].map((country) => (
                  <div
                    key={country}
                    onClick={() => toggleCountry(country)}
                    style={{
                      padding: "6px",
                      borderRadius: "6px",
                      background: selectedCountries.includes(country)
                        ? "#e0f0ff"
                        : "transparent",
                      cursor: "pointer"
                    }}
                  >
                    {country}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* APPS */}
      <label style={{ display: "block", marginTop: "20px", fontWeight: "600" }}>
        Apps to Search Clients
      </label>

      <div
        onClick={toggleAppList}
        style={{
          marginTop: "8px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          cursor: "pointer",
          background: "#f7f7f7",
          fontWeight: "600"
        }}
      >
        {appsOpen ? "Hide Apps ▲" : "Select Apps ▼"}
      </div>

      {appsOpen && (
        <div style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "12px",
          maxHeight: "200px",
          overflowY: "auto",
          marginTop: "5px"
        }}>
          {appsList.map((app) => (
            <div
              key={app}
              onClick={() => toggleApp(app)}
              style={{
                padding: "6px",
                borderRadius: "6px",
                background: selectedApps.includes(app) ? "#e0f0ff" : "transparent",
                cursor: "pointer"
              }}
            >
              {app}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
