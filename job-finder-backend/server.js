require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { sequelize } = require("./config/db"); // ✅ đúng file DB

// ================== Khởi tạo App ==================
const app = express();

// ================== Middleware ==================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================== Import Models ==================
// ⚠️ Import đủ để Sequelize biết quan hệ giữa các bảng
require("./models/User");
require("./models/Job");
require("./models/Applicant"); // ✅ giữ nguyên tên model của bạn

// ================== Uploads Folder ==================
const uploadDir = process.env.UPLOAD_DIR
  ? path.resolve(process.env.UPLOAD_DIR)
  : path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`✅ Created uploads folder at: ${uploadDir}`);
}

// Cho phép truy cập tĩnh đến file CV, ảnh, logo...
app.use("/uploads", express.static(uploadDir));

// ================== Serve Static Frontend ==================
const publicDir = path.join(__dirname, "public");
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
  console.log(`🌐 Serving static frontend from: ${publicDir}`);
}

// ================== Routes ==================
const userRoutes = require("./router/userRoutes");
const jobRoutes = require("./router/jobRoutes");
const resumeRoutes = require("./router/resumeRoutes");
const applicantRoutes = require("./router/applicant"); // ✅ Ứng tuyển
const statsRoutes = require("./router/stats"); // ✅ Thống kê

app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/applicants", applicantRoutes);
app.use("/api/stats", statsRoutes);

// ================== Test Route ==================
app.get("/", (req, res) => {
  res.json({ message: "✅ Server is running properly!" });
});

// ================== Start Server ==================
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");

    // ⚙️ Sync models (giữ nguyên dữ liệu cũ)
    await sequelize.sync({ alter: true });
    console.log("✅ Database synced successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Database connection/sync failed:", err);
    process.exit(1);
  }
}

startServer();
