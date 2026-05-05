import { useEffect, useState } from "react";
import "./AppointmentsPage.css";
import Navbar from "../components/Navbar";
import {
  getAppointments,
  createAppointment,
  getPatients,
  getDoctors,
  updateAppointment,
  deleteAppointment,
} from "../api/api";

function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");
  const [patients, setPatients] = useState([]);
const [doctors, setDoctors] = useState([]);

const [formData, setFormData] = useState({
  patient: "",
  doctor: "",
  appointmentDate: "",
  reason: "",
});

  useEffect(() => {
  async function loadData() {
    try {
      const appointmentsData = await getAppointments();
      const patientsData = await getPatients();
      const doctorsData = await getDoctors();

      setAppointments(appointmentsData);
      setPatients(patientsData);
      setDoctors(doctorsData);
    } catch (error) {
      setError(error.message);
    }
  }

  loadData();
}, []);

function handleChange(event) {
  setFormData({
    ...formData,
    [event.target.name]: event.target.value,
  });
}

async function handleSubmit(event) {
  event.preventDefault();

  try {
    await createAppointment(formData);

    const updatedAppointments = await getAppointments();
    setAppointments(updatedAppointments);

    setFormData({
      patient: "",
      doctor: "",
      appointmentDate: "",
      reason: "",
    });

    setError("");
  } catch (error) {
    setError(error.message);
  }
}

async function handleStatusChange(id, newStatus) {
  try {
    await updateAppointment(id, { status: newStatus });

    const updated = await getAppointments();
    setAppointments(updated);
  } catch (error) {
    setError(error.message);
  }
}

async function handleDelete(id) {
  try {
    await deleteAppointment(id);

    const updated = await getAppointments();
    setAppointments(updated);
  } catch (error) {
    setError(error.message);
  }
}

  return (
    <>
      <Navbar />
      <main className="appointments-page">
      <h1>Appointments</h1>

      {error && <p className="error">{error}</p>}

      <section className="appointments-form-card">
        <h2>Create Appointment</h2>

        <form onSubmit={handleSubmit} className="appointments-form">
            <select
            name="patient"
            value={formData.patient}
            onChange={handleChange}
            required
            >
            <option value="">Select Patient</option>
            {patients.map((patient) => (
                <option key={patient._id} value={patient._id}>
                {patient.name}
                </option>
            ))}
            </select>

            <select
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            required
            >
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                {doctor.name} - {doctor.specialization}
                </option>
            ))}
            </select>

            <input
            type="datetime-local"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
            />

            <input
            name="reason"
            placeholder="Reason for visit"
            value={formData.reason}
            onChange={handleChange}
            required
            />

            <button type="submit">Create Appointment</button>
        </form>
      </section>

      <table>
        <thead>
          <tr>
            <th>Actions</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((a) => (
            <tr key={a._id}>
              <td>{a.patient?.name}</td>
              <td>{a.doctor?.name}</td>
              <td>{new Date(a.appointmentDate).toLocaleString()}</td>
              <td>{a.reason}</td>
              <td>
                <select
                    value={a.status}
                    onChange={(e) =>
                    handleStatusChange(a._id, e.target.value) }
                    className="status-select" >
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td>
                <button
                    className="delete-appointment-btn"
                    onClick={() => handleDelete(a._id)} >
                    Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
    </>
  );
}

export default AppointmentsPage;