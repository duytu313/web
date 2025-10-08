const express = require("express");
const { Op, literal } = require("sequelize");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Job = require("../models/Job");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// ================= TẠO THƯ MỤC UPLOADS =================
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// ================= MULTER CONFIG =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname)
    ),
});
const upload = multer({ storage });

// ================= TẠO JOB (CHỈ EMPLOYER) =================
router.post(
  "/create",
  authMiddleware,
  upload.single("logo"),
  async (req, res) => {
    try {
      if (req.user.role !== "employer")
        return res.status(403).json({ error: "Only employers can post jobs" });

      const {
        title,
        company,
        location,
        salary,
        type,
        description,
        qualification,
      } = req.body;

      if (!title || !company)
        return res
          .status(400)
          .json({ error: "Title and company are required" });

      const qualifications = qualification
        ? Array.isArray(qualification)
          ? qualification
          : qualification
              .split(/,|\n/)
              .map((q) => q.trim())
              .filter(Boolean)
        : [];

      const job = await Job.create({
        title,
        company,
        location,
        salary,
        type,
        description,
        qualification: JSON.stringify(qualifications),
        logo: req.file ? `/uploads/${req.file.filename}` : null,
        postedById: req.user.id,
      });

      res.status(201).json({ message: "Job created successfully", job });
    } catch (err) {
      console.error("❌ Job Create Error:", err);
      res.status(500).json({ error: "Server error. Please try again!" });
    }
  }
);

// ================= LẤY DANH SÁCH JOBS (Có filter keyword) =================
router.get("/", async (req, res) => {
  try {
    const { keyword, sort } = req.query;
    let where = {};

    if (keyword) {
      where = {
        [Op.or]: [
          { title: { [Op.like]: `%${keyword}%` } },
          { company: { [Op.like]: `%${keyword}%` } },
        ],
      };
    }

    let order = [["createdAt", "DESC"]];
    if (sort === "oldest") order = [["createdAt", "ASC"]];
    else if (sort === "highest") order = [["salary", "DESC"]];
    else if (keyword) {
      order = [
        [
          literal(
            `CASE WHEN title LIKE '%${keyword}%' OR company LIKE '%${keyword}%' THEN 1 ELSE 2 END`
          ),
          "ASC",
        ],
        ["createdAt", "DESC"],
      ];
    }

    const jobs = await Job.findAll({
      where,
      include: [
        {
          model: User,
          as: "postedBy",
          attributes: ["id", "name", "role"],
        },
      ],
      order,
    });

    const formattedJobs = jobs.map((job) => {
      const j = job.toJSON();
      return {
        ...j,
        postedById: j.postedById || j.postedBy?.id || null,
        qualification: j.qualification ? JSON.parse(j.qualification) : [],
      };
    });

    res.json(formattedJobs);
  } catch (err) {
    console.error("❌ Job Fetch Error:", err);
    res.status(500).json({ error: "Server error. Please try again!" });
  }
});

// ================= CẬP NHẬT JOB (CHỈ OWNER hoặc ADMIN) =================
router.put("/:id", authMiddleware, upload.single("logo"), async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });

    if (req.user.role !== "admin" && job.postedById !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You can only edit your own job posts" });
    }

    const {
      title,
      company,
      location,
      salary,
      type,
      description,
      qualification,
    } = req.body;

    const qualifications = qualification
      ? Array.isArray(qualification)
        ? qualification
        : qualification
            .split(/,|\n/)
            .map((q) => q.trim())
            .filter(Boolean)
      : null;

    await job.update({
      title: title || job.title,
      company: company || job.company,
      location: location || job.location,
      salary: salary || job.salary,
      type: type || job.type,
      description: description || job.description,
      qualification: qualifications
        ? JSON.stringify(qualifications)
        : job.qualification,
      logo: req.file ? `/uploads/${req.file.filename}` : job.logo,
    });

    res.json({ message: "Job updated successfully", job });
  } catch (err) {
    console.error("❌ Job Update Error:", err);
    res.status(500).json({ error: "Server error. Please try again!" });
  }
});

// ================= XÓA JOB (CHỈ OWNER hoặc ADMIN) =================
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });

    if (req.user.role !== "admin" && job.postedById !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You can only delete your own job posts" });
    }

    // Xóa file logo nếu có
    if (job.logo) {
      const filePath = path.join(__dirname, "..", job.logo);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await job.destroy();
    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    console.error("❌ Job Delete Error:", err);
    res.status(500).json({ error: "Server error. Please try again!" });
  }
});

module.exports = router;
