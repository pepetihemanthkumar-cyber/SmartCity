import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaMoon, FaSignOutAlt } from "react-icons/fa";

function SettingsDrawer({ open, onClose }) {

  const navigate = useNavigate();
  const [tab, setTab] = useState("profile");

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!open) return null;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const toggleTheme = () => {
    const body = document.body;

    if (body.classList.contains("dark")) {
      body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  const tabsData = [
    { key: "profile", label: "Profile", icon: <FaUser /> },
    { key: "security", label: "Security", icon: <FaLock /> },
    { key: "theme", label: "Theme", icon: <FaMoon /> },
    { key: "account", label: "Account", icon: <FaSignOutAlt /> }
  ];

  return (
    <>
      {/* BACKDROP */}
      <div onClick={onClose} style={backdrop} />

      {/* DRAWER */}
      <div style={drawer}>

        {/* HEADER */}
        <div style={header}>
          <h2 style={title}>⚙ Settings</h2>
          <button onClick={onClose} style={closeBtn}>✕</button>
        </div>

        {/* TABS */}
        <div style={tabsContainer}>
          {tabsData.map((t, index) => (
            <div
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                ...tabBtn,
                color: tab === t.key ? "#60a5fa" : "#9ca3af",
                textShadow: tab === t.key ? "0 0 10px #60a5fa" : "none"
              }}
            >
              {t.icon}
              <span>{t.label}</span>

              {tab === t.key && (
                <div
                  style={{
                    ...indicator,
                    left: `${index * 25}%`
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* CONTENT */}
        <div style={content}>

          {tab === "profile" && (
            <div style={card} className="fade">
              <h3>👤 Profile</h3>
              <input placeholder="Username" style={input} />
              <button style={btn}>Update</button>
            </div>
          )}

          {tab === "security" && (
            <div style={card} className="fade">
              <h3>🔒 Security</h3>
              <input placeholder="New Password" style={input} />
              <button style={btn}>Change Password</button>
            </div>
          )}

          {tab === "theme" && (
            <div style={card} className="fade">
              <h3>🌙 Theme</h3>
              <button style={btn} onClick={toggleTheme}>
                Toggle Dark Mode
              </button>
            </div>
          )}

          {tab === "account" && (
            <div style={card} className="fade">
              <h3>🚪 Account</h3>
              <button style={logoutBtn} onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}

        </div>

        {/* ANIMATIONS */}
        <style>{`
          .fade {
            animation: fadeIn 0.25s ease;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>

      </div>
    </>
  );
}

export default SettingsDrawer;

/* ================= STYLES ================= */

const backdrop = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.6)",
  backdropFilter: "blur(8px)",
  zIndex: 999
};

const drawer = {
  position: "fixed",
  top: 0,
  right: 0,
  width: "400px",
  height: "100%",
  background: "rgba(15,23,42,0.7)", // 🔥 GLASS
  backdropFilter: "blur(25px)",
  borderLeft: "1px solid rgba(255,255,255,0.1)",
  boxShadow: "-10px 0 50px rgba(0,0,0,0.6)",
  zIndex: 1000,
  color: "white",
  display: "flex",
  flexDirection: "column"
};

const title = {
  textShadow: "0 0 10px #60a5fa"
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  padding: "20px",
  borderBottom: "1px solid rgba(255,255,255,0.1)"
};

const closeBtn = {
  background: "none",
  border: "none",
  color: "white",
  fontSize: "18px",
  cursor: "pointer"
};

/* TABS */
const tabsContainer = {
  display: "flex",
  position: "relative",
  justifyContent: "space-around",
  padding: "12px 0",
  borderBottom: "1px solid rgba(255,255,255,0.1)"
};

const tabBtn = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "4px",
  cursor: "pointer",
  fontSize: "12px",
  transition: "0.3s"
};

const indicator = {
  position: "absolute",
  bottom: "-10px",
  width: "25%",
  height: "3px",
  background: "linear-gradient(90deg,#60a5fa,#2563eb)",
  borderRadius: "10px",
  boxShadow: "0 0 10px #60a5fa",
  transition: "0.3s"
};

const content = {
  padding: "20px",
  flex: 1
};

const card = {
  padding: "15px",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(15px)",
  transition: "0.3s"
};

const input = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "6px",
  border: "none",
  background: "#1f2937",
  color: "white"
};

/* 🔥 NEON BUTTON */
const btn = {
  marginTop: "10px",
  padding: "10px",
  width: "100%",
  border: "none",
  borderRadius: "6px",
  background: "linear-gradient(45deg,#2563eb,#60a5fa)",
  color: "white",
  cursor: "pointer",
  boxShadow: "0 0 10px rgba(37,99,235,0.7)",
  transition: "0.3s"
};

const logoutBtn = {
  ...btn,
  background: "linear-gradient(45deg,#ef4444,#dc2626)",
  boxShadow: "0 0 10px rgba(239,68,68,0.7)"
};