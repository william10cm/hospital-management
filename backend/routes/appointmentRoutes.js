const express = require("express");
const {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointmentControllers");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, authorizeRoles("admin", "receptionist"), createAppointment);
router.get("/", protect, getAppointments);
router.get("/:id", protect, getAppointmentById);
router.put("/:id", protect, authorizeRoles("admin", "receptionist"), updateAppointment);
router.delete("/:id", protect, authorizeRoles("admin", "receptionist"), deleteAppointment);

module.exports = router;