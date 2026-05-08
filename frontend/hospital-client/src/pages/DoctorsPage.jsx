import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "../api/api";
import "./DoctorsPage.css";

function DoctorsPage() {
  const user = JSON.parse(localStorage.getItem("hospitalUser") || "{}");
  const isAdmin = user.role === "admin";

  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    phone: "",
    email: "",
    department: "",
  });

  useEffect(() => {
    loadDoctors();
  }, []);

  async function loadDoctors() {
    try {
      const data = await getDoctors();
      setDoctors(data);
    } catch (error) {
      setError(error.message);
    }
  }

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      if (editingId) {
        await updateDoctor(editingId, formData);
        setEditingId(null);
      } else {
        await createDoctor(formData);
      }

      await loadDoctors();

      setFormData({
        name: "",
        specialization: "",
        phone: "",
        email: "",
        department: "",
      });

      setError("");
    } catch (error) {
      setError(error.message);
    }
  }

  function handleEdit(doctor) {
    setEditingId(doctor._id);

    setFormData({
      name: doctor.name,
      specialization: doctor.specialization,
      phone: doctor.phone,
      email: doctor.email || "",
      department: doctor.department || "",
    });
  }

  async function handleDelete(doctorId) {
    try {
      await deleteDoctor(doctorId);
      await loadDoctors();
      setError("");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <Navbar />
    <main className="doctors-page">
      <section className="doctors-header">
        <h1>Doctors</h1>
        <p>View and manage hospital doctors.</p>
      </section>

      {error && <p className="doctors-error">{error}</p>}

      {isAdmin && (
      <section className="doctors-form-card">
        <h2>{editingId ? "Update Doctor" : "Add Doctor"}</h2>

        <form onSubmit={handleSubmit} className="doctors-form">
          <input
            name="name"
            placeholder="Doctor name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            name="specialization"
            placeholder="Specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
          />

          <button type="submit">
            {editingId ? "Update Doctor" : "Add Doctor"}
          </button>
        </form>
      </section>
      )}

      <section className="doctors-card">
        <table className="doctors-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialization</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Department</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor._id}>
                <td>{doctor.name}</td>
                <td>{doctor.specialization}</td>
                <td>{doctor.phone}</td>
                <td>{doctor.email || "N/A"}</td>
                <td>{doctor.department || "N/A"}</td>
                {isAdmin && (
                <td>
                  <button
                    type="button"
                    className="edit-doctor-btn"
                    onClick={() => handleEdit(doctor)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="delete-doctor-btn"
                    onClick={() => handleDelete(doctor._id)}
                  >
                    Delete
                  </button>
                </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
    </>
  );
}

export default DoctorsPage;