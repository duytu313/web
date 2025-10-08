const Job = require("../../models/Job");
const User = require("../../models/User");
const { Op } = require("sequelize");

// ================= Lấy danh sách việc làm =================
const listJobs = async (req, res) => {
  try {
    const { q, location, sort, company } = req.query;
    const where = {};

    if (q) where.title = { [Op.like]: `%${q}%` };
    if (company) where.company = { [Op.like]: `%${company}%` };
    if (location) where.location = { [Op.like]: `%${location}%` };

    let order = [["createdAt", "DESC"]];
    if (sort === "oldest") order = [["createdAt", "ASC"]];
    else if (sort === "highest") order = [["salary", "DESC"]];

    const jobs = await Job.findAll({
      where,
      include: [
        {
          model: User,
          as: "postedBy",
          attributes: ["id", "username", "email", "role"],
        },
      ],
      order,
    });

    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= Lấy chi tiết một việc làm =================
const getJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "postedBy",
          attributes: ["id", "username", "email", "role"],
        },
      ],
    });
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= Tạo việc làm =================
const createJob = async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Only employers can post jobs" });
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
    if (!title || !company) {
      return res
        .status(400)
        .json({ message: "Title and company are required" });
    }

    const logo = req.file ? `/uploads/${req.file.filename}` : null;

    const job = await Job.create({
      title,
      company,
      location,
      salary,
      type,
      description,
      logo,
      qualification,
      userId: req.user.id, // ✅ đúng khóa ngoại
    });

    res.status(201).json({ message: "Job created successfully", job });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= Cập nhật việc làm =================
const updateJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // ✅ kiểm tra quyền: admin hoặc chủ job
    if (req.user.role !== "admin" && job.userId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You can only edit your own job posts" });
    }

    const logo = req.file ? `/uploads/${req.file.filename}` : job.logo;
    await job.update({ ...req.body, logo });

    res.json({ message: "Job updated successfully", job });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= Xóa việc làm =================
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // ✅ kiểm tra quyền
    if (req.user.role !== "admin" && job.userId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You can only delete your own job posts" });
    }

    await job.destroy();
    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  listJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
