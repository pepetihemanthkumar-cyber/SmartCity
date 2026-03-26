import React, { useContext, useState } from "react";
import { IssueContext } from "../context/IssueContext";
import { useNavigate } from "react-router-dom";
import {
  FaExclamationTriangle,
  FaUsers,
  FaTools,
  FaMapMarkerAlt,
  FaBell,
  FaUserCircle,
  FaChartPie,
  FaMap,
  FaExclamationCircle
} from "react-icons/fa";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Dashboard() {

  const { issues, deleteIssue, updateStatus } = useContext(IssueContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  /* LOGOUT */
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  /* ISSUE ANALYTICS */
  const chartData = [
    { name: "Road", issues: issues.filter(i => i.category === "Road Damage").length },
    { name: "Garbage", issues: issues.filter(i => i.category === "Garbage").length },
    { name: "Water", issues: issues.filter(i => i.category === "Water Leakage").length },
    { name: "Light", issues: issues.filter(i => i.category === "Street Light").length }
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* SIDEBAR */}
      <div style={{
        width: "230px",
        background: "#0f172a",
        color: "white",
        padding: "30px"
      }}>
        <h2 style={{ marginBottom: "40px" }}>SmartCity</h2>

        <div style={sideItem}><FaChartPie /> Dashboard</div>

        <div style={sideItem} onClick={() => navigate("/map")}>
          <FaMap /> City Map
        </div>

        <div style={sideItem} onClick={() => navigate("/report")}>
          <FaExclamationCircle /> Report Issue
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1 }}>

        {/* TOP NAV */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 40px",
          background: "#1e3a8a",
          color: "white"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
              style={{ width: "35px" }}
              alt="logo"
            />
            <h2>Smart City</h2>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
            <FaBell size={22} />

            <div style={{ position: "relative" }}>
              <FaUserCircle
                size={28}
                style={{ cursor: "pointer" }}
                onClick={() => setMenuOpen(!menuOpen)}
              />

              {menuOpen && (
                <div style={dropdown}>
                  <p>👤 Profile</p>
                  <p>⚙ Settings</p>

                  <button onClick={logout} style={logoutBtn}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* BODY */}
        <div style={{ padding: "40px" }}>

          <h1 className="fade-up" style={{ marginBottom: "30px" }}>
            Dashboard Overview
          </h1>

          {/* STATS */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "25px",
            marginBottom: "40px"
          }}>
            <div className="card">
              <FaExclamationTriangle size={40} color="red" />
              <div>
                <h3>Open Issues</h3>
                <h2>{issues.length}</h2>
              </div>
            </div>

            <div className="card">
              <FaTools size={40} color="orange" />
              <div>
                <h3>Active Services</h3>
                <h2>12</h2>
              </div>
            </div>

            <div className="card">
              <FaUsers size={40} color="dodgerblue" />
              <div>
                <h3>Citizens</h3>
                <h2>1,230</h2>
              </div>
            </div>
          </div>

          {/* CHART */}
          <div className="card" style={{ marginBottom: "40px" }}>
            <h2>Issue Analytics</h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="issues" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* MAP */}
          <div className="card" style={{ marginBottom: "40px" }}>
            <h2>City Map</h2>

            <iframe
              title="map"
              src="https://maps.google.com/maps?q=hyderabad&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="350"
              style={{ borderRadius: "10px" }}
            />
          </div>

          {/* ISSUES */}
          <div className="card">
            <h2>Reported Issues</h2>

            {issues.length === 0 && <p>No issues reported</p>}

            {issues.map((issue) => (

              <div key={issue.id} style={issueCard}>

                <h3
                  style={{ cursor: "pointer", color: "#2563eb" }}
                  onClick={() =>
                    navigate(`/map?lat=${issue.lat}&lng=${issue.lng}`)
                  }
                >
                  {issue.title}
                </h3>

                <p><b>Category:</b> {issue.category}</p>
                <p><b>Description:</b> {issue.description}</p>
                <p><b>Status:</b> {issue.status}</p>

                <p><b>📍 {issue.locationName}</b></p>

                <p>
                  {issue.lat.toFixed(5)}, {issue.lng.toFixed(5)}
                </p>

                {/* ACTION BUTTONS */}
                <div style={{ marginTop: "10px" }}>

                  <button
                    onClick={() => updateStatus(issue.id, "Resolved")}
                    style={resolveBtn}
                  >
                    Resolve
                  </button>

                  <button
                    onClick={() => deleteIssue(issue.id)}
                    style={deleteBtn}
                  >
                    Delete
                  </button>

                </div>

                <a
                  href={`https://www.google.com/maps?q=${issue.lat},${issue.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  style={mapLink}
                >
                  <FaMapMarkerAlt /> View on Google Maps
                </a>

              </div>

            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

/* STYLES */

const sideItem = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
  cursor: "pointer"
};

const issueCard = {
  border: "1px solid #e5e7eb",
  padding: "20px",
  borderRadius: "8px",
  marginBottom: "15px"
};

const mapLink = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  marginTop: "10px",
  color: "#2563eb",
  fontWeight: "bold"
};

const logoutBtn = {
  width: "100%",
  padding: "8px",
  background: "red",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const dropdown = {
  position: "absolute",
  right: "0",
  top: "40px",
  background: "white",
  color: "black",
  borderRadius: "8px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
  width: "160px",
  padding: "10px"
};

const resolveBtn = {
  background: "green",
  color: "white",
  border: "none",
  padding: "6px 10px",
  marginRight: "10px",
  cursor: "pointer",
  borderRadius: "5px"
};

const deleteBtn = {
  background: "red",
  color: "white",
  border: "none",
  padding: "6px 10px",
  cursor: "pointer",
  borderRadius: "5px"
};

export default Dashboard;