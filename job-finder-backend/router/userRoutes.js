const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authenticate = require("../middleware/auth"); // middleware xác thực JWT
const router = express.Router();

// ================= Helper tạo token =================
function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// ================= Đăng ký =================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email and password are required" });
    }

    // Kiểm tra email tồn tại
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ error: "Email already exists" });

    const userRole = role === "employer" ? "employer" : "candidate";
    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hash, role: userRole });
    const { password: _, ...userData } = user.toJSON();
    const token = generateToken(user);

    res.json({ message: "Register success", user: userData, token });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error. Please try again!" });
  }
});

// ================= Đăng nhập =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Email and password are required" });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Wrong password" });

    const { password: _, ...userData } = user.toJSON();
    const token = generateToken(user);

    res.json({ message: "Login success", user: userData, token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error. Please try again!" });
  }
});

// ================= Lấy thông tin user hiện tại =================
router.get("/me", authenticate, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ user });
  } catch (err) {
    console.error("Get user error:", err);
    res.status(500).json({ error: "Server error. Please try again!" });
  }
});

module.exports = router;
