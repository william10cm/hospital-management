const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Roles a visitor may pick when registering themselves.
// "admin" is intentionally excluded — it can only be granted by an existing admin.
const SELF_SIGNUP_ROLES = ["doctor", "receptionist"];

function createToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

async function register(req, res) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const userRole = role?.trim().toLowerCase() || "receptionist";

    if (userRole === "admin") {
      return res.status(403).json({
        message: "Admin accounts can only be created by an existing administrator.",
      });
    }

    if (!SELF_SIGNUP_ROLES.includes(userRole)) {
      return res.status(400).json({
        message: "Invalid role. Allowed roles are doctor and receptionist.",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: userRole,
    });

    const token = createToken(user._id);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = createToken(user._id);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

async function getUsers(req, res) {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

async function deleteUser(req, res) {
  try {
    if (req.params.id === req.user.id) {
      return res
        .status(400)
        .json({ message: "You cannot delete your own account" });
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

async function getDoctorUsers(req, res) {
  try {
    const doctors = await User.find({ role: "doctor" })
      .select("name")
      .sort({ name: 1 });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  register,
  login,
  getUsers,
  getDoctorUsers,
  deleteUser,
};
