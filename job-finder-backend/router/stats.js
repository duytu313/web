const express = require("express");
const Applicant = require("../models/Applicant");
const Job = require("../models/Job");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// ================= LẤY DANH SÁCH ỨNG VIÊN =================
router.get("/applications", authMiddleware, async (req, res) => {
  try {
    const applicants = await Applicant.findAll({
      include: [
        {
          model: Job,
          as: "job",
          attributes: ["id", "title", "company"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const formatted = applicants.map((a) => ({
      id: a.id,
      name: a.name,
      email: a.email,
      resume: a.resume,
      jobId: a.jobId,
      jobTitle: a.job?.title || "",
      jobCompany: a.job?.company || "",
      appliedById: a.appliedById,
      createdAt: a.createdAt,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("❌ Fetch Applicants Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ================= Thống kê tổng quan =================
router.get("/summary", authMiddleware, async (req, res) => {
  try {
    const totalApplicants = await Applicant.count();
    const jobsPosted = await Job.count();

    // Applications hôm nay
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const applicationsToday = await Applicant.count({
      where: {
        createdAt: {
          [Op.gte]: today, // Sử dụng Op từ Sequelize
        },
      },
    });

    res.json({ totalApplicants, jobsPosted, applicationsToday });
  } catch (err) {
    console.error("❌ Stats Summary Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
