const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ===================== Register =====================
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Tên, email và mật khẩu là bắt buộc" });
    }

    // Kiểm tra email đã tồn tại
    const exist = await User.findOne({ where: { email } });
    if (exist) {
      return res.status(400).json({ message: "Email đã được sử dụng" });
    }

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    // Tạo user mới
    const user = await User.create({
      name,
      email,
      password: hash,
      role: role || "candidate", // role mặc định là candidate
    });

    // Tạo JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRES_IN || "7d",
    });

    res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// ===================== Login =====================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email và mật khẩu là bắt buộc" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Email hoặc mật khẩu không đúng" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res
        .status(400)
        .json({ message: "Email hoặc mật khẩu không đúng" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRES_IN || "7d",
    });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// ===================== Get current user =====================
const me = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Không tìm thấy người dùng" });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar || null, // mặc định null nếu không có avatar
    });
  } catch (err) {
    console.error("Me error:", err.message);
    res.status(500).json({ message: "Lỗi server" });
  }
};

module.exports = { register, login, me };
