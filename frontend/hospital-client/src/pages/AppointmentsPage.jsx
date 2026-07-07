import { useEffect, useState } from "react";
import "./AppointmentsPage.css";
import Navbar from "../components/Navbar";
import {
  getAppointments,
  createAppointment,
  getPatients,
  getDoctorUsers,
  updateAppointment,
  deleteAppointment,
} from "../api/api";
import { getPermissions } from "../utils/permissions";

function AppointmentsPage() {
  const user = JSON.parse(localStorage.getItem("hospitalUser") || "{}");
  const perms = getPermissions(user.role);

  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");
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
        const doctorsData = await getDoctorUsers();

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

      const updated = await getAppointments();
      setAppointments(updated);

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
        <section className="appointments-header">
          <h1>Appointments</h1>
          <p>Schedule and manage patient appointments.</p>
        </section>

        {error && <p className="appointments-error">{error}</p>}

        {perms.canCreateAppointment && (
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
                    {doctor.name}
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
        )}

        <section className="appointments-card">
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Reason</th>
                <th>Status</th>
                {perms.canDeleteAppointment && <th>Actions</th>}
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{appointment.patient?.name}</td>
                  <td>{appointment.doctor?.name}</td>
                  <td>{new Date(appointment.appointmentDate).toLocaleString()}</td>
                  <td>{appointment.reason}</td>
                  <td>
                    <select
                      value={appointment.status}
                      onChange={(event) =>
                        handleStatusChange(appointment._id, event.target.value)
                      }
                      className="status-select"
                      disabled={!perms.canUpdateAppointment}
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  {perms.canDeleteAppointment && (
                    <td>
                      <button
                        type="button"
                        className="delete-appointment-btn"
                        onClick={() => handleDelete(appointment._id)}
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

export default AppointmentsPage;
