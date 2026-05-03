const express = require("express");
const {
  createAppointment,
  getAppointments,
} = require("../controllers/appointmentControllers");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createAppointment);
router.get("/", protect, getAppointments);

module.exports = router;