const express = require("express");
const {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctorController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createDoctor);
router.get("/", protect, getDoctors);
router.get("/:id", protect, getDoctorById);
router.put("/:id", protect, updateDoctor);
router.delete("/:id", protect, deleteDoctor);

router.post("/", protect, authorizeRoles("admin"), createDoctor);
router.get("/", protect, getDoctors);
router.get("/:id", protect, getDoctorById);
router.put("/:id", protect, authorizeRoles("admin"), updateDoctor);
router.delete("/:id", protect, authorizeRoles("admin"), deleteDoctor);

module.exports = router;