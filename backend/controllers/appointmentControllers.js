const Appointment = require("../models/Appointment");

async function createAppointment(req, res) {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({
      message: "Error creating appointment",
      error: error.message,
    });
  }
}

async function getAppointments(req, res) {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "name age gender phone")
      .populate("doctor", "name specialization department");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments" });
  }
}

module.exports = {
  createAppointment,
  getAppointments,
};