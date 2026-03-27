import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function AdminMap({ issues }) {

  // Default center (India)
  const center = [20.5937, 78.9629];

  return (
    <MapContainer
      center={center}
      zoom={5}
      style={{
        height: "400px",
        width: "100%",
        borderRadius: "12px",
        marginBottom: "20px"
      }}
    >

      {/* MAP STYLE */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* MARKERS */}
      {issues.map((issue) => (

        issue.lat && issue.lng && (

          <Marker key={issue.id} position={[issue.lat, issue.lng]}>
            <Popup>
              <b>{issue.title}</b><br />
              {issue.category}<br />
              Status: {issue.status}
            </Popup>
          </Marker>

        )

      ))}

    </MapContainer>
  );
}

export default AdminMap;