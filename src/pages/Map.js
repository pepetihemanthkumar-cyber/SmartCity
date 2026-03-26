import React, { useContext, useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap
} from "react-leaflet";
import { IssueContext } from "../context/IssueContext";
import { useLocation } from "react-router-dom";
import L from "leaflet";
import "leaflet.heat";

/* ================= ICONS ================= */

const getIcon = (status) => {
  let color =
    status === "Resolved"
      ? "green"
      : status === "Pending"
      ? "orange"
      : "red";

  return new L.Icon({
    iconUrl: `https://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
    iconSize: [35, 35]
  });
};

const blueIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  iconSize: [35, 35]
});

/* ================= MAP CLICK ================= */

function MapClickHandler({ setLocation }) {
  useMapEvents({
    click(e) {
      setLocation({
        lat: e.latlng.lat,
        lng: e.latlng.lng
      });
    }
  });
  return null;
}

/* ================= AUTO MOVE ================= */

function ChangeMapView({ location }) {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.flyTo([location.lat, location.lng], 16);
    }
  }, [location, map]);

  return null;
}

/* ================= HEATMAP ================= */

function HeatMapLayer({ issues }) {
  const map = useMap();

  useEffect(() => {
    if (!issues.length) return;

    const points = issues.map(i => [i.lat, i.lng, 0.5]);

    const heat = L.heatLayer(points, {
      radius: 25,
      blur: 15
    }).addTo(map);

    return () => map.removeLayer(heat);
  }, [issues, map]);

  return null;
}

/* ================= MAIN ================= */

function Map() {

  const { issues, addIssue } = useContext(IssueContext);
  const locationHook = useLocation();

  const [location, setLocation] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [notification, setNotification] = useState("");

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const city = [17.385, 78.4867];

  /* ================= URL NAV ================= */

  useEffect(() => {
    const params = new URLSearchParams(locationHook.search);
    const lat = params.get("lat");
    const lng = params.get("lng");

    if (lat && lng) {
      setLocation({
        lat: parseFloat(lat),
        lng: parseFloat(lng)
      });
    }
  }, [locationHook]);

  /* ================= SEARCH ================= */

  const handleSearch = async (value) => {
    if (value.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${value}`
      );

      const data = await res.json();
      setSuggestions(data.slice(0, 5));

    } catch (error) {
      console.error("Search Error:", error);
      setSuggestions([]);
    }
  };

  const selectLocation = (place) => {
    const lat = parseFloat(place.lat);
    const lon = parseFloat(place.lon);

    setLocation({ lat, lng: lon });
    setSearch(place.display_name);
    setSuggestions([]);
  };

  /* ================= SUBMIT ================= */

  const submitIssue = () => {

    if (!title || !category || !description || !location) {
      alert("Fill all fields");
      return;
    }

    const newIssue = {
      id: Date.now(),
      title,
      category,
      description,
      locationName: search,
      lat: location.lat,
      lng: location.lng,
      status: "Open"
    };

    addIssue(newIssue);

    setNotification("✅ Issue Submitted!");

    setTimeout(() => setNotification(""), 3000);

    setTitle("");
    setCategory("");
    setDescription("");
    setLocation(null);
    setSearch("");
  };

  return (
    <div style={{ display: "flex" }}>

      {/* ================= MAP ================= */}
      <div style={{ height: "90vh", width: "70%", position: "relative" }}>

        {/* NOTIFICATION */}
        {notification && (
          <div style={{
            position: "absolute",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#22c55e",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            zIndex: 999
          }}>
            {notification}
          </div>
        )}

        {/* ================= SEARCH ================= */}
        <div style={{
          position: "absolute",
          top: "15px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999
        }}>

          <input
            placeholder="🔍 Search location..."
            value={search}
            onChange={(e) => {
              const value = e.target.value;

              setSearch(value);

              clearTimeout(window.searchTimeout);

              window.searchTimeout = setTimeout(() => {
                handleSearch(value);
              }, 400);
            }}
            style={{
              padding: "10px",
              width: "320px",
              borderRadius: "8px",
              border: "none",
              outline: "none",
              boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
            }}
          />

          {/* ✅ FIXED DROPDOWN */}
          {suggestions.length > 0 && (
            <div className="search-dropdown">
              {suggestions.map((p, i) => (
                <div
                  key={i}
                  className="search-item"
                  onClick={() => selectLocation(p)}
                >
                  {p.display_name}
                </div>
              ))}
            </div>
          )}

        </div>

        {/* ================= MAP ================= */}
        <MapContainer center={city} zoom={13} style={{ height: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <MapClickHandler setLocation={setLocation} />
          <ChangeMapView location={location} />
          <HeatMapLayer issues={issues} />

          {issues.map((issue) => (
            <Marker
              key={issue.id}
              position={[issue.lat, issue.lng]}
              icon={getIcon(issue.status)}
            >
              <Popup>
                <b>{issue.title}</b><br/>
                {issue.category}<br/>
                {issue.description}<br/>
                📍 {issue.locationName}
              </Popup>
            </Marker>
          ))}

          {location && (
            <Marker position={[location.lat, location.lng]} icon={blueIcon} />
          )}
        </MapContainer>
      </div>

      {/* ================= FORM ================= */}
      <div style={{
        width: "30%",
        padding: "25px",
        background: "#fff",
        borderLeft: "4px solid red"
      }}>

        <h2 style={{ color: "red" }}>🚨 Report Issue</h2>

        {!location && <p>Select location on map</p>}

        {location && (
          <>
            <input
              placeholder="Title"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              style={inputStyle}
            />

            <select
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              style={inputStyle}
            >
              <option value="">Select Category</option>
              <option>Road Damage</option>
              <option>Garbage</option>
              <option>Street Light</option>
              <option>Water Leakage</option>
            </select>

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              style={{...inputStyle, height:"120px"}}
            />

            <button
              onClick={submitIssue}
              style={{
                padding: "12px",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Submit Issue
            </button>
          </>
        )}
      </div>

    </div>
  );
}

/* ================= STYLE ================= */

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  marginBottom: "10px"
};

export default Map;