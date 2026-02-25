import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import "./Login.css";
import cityImage from "../assets/city.jpg";

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  // ===============================
  // 🔐 NORMAL LOGIN
  // ===============================
  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    // ADMIN LOGIN
    if (role === "admin") {
      if (email === "admin@gmail.in" && password === "admin123") {
        setError("");
        navigate("/admin");
      } else {
        setError("Invalid Admin credentials!");
      }
      return;
    }

    // USER LOGIN
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
  };

  // ===============================
  // 🔵 GOOGLE LOGIN
  // ===============================
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google User:", result.user);
      setError("");
      navigate("/user");
    } catch (err) {
      console.error("Google Error:", err.code);
      setError(err.message);
    }
  };

  return (
    <div className="login-container">

      {/* LEFT PANEL */}
      <div
        className="left-panel"
        style={{ backgroundImage: `url(${cityImage})` }}
      >
        <div className="overlay">
          <h1>Civic Nexus</h1>

          <p>
            A Smart Digital Governance Platform empowering citizens
            with seamless city services and real-time solutions.
          </p>

          <div className="stats">
            <div className="stat-card">
              <h3>24/7</h3>
              <p>Citizen Service Access</p>
            </div>

            <div className="stat-card">
              <h3>98%</h3>
              <p>Issue Resolution Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        <h2>Welcome Back</h2>
        <p>Please sign in to continue</p>

        {/* ROLE SWITCH */}
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
            <p style={{ color: "red", marginBottom: "10px", fontSize: "14px" }}>
              {error}
            </p>
          )}

          <button type="submit">Sign In</button>
        </form>

        {/* GOOGLE BUTTON (Only for User) */}
        {role === "user" && (
          <button
            type="button"
            onClick={handleGoogleLogin}
            style={{
              marginTop: "15px",
              backgroundColor: "#ffffff",
              color: "#444",
              padding: "10px",
              width: "100%",
              border: "1px solid #dadce0",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px"
            }}
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="google"
              style={{ width: "18px", height: "18px" }}
            />
            Sign in with Google
          </button>
        )}

        {/* CREATE ACCOUNT */}
        {role === "user" && (
          <p style={{ marginTop: "15px", fontSize: "14px" }}>
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