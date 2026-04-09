import React, { useEffect } from "react";

function Toast({ message, type = "success", onClose }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={{
      ...toast,
      background: type === "error" ? "#ef4444" : "#22c55e"
    }}>
      {message}
    </div>
  );
}

export default Toast;

const toast = {
  position: "fixed",
  top: "20px",
  right: "20px",
  padding: "12px 20px",
  borderRadius: "8px",
  color: "white",
  zIndex: 9999,
  boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
  animation: "slideIn 0.3s ease"
};