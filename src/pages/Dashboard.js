import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import BIRDS from "vanta/dist/vanta.birds.min";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const heroRef = useRef(null);
  const vantaRef = useRef(null);
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
  const [notifications, setNotifications] = useState([]);

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

  /* ================= VANTA BACKGROUND ================= */
  useEffect(() => {
    if (!vantaRef.current && heroRef.current) {
      vantaRef.current = BIRDS({
        el: heroRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        backgroundColor: 0x07192f,
        color1: 0xff0000,
        color2: 0x00ffff,
        quantity: 6
      });
    }
    return () => {
      if (vantaRef.current) vantaRef.current.destroy();
    };
  }, []);

  /* ================= STATISTICS ================= */
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

  const addNotification = (message) => {
    setNotifications(prev => [
      ...prev,
      { id: Date.now(), text: message }
    ]);
  };

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
    toast.success("Issue submitted!");
    addNotification("New issue submitted.");
  };

  const handleFeedbackSubmit = () => {
    if (!feedbackText.trim() || rating === 0) {
      toast.error("Please give rating & feedback");
      return;
    }

    const newFeedback = { text: feedbackText, rating };
    setFeedbackList([...feedbackList, newFeedback]);
    setFeedbackText("");
    setRating(0);
    toast.success("Feedback submitted!");
    addNotification("Feedback submitted.");
  };

  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn");
    navigate("/");
  };

  /* ================= UI ================= */
  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar navbar-dark fixed-top bg-dark px-4 d-flex justify-content-between">

        <span className="navbar-brand fw-bold">Civic Nexus</span>

        <div className="d-flex align-items-center gap-3">

          {/* DARK MODE */}
          <button
            className="btn btn-sm btn-outline-light"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀" : "🌙"}
          </button>

          {/* NOTIFICATION */}
          <div className="position-relative">
            <span style={{ fontSize: "22px", cursor: "pointer" }}>
              🔔
            </span>
            {notifications.length > 0 && (
              <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                {notifications.length}
              </span>
            )}
          </div>

          <button className="btn btn-danger btn-sm" onClick={handleLogout}>
            Logout
          </button>

        </div>
      </nav>

      {/* HERO */}
      <section className="hero mt-5 pt-5" ref={heroRef}>
        <div className="hero-content text-center text-white">
          <h1>Smart City Dashboard</h1>
        </div>
      </section>

      <div className="container mt-5">

        {/* STAT CARDS */}
        <div className="row mb-5 text-center">
          <div className="col-md-3 mb-3">
            <div className="card p-3 shadow">
              <h4>📌 {totalIssues}</h4>
              <small>Total Issues</small>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card p-3 shadow">
              <h4>🟡 {pendingIssues}</h4>
              <small>Pending</small>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card p-3 shadow">
              <h4>🟢 {resolvedIssues}</h4>
              <small>Resolved</small>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card p-3 shadow">
              <h4>⭐ {averageRating}</h4>
              <small>Average Rating</small>
            </div>
          </div>
        </div>

        {/* SUBMIT ISSUE */}
        <form onSubmit={handleSubmitIssue} className="mb-4">
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

          <button className="btn btn-primary">Submit Issue</button>
        </form>

        {/* FEEDBACK */}
        <h4 className="mt-5">Feedback</h4>

        <div className="mb-2">
          {[1,2,3,4,5].map((star) => (
            <span
              key={star}
              style={{
                fontSize: "28px",
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
          className="btn btn-success mb-4"
          onClick={handleFeedbackSubmit}
        >
          Submit Feedback
        </button>

      </div>

      {/* FOOTER */}
      {/* FOOTER */}
<footer className="footer-section mt-5">
  <div className="container text-center text-white py-4">

    <p className="fw-bold">A Project by :</p>
    <p>
      2400030935 (P. Hemanth Kumar) & 2400030302 (K. Chiranjith Sai)
    </p>

    <div className="footer-links mt-3">
      <span onClick={() => navigate("/contact")}>
        Contact
      </span>

      <span onClick={() => navigate("/about")}>
        About Project
      </span>

      <span onClick={() => navigate("/help")}>
        Help Center
      </span>
    </div>

  </div>
</footer>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default Dashboard;