import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaExclamationTriangle,
  FaUsers,
  FaTools,
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

import { AuthContext } from "../context/AuthContext";
import { IssueContext } from "../context/IssueContext";

function Dashboard() {

  const navigate = useNavigate();
  const { user, loading, logout } = useContext(AuthContext);
  const { issues, deleteIssue, updateStatus } = useContext(IssueContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const role = user?.role;

  /* ================= PROTECT ================= */
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) return <p style={{ color: "white" }}>Loading...</p>;

  /* ================= CHART ================= */
  const chartData = [
    { name: "Road", issues: issues.filter(i => i.category?.includes("Road")).length },
    { name: "Garbage", issues: issues.filter(i => i.category?.includes("Garbage")).length },
    { name: "Water", issues: issues.filter(i => i.category?.includes("Water")).length },
    { name: "Light", issues: issues.filter(i => i.category?.includes("Light")).length }
  ];

  return (
    <div style={container}>

      {/* SIDEBAR */}
      <div style={sidebar}>
        <h2 style={{ marginBottom: "40px" }}>SmartCity</h2>

        <div style={sideItem}><FaChartPie /> Dashboard</div>
        <div style={sideItem} onClick={() => navigate("/map")}><FaMap /> City Map</div>
        <div style={sideItem} onClick={() => navigate("/report")}><FaExclamationCircle /> Report Issue</div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1 }}>

        {/* TOPBAR */}
        <div style={topbar}>
          <h2>Dashboard</h2>

          <div style={topRight}>
            <FaBell size={20} />

            <div style={{ position: "relative" }}>
              <FaUserCircle size={28} onClick={() => setMenuOpen(!menuOpen)} />

              {menuOpen && (
                <div className="dropdown">
                  <p onClick={()=>navigate("/profile")}>👤 Profile</p>
                  <p onClick={()=>navigate("/settings")}>⚙ Settings</p>
                  <button onClick={logout}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* BODY */}
        <div style={content}>

          {/* STATS */}
          <div style={statsGrid}>
            <Stat icon={<FaExclamationTriangle />} title="Issues" value={issues.length} color="#ef4444" />
            <Stat icon={<FaTools />} title="Services" value="12" color="#f59e0b" />
            <Stat icon={<FaUsers />} title="Users" value="1.2K" color="#3b82f6" />
          </div>

          {/* CHART */}
          <div className="card">
            <h2>Analytics</h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip />
                <Bar dataKey="issues" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* ISSUES */}
          <div className="card">
            <h2>Recent Issues</h2>

            {issues.length === 0 ? (
              <p>No issues yet 🚀</p>
            ) : (
              issues.map(issue => (
                <div className="card" style={issueCard} key={issue.id}>

                  <div style={topRow}>
                    <h3 style={title}>{issue.title}</h3>

                    <span style={{
                      background: issue.status === "Resolved" ? "#22c55e" : "#ef4444",
                      padding: "5px 10px",
                      borderRadius: "20px"
                    }}>
                      {issue.status}
                    </span>
                  </div>

                  <p style={category}>{issue.category}</p>
                  <p style={desc}>{issue.description}</p>

                  <p style={location}>📍 {issue.locationName}</p>

                  {/* ✅ FIXED COORDS */}
                  <p style={coords}>
                    📌 {issue.lat?.toFixed(5) || "N/A"}, {issue.lng?.toFixed(5) || "N/A"}
                  </p>

                  <div style={actions}>

                    {/* ✅ QUICK MAP */}
                    <button style={mapBtn}
                      onClick={() => navigate(`/map?lat=${issue.lat}&lng=${issue.lng}`)}>
                      View Map
                    </button>

                    <button
                      onClick={() =>
                        window.open(`https://www.google.com/maps?q=${issue.lat},${issue.lng}`, "_blank")
                      }>
                      Google Maps
                    </button>

                    {/* ✅ ADMIN ACTIONS */}
                    {role === "ADMIN" && (
                      <>
                        {issue.status !== "Resolved" && (
                          <button onClick={() => updateStatus(issue.id)}>
                            Resolve
                          </button>
                        )}

                        <button onClick={() => deleteIssue(issue.id)}>
                          Delete
                        </button>
                      </>
                    )}

                  </div>

                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;

/* COMPONENT */
function Stat({ icon, title, value, color }) {
  return (
    <div style={{ ...statCard, borderTop: `3px solid ${color}` }}>
      <div>{icon}</div>
      <h3>{title}</h3>
      <h1 style={{ color }}>{value}</h1>
    </div>
  );
}

/* STYLES */
const container = { display: "flex", minHeight: "100vh", background: "#020617", color: "white" };
const sidebar = { width: "220px", padding: "30px", borderRight: "1px solid rgba(255,255,255,0.1)" };
const sideItem = { display: "flex", gap: "10px", marginBottom: "20px", cursor: "pointer" };
const topbar = { display: "flex", justifyContent: "space-between", padding: "20px 40px" };
const topRight = { display: "flex", gap: "20px" };
const content = { padding: "40px" };
const statsGrid = { display: "grid", gap: "20px", marginBottom: "30px" };
const statCard = { padding: "20px", background: "rgba(255,255,255,0.05)", borderRadius: "12px" };
const issueCard = { marginTop: "15px" };
const topRow = { display: "flex", justifyContent: "space-between" };
const title = { fontSize: "18px" };
const category = { color: "#38bdf8" };
const desc = { opacity: 0.8 };
const location = { opacity: 0.7 };
const coords = { fontSize: "12px", opacity: 0.6 };
const actions = { display: "flex", gap: "10px", marginTop: "10px" };
const mapBtn = { border: "1px solid #60a5fa", color: "#60a5fa", background: "transparent" };