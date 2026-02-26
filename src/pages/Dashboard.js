import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import * as THREE from "three";
import BIRDS from "vanta/dist/vanta.birds.min";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const vantaRef = useRef(null);

  /* ================= STATES ================= */
  const [issues, setIssues] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [feedbackText, setFeedbackText] = useState("");

  /* ================= SAFE VANTA ================= */
  useEffect(() => {
    let effect;

    if (!heroRef.current) return;

    if (!vantaRef.current) {
      try {
        effect = BIRDS({
          el: heroRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          backgroundColor: 0x07192f,
          color1: 0xff0000,
          color2: 0x00ffff,
          quantity: 50,
          birdSize: 1.2,
          wingSpan: 25,
          speedLimit: 4
        });

        vantaRef.current = effect;
      } catch (err) {
        console.log("Vanta error:", err);
      }
    }

    return () => {
      if (vantaRef.current) {
        try {
          vantaRef.current.destroy();
        } catch (err) {
          console.log("Destroy error:", err);
        }
        vantaRef.current = null;
      }
    };
  }, []);

  /* ================= DARK MODE ================= */
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  /* ================= LOAD LOCAL DATA ================= */
  useEffect(() => {
    setIssues(JSON.parse(localStorage.getItem("userIssues")) || []);
    setFeedbackList(JSON.parse(localStorage.getItem("userFeedback")) || []);
  }, []);

  /* ================= SUBMIT ISSUE ================= */
  const handleSubmit = () => {
    if (!category || !description) {
      toast.error("Please fill all fields");
      return;
    }

    const newIssue = {
      id: Date.now(),
      category,
      description,
      status: "Pending",
      date: new Date().toLocaleDateString()
    };

    const updated = [...issues, newIssue];
    setIssues(updated);
    localStorage.setItem("userIssues", JSON.stringify(updated));

    setCategory("");
    setDescription("");
    toast.success("Report Submitted Successfully");
  };

  /* ================= DELETE ISSUE ================= */
  const handleDelete = (id) => {
    const updated = issues.filter(issue => issue.id !== id);
    setIssues(updated);
    localStorage.setItem("userIssues", JSON.stringify(updated));
    toast.info("Report Deleted");
  };

  /* ================= SUBMIT FEEDBACK ================= */
  const handleFeedback = () => {
    if (!feedbackText) {
      toast.error("Write some feedback");
      return;
    }

    const newFeedback = {
      id: Date.now(),
      text: feedbackText,
      rating: 5
    };

    const updated = [...feedbackList, newFeedback];
    setFeedbackList(updated);
    localStorage.setItem("userFeedback", JSON.stringify(updated));

    setFeedbackText("");
    toast.success("Feedback Submitted");
  };

  /* ================= STATS ================= */
  const totalIssues = issues.length;
  const pendingIssues = issues.filter(i => i.status === "Pending").length;
  const resolvedIssues = issues.filter(i => i.status === "Resolved").length;

  const averageRating =
    feedbackList.length > 0
      ? (
          feedbackList.reduce((sum) => sum + 5, 0) /
          feedbackList.length
        ).toFixed(1)
      : "0.0";

  const filteredIssues = issues.filter(issue =>
    issue.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn");
    navigate("/");
  };

  return (
    <div className="dashboard-layout">
      <div ref={heroRef} className="vanta-bg" />

      {/* SIDEBAR */}
      <div className="sidebar">
        <h3 className="logo">Civic Nexus</h3>

        <div className="sidebar-menu">
          <div className="menu-item" onClick={() => navigate("/about")}>
            ℹ About
          </div>

          <div className="menu-item" onClick={() => navigate("/help")}>
            ❓ Help
          </div>

          <div className="menu-item" onClick={() => navigate("/contact")}>
            📞 Contact
          </div>

          <div className="menu-item" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </div>

          <div className="menu-item text-danger" onClick={handleLogout}>
            🚪 Logout
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">
        <h2>User Dashboard</h2>

        <div className="row text-center mb-4">
          <StatCard title="Total Issues" value={totalIssues} />
          <StatCard title="Pending" value={pendingIssues} color="#facc15" />
          <StatCard title="Resolved" value={resolvedIssues} color="#22c55e" />
          <StatCard title="Avg Rating" value={`⭐ ${averageRating}`} />
        </div>

        {/* SUBMIT ISSUE */}
        <div className="glass-stat-card mb-4">
          <h5>➕ Submit New Problem</h5>

          <select
            className="form-select mb-3"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option>Road Issue</option>
            <option>Water Problem</option>
            <option>Electricity</option>
            <option>Garbage</option>
          </select>

          <textarea
            className="form-control mb-3"
            placeholder="Describe the issue..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit Report
          </button>
        </div>

        {/* SEARCH */}
        <input
          className="form-control mb-3"
          placeholder="Search by category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* REPORT TABLE */}
        <div className="glass-stat-card">
          <h5>📌 My Reports</h5>

          {filteredIssues.length === 0 ? (
            <p>No reports found.</p>
          ) : (
            <table className="report-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredIssues.map(issue => (
                  <tr key={issue.id}>
                    <td>#{issue.id}</td>
                    <td>{issue.category}</td>
                    <td>{issue.status}</td>
                    <td>{issue.date}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(issue.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* FEEDBACK */}
        <div className="glass-stat-card mt-4">
          <h5>⭐ Submit Feedback</h5>
          <textarea
            className="form-control mb-3"
            placeholder="Write feedback..."
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          />
          <button className="btn btn-success" onClick={handleFeedback}>
            Submit Feedback
          </button>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

/* STAT CARD */
const StatCard = ({ title, value, color }) => (
  <div className="col-md-3 mb-3">
    <div className="glass-stat-card">
      <h5>{title}</h5>
      <h2 style={{ color: color || "inherit" }}>
        {typeof value === "number"
          ? <CountUp end={value} duration={1.5} />
          : value}
      </h2>
    </div>
  </div>
);

export default Dashboard;