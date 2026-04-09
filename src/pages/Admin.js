import React, { useContext, useState, useMemo } from "react";
import { IssueContext } from "../context/IssueContext";
import { AuthContext } from "../context/AuthContext"; // ✅ ADDED
import {
  FaChartBar,
  FaCheckCircle,
  FaExclamationCircle,
  FaTrash,
  FaMapMarkerAlt,
  FaSearch
} from "react-icons/fa";

import AdminMap from "./AdminMap";

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
  const { user } = useContext(AuthContext); // ✅ ADDED

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loadingId, setLoadingId] = useState(null);

  // ✅ ADMIN PROTECTION
  if (!user || user.role !== "ADMIN") {
    return <h2 style={{ color: "white", padding: "40px" }}>Access Denied ❌</h2>;
  }

  /* ================= KPIs ================= */
  const openIssues = useMemo(
    () => issues.filter(i => i.status === "Open").length,
    [issues]
  );

  const resolvedIssues = useMemo(
    () => issues.filter(i => i.status === "Resolved").length,
    [issues]
  );

  /* ================= FILTER ================= */
  const filteredIssues = useMemo(() => {
    return issues.filter(issue => {
      return (
        (categoryFilter === "All" || issue.category === categoryFilter) &&
        (statusFilter === "All" || issue.status === statusFilter) &&
        (issue.title || "").toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [issues, categoryFilter, statusFilter, search]);

  /* ================= CHART ================= */
  const chartData = [
    { name: "Open", value: openIssues },
    { name: "Resolved", value: resolvedIssues }
  ];

  const COLORS = ["#ef4444", "#22c55e"];

  /* ================= ACTIONS ================= */
  const handleResolve = async (id) => {
    setLoadingId(id);
    await updateStatus(id, "Resolved");
    setLoadingId(null);
  };

  const handleDelete = async (id) => {
    setLoadingId(id);
    await deleteIssue(id);
    setLoadingId(null);
  };

  return (
    <div style={container}>

      {/* SIDEBAR */}
      <div style={sidebar}>
        <h2 style={logo}>⚡ Admin</h2>
        <div style={menuItemActive}>📊 Dashboard</div>
        <div style={menuItem}>📍 Issues</div>
        <div style={menuItem}>⚙ Settings</div>
      </div>

      {/* MAIN */}
      <div style={main}>

        <h1 style={title}>Admin Dashboard</h1>

        {/* KPI */}
        <div style={stats}>
          <div style={cardBlue}>
            <FaChartBar size={26} />
            <h4>Total Issues</h4>
            <h2>{issues.length}</h2>
          </div>

          <div style={cardRed}>
            <FaExclamationCircle size={26} />
            <h4>Open</h4>
            <h2>{openIssues}</h2>
          </div>

          <div style={cardGreen}>
            <FaCheckCircle size={26} />
            <h4>Resolved</h4>
            <h2>{resolvedIssues}</h2>
          </div>
        </div>

        {/* CHART */}
        <div style={chartBox}>
          <h2>Issue Analytics</h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={chartData} dataKey="value" outerRadius={90} label>
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* MAP */}
        <AdminMap issues={filteredIssues} />

        {/* FILTER */}
        <div style={filterBox}>
          <div style={searchBox}>
            <FaSearch />
            <input
              placeholder="Search issues..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={searchInput}
            />
          </div>

          <select style={select} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option>All</option>
            <option>Garbage</option>
            <option>Water Leakage</option>
            <option>Road Damage</option>
            <option>Street Light</option>
          </select>

          <select style={select} onChange={(e) => setStatusFilter(e.target.value)}>
            <option>All</option>
            <option>Open</option>
            <option>Resolved</option>
          </select>
        </div>

        {/* ISSUES */}
        <div style={grid}>
          {filteredIssues.map(issue => {

            const isResolved = issue.status === "Resolved";

            return (
              <div key={issue.id} style={issueCard}>

                <div style={topRow}>
                  <h3>{issue.title}</h3>

                  <span style={{
                    ...badge,
                    background: isResolved ? "#22c55e" : "#ef4444"
                  }}>
                    {issue.status}
                  </span>
                </div>

                <p style={category}>{issue.category}</p>
                <p style={desc}>{issue.description}</p>

                <p style={location}>
                  <FaMapMarkerAlt /> {issue.locationName}
                </p>

                {/* ✅ FIXED COORDS */}
                <p style={coords}>
                  📍 {issue.lat?.toFixed(5)}, {issue.lng?.toFixed(5)}
                </p>

                <div style={btnRow}>

                  {/* ✅ FIXED BUTTON */}
                  <button
                    onClick={() => handleResolve(issue.id)}
                    disabled={loadingId === issue.id || isResolved}
                    style={{
                      ...resolveBtn,
                      opacity: isResolved ? 0.5 : 1
                    }}
                  >
                    {isResolved ? "Resolved" : "Resolve"}
                  </button>

                  <button
                    onClick={() => handleDelete(issue.id)}
                    style={deleteBtn}
                  >
                    <FaTrash />
                  </button>

                </div>

                {/* ✅ QUICK MAP BUTTON */}
                <button
                  onClick={() =>
                    window.open(`https://www.google.com/maps?q=${issue.lat},${issue.lng}`)
                  }
                  style={{ marginTop: "10px" }}
                >
                  Open Map
                </button>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default Admin;


/* ================= STYLES ================= */

const container = {
  display: "flex",
  minHeight: "100vh",
  background: "linear-gradient(135deg,#020617,#0f172a,#1e293b)",
  color: "white"
};

const sidebar = {
  width: "230px",
  background: "#020617",
  padding: "30px",
  borderRight: "1px solid rgba(255,255,255,0.1)"
};

const logo = {
  marginBottom: "40px"
};

const menuItem = {
  marginTop: "15px",
  cursor: "pointer",
  opacity: 0.7
};

const menuItemActive = {
  marginTop: "15px",
  cursor: "pointer",
  color: "#60a5fa",
  fontWeight: "bold"
};

const main = {
  flex: 1,
  padding: "40px"
};

const title = {
  marginBottom: "25px"
};

const stats = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: "20px",
  marginBottom: "30px"
};

const cardBlue = {
  background: "#1e40af",
  padding: "20px",
  borderRadius: "12px"
};

const cardRed = {
  background: "#7f1d1d",
  padding: "20px",
  borderRadius: "12px"
};

const cardGreen = {
  background: "#064e3b",
  padding: "20px",
  borderRadius: "12px"
};

const chartBox = {
  background: "rgba(255,255,255,0.05)",
  padding: "20px",
  borderRadius: "16px",
  marginBottom: "30px"
};

const filterBox = {
  display: "flex",
  gap: "12px",
  marginBottom: "20px"
};

const searchBox = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  background: "#020617",
  padding: "8px",
  borderRadius: "8px",
  border: "1px solid #334155"
};

const searchInput = {
  background: "transparent",
  border: "none",
  outline: "none",
  color: "white"
};

const select = {
  padding: "10px",
  borderRadius: "8px",
  background: "#020617",
  color: "white",
  border: "1px solid #334155"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "20px"
};

const issueCard = {
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(20px)",
  padding: "20px",
  borderRadius: "16px",
  transition: "0.3s"
};

const topRow = {
  display: "flex",
  justifyContent: "space-between"
};

const badge = {
  padding: "5px 12px",
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