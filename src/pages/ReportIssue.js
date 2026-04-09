import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IssueContext } from "../context/IssueContext";
import toast from "react-hot-toast"; // 🔥 ADD

function ReportIssue() {

  const navigate = useNavigate();
  const { addIssue } = useContext(IssueContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Road");

  const [locationName, setLocationName] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const [loading, setLoading] = useState(false);

  /* ================= SEARCH LOCATION ================= */
  const searchLocation = async () => {

    if (!locationName.trim()) {
      toast.error("Enter location ❌");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${locationName}`
      );

      const data = await res.json();

      if (data.length > 0) {
        setLat(data[0].lat);
        setLng(data[0].lon);
        toast.success("Location found 📍");
      } else {
        toast.error("Location not found ❌");
      }

    } catch (err) {
      console.error(err);
      toast.error("Search failed ❌");
    } finally {
      setLoading(false);
    }
  };

  /* ================= MAP ================= */
  const openMap = () => {

    if (!lat || !lng) {
      toast.error("Search location first ❌");
      return;
    }

    window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = () => {

    if (!title || !description || !lat || !lng) {
      toast.error("Fill all fields + location ❌");
      return;
    }

    addIssue({
      title,
      description,
      category,
      locationName,
      lat: parseFloat(lat),
      lng: parseFloat(lng)
    });

    toast.success("Issue Submitted Successfully 🚀");

    // RESET
    setTitle("");
    setDescription("");
    setCategory("Road");
    setLocationName("");
    setLat("");
    setLng("");

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

        {/* CATEGORY */}
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

        {/* LOCATION */}
        <div style={locationBox}>

          <h3>📍 Select Location</h3>

          <div style={{ display: "flex", gap: "10px" }}>
            <input
              placeholder="Search place..."
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              style={{ ...input, flex: 1 }}
            />

            <button onClick={searchLocation} style={searchBtn}>
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <input
              placeholder="Latitude"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              style={input}
            />

            <input
              placeholder="Longitude"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              style={input}
            />
          </div>

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

export default ReportIssue;


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