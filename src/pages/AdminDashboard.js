import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AdminPanel.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function AdminDashboard() {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [issues, setIssues] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    setIssues(JSON.parse(localStorage.getItem("userIssues")) || []);
    setFeedbackList(JSON.parse(localStorage.getItem("userFeedback")) || []);
  }, []);

  /* ================= SAFE FILTER ================= */
  const filteredIssues = issues.filter(issue => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      (issue.category || "").toLowerCase().includes(search) ||
      (issue.description || "").toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "All" || issue.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  /* ================= ANALYTICS ================= */
  const totalIssues = issues.length;
  const pending = issues.filter(i => i.status === "Pending").length;
  const inProgress = issues.filter(i => i.status === "In Progress").length;
  const resolved = issues.filter(i => i.status === "Resolved").length;
  const feedbackCount = feedbackList.length;

  const barData = {
    labels: ["Total", "Pending", "In Progress", "Resolved", "Feedback"],
    datasets: [
      {
        label: "City Analytics",
        data: [totalIssues, pending, inProgress, resolved, feedbackCount],
        backgroundColor: [
          "#3b82f6",
          "#facc15",
          "#0ea5e9",
          "#22c55e",
          "#8b5cf6"
        ]
      }
    ]
  };

  const pieData = {
    labels: ["Pending", "In Progress", "Resolved"],
    datasets: [
      {
        data: [pending, inProgress, resolved],
        backgroundColor: ["#facc15", "#0ea5e9", "#22c55e"]
      }
    ]
  };

  /* ================= UPDATE STATUS ================= */
  const handleStatusChange = (id, newStatus) => {
    const updated = issues.map(issue =>
      issue.id === id ? { ...issue, status: newStatus } : issue
    );

    setIssues(updated);
    localStorage.setItem("userIssues", JSON.stringify(updated));
    toast.success("Status updated successfully ✅");
  };

  /* ================= DELETE ISSUE ================= */
  const handleDeleteIssue = (id) => {
    if (!window.confirm("Are you sure you want to delete this issue?"))
      return;

    const updated = issues.filter(issue => issue.id !== id);
    setIssues(updated);
    localStorage.setItem("userIssues", JSON.stringify(updated));
    toast.success("Issue deleted successfully 👑");
  };

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/");
  };

  return (
    <div className="admin-layout">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2 className="logo">👑 Civic Admin</h2>
        <ul>
          <li className="active">📊 Dashboard</li>
          <li>🛠 Manage Issues</li>
          <li>📈 Analytics</li>
          <li className="logout-item" onClick={handleLogout}>
            🚪 Logout
          </li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">

        <h1>📊 Admin Dashboard</h1>

        {/* ANALYTICS */}
        <section className="glass-card mb-5">
          <h4>City Analytics</h4>
          <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
            <div style={{ flex: 1 }}>
              <Bar data={barData} />
            </div>
            <div style={{ flex: 1 }}>
              <Pie data={pieData} />
            </div>
          </div>
        </section>

        {/* MANAGE ISSUES */}
        <section className="glass-card">
          <h4>🛠 Manage User Issues</h4>

          {/* SEARCH & FILTER */}
          <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Search issues..."
              className="form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>

          {/* TABLE */}
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Category</th>
                <th>Description</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredIssues.length === 0 ? (
                <tr>
                  <td colSpan="6">No matching issues found.</td>
                </tr>
              ) : (
                filteredIssues.map(issue => (
                  <tr key={issue.id}>
                    <td>#{issue.id}</td>
                    <td>{issue.category || "-"}</td>
                    <td>{issue.description || "-"}</td>

                    <td>
                      <select
                        className="form-select"
                        value={issue.status}
                        onChange={(e) =>
                          handleStatusChange(issue.id, e.target.value)
                        }
                        style={{ marginBottom: "6px" }}
                      >
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Resolved</option>
                      </select>

                      {issue.status === "Pending" && (
                        <span className="badge-pending">Pending</span>
                      )}
                      {issue.status === "In Progress" && (
                        <span className="badge-progress">In Progress</span>
                      )}
                      {issue.status === "Resolved" && (
                        <span className="badge-resolved">Resolved</span>
                      )}
                    </td>

                    <td>{issue.date || "-"}</td>

                    <td>
                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDeleteIssue(issue.id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>

      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default AdminDashboard;