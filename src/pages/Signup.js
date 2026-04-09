import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";

function Signup() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {

    if (!username || !email || !password) {
      alert("Fill all fields ❌");
      return;
    }

    if (!agree) {
      alert("Please accept terms ❌");
      return;
    }

    try {
      setLoading(true);

      await API.post("/api/auth/register", {
        username,
        password
      });

      alert("Account created successfully ✅");
      navigate("/");

    } catch (err) {
      console.log(err);
      alert("Signup failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>

      {/* LEFT SIDE */}
      <div style={leftSide}>
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
          alt="city"
          style={image}
        />
        <div style={overlay}></div>

        <h1 style={brand}>SMARTCITY</h1>

        <div style={tagline}>
          Report Issues.<br/>
          Improve Your City.
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div style={rightSide}>
        <div style={card}>

          <h2 style={title}>Create Account</h2>

          <p style={subText}>
            Join SmartCity platform 🚀
          </p>

          <p style={subText}>
            Already have an account?{" "}
            <span style={link} onClick={()=>navigate("/")}>
              Login
            </span>
          </p>

          {/* INPUTS */}
          <input
            placeholder="Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            style={input}
          />

          <input
            placeholder="Email Address"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            style={input}
          />

          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            style={input}
          />

          {/* TERMS */}
          <div style={terms}>
            <input
              type="checkbox"
              checked={agree}
              onChange={()=>setAgree(!agree)}
            />
            <span>I agree to Terms & Conditions</span>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSignup}
            style={signupBtn}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          {/* DIVIDER */}
          <div style={divider}>or continue with</div>

          {/* 🔥 FIXED SOCIAL BUTTONS */}
          <div style={socialColumn}>

            <button style={googleBtn}>
              <FaGoogle color="#EA4335" size={18} />
              <span>Continue with Google</span>
            </button>

            <button style={facebookBtn}>
              <FaFacebookF size={18} />
              <span>Continue with Facebook</span>
            </button>

            <button style={appleBtn}>
              <FaApple size={18} />
              <span>Continue with Apple</span>
            </button>

          </div>

        </div>
      </div>

    </div>
  );
}

/* ================= STYLES ================= */

const container = { display: "flex", height: "100vh" };

const leftSide = { width: "50%", position: "relative" };

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
  color: "white",
  fontSize: "18px"
};

const rightSide = {
  width: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #020617, #0f172a)"
};

const card = {
  width: "420px",
  padding: "40px",
  borderRadius: "16px",
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(20px)",
  color: "white",
  boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
};

const title = { fontSize: "26px", marginBottom: "10px" };

const subText = {
  marginBottom: "10px",
  color: "#9ca3af"
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

const terms = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px",
  fontSize: "14px"
};

const signupBtn = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  background: "linear-gradient(to right, #2563eb, #1d4ed8)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer"
};

const divider = {
  textAlign: "center",
  margin: "20px 0",
  color: "#9ca3af"
};

/* 🔥 FIXED SOCIAL STYLES */
const socialColumn = {
  display: "flex",
  flexDirection: "column",
  gap: "12px"
};

const googleBtn = {
  width: "100%",
  padding: "12px",
  background: "white",
  color: "#333",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  fontWeight: "500"
};

const facebookBtn = {
  width: "100%",
  padding: "12px",
  background: "#1877f2",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  fontWeight: "500"
};

const appleBtn = {
  width: "100%",
  padding: "12px",
  background: "black",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  fontWeight: "500"
};

const link = {
  color: "#60a5fa",
  cursor: "pointer"
};

export default Signup;