const express = require("express");
const {
  register,
  login,
  getUsers,
  getDoctorUsers,
  deleteUser,
} = require("../controllers/authController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/doctors", protect, getDoctorUsers);

router.get("/users", protect, authorizeRoles("admin"), getUsers);
router.delete("/users/:id", protect, authorizeRoles("admin"), deleteUser);

module.exports = router;
