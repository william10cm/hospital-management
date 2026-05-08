const express = require("express");
const {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} = require("../controllers/patientController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

// router.post("/", protect, createPatient);
// router.get("/", protect, getPatients);
// router.get("/:id", protect, getPatientById);
// router.put("/:id", protect, updatePatient);
// router.delete("/:id", protect, deletePatient);

router.post("/", protect, authorizeRoles("admin", "receptionist"), createPatient);
router.get("/", protect, getPatients);
router.get("/:id", protect, getPatientById);
router.put("/:id", protect, authorizeRoles("admin"), updatePatient);
router.delete("/:id", protect, authorizeRoles("admin"), deletePatient);

module.exports = router;