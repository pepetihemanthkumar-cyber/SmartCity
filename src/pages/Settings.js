import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

import {
  FaUser,
  FaLock,
  FaMoon,
  FaSignOutAlt
} from "react-icons/fa";

function Settings() {

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dark, setDark] = useState(false);
  const [loading, setLoading] = useState(false);

  /* LOAD DATA */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      setDark(true);
    }

    const storedUser = localStorage.getItem("username");
    if (storedUser) setUsername(storedUser);

  }, []);

  /* UPDATE PROFILE */
  const updateProfile = async () => {
    if (!username) return alert("Username required ❌");

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await API.put("/api/user/update", { username }, {
        headers: { Authorization: "Bearer " + token }
      });

      localStorage.setItem("username", username);

      alert("Profile updated ✅");

    } catch {
      alert("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  /* CHANGE PASSWORD */
  const changePassword = async () => {
    if (!password) return alert("Enter password ❌");

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await API.post("/api/user/change-password", { password }, {
        headers: { Authorization: "Bearer " + token }
      });

      alert("Password updated ✅");
      setPassword("");

    } catch {
      alert("Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  /* THEME */
  const toggleTheme = () => {
    const body = document.body;

    if (body.classList.contains("dark")) {
      body.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDark(false);
    } else {
      body.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDark(true);
    }
  };

  /* LOGOUT */
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={container}>

      {/* SIDEBAR */}
      <div style={sidebar}>
        <h2 style={{ marginBottom: "30px" }}>⚙ Settings</h2>

        <div onClick={() => setActiveTab("profile")}
             style={activeTab === "profile" ? activeItem : menuItem}>
          <FaUser /> Profile
        </div>

        <div onClick={() => setActiveTab("security")}
             style={activeTab === "security" ? activeItem : menuItem}>
          <FaLock /> Security
        </div>

        <div onClick={() => setActiveTab("preferences")}
             style={activeTab === "preferences" ? activeItem : menuItem}>
          <FaMoon /> Preferences
        </div>

        <div onClick={() => setActiveTab("account")}
             style={activeTab === "account" ? activeItem : menuItem}>
          <FaSignOutAlt /> Account
        </div>
      </div>

      {/* MAIN */}
      <div style={main}>

        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <div style={card}>
            <h2>👤 Profile</h2>

            <input
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              placeholder="Username"
              style={input}
            />

            <button style={btn} onClick={updateProfile}>
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        )}

        {/* SECURITY TAB */}
        {activeTab === "security" && (
          <div style={card}>
            <h2>🔒 Security</h2>

            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="New Password"
              style={input}
            />

            <button style={btn} onClick={changePassword}>
              Change Password
            </button>
          </div>
        )}

        {/* PREFERENCES TAB */}
        {activeTab === "preferences" && (
          <div style={card}>
            <h2>🌙 Preferences</h2>

            <div style={toggleRow}>
              <span>Dark Mode</span>

              <div onClick={toggleTheme} style={toggle}>
                <div style={{
                  ...toggleCircle,
                  transform: dark ? "translateX(25px)" : "translateX(0px)"
                }} />
              </div>
            </div>
          </div>
        )}

        {/* ACCOUNT TAB */}
        {activeTab === "account" && (
          <div style={card}>
            <h2>🚪 Account</h2>

            <button style={logoutBtn} onClick={logout}>
              Logout
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  display: "flex",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #020617, #0f172a)"
};

const sidebar = {
  width: "240px",
  background: "#020617",
  color: "white",
  padding: "30px"
};

const menuItem = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "12px",
  marginTop: "10px",
  borderRadius: "8px",
  cursor: "pointer",
  opacity: 0.7
};

const activeItem = {
  ...menuItem,
  background: "#2563eb",
  opacity: 1
};

const main = {
  flex: 1,
  padding: "40px"
};

const card = {
  maxWidth: "500px",
  padding: "25px",
  borderRadius: "16px",
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(20px)",
  color: "white",
  boxShadow: "0 10px 25px rgba(0,0,0,0.4)"
};

const input = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  borderRadius: "8px",
  border: "none",
  background: "#1f2937",
  color: "white"
};

const btn = {
  width: "100%",
  marginTop: "15px",
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  background: "#2563eb",
  color: "white",
  cursor: "pointer"
};

const logoutBtn = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  background: "red",
  color: "white",
  cursor: "pointer"
};

const toggleRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "15px"
};

const toggle = {
  width: "50px",
  height: "25px",
  background: "#374151",
  borderRadius: "50px",
  padding: "3px",
  cursor: "pointer"
};

const toggleCircle = {
  width: "20px",
  height: "20px",
  background: "white",
  borderRadius: "50%",
  transition: "0.3s"
};

export default Settings;