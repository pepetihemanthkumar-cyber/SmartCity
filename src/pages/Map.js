import React, { useState, useEffect, useContext } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap
} from "react-leaflet";
import { useLocation } from "react-router-dom";
import { IssueContext } from "../context/IssueContext";
import L from "leaflet";
import "leaflet.heat";
import toast from "react-hot-toast";

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

  const locationHook = useLocation();
  const { issues, addIssue } = useContext(IssueContext);

  const [location, setLocation] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const city = [17.385, 78.4867];
  const isMobile = window.innerWidth < 768;

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
    } catch {
      setSuggestions([]);
    }
  };

  const selectLocation = (place) => {
    setLocation({
      lat: parseFloat(place.lat),
      lng: parseFloat(place.lon)
    });
    setSearch(place.display_name);
    setSuggestions([]);
  };

  /* ================= GEO LOCATION ================= */

  const getMyLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported ❌");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setLocation({ lat, lng });
        setSearch("My Location");

        toast.success("Location detected 📍");
      },
      () => toast.error("Permission denied ❌")
    );
  };

  /* ================= SUBMIT ================= */

  const submitIssue = () => {

    if (!title || !category || !description || !location) {
      toast.error("Fill all fields ❌");
      return;
    }

    setLoading(true);

    addIssue({
      title,
      category,
      description,
      locationName: search || "Map Location",
      lat: location.lat,
      lng: location.lng
    });

    toast.success(
      `Submitted at (${location.lat.toFixed(4)}, ${location.lng.toFixed(4)})`
    );

    setTimeout(() => {
      setLoading(false);
      setTitle("");
      setCategory("");
      setDescription("");
      setLocation(null);
      setSearch("");
    }, 500);
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: isMobile ? "column" : "row"
    }}>

      {/* MAP */}
      <div style={{
        height: "90vh",
        width: isMobile ? "100%" : "70%",
        position: "relative"
      }}>

        {/* SEARCH */}
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
              const val = e.target.value;
              setSearch(val);

              clearTimeout(window.searchTimeout);
              window.searchTimeout = setTimeout(() => {
                handleSearch(val);
              }, 400);
            }}
            style={{
              padding: "10px",
              width: "300px",
              borderRadius: "8px",
              border: "none"
            }}
          />

          {suggestions.length > 0 && (
            <div style={{
              background: "white",
              maxHeight: "200px",
              overflow: "auto",
              borderRadius: "8px"
            }}>
              {suggestions.map((p, i) => (
                <div
                  key={i}
                  onClick={() => selectLocation(p)}
                  style={{ padding: "8px", cursor: "pointer" }}
                >
                  {p.display_name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MAP */}
        <MapContainer center={city} zoom={13} style={{ height: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <MapClickHandler setLocation={setLocation} />
          <ChangeMapView location={location} />
          <HeatMapLayer issues={issues} />

          {issues.map(issue => (
            <Marker
              key={issue.id}
              position={[issue.lat, issue.lng]}
              icon={getIcon(issue.status)}
            >
              <Popup>
                <b>{issue.title}</b><br/>
                {issue.category}<br/>
                {issue.description}<br/>
                📍 {issue.locationName}<br/>
                📌 {issue.lat.toFixed(5)}, {issue.lng.toFixed(5)}
              </Popup>
            </Marker>
          ))}

          {location && (
            <Marker position={[location.lat, location.lng]} icon={blueIcon} />
          )}
        </MapContainer>
      </div>

      {/* FORM */}
      <div style={{
        width: isMobile ? "100%" : "30%",
        padding: "20px",
        background: "#fff"
      }}>

        <h2>🚨 Report Issue</h2>

        <button onClick={getMyLocation} style={btnStyle}>
          📍 Use My Location
        </button>

        {location && (
          <p style={{ color: "green" }}>
            📍 {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
          </p>
        )}

        <input
          placeholder="Title"
          value={title}
          onChange={e=>setTitle(e.target.value)}
          style={inputStyle}
        />

        <select
          value={category}
          onChange={e=>setCategory(e.target.value)}
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
          onChange={e=>setDescription(e.target.value)}
          style={{...inputStyle, height:"100px"}}
        />

        <button
          onClick={submitIssue}
          style={btnStyle}
          disabled={!location || loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}

/* ================= STYLE ================= */

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px"
};

const btnStyle = {
  padding: "12px",
  background: "red",
  color: "white",
  border: "none",
  cursor: "pointer",
  marginBottom: "10px"
};

export default Map;