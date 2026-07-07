import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("hospitalUser") || "{}");
  const isAdmin = user?.role === "admin";

  function handleLogout() {
    localStorage.removeItem("hospitalToken");
    localStorage.removeItem("hospitalUser");
    navigate("/");
  }

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="navbar-logo">
        Hospital East Meadow
      </Link>

      <div className="navbar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/patients">Patients</Link>
        {isAdmin && <Link to="/employees">Employees</Link>}
        <Link to="/appointments">Appointments</Link>
      </div>

      <div className="navbar-user">
        <span>{user?.name}</span>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;