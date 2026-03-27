import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    // ✅ Save user
    localStorage.setItem("user", JSON.stringify({ role }));

    // ✅ Redirect
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/home");
    }
  };

  return (

    <div style={container}>

      {/* LEFT IMAGE */}
      <div style={leftSide}>
        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
          alt="city"
          style={image}
        />
        <div style={overlay}></div>
        <h1 style={brand}>CITYCONNECT</h1>
      </div>

      {/* RIGHT LOGIN */}
      <div style={rightSide}>

        <div style={card}>

          <h2 style={title}>Login</h2>

          {/* ROLE SWITCH */}
          <div style={roleSwitch}>
            <button
              onClick={() => setRole("user")}
              style={role === "user" ? activeBtn : btn}
            >
              User
            </button>

            <button
              onClick={() => setRole("admin")}
              style={role === "admin" ? activeBtn : btn}
            >
              Admin
            </button>
          </div>

          {/* EMAIL */}
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={input}
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={input}
          />

          {/* BUTTON */}
          <button onClick={handleSubmit} style={loginBtn}>
            Login as {role}
          </button>

          <p style={footerText}>
            Don’t have an account? <span style={link}>Sign Up</span>
          </p>

        </div>

      </div>

    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  display: "flex",
  height: "100vh"
};

const leftSide = {
  width: "50%",
  position: "relative"
};

const image = {
  width: "100%",
  height: "100%",
  objectFit: "cover"
};

const overlay = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "linear-gradient(to bottom right, rgba(88,28,135,0.7), rgba(0,0,0,0.6))"
};

const brand = {
  position: "absolute",
  bottom: "50px",
  left: "50px",
  color: "white",
  fontSize: "48px",
  fontWeight: "bold",
  letterSpacing: "3px"
};

const rightSide = {
  width: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #020617, #0f172a)"
};

const card = {
  width: "400px",
  padding: "40px",
  borderRadius: "16px",
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(20px)",
  color: "white",
  boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
};

const title = {
  textAlign: "center",
  marginBottom: "25px",
  fontSize: "28px"
};

const roleSwitch = {
  display: "flex",
  justifyContent: "center",
  gap: "10px",
  marginBottom: "20px"
};

const btn = {
  padding: "8px 16px",
  borderRadius: "6px",
  border: "none",
  background: "#374151",
  color: "white",
  cursor: "pointer"
};

const activeBtn = {
  ...btn,
  background: "#7c3aed"
};

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "none",
  background: "#1f2937",
  color: "white"
};

const loginBtn = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  background: "linear-gradient(to right, #7c3aed, #6366f1)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.3s"
};

const footerText = {
  textAlign: "center",
  marginTop: "15px",
  color: "#9ca3af"
};

const link = {
  color: "#a78bfa",
  cursor: "pointer"
};

export default Login;