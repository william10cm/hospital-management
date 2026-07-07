const express = require("express");
const {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  updatePatientStatus,
  deletePatient,
} = require("../controllers/patientController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, authorizeRoles("admin", "receptionist"), createPatient);
router.get("/", protect, getPatients);
router.get("/:id", protect, getPatientById);
router.put("/:id", protect, authorizeRoles("admin", "receptionist"), updatePatient);
router.patch(
  "/:id/status",
  protect,
  authorizeRoles("admin", "doctor", "receptionist"),
  updatePatientStatus
);
router.delete("/:id", protect, authorizeRoles("admin"), deletePatient);

module.exports = router;