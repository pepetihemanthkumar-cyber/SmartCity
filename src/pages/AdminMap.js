import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ================= FIX MARKER ICON ================= */
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

/* ================= CUSTOM ICONS ================= */
const redIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [32, 32],
});

const greenIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  iconSize: [32, 32],
});

function AdminMap({ issues = [] }) {

  // ✅ fallback center (India)
  const defaultCenter = [20.5937, 78.9629];

  // ✅ auto center if issues exist
  const center =
    issues.length > 0 && issues[0].lat && issues[0].lng
      ? [issues[0].lat, issues[0].lng]
      : defaultCenter;

  return (
    <div
      style={{
        height: "400px",
        width: "100%",
        borderRadius: "16px",
        overflow: "hidden",
        marginBottom: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
      }}
    >
      <MapContainer
        center={center}
        zoom={issues.length > 0 ? 10 : 5}
        style={{ height: "100%", width: "100%" }}
      >

        {/* MAP TILE */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* MARKERS */}
        {issues.map((issue) => {

          if (!issue.lat || !issue.lng) return null;

          const icon =
            issue.status === "Resolved" ? greenIcon : redIcon;

          return (
            <Marker
              key={issue.id}
              position={[issue.lat, issue.lng]}
              icon={icon}
            >
              <Popup>
                <div style={{ minWidth: "150px" }}>
                  <b>{issue.title}</b>
                  <br />
                  <span style={{ color: "#38bdf8" }}>
                    {issue.category}
                  </span>
                  <br />
                  <span>
                    Status:{" "}
                    <b
                      style={{
                        color:
                          issue.status === "Resolved"
                            ? "green"
                            : "red"
                      }}
                    >
                      {issue.status}
                    </b>
                  </span>
                  <br />
                  <small>{issue.locationName}</small>
                </div>
              </Popup>
            </Marker>
          );
        })}

      </MapContainer>
    </div>
  );
}

export default AdminMap;