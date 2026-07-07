const Patient = require("../models/Patient");

// CREATE
async function createPatient(req, res) {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Error creating patient" });
  }
}

// GET ALL
async function getPatients(req, res) {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patients" });
  }
}

// GET ONE
async function getPatientById(req, res) {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patient" });
  }
}

// UPDATE
async function updatePatient(req, res) {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: "Error updating patient" });
  }
}

// UPDATE STATUS ONLY
async function updatePatientStatus(req, res) {
  try {
    const { status } = req.body;

    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: "Error updating patient status" });
  }
}

// DELETE
async function deletePatient(req, res) {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json({ message: "Patient deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting patient" });
  }
}

module.exports = {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  updatePatientStatus,
  deletePatient,
};
