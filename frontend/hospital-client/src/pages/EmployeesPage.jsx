import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getUsers, deleteUser } from "../api/api";
import "./EmployeesPage.css";

function EmployeesPage() {
  const currentUser = JSON.parse(localStorage.getItem("hospitalUser") || "{}");

  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(userId) {
    if (!window.confirm("Delete this user account?")) {
      return;
    }

    try {
      await deleteUser(userId);
      await loadUsers();
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <Navbar />
      <main className="employees-page">
        <section className="employees-header">
          <h1>Employees</h1>
          <p>View and manage hospital employees.</p>
        </section>

        {error && <p className="employees-error">{error}</p>}

        <section className="employees-card">
          <table className="employees-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    {user._id !== currentUser.id && (
                      <button
                        type="button"
                        className="delete-employee-btn"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}

export default EmployeesPage;
