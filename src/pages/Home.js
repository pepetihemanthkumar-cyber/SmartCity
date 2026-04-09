import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Home() {

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div style={container}>

      {/* HERO */}
      <div style={heroSection}>

        <h1 style={heroTitle}>Smart City Platform</h1>

        <p style={heroText}>
          A modern digital platform to manage city infrastructure,
          report issues and monitor urban services in real time.
        </p>

        <div style={heroBtns}>
          <button
            onClick={() => navigate("/dashboard")}
            style={primaryBtn}
          >
            Explore Dashboard
          </button>

          <button
            onClick={() => navigate("/report")}
            style={outlineBtn}
          >
            Report Issue
          </button>

          {/* ✅ ADMIN BUTTON */}
          {user?.role === "ADMIN" && (
            <button
              onClick={() => navigate("/admin")}
              style={adminBtn}
            >
              Admin Panel
            </button>
          )}
        </div>

      </div>

      {/* STATS */}
      <div style={statsSection}>
        <Stat title="Cities Connected" value="150+" />
        <Stat title="Issues Resolved" value="12K+" />
        <Stat title="Active Citizens" value="5K+" />
      </div>

      {/* ABOUT */}
      <div style={aboutSection}>

        <div style={aboutTextBox}>
          <h2 style={sectionTitle}>Shaping the Future of Cities</h2>

          <p style={aboutText}>
            Our Smart City platform enables governments and citizens
            to collaborate in solving urban issues through mapping,
            reporting, and analytics dashboards.
            Cities become cleaner, safer and more efficient.
          </p>
        </div>

        <img
          src="https://images.unsplash.com/photo-1494526585095-c41746248156"
          alt="smart city"
          style={aboutImage}
        />

      </div>

      {/* SERVICES */}
      <div style={servicesSection}>

        <h2 style={sectionTitle}>Smart City Services</h2>

        <div style={servicesGrid}>

          <ServiceCard
            icon="📊"
            title="Dashboard"
            desc="Monitor city problems and service statistics."
            action={() => navigate("/dashboard")}
          />

          <ServiceCard
            icon="🗺️"
            title="City Map"
            desc="Visualize reported issues across the city."
            action={() => navigate("/map")}
          />

          <ServiceCard
            icon="🚨"
            title="Report Issue"
            desc="Report garbage, road damage or leaks."
            action={() => navigate("/report")}
          />

        </div>

      </div>

      {/* CTA */}
      <div style={ctaSection}>

        <h2 style={ctaTitle}>Building Smarter Cities Together</h2>

        <p style={{ opacity: 0.8 }}>
          Join thousands of citizens improving urban life.
        </p>

        <button
          onClick={() => navigate("/report")}
          style={ctaBtn}
        >
          Start Reporting
        </button>

      </div>

      {/* FOOTER */}
      <div style={footer}>
        <h3>Smart City Platform</h3>
        <p style={{ opacity: 0.6 }}>
          © 2026 Smart City Management System
        </p>
      </div>

    </div>
  );
}

export default Home;


/* ================= COMPONENTS ================= */

function Stat({ title, value }) {
  return (
    <div style={statBox}>
      <h1 style={statValue}>{value}</h1>
      <p style={{ opacity: 0.7 }}>{title}</p>
    </div>
  );
}

function ServiceCard({ icon, title, desc, action }) {
  return (
    <div style={card} onClick={action}>
      <h1>{icon}</h1>
      <h3>{title}</h3>
      <p style={{ opacity: 0.7 }}>{desc}</p>
    </div>
  );
}


/* ================= STYLES ================= */

const container = {
  fontFamily: "system-ui",
  color: "white",
  background: "#020617"
};

const heroSection = {
  minHeight: "85vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "20px",
  background: "linear-gradient(135deg,#020617,#0f172a)"
};

const heroTitle = {
  fontSize: "clamp(32px,6vw,68px)",
  fontWeight: "700"
};

const heroText = {
  maxWidth: "600px",
  marginTop: "15px",
  opacity: 0.7
};

const heroBtns = {
  display: "flex",
  flexWrap: "wrap",
  gap: "15px",
  marginTop: "30px",
  justifyContent: "center"
};

const primaryBtn = {
  padding: "12px 28px",
  background: "#2563eb",
  border: "none",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer"
};

const outlineBtn = {
  padding: "12px 28px",
  border: "1px solid rgba(255,255,255,0.3)",
  borderRadius: "8px",
  background: "transparent",
  color: "white",
  cursor: "pointer"
};

const adminBtn = {
  padding: "12px 28px",
  background: "#9333ea",
  border: "none",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer"
};

const statsSection = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "40px",
  padding: "60px"
};

const statBox = {
  textAlign: "center"
};

const statValue = {
  fontSize: "42px"
};

const aboutSection = {
  display: "flex",
  alignItems: "center",
  gap: "40px",
  padding: "60px",
  flexWrap: "wrap"
};

const aboutTextBox = { flex: 1 };

const aboutText = {
  marginTop: "20px",
  opacity: 0.7
};

const aboutImage = {
  width: "100%",
  maxWidth: "400px",
  borderRadius: "16px"
};

const servicesSection = { padding: "60px" };

const sectionTitle = {
  textAlign: "center",
  fontSize: "32px",
  marginBottom: "40px"
};

const servicesGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
  gap: "20px"
};

const card = {
  padding: "25px",
  borderRadius: "14px",
  background: "rgba(255,255,255,0.05)",
  textAlign: "center",
  cursor: "pointer"
};

const ctaSection = {
  padding: "60px",
  textAlign: "center",
  background: "linear-gradient(135deg,#2563eb,#1e40af)"
};

const ctaTitle = {
  fontSize: "28px"
};

const ctaBtn = {
  marginTop: "20px",
  padding: "12px 30px",
  borderRadius: "8px",
  border: "none",
  background: "white",
  color: "#2563eb",
  cursor: "pointer"
};

const footer = {
  padding: "40px",
  textAlign: "center",
  borderTop: "1px solid rgba(255,255,255,0.08)"
};