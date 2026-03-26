import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { IssueContext } from "../context/IssueContext";

function Navbar() {

  const navigate = useNavigate();
  const { issues } = useContext(IssueContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);

  /* LOAD SAVED THEME */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      setDark(true);
    }
  }, []);

  /* LOGOUT */
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  /* DARK MODE TOGGLE */
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
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        backdropFilter: "blur(14px)",
        background: "rgba(37,99,235,0.75)",
        borderBottom: "1px solid rgba(255,255,255,0.2)",
        position: "sticky",
        top: "0",
        zIndex: "1000",
        color: "white"
      }}
    >

      {/* LOGO */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer"
        }}
        onClick={() => navigate("/home")}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
          alt="logo"
          style={{ width: "30px" }}
        />
        <h2 style={{ margin: 0 }}>SmartCity</h2>
      </div>


      {/* RIGHT SIDE */}
      <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>

        {/* 🌙 TOGGLE SWITCH */}
        <div
          onClick={toggleTheme}
          style={{
            width: "55px",
            height: "28px",
            background: dark ? "#111827" : "#ccc",
            borderRadius: "50px",
            display: "flex",
            alignItems: "center",
            padding: "4px",
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
        >
          <div
            style={{
              width: "22px",
              height: "22px",
              background: "white",
              borderRadius: "50%",
              transform: dark
                ? "translateX(26px)"
                : "translateX(0px)",
              transition: "all 0.3s ease"
            }}
          />
        </div>


        {/* 🔔 NOTIFICATION */}
        <div style={{ position: "relative", cursor: "pointer" }}>
          <FaBell size={20} />

          {issues.length > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-6px",
                right: "-8px",
                background: "red",
                color: "white",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "11px",
                fontWeight: "bold"
              }}
            >
              {issues.length}
            </span>
          )}
        </div>


        {/* 👤 PROFILE */}
        <div style={{ position: "relative" }}>

          <FaUserCircle
            size={30}
            style={{ cursor: "pointer" }}
            onClick={() => setMenuOpen(!menuOpen)}
          />

          {menuOpen && (
            <div
              style={{
                position: "absolute",
                right: "0",
                top: "45px",
                background: "white",
                color: "black",
                borderRadius: "10px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                width: "180px",
                padding: "12px"
              }}
            >

              <p style={{ margin: "10px 0", cursor: "pointer" }}>
                👤 Profile
              </p>

              <p style={{ margin: "10px 0", cursor: "pointer" }}>
                ⚙ Settings
              </p>

              <button
                onClick={logout}
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginTop: "10px"
                }}
              >
                Logout
              </button>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Navbar;