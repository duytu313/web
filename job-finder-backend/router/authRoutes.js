const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// ====================== ĐĂNG KÝ ======================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ error: "Thiếu thông tin bắt buộc" });

    // Kiểm tra email đã tồn tại
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).json({ error: "Email đã tồn tại" });

    // Xác thực role hợp lệ
    const validRoles = ["employer", "candidate", "admin"];
    const finalRole = validRoles.includes(role) ? role : "candidate";

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: finalRole,
    });

    // Xóa password khỏi response
    const { password: _, ...userData } = user.toJSON();

    // Tạo JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ message: "Đăng ký thành công", user: userData, token });
  } catch (err) {
    console.error("❌ Register Error:", err);
    res.status(500).json({ error: "Lỗi server. Vui lòng thử lại!" });
  }
});

// ====================== ĐĂNG NHẬP ======================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email và mật khẩu là bắt buộc" });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: "Email không tồn tại" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Sai mật khẩu" });

    const { password: _, ...userData } = user.toJSON();

    // Tạo JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ message: "Đăng nhập thành công", user: userData, token });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ error: "Lỗi server. Vui lòng thử lại!" });
  }
});

// ====================== LẤY THÔNG TIN USER ======================
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "role", "createdAt", "updatedAt"],
    });

    if (!user) return res.status(404).json({ error: "User không tồn tại" });

    res.json({ user });
  } catch (err) {
    console.error("❌ Me Error:", err);
    res.status(500).json({ error: "Lỗi server. Vui lòng thử lại!" });
  }
});

module.exports = router;
