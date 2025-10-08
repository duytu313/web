// middleware/authorizeJob.js
const { Job } = require("../models");

async function authorizeJob(req, res, next) {
  const jobId = req.params.id;
  const job = await Job.findByPk(jobId);

  if (!job) return res.status(404).json({ error: "Job not found" });

  if (job.userId !== req.user.id) {
    return res.status(403).json({ error: "You can only modify your own jobs" });
  }

  req.job = job; // attach job
  next();
}

module.exports = authorizeJob;
