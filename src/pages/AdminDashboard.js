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
import "bootstrap/dist/css/bootstrap.min.css";

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

  /* ================= FILTER ================= */
  const filteredIssues = issues.filter(issue => {
    const matchesSearch =
      issue.text.toLowerCase().includes(searchTerm.toLowerCase());

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
        data: [
          totalIssues,
          pending,
          inProgress,
          resolved,
          feedbackCount
        ],
        backgroundColor: [
          "#3b82f6",
          "#f59e0b",
          "#0ea5e9",
          "#16a34a",
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
        backgroundColor: ["#f59e0b", "#0ea5e9", "#16a34a"]
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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this issue?"
    );

    if (!confirmDelete) return;

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
    <>
      {/* NAVBAR */}
      <nav className="navbar navbar-dark bg-dark px-4 d-flex justify-content-between">
        <span className="navbar-brand fw-bold">
          👑 Admin Dashboard
        </span>
        <button
          className="btn btn-danger btn-sm"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>

      <div className="container mt-5 pt-4">

        {/* ANALYTICS */}
        <h4 className="mb-4">📊 City Analytics</h4>
        <div className="row mb-5">
          <div className="col-md-6 mb-4">
            <div className="bg-white p-4 shadow rounded">
              <Bar data={barData} />
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="bg-white p-4 shadow rounded">
              <Pie data={pieData} />
            </div>
          </div>
        </div>

        {/* MANAGE ISSUES */}
        <h4 className="mb-3">🛠 Manage User Issues</h4>

        {/* SEARCH + FILTER */}
        <div className="row mb-3">
          <div className="col-md-6 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search issues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="col-md-3 mb-2">
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
        </div>

        {/* TABLE */}
        <div className="table-responsive mb-5">
          <table className="table table-bordered bg-white shadow">
            <thead className="table-dark">
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
                  <td colSpan="6" className="text-center">
                    No matching issues found.
                  </td>
                </tr>
              ) : (
                filteredIssues.map(issue => (
                  <tr key={issue.id}>
                    <td>#{issue.id}</td>
                    <td>{issue.category}</td>
                    <td>{issue.text}</td>

                    <td>
                      <select
                        className="form-select"
                        value={issue.status}
                        onChange={(e) =>
                          handleStatusChange(issue.id, e.target.value)
                        }
                      >
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Resolved</option>
                      </select>
                    </td>

                    <td>{issue.date}</td>

                    <td>
                      <button
                        className="btn btn-danger btn-sm"
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
        </div>

        {/* FEEDBACK */}
        <h4 className="mb-3">⭐ User Feedback</h4>
        {feedbackList.length === 0 ? (
          <p>No feedback submitted yet.</p>
        ) : (
          <ul className="list-group mb-5">
            {feedbackList.map((fb, index) => (
              <li key={index} className="list-group-item">
                {"★".repeat(fb.rating)} {fb.text}
              </li>
            ))}
          </ul>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default AdminDashboard;