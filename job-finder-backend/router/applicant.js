// routes/applicant.js
const express = require("express");
const { Op } = require("sequelize");
const Applicant = require("../models/Applicant");
const Job = require("../models/Job");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// ==================== ỨNG TUYỂN JOB ====================
router.post("/apply/:jobId", authMiddleware, async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.jobId);
    if (!job) return res.status(404).json({ error: "Job not found" });

    // Kiểm tra user đã apply chưa
    const existing = await Applicant.findOne({
      where: { userId: req.user.id, jobId: job.id },
    });
    if (existing)
      return res.status(400).json({ error: "You already applied to this job" });

    const applicant = await Applicant.create({
      userId: req.user.id,
      jobId: job.id,
      appliedAt: new Date(),
    });

    res.status(201).json({ message: "Applied successfully", applicant });
  } catch (err) {
    console.error("❌ Apply Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ==================== LẤY DANH SÁCH ỨNG VIÊN THEO JOB ====================
router.get("/job/:jobId", authMiddleware, async (req, res) => {
  try {
    const applicants = await Applicant.findAll({
      where: { jobId: req.params.jobId },
      include: [{ model: User, attributes: ["id", "name", "email"] }],
      order: [["appliedAt", "DESC"]],
    });

    res.json(applicants);
  } catch (err) {
    console.error("❌ Fetch Applicants Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
