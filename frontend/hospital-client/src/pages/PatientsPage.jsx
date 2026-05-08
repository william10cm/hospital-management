import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./PatientsPage.css";
import {
  getPatients,
  createPatient,
  deletePatient,
  updatePatient,
} from "../api/api";

function PatientsPage() {
  const user = JSON.parse(localStorage.getItem("hospitalUser") || "{}");
  const isAdmin = user.role === "admin";

  const [patients, setPatients] = useState([]);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
  name: "",
  age: "",
  gender: "male",
  phone: "",
  address: "",
  medicalHistory: "",
});


function handleChange(e) {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
}

async function handleSubmit(e) {
  e.preventDefault();

  try {
    if (editingId) {
      await updatePatient(editingId, formData);
      setEditingId(null);
    } else {
      await createPatient(formData);
    }

    const updated = await getPatients();
    setPatients(updated);

    setFormData({
      name: "",
      age: "",
      gender: "male",
      phone: "",
      address: "",
      medicalHistory: "",
    });

    setError("");
  } catch (error) {
    setError(error.message);
  }
}

async function handleDelete(patientId) {
  try {
    await deletePatient(patientId);

    const updated = await getPatients();
    setPatients(updated);

    setError("");
  } catch (error) {
    setError(error.message);
  }
}

function handleEdit(patient) {
  setEditingId(patient._id);

  setFormData({
    name: patient.name,
    age: patient.age,
    gender: patient.gender,
    phone: patient.phone,
    address: patient.address || "",
    medicalHistory: patient.medicalHistory || "",
  });
}

  useEffect(() => {
    async function loadPatients() {
      try {
        const data = await getPatients();
        setPatients(data);
      } catch (error) {
        setError(error.message);
      }
    }

    loadPatients();
  }, []);

  return (
    <>
      <Navbar />
      <main className="patients-page">
      <section className="patients-header">
        <h1>Patients</h1>
        <p>View and manage patient records.</p>
      </section>

      {error && <p className="patients-error">{error}</p>}

      <section className="patients-form-card">
        <h2>{isAdmin && editingId ? "Edit Patient" : "Add Patient"}</h2>

        <form onSubmit={handleSubmit} className="patients-form">
            <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            />

            <input
            name="age"
            type="number"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
            />

            <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            </select>

            <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            />

            <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            />

            <input
            name="medicalHistory"
            placeholder="Medical History"
            value={formData.medicalHistory}
            onChange={handleChange}
            />

            <button type="submit">Add Patient</button>
        </form>
    </section>

      <section className="patients-card">
        <table className="patients-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Medical History</th>
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {patients.map((patient) => (
              <tr key={patient._id}>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.gender}</td>
                <td>{patient.phone}</td>
                <td>{patient.medicalHistory || "None"}</td>
                {isAdmin && (
                <td>
                    <button
                        type="button"
                        className="edit-patient-btn"
                        onClick={() => handleEdit(patient)} >
                        Edit
                    </button>
                    <button
                        type="button"
                        className="delete-patient-btn"
                        onClick={() => handleDelete(patient._id)} >
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

export default PatientsPage;