import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const isUser = localStorage.getItem("userLoggedIn");
  const isAdmin = localStorage.getItem("adminLoggedIn");

  // Not logged in
  if (!isUser && !isAdmin) {
    return <Navigate to="/" />;
  }

  // Role mismatch protection
  if (role === "admin" && !isAdmin) {
    return <Navigate to="/user" />;
  }

  if (role === "user" && !isUser) {
    return <Navigate to="/admin" />;
  }

  return children;
}

export default ProtectedRoute;