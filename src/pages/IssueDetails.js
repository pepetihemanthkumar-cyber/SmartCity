import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../api/config";
import { FaMapMarkerAlt } from "react-icons/fa";

function IssueDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIssue();
  }, []);

  const fetchIssue = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/api/issues/${id}`, {
        headers: { Authorization: "Bearer " + token }
      });

      const data = await res.json();
      setIssue(data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* 🔥 LOADING SKELETON */
  if (loading) {
    return (
      <div style={container}>
        <div className="card">
          <div className="skeleton" style={{ height: "30px", width: "60%", marginBottom: "15px" }} />
          <div className="skeleton" style={{ height: "20px", width: "40%", marginBottom: "10px" }} />
          <div className="skeleton" style={{ height: "80px", width: "100%" }} />
        </div>
      </div>
    );
  }

  if (!issue) return <p style={{ padding: "40px" }}>Issue not found</p>;

  return (
    <div style={container}>

      <div className="card" style={card}>

        {/* 🔥 TITLE */}
        <h1 style={title}>{issue.title}</h1>

        {/* 🔥 STATUS BADGE */}
        <span
          style={{
            ...statusBadge,
            background: issue.status === "Resolved" ? "#22c55e" : "#ef4444"
          }}
        >
          {issue.status}
        </span>

        {/* 🔥 CATEGORY */}
        <p style={category}>{issue.category}</p>

        {/* 🔥 DESCRIPTION */}
        <p style={desc}>{issue.description}</p>

        {/* 🔥 LOCATION */}
        <p style={location}>
          <FaMapMarkerAlt /> {issue.locationName}
        </p>

        {/* 🔥 COORDINATES */}
        <p style={coords}>
          {issue.lat?.toFixed(5)}, {issue.lng?.toFixed(5)}
        </p>

        {/* 🔥 ACTION BUTTONS */}
        <div style={actions}>

          <button
            className="btn"
            style={mapBtn}
            onClick={() =>
              navigate(`/map?lat=${issue.lat}&lng=${issue.lng}`)
            }
          >
            View Map
          </button>

          <button
            className="btn btn-primary"
            onClick={() =>
              window.open(
                `https://www.google.com/maps?q=${issue.lat},${issue.lng}`,
                "_blank"
              )
            }
          >
            Google Maps
          </button>

        </div>

      </div>

    </div>
  );
}

export default IssueDetails;


/* ================= STYLES ================= */

const container = {
  minHeight: "100vh",
  padding: "40px",
  background: "#020617",
  color: "white"
};

const card = {
  maxWidth: "650px",
  margin: "auto"
};

const title = {
  marginBottom: "10px"
};

const statusBadge = {
  display: "inline-block",
  padding: "5px 12px",
  borderRadius: "20px",
  fontSize: "12px",
  color: "white",
  marginBottom: "10px"
};

const category = {
  color: "#38bdf8",
  marginBottom: "10px"
};

const desc = {
  marginTop: "10px",
  opacity: 0.85,
  lineHeight: "1.6"
};

const location = {
  marginTop: "15px",
  opacity: 0.8
};

const coords = {
  fontSize: "12px",
  opacity: 0.6
};

const actions = {
  marginTop: "25px",
  display: "flex",
  gap: "10px",
  flexWrap: "wrap"
};

const mapBtn = {
  background: "transparent",
  border: "1px solid #60a5fa",
  color: "#60a5fa"
};