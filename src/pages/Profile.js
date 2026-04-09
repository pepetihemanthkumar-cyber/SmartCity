import React, { useState, useEffect } from "react";
import API from "../api/api";

function Profile() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  /* 🔥 LOAD USER FROM BACKEND */
  const loadUser = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const res = await fetch("http://localhost:8082/api/auth/me", {
        headers: {
          Authorization: "Bearer " + token
        }
      });

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();

      setUsername(data.username || "");

      // ✅ SAFE AVATAR LOAD
      if (data.avatar && data.avatar !== "null") {
        setPreview(`http://localhost:8082/${data.avatar}`);
      } else {
        setPreview(null);
      }

    } catch (err) {
      console.error("Load user error:", err);
    }
  };

  /* LOAD DATA */
  useEffect(() => {
    loadUser();

    const storedEmail = localStorage.getItem("email");
    const storedTime = localStorage.getItem("updatedAt");

    if (storedEmail) setEmail(storedEmail);
    if (storedTime) setUpdatedAt(storedTime);

  }, []);

  /* HANDLE IMAGE */
  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selected);
  };

  /* 🔥 UPLOAD AVATAR */
  const uploadAvatar = async () => {

    if (!file) return null;

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("username", username);

    try {
      const res = await fetch("http://localhost:8082/api/upload", {
        method: "POST",
        body: formData
      });

      if (!res.ok) throw new Error("Upload failed");

      const url = await res.text();

      const cleanPath = url.replace("http://localhost:8082/", "");

      // ✅ SAVE
      localStorage.setItem("avatar", cleanPath);

      return cleanPath;

    } catch (err) {
      setMessage("❌ Avatar upload failed");
      return null;
    }
  };

  /* SAVE PROFILE */
  const handleSave = async () => {
    if (!username) return setMessage("❌ Username required");

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      // ✅ UPDATE TEXT DATA
      await API.put(
        "/api/user/update",
        { username, email },
        { headers: { Authorization: "Bearer " + token } }
      );

      // ✅ UPLOAD AVATAR
      const avatarPath = await uploadAvatar();

      const time = new Date().toLocaleString();

      // ✅ STORE LOCAL (only needed ones)
      localStorage.setItem("username", username);
      localStorage.setItem("email", email);
      localStorage.setItem("updatedAt", time);

      if (avatarPath) {
        localStorage.setItem("avatar", avatarPath);
      }

      setUpdatedAt(time);
      setMessage("✅ Profile updated successfully");

      // 🔥 LIVE NAVBAR UPDATE
      window.dispatchEvent(new Event("userUpdated"));

      // 🔥 REFRESH FROM BACKEND (source of truth)
      await loadUser();

    } catch (err) {
      setMessage("❌ Update failed");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div style={container}>

      <div style={bg}></div>

      <div style={card}>

        <h1 style={title}>👤 Profile</h1>

        {/* AVATAR */}
        <div style={avatarContainer}>
          <img
            src={
              preview ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="avatar"
            style={avatarStyle}
            onError={(e) => {
              e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
            }}
          />

          <label style={uploadBtn}>
            Change
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </label>
        </div>

        <p style={sub}>Manage your account details</p>

        {message && <p style={messageStyle}>{message}</p>}

        <input
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          placeholder="Username"
          style={input}
        />

        <input
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="Email"
          style={input}
        />

        <button onClick={handleSave} style={btn}>
          {loading ? "Saving..." : "Save Changes"}
        </button>

        {updatedAt && (
          <p style={timeText}>
            Last updated: {updatedAt}
          </p>
        )}

      </div>

      <style>{`
        @keyframes moveBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

    </div>
  );
}

export default Profile;

/* ================= STYLES ================= */

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  overflow: "hidden"
};

const bg = {
  position: "absolute",
  width: "200%",
  height: "200%",
  background: "linear-gradient(45deg,#0f172a,#1e3a8a,#2563eb,#0f172a)",
  backgroundSize: "400% 400%",
  animation: "moveBG 12s ease infinite",
  zIndex: 0
};

const card = {
  position: "relative",
  zIndex: 1,
  width: "420px",
  padding: "30px",
  borderRadius: "16px",
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(25px)",
  boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
  color: "white",
  textAlign: "center"
};

const title = {
  marginBottom: "10px",
  textShadow: "0 0 10px #60a5fa"
};

const avatarContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "15px"
};

const avatarStyle = {
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "3px solid #60a5fa",
  boxShadow: "0 0 20px rgba(96,165,250,0.7)"
};

const uploadBtn = {
  marginTop: "8px",
  fontSize: "12px",
  color: "#60a5fa",
  cursor: "pointer"
};

const sub = {
  marginBottom: "15px",
  color: "#9ca3af"
};

const messageStyle = {
  marginBottom: "10px",
  fontSize: "14px"
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

const btn = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  background: "linear-gradient(45deg,#2563eb,#60a5fa)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 0 15px rgba(37,99,235,0.6)"
};

const timeText = {
  marginTop: "12px",
  fontSize: "12px",
  color: "#9ca3af"
};