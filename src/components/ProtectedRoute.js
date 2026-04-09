import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

/* 🔥 OPTIONAL (if using toast) */
// import toast from "react-hot-toast";

function ProtectedRoute({ children, roleRequired }) {

  const { user, loading } = useContext(AuthContext);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div style={{
        textAlign: "center",
        marginTop: "100px",
        color: "white",
        fontSize: "18px"
      }}>
        ⏳ Loading...
      </div>
    );
  }

  /* ================= NOT LOGGED IN ================= */
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  /* ================= ROLE CHECK ================= */
  if (roleRequired) {

    const userRole = user.role?.toUpperCase();
    const requiredRole = roleRequired.toUpperCase();

    if (userRole !== requiredRole) {

      // 🔥 OPTIONAL UX MESSAGE
      // toast.error("Access Denied ❌");
      alert("Access Denied ❌");

      return <Navigate to="/home" replace />;
    }
  }

  /* ================= ACCESS GRANTED ================= */
  return children;
}

export default ProtectedRoute;