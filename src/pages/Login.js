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

    // 🔐 Admin Login
    if (role === "admin") {
      if (email === "admin@gmail.in" && password === "admin123") {
        setError("");
        navigate("/admin");
      } else {
        setError("Invalid Admin credentials!");
      }
    }

    // 👤 User Login
    if (role === "user") {
      setError("");
      navigate("/user");
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
      </div>

    </div>
  );
}

export default Login;