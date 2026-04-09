import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaFacebookF, FaApple } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
function Login() {

  const [role, setRole] = useState("USER");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  /* ================= LOGIN ================= */
  const handleSubmit = () => {

    if (loading) return;

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      alert("Please fill all fields ❌");
      return;
    }

    setLoading(true);

    try {

      /* 🔐 ADMIN LOGIN (FIXED) */
      if (role === "ADMIN") {

        const ADMIN_EMAIL = "admin1176";
        const ADMIN_PASSWORD = "Phk@1176.";

        if (cleanEmail === ADMIN_EMAIL && cleanPassword === ADMIN_PASSWORD) {

          login({
            username: cleanEmail,
            role: "ADMIN",
            email: cleanEmail
          });

          navigate("/admin");
          return;

        } else {
          alert("❌ Invalid Admin Credentials");
          return;
        }
      }

      /* 👤 USER LOGIN */
      login({
        username: cleanEmail,
        role: "USER",
        email: cleanEmail
      });

      navigate("/home");

    } catch (err) {
      console.error(err);
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  /* ================= GOOGLE LOGIN ================= */
  const handleGoogleSuccess = (credentialResponse) => {

    if (!credentialResponse?.credential) return;

    try {
      const payload = JSON.parse(
        atob(credentialResponse.credential.split(".")[1])
      );

      const googleUser = {
        username: payload.name || payload.email || "google-user",
        email: payload.email,
        role: "USER"
      };

      login(googleUser);
      navigate("/home");

    } catch (err) {
      console.error("Google parse error ❌", err);
    }
  };

  const isMobile = window.innerWidth < 768;

  return (
    <div style={container}>

      {/* LEFT */}
      <div style={{ ...leftSide, display: isMobile ? "none" : "block" }}>
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
          alt="city"
          style={image}
        />
        <div style={overlay}></div>

        <h1 style={brand}>SMARTCITY</h1>

        <div style={tagline}>
          Report Issues.<br />
          Improve Your City.
        </div>
      </div>

      {/* RIGHT */}
      <div style={rightSide}>
        <div style={card}>

          <h2 style={logo}>🏙 SmartCity</h2>
          <h2 style={title}>Welcome Back</h2>
          <p style={subText}>Login to manage and track city issues</p>

          <div style={roleSwitch}>
            <button
              onClick={() => setRole("USER")}
              style={role === "USER" ? activeBtn : btn}
            >
              User
            </button>

            <button
              onClick={() => setRole("ADMIN")}
              style={role === "ADMIN" ? activeBtn : btn}
            >
              Admin
            </button>
          </div>

          <input
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={input}
          />

          <button 
            onClick={handleSubmit} 
            style={loginBtn}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.log("Google failed")}
            />
          </div>

          <div style={divider}>or continue with</div>

          <div style={socialColumn}>
            <button style={facebookBtn}>
              <FaFacebookF /> Continue with Facebook
            </button>

            <button style={appleBtn}>
              <FaApple /> Continue with Apple
            </button>
          </div>

          <p style={footerText}>
            Don’t have an account?{" "}
            <span style={link} onClick={() => navigate("/signup")}>
              Sign Up
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;

/* ================= STYLES ================= */

const container = {
  display: "flex",
  height: "100vh",
  width: "100%",
  overflow: "hidden"
};

const leftSide = {
  flex: 1,
  position: "relative",
  height: "100vh"
};

const image = {
  width: "100%",
  height: "100%",
  objectFit: "cover"
};

const overlay = {
  position: "absolute",
  width: "100%",
  height: "100%",
  background: "linear-gradient(to bottom right, rgba(30,58,138,0.7), rgba(0,0,0,0.7))"
};

const brand = {
  position: "absolute",
  bottom: "80px",
  left: "50px",
  color: "white",
  fontSize: "42px",
  fontWeight: "bold"
};

const tagline = {
  position: "absolute",
  bottom: "30px",
  left: "50px",
  color: "white"
};

const rightSide = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "linear-gradient(135deg, #020617, #0f172a)",
  padding: "20px"
};

const card = {
  width: "100%",
  maxWidth: "420px",
  padding: "30px",
  borderRadius: "16px",
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(20px)",
  color: "white"
};

const logo = { textAlign: "center", marginBottom: "10px" };
const title = { fontSize: "26px", textAlign: "center" };

const subText = {
  color: "#9ca3af",
  marginBottom: "20px",
  textAlign: "center"
};

const roleSwitch = { display: "flex", gap: "10px", marginBottom: "10px" };

const btn = {
  flex: 1,
  padding: "10px",
  background: "#374151",
  color: "white",
  border: "none",
  borderRadius: "8px"
};

const activeBtn = { ...btn, background: "#2563eb" };

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  background: "#1f2937",
  color: "white",
  border: "1px solid #374151",
  borderRadius: "8px"
};

const loginBtn = {
  width: "100%",
  padding: "12px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const divider = {
  textAlign: "center",
  margin: "20px 0",
  color: "#9ca3af"
};

const socialColumn = {
  display: "flex",
  flexDirection: "column",
  gap: "12px"
};

const facebookBtn = {
  padding: "12px",
  background: "#1877f2",
  color: "white",
  borderRadius: "8px",
  border: "none"
};

const appleBtn = {
  padding: "12px",
  background: "black",
  color: "white",
  borderRadius: "8px"
};

const footerText = {
  textAlign: "center",
  marginTop: "15px"
};

const link = {
  color: "#60a5fa",
  cursor: "pointer"
};