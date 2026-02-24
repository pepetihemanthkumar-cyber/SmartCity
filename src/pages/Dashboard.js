import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import BIRDS from "vanta/dist/vanta.birds.min";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";

function Dashboard() {
  const heroRef = useRef(null);
  const vantaRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!vantaRef.current && heroRef.current) {
      vantaRef.current = BIRDS({
        el: heroRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        backgroundColor: 0x07192f,
        color1: 0xff0000,
        color2: 0x00ffff,
        birdSize: 1.3,
        wingSpan: 30,
        speedLimit: 5,
        separation: 20,
        alignment: 20,
        cohesion: 20,
        quantity: 6
      });
    }

    return () => {
      if (vantaRef.current) {
        vantaRef.current.destroy();
        vantaRef.current = null;
      }
    };
  }, []);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container-fluid px-5 d-flex justify-content-between align-items-center">

          {/* LOGO */}
          <div className="d-flex align-items-center">
            <div className="logo-box me-3">
              <img src="/logo192.png" width="40" alt="logo" />
            </div>
            <span className="navbar-brand text-white fw-bold fs-4">
              Civic Nexus
            </span>
          </div>

          {/* MENU */}
          <div className="nav-menu">
            <span className="nav-item">Dashboard</span>
            <span className="nav-item">Services</span>
            <span className="nav-item">Infrastructure</span>
            <span className="nav-item">Amenities</span>
            <span className="nav-item">Report Issue</span>
            <span className="nav-item">Feedback</span>

            {/* LOGOUT */}
            <span
              className="logout-btn"
              onClick={() => navigate("/")}
            >
              Logout
            </span>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="hero" ref={heroRef}>
        <div className="hero-content">
          <h1>FOR YOUR SMART CITY</h1>
          <p>Innovation • Technology • Future</p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <div className="container section">

        {/* WELCOME */}
        <div className="welcome-box mb-5">
          <h2>👋 Welcome, User!</h2>
          <p>Access city services and report issues easily.</p>
          <button className="btn btn-primary me-2">Report Issue</button>
          <button className="btn btn-outline-primary me-2">View Services</button>
          <button className="btn btn-outline-secondary">Track My Reports</button>
        </div>

        {/* STATS */}
        <div className="row mb-5">
          <div className="col-md-3">
            <div className="card-custom">
              <h4>📌 25</h4>
              <p>Total Services</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card-custom">
              <h4>🏗 12</h4>
              <p>Infrastructure Updates</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card-custom">
              <h4>📝 3</h4>
              <p>My Reports</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card-custom">
              <h4>⭐ 5</h4>
              <p>Feedback Given</p>
            </div>
          </div>
        </div>

        {/* PUBLIC SERVICES */}
        <h3 className="mb-4 fw-bold">Public Services</h3>
        <div className="row mb-5">
          <div className="col-md-4">
            <div className="card-custom">🏥 Hospitals</div>
          </div>
          <div className="col-md-4">
            <div className="card-custom">🚓 Police Stations</div>
          </div>
          <div className="col-md-4">
            <div className="card-custom">🚒 Fire Stations</div>
          </div>
        </div>

        {/* INFRASTRUCTURE */}
        <h3 className="mb-4 fw-bold">Infrastructure Status</h3>
        <div className="row mb-5">
          <div className="col-md-3">
            <div className="status-card">Roads: ✅ Good</div>
          </div>
          <div className="col-md-3">
            <div className="status-card">Electricity: ✅ Active</div>
          </div>
          <div className="col-md-3">
            <div className="status-card">Water: ⚠ Maintenance</div>
          </div>
          <div className="col-md-3">
            <div className="status-card">Waste: ✅ Active</div>
          </div>
        </div>

        {/* REPORT TABLE */}
        <h3 className="mb-4 fw-bold">My Reports</h3>
        <table className="table table-bordered bg-white shadow">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Area</th>
              <th>Issue</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#101</td>
              <td>Main Road</td>
              <td>Pothole</td>
              <td>In Progress</td>
              <td>22 Feb 2026</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ================= FOOTER ================= */}
      <footer>
        <div className="container d-flex justify-content-between align-items-center flex-wrap">
          <div>
            <strong>A Project by :</strong><br />
            2400030935 (P. Hemanth Kumar) & 2400030302 (K. Chiranjith Sai)
          </div>

          <div className="footer-links">
            <span onClick={() => navigate("/contact")}>Contact</span>
            <span>About Project</span>
            <span>Help Center</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Dashboard;