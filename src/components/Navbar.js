import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { IssueContext } from "../context/IssueContext";
import { AuthContext } from "../context/AuthContext";

function Navbar() {

  const navigate = useNavigate();
  const { issues } = useContext(IssueContext);
  const { user, logout } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const dropdownRef = useRef();

  /* ================= THEME ================= */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      setDark(true);
    }
  }, []);

  /* ================= OUTSIDE CLICK ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  /* ================= THEME TOGGLE ================= */
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

  return (
    <div style={container}>

      {/* LOGO */}
      <div style={logoBox} onClick={() => navigate("/home")}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
          alt="logo"
          style={{ width: "30px" }}
        />
        <h2 style={{ margin: 0 }}>SmartCity</h2>
      </div>

      {/* RIGHT */}
      <div style={right}>

        {/* THEME */}
        <div onClick={toggleTheme} style={toggle}>
          <div
            style={{
              ...circle,
              transform: dark ? "translateX(26px)" : "translateX(0px)"
            }}
          />
        </div>

        {/* 🔔 NOTIFICATIONS */}
        <div style={bellWrapper}>
          <FaBell size={20} />
          {issues.length > 0 && (
            <span style={badge}>{issues.length}</span>
          )}
        </div>

        {/* ADMIN */}
        {user?.role === "ADMIN" && (
          <button onClick={() => navigate("/admin")} style={adminBtn}>
            Admin
          </button>
        )}

        {/* PROFILE */}
        <div style={{ position: "relative" }} ref={dropdownRef}>

          <div
            style={profileRow}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <img
              src={
                user?.avatar
                  ? `http://localhost:8082/${user.avatar}`
                  : "https://i.pravatar.cc/40"
              }
              alt="avatar"
              style={avatarStyle}
            />

            <span style={usernameStyle}>
              {user?.username || "User"}
            </span>
          </div>

          {/* DROPDOWN */}
          <div
            style={{
              ...dropdown,
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen
                ? "translateY(0px) scale(1)"
                : "translateY(-10px) scale(0.95)",
              pointerEvents: menuOpen ? "auto" : "none"
            }}
          >

            <p style={item} onClick={() => navigate("/profile")}>
              👤 Profile
            </p>

            <p style={item} onClick={() => navigate("/settings")}>
              ⚙ Settings
            </p>

            <button onClick={handleLogout} style={logoutBtn}>
              Logout
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Navbar;


/* ================= STYLES ================= */

const container = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 40px",
  backdropFilter: "blur(20px)",
  background: "rgba(15,23,42,0.6)",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
  position: "sticky",
  top: 0,
  zIndex: 1000,
  color: "white"
};

const logoBox = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  cursor: "pointer"
};

const right = {
  display: "flex",
  alignItems: "center",
  gap: "25px"
};

const bellWrapper = {
  position: "relative",
  cursor: "pointer"
};

const badge = {
  position: "absolute",
  top: "-5px",
  right: "-5px",
  background: "red",
  borderRadius: "50%",
  padding: "2px 6px",
  fontSize: "10px"
};

const toggle = {
  width: "55px",
  height: "28px",
  background: "#1f2937",
  borderRadius: "50px",
  display: "flex",
  alignItems: "center",
  padding: "4px",
  cursor: "pointer"
};

const circle = {
  width: "22px",
  height: "22px",
  background: "white",
  borderRadius: "50%",
  transition: "0.3s"
};

const profileRow = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
  padding: "6px 10px",
  borderRadius: "10px",
  transition: "0.3s"
};

const avatarStyle = {
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "2px solid #60a5fa",
  boxShadow: "0 0 12px rgba(96,165,250,0.7)",
  transition: "0.3s"
};

const usernameStyle = {
  maxWidth: "100px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
};

const dropdown = {
  position: "absolute",
  right: 0,
  top: "45px",
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(25px)",
  borderRadius: "12px",
  width: "200px",
  padding: "12px",
  transition: "all 0.25s ease",
  boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
};

const item = {
  margin: "10px 0",
  cursor: "pointer",
  padding: "6px",
  borderRadius: "6px",
  transition: "0.2s"
};

const logoutBtn = {
  width: "100%",
  padding: "10px",
  background: "red",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const adminBtn = {
  padding: "8px 14px",
  background: "#6366f1",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};