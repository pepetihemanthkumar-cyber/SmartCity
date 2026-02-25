import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./SuccessScreen.css";

function SuccessScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  const message = location.state?.message || "Welcome 👋";

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/user");
    }, 2500); // 2.5 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="success-container">
      <div className="checkmark-circle">
        <div className="checkmark"></div>
      </div>

      <h1 className="success-text">{message}</h1>
      <p className="redirect-text">Redirecting to dashboard...</p>
    </div>
  );
}

export default SuccessScreen;