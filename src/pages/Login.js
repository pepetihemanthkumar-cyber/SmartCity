import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import cityImage from "../assets/city.jpg";

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    // 🔐 ADMIN LOGIN
    if (role === "admin") {
      if (email === "admin@gmail.in" && password === "admin123") {
        setError("");
        navigate("/admin");
      } else {
        setError("Invalid Admin credentials!");
      }
      return;
    }

    // 👤 USER LOGIN (Check Registered User)
    if (role === "user") {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (
        storedUser &&
        storedUser.email === email &&
        storedUser.password === password
      ) {
        setError("");
        navigate("/user");
      } else {
        setError("Invalid User credentials!");
      }
    }
  };

  return (
    <div className="login-container">

      {/* LEFT PANEL */}
      <div
        className="left-panel"
        style={{
          backgroundImage: `url(${cityImage})`,
        }}
      >
        <div className="overlay">
          <h1>
            Smart City <br /> Management Portal
          </h1>
          <p>
            Connecting citizens with services and empowering
            administrators to build a better future.
          </p>

          {/* STATS */}
          <div className="stats">
            <div className="stat-card">
              <h3>24/7</h3>
              <p>Service Access</p>
            </div>

            <div className="stat-card">
              <h3>98%</h3>
              <p>Issue Resolution</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        <h2>Welcome back</h2>
        <p>Please sign in to continue</p>

        {/* ROLE SELECTION */}
        <div className="role-selection">
          <button
            type="button"
            className={role === "admin" ? "active" : ""}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>

          <button
            type="button"
            className={role === "user" ? "active" : ""}
            onClick={() => setRole("user")}
          >
            User
          </button>
        </div>

        {/* LOGIN FORM */}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />

          {error && (
            <p style={{ color: "red", marginBottom: "10px" }}>
              {error}
            </p>
          )}

          <button type="submit">Sign In</button>
        </form>

        {/* 🔥 CREATE ACCOUNT LINK */}
        {role === "user" && (
          <p style={{ marginTop: "15px" }}>
            New user?{" "}
            <span
              style={{
                color: "#2563eb",
                cursor: "pointer",
                fontWeight: "600"
              }}
              onClick={() => navigate("/register")}
            >
              Create an Account
            </span>
          </p>
        )}

      </div>

    </div>
  );
}

export default Login;