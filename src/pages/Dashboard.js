import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const navigate = useNavigate();

  /* ================= STATES ================= */
  const [issueText, setIssueText] = useState("");
  const [category, setCategory] = useState("Road Issue");
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(0);
  const [issues, setIssues] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  /* ================= DARK MODE ================= */
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    setIssues(JSON.parse(localStorage.getItem("userIssues")) || []);
    setFeedbackList(JSON.parse(localStorage.getItem("userFeedback")) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("userIssues", JSON.stringify(issues));
  }, [issues]);

  useEffect(() => {
    localStorage.setItem("userFeedback", JSON.stringify(feedbackList));
  }, [feedbackList]);

  /* ================= STATS ================= */
  const totalIssues = issues.length;
  const pendingIssues = issues.filter(i => i.status === "Pending").length;
  const resolvedIssues = issues.filter(i => i.status === "Resolved").length;

  const averageRating =
    feedbackList.length === 0
      ? 0
      : (
          feedbackList.reduce((sum, fb) => sum + fb.rating, 0) /
          feedbackList.length
        ).toFixed(1);

  /* ================= FUNCTIONS ================= */

  const handleSubmitIssue = (e) => {
    e.preventDefault();
    if (!issueText.trim()) return;

    const newIssue = {
      id: Date.now(),
      category,
      text: issueText,
      status: "Pending",
      date: new Date().toLocaleDateString()
    };

    setIssues([...issues, newIssue]);
    setIssueText("");
    toast.success("Issue submitted successfully!");
  };

  const handleFeedbackSubmit = () => {
    if (!feedbackText.trim() || rating === 0) {
      toast.error("Please provide rating & feedback");
      return;
    }

    const newFeedback = { text: feedbackText, rating };
    setFeedbackList([...feedbackList, newFeedback]);
    setFeedbackText("");
    setRating(0);
    toast.success("Feedback submitted!");
  };

  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn");
    navigate("/");
  };

  /* ================= UI ================= */
  return (
    <div className="dashboard-layout">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h3 className="logo">Civic Nexus</h3>

        <div className="sidebar-menu">
          <div className="menu-item">🏠 Dashboard</div>
          <div className="menu-item">📌 My Issues</div>
          <div className="menu-item">⭐ Feedback</div>
          <div 
            className="menu-item"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </div>
          <div 
            className="menu-item text-danger"
            onClick={handleLogout}
          >
            🚪 Logout
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">

        <h2 className="mb-4">User Dashboard</h2>

        {/* ================= STAT CARDS ================= */}
        <div className="row mb-5 text-center">
          <div className="col-md-3 mb-3">
            <div className="glass-stat-card">
              <h5>Total Issues</h5>
              <h2><CountUp end={totalIssues} duration={1.5} /></h2>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="glass-stat-card">
              <h5>Pending</h5>
              <h2 style={{ color: "#facc15" }}>
                <CountUp end={pendingIssues} duration={1.5} />
              </h2>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="glass-stat-card">
              <h5>Resolved</h5>
              <h2 style={{ color: "#22c55e" }}>
                <CountUp end={resolvedIssues} duration={1.5} />
              </h2>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="glass-stat-card">
              <h5>Avg Rating</h5>
              <h2>⭐ {averageRating}</h2>
            </div>
          </div>
        </div>

        {/* ================= SUBMIT ISSUE ================= */}
        <div className="glass-stat-card mb-4">
          <h5 className="mb-3">Submit New Issue</h5>
          <form onSubmit={handleSubmitIssue}>
            <select
              className="form-select mb-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Road Issue</option>
              <option>Water Issue</option>
              <option>Electricity Issue</option>
              <option>Garbage Issue</option>
            </select>

            <input
              type="text"
              className="form-control mb-2"
              placeholder="Describe issue..."
              value={issueText}
              onChange={(e) => setIssueText(e.target.value)}
            />

            <button className="btn btn-primary">
              Submit Issue
            </button>
          </form>
        </div>

        {/* ================= FEEDBACK ================= */}
        <div className="glass-stat-card">
          <h5 className="mb-3">Submit Feedback</h5>

          <div className="mb-2">
            {[1,2,3,4,5].map((star) => (
              <span
                key={star}
                style={{
                  fontSize: "26px",
                  cursor: "pointer",
                  color: star <= rating ? "#ffc107" : "#ccc"
                }}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            className="form-control mb-2"
            placeholder="Write feedback..."
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          />

          <button
            className="btn btn-success"
            onClick={handleFeedbackSubmit}
          >
            Submit Feedback
          </button>
        </div>

      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default Dashboard;