// routes/resumeRoutes.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Resume = require("../models/Resume");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// ================= CẤU HÌNH UPLOAD =================
const uploadDir = path.join(__dirname, "../uploads/cv");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${req.user.id}-${file.originalname}`),
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Chỉ cho phép file pdf/doc/docx
    const allowed = [".pdf", ".doc", ".docx"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowed.includes(ext)) {
      return cb(new Error("Only PDF, DOC, or DOCX files are allowed"));
    }
    cb(null, true);
  },
});

// ================= UPLOAD CV =================
router.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
  async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });

      const resume = await Resume.create({
        userId: req.user.id,
        fileName: req.file.originalname,
        filePath: `/uploads/cv/${req.file.filename}`,
      });

      res.status(201).json({
        message: "CV uploaded successfully",
        resume,
      });
    } catch (err) {
      console.error("❌ Upload CV Error:", err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// ================= LẤY DANH SÁCH CV CỦA USER =================
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const resumes = await Resume.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
      attributes: ["id", "fileName", "filePath", "createdAt"],
    });

    res.json(resumes);
  } catch (err) {
    console.error("❌ Fetch CV Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ================= TẠO CV TỪ FORM (Create CV) =================
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { title, content, phone, email } = req.body;

    if (!title || !content)
      return res.status(400).json({ error: "Title and content are required" });

    const fileName = `${Date.now()}-${req.user.id}-cv.txt`;
    const filePath = path.join(uploadDir, fileName);

    // Lưu nội dung CV vào file text
    fs.writeFileSync(filePath, content, "utf-8");

    const resume = await Resume.create({
      userId: req.user.id,
      fileName: title,
      filePath: `/uploads/cv/${fileName}`,
    });

    res.status(201).json({
      message: "CV created successfully",
      resume,
    });
  } catch (err) {
    console.error("❌ Create CV Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ================= XOÁ CV =================
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!resume) return res.status(404).json({ error: "Resume not found" });

    const filePath = path.join(__dirname, "..", resume.filePath);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await resume.destroy();

    res.json({ message: "Resume deleted successfully" });
  } catch (err) {
    console.error("❌ Delete CV Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
