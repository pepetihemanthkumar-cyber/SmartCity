import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

function SuccessScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // Fireworks function
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ["#ff0000", "#00ffff", "#ffcc00", "#00ff00", "#ff00ff"];

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 120,
        origin: { x: 0 },
        colors
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 120,
        origin: { x: 1 },
        colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Redirect after 3 seconds
    const timer = setTimeout(() => {
      navigate("/user");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        height: "100vh",
        background: "#000000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "white"
      }}
    >
      <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>
        🎉 Login Successful!
      </h1>

      <p style={{ marginTop: "15px", fontSize: "20px" }}>
        Welcome to Smart City 🚀
      </p>
    </div>
  );
}

export default SuccessScreen;