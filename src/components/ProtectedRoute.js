import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, roleRequired }) {

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/" />;
  }

  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to="/home" />;
  }

  return children;
}

export default ProtectedRoute;