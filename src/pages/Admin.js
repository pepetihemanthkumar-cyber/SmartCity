import React, { useContext, useState } from "react";
import { IssueContext } from "../context/IssueContext";
import {
  FaChartBar,
  FaCheckCircle,
  FaExclamationCircle,
  FaTrash,
  FaMapMarkerAlt
} from "react-icons/fa";

import AdminMap from "./AdminMap";

/* 📊 CHART */
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function Admin() {

  const { issues, deleteIssue, updateStatus } = useContext(IssueContext);

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const openIssues = issues.filter(i => i.status === "Open").length;
  const resolvedIssues = issues.filter(i => i.status === "Resolved").length;

  /* FILTER */
  const filteredIssues = issues.filter(issue => {
    return (
      (categoryFilter === "All" || issue.category === categoryFilter) &&
      (statusFilter === "All" || issue.status === statusFilter)
    );
  });

  /* 📊 CHART DATA */
  const chartData = [
    { name: "Open", value: openIssues },
    { name: "Resolved", value: resolvedIssues }
  ];

  const COLORS = ["#ef4444", "#22c55e"];

  return (
    <div style={container}>

      {/* SIDEBAR */}
      <div style={sidebar}>
        <h2>⚡ Admin</h2>
        <div style={menuItem}>📊 Dashboard</div>
        <div style={menuItem}>📍 Issues</div>
        <div style={menuItem}>⚙ Settings</div>
      </div>

      {/* MAIN */}
      <div style={main}>

        <h1 style={title}>Admin Dashboard</h1>

        {/* KPI */}
        <div style={stats}>

          <div style={cardBlue}>
            <FaChartBar size={30} />
            <h3>Total</h3>
            <h2>{issues.length}</h2>
          </div>

          <div style={cardRed}>
            <FaExclamationCircle size={30} />
            <h3>Open</h3>
            <h2>{openIssues}</h2>
          </div>

          <div style={cardGreen}>
            <FaCheckCircle size={30} />
            <h3>Resolved</h3>
            <h2>{resolvedIssues}</h2>
          </div>

        </div>

        {/* 📊 ANALYTICS */}
        <div style={chartBox}>
          <h2>Issue Analytics</h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={chartData} dataKey="value" outerRadius={80} label>
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 🗺 MAP */}
        <AdminMap issues={filteredIssues} />

        {/* FILTERS */}
        <div style={filterBox}>

          <select onChange={(e) => setCategoryFilter(e.target.value)}>
            <option>All</option>
            <option>Garbage</option>
            <option>Water Leakage</option>
            <option>Road</option>
            <option>Street Light</option>
          </select>

          <select onChange={(e) => setStatusFilter(e.target.value)}>
            <option>All</option>
            <option>Open</option>
            <option>Resolved</option>
          </select>

        </div>

        {/* ISSUES */}
        <div style={grid}>

          {filteredIssues.length === 0 && (
            <p>No issues found</p>
          )}

          {filteredIssues.map(issue => (

            <div
              key={issue.id}
              style={issueCard}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >

              <div style={topRow}>
                <h3>{issue.title}</h3>

                <span style={{
                  ...badge,
                  background: issue.status === "Resolved" ? "#22c55e" : "#ef4444"
                }}>
                  {issue.status}
                </span>
              </div>

              <p style={category}>{issue.category}</p>
              <p style={desc}>{issue.description}</p>

              <p style={location}>
                <FaMapMarkerAlt /> {issue.locationName}
              </p>

              <p style={coords}>
                {issue.lat ? issue.lat.toFixed(5) : "N/A"},
                {issue.lng ? issue.lng.toFixed(5) : "N/A"}
              </p>

              {/* ACTIONS */}
              <div style={btnRow}>

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
                  <FaTrash />
                </button>

              </div>

              <a
                href={`https://www.google.com/maps?q=${issue.lat},${issue.lng}`}
                target="_blank"
                rel="noreferrer"
                style={mapLink}
              >
                View on Map
              </a>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
}

/* 💎 STYLES */

const container = {
  display: "flex",
  minHeight: "100vh",
  background: "linear-gradient(135deg,#020617,#0f172a,#1e293b)",
  color: "white"
};

const sidebar = {
  width: "220px",
  background: "#020617",
  padding: "25px"
};

const menuItem = {
  marginTop: "20px",
  cursor: "pointer",
  opacity: 0.8
};

const main = {
  flex: 1,
  padding: "30px"
};

const title = {
  marginBottom: "20px"
};

const stats = {
  display: "flex",
  gap: "20px",
  marginBottom: "30px"
};

const cardBlue = {
  flex: 1,
  background: "#1e3a8a",
  padding: "20px",
  borderRadius: "10px"
};

const cardRed = {
  flex: 1,
  background: "#7f1d1d",
  padding: "20px",
  borderRadius: "10px"
};

const cardGreen = {
  flex: 1,
  background: "#064e3b",
  padding: "20px",
  borderRadius: "10px"
};

const chartBox = {
  background: "rgba(255,255,255,0.05)",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "30px"
};

const filterBox = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "20px"
};

const issueCard = {
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(10px)",
  padding: "20px",
  borderRadius: "16px",
  transition: "0.3s"
};

const topRow = {
  display: "flex",
  justifyContent: "space-between"
};

const badge = {
  padding: "5px 10px",
  borderRadius: "20px",
  fontSize: "12px"
};

const category = {
  marginTop: "5px",
  color: "#38bdf8"
};

const desc = {
  marginTop: "10px",
  color: "#d1d5db"
};

const location = {
  marginTop: "10px"
};

const coords = {
  fontSize: "12px",
  color: "#9ca3af"
};

const btnRow = {
  marginTop: "15px",
  display: "flex",
  gap: "10px"
};

const resolveBtn = {
  flex: 1,
  background: "linear-gradient(45deg,#22c55e,#16a34a)",
  border: "none",
  padding: "10px",
  color: "white",
  borderRadius: "8px",
  cursor: "pointer"
};

const deleteBtn = {
  background: "#ef4444",
  border: "none",
  padding: "10px",
  color: "white",
  borderRadius: "8px",
  cursor: "pointer"
};

const mapLink = {
  display: "block",
  marginTop: "10px",
  color: "#6366f1"
};

export default Admin;