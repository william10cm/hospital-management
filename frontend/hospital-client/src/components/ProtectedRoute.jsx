import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem("hospitalToken");
  const user = JSON.parse(localStorage.getItem("hospitalUser") || "{}");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;