import { Link } from "react-router-dom";
import "./DashboardPage.css";
import Navbar from "../components/Navbar";

function DashboardPage() {
  const user = JSON.parse(localStorage.getItem("hospitalUser"));

  return (
    <>
      <Navbar />
      <main className="dashboard-page">
      <section className="dashboard-header">
        <h1>Hospital Dashboard</h1>
        <p>Welcome, <strong>{user?.name}</strong></p>
        <p><strong>Role: </strong>&nbsp;{user?.role}</p>
      </section>

      <section className="dashboard-grid">
        <Link to="/patients" className="dashboard-card dashboard-link">
            <h2>Patients</h2>
            <p>Manage patient records</p>
        </Link>

        <Link to="/doctors" className="dashboard-card dashboard-link">
            <h2>Doctors</h2>
            <p>Manage doctors and departments</p>
        </Link>

        <Link to="/appointments" className="dashboard-card dashboard-link">
            <h2>Appointments</h2>
            <p>Schedule and manage appointments</p>
        </Link>
      </section>
      </main>
    </>
  );
}

export default DashboardPage;