import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IssueContext } from "../context/IssueContext";

function ReportIssue() {

  const { addIssue } = useContext(IssueContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // ✅ NEW CATEGORY STATE
  const [category, setCategory] = useState("Road");

  const [locationName, setLocationName] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  /* ================= SEARCH LOCATION ================= */

  const searchLocation = async () => {

    if (!locationName) {
      alert("Enter location");
      return;
    }

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${locationName}`
      );

      const data = await res.json();

      if (data.length > 0) {
        setLat(data[0].lat);
        setLng(data[0].lon);
      } else {
        alert("❌ Location not found");
      }

    } catch (err) {
      console.error(err);
      alert("❌ Search failed");
    }
  };

  /* ================= REVERSE GEO ================= */

  const getPlaceFromCoords = async (latValue, lngValue) => {

    if (!latValue || !lngValue) return;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latValue}&lon=${lngValue}`
      );

      const data = await res.json();

      if (data && data.display_name) {
        setLocationName(data.display_name);
      }

    } catch (err) {
      console.error("Reverse error:", err);
    }
  };

  /* ================= MAP ================= */

  const openMap = () => {

    if (!lat || !lng) {
      alert("Search location first");
      return;
    }

    window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = () => {

    if (!title || !description || !lat || !lng) {
      alert("Fill all fields + location");
      return;
    }

    const newIssue = {
      title,
      description,
      category, // ✅ NOW DYNAMIC
      locationName,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      status: "Open"
    };

    addIssue(newIssue);

    alert("✅ Issue Submitted!");

    navigate("/dashboard");
  };

  return (
    <div style={container}>

      <div style={card}>

        <h1 style={{ marginBottom: "20px" }}>🚨 Report City Issue</h1>

        {/* TITLE */}
        <input
          placeholder="Issue title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={input}
        />

        {/* DESCRIPTION */}
        <textarea
          placeholder="Describe issue"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ ...input, height: "120px" }}
        />

        {/* ✅ CATEGORY SELECT */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={input}
        >
          <option value="Road">Road Damage</option>
          <option value="Garbage">Garbage</option>
          <option value="Water">Water Leakage</option>
          <option value="Light">Street Light</option>
        </select>

        {/* ================= LOCATION ================= */}
        <div style={locationBox}>

          <h3>📍 Select Location</h3>

          {/* SEARCH */}
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              placeholder="Search city/place..."
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchLocation();
                }
              }}
              style={{ ...input, flex: 1 }}
            />

            <button onClick={searchLocation} style={searchBtn}>
              Search
            </button>
          </div>

          {/* COORDINATES */}
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>

            <input
              placeholder="Latitude"
              value={lat}
              onChange={(e) => {
                let value = e.target.value.replace(/[^\d.-]/g, "");
                setLat(value);

                clearTimeout(window.reverseTimeout);
                window.reverseTimeout = setTimeout(() => {
                  if (value && lng) {
                    getPlaceFromCoords(value, lng);
                  }
                }, 500);
              }}
              style={input}
            />

            <input
              placeholder="Longitude"
              value={lng}
              onChange={(e) => {
                let value = e.target.value.replace(/[^\d.-]/g, "");
                setLng(value);

                clearTimeout(window.reverseTimeout);
                window.reverseTimeout = setTimeout(() => {
                  if (lat && value) {
                    getPlaceFromCoords(lat, value);
                  }
                }, 500);
              }}
              style={input}
            />

          </div>

          {/* MAP */}
          <button onClick={openMap} style={mapBtn}>
            📍 View on Map
          </button>

        </div>

        {/* SUBMIT */}
        <button onClick={handleSubmit} style={submitBtn}>
          Submit Issue
        </button>

      </div>

    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "90vh"
};

const card = {
  width: "450px",
  background: "white",
  padding: "30px",
  borderRadius: "12px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const locationBox = {
  background: "#f9fafb",
  padding: "15px",
  borderRadius: "8px",
  marginBottom: "20px"
};

const submitBtn = {
  width: "100%",
  padding: "12px",
  background: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  cursor: "pointer"
};

const searchBtn = {
  padding: "10px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const mapBtn = {
  marginTop: "10px",
  width: "100%",
  padding: "10px",
  background: "#10b981",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

export default ReportIssue;