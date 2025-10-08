/* ================= Performance Stats ================= */
async function loadPerformanceStatsFromJobs() {
  try {
    const jobElems = document.querySelectorAll("#jobs-section .job-card");
    const jobs = Array.from(jobElems).map((el, idx) => ({
      id: el.dataset.id || idx,
      title: el.querySelector(".job-title").innerText,
    }));

    const appsRes = await fetch("/api/applications");
    const applications = await appsRes.json();

    document.getElementById("total-applicants").innerText = applications.length;
    document.getElementById("jobs-posted").innerText = jobs.length;

    const today = new Date().toISOString().split("T")[0];
    const applicationsToday = applications.filter((app) =>
      app.createdAt.startsWith(today)
    ).length;
    document.getElementById("applications-today").innerText = applicationsToday;

    const jobLabels = jobs.map((j) => j.title);
    const jobApplicationsCount = jobs.map(
      (j) => applications.filter((a) => a.jobId == j.id).length
    );

    const ctx = document.getElementById("applicationsChart").getContext("2d");
    if (window.performanceChart) window.performanceChart.destroy();

    window.performanceChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: jobLabels,
        datasets: [
          {
            label: "Applications",
            data: jobApplicationsCount,
            backgroundColor: "#4c50d3",
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { title: { display: true, text: "Job Title" } },
          y: {
            title: { display: true, text: "Applications" },
            beginAtZero: true,
          },
        },
      },
    });
  } catch (err) {
    console.error("❌ Error loading Performance from Jobs:", err);
  }
}
