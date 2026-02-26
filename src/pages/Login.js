import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import {
  signInWithRedirect,
  getRedirectResult
} from "firebase/auth";
import "./Login.css";
import cityImage from "../assets/city.jpg";

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  /* ===============================
     HANDLE GOOGLE REDIRECT RESULT
  =============================== */
  useEffect(() => {
    const checkRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          localStorage.setItem("userLoggedIn", "true");
          localStorage.removeItem("adminLoggedIn");

          navigate("/success", {
            state: { message: "Welcome Back 👋" }
          });
        }
      } catch (err) {
        console.error("Redirect Error:", err);
      }
    };

    checkRedirect();
  }, [navigate]);

  /* ===============================
     NORMAL LOGIN
  =============================== */
  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (role === "admin") {
      if (email === "admin@gmail.in" && password === "admin123") {
        localStorage.setItem("adminLoggedIn", "true");
        localStorage.removeItem("userLoggedIn");

        navigate("/success", {
          state: { message: "Welcome Admin 👑" }
        });
      } else {
        setError("Invalid Admin credentials!");
      }
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      localStorage.setItem("userLoggedIn", "true");
      localStorage.removeItem("adminLoggedIn");

      navigate("/success", {
        state: { message: "Welcome Back 👋" }
      });
    } else {
      setError("Invalid User credentials!");
    }
  };

  /* ===============================
     GOOGLE LOGIN (REDIRECT SAFE)
  =============================== */
  const handleGoogleLogin = async () => {
    try {
      await signInWithRedirect(auth, provider);
    } catch (err) {
      console.error("Google Error:", err);
      setError("Google Sign-in failed!");
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
        <div className="scan-line"></div>

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
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />

          {error && (
            <p style={{ color: "red", marginBottom: "10px" }}>
              {error}
            </p>
          )}

          <button type="submit">Sign In</button>
        </form>

        {/* GOOGLE LOGIN */}
        {role === "user" && (
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="google-btn"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="google"
              style={{ width: "18px", height: "18px" }}
            />
            Sign in with Google
          </button>
        )}

        {/* REGISTER LINK */}
        {role === "user" && (
          <p style={{ marginTop: "15px", fontSize: "14px" }}>
            New user?{" "}
            <span
              style={{ color: "#38bdf8", cursor: "pointer", fontWeight: "600" }}
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