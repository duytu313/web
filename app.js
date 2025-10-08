$(document).ready(function () {
  const BASE_URL = "http://localhost:5000";
  // ================= Language Switch =================
  const translations = {
    vi: {
      Home: "Trang chủ",
      "Find Jobs": "Tìm việc",
      Performance: "Hiệu suất",
      Bookmarks: "Đánh dấu",
      Messages: "Tin nhắn",
      Notifications: "Thông báo",
      Settings: "Cài đặt",
      Login: "Đăng nhập",
      Register: "Đăng ký",
      Logout: "Đăng xuất",
      "Post Job": "Đăng việc",
      "TẠO CV": "TẠO CV",
      "CÔNG CỤ": "CÔNG CỤ",
      "CẨM NANG NGHỀ NGHIỆP": "CẨM NANG NGHỀ NGHIỆP",
      "No jobs found": "Không tìm thấy việc làm",
      Salary: "Mức lương",
      Location: "Địa điểm",
      Posted: "Đăng vào",
      "Job saved!": "Lưu việc thành công!",
      "Job already saved!": "Việc đã được lưu!",
      "About Company": "Về công ty",
      Qualification: "Yêu cầu",
      "Apply Now": "Ứng tuyển",
      "Save Job": "Lưu việc",
      "Featured News": "Tin tức nổi bật",
      "Top Employers": "Nhà tuyển dụng nổi bật",
      "Hot Sectors": "Ngành hot",
      "Information Technology": "Công nghệ thông tin",
      Marketing: "Marketing",
      Design: "Thiết kế",
      Healthcare: "Y tế",
      Finance: "Tài chính",
      "Enter your information": "Nhập thông tin của bạn",
      "Full Name:": "Họ & Tên:",
      Email: "Email:",
      Phone: "Số điện thoại:",
      Address: "Địa chỉ:",
      Summary: "Giới thiệu bản thân:",
      Experience: "Kinh nghiệm làm việc:",
      Education: "Học vấn:",
      Skills: "Kỹ năng:",
      "Create CV": "Tạo CV",
      "CV Preview": "CV Preview",
      "Work Experience": "Kinh nghiệm làm việc",
      "Support Tools": "Công cụ hỗ trợ",
      "CV Builder": "Trình tạo CV",
      "Skill Test": "Kiểm tra kỹ năng",
      "Salary Estimator": "Ước tính lương",
      "Open CV": "Mở CV",
      "Open Tool": "Mở công cụ",
      Settings: "Cài đặt",
      Profile: "Hồ sơ",
      Notifications: "Thông báo",
      Account: "Tài khoản",
      "Update Profile": "Cập nhật hồ sơ",
      "Save Preferences": "Lưu cài đặt",
      "Delete Account": "Xóa tài khoản",
      "Career Guide": "Cẩm nang nghề nghiệp",
      "Frontend Developer": "Frontend Developer",
      "Backend Developer": "Backend Developer",
      "DevOps Engineer": "DevOps Engineer",
      "Digital Marketer": "Digital Marketer",
      "SEO Specialist": "SEO Specialist",
      "UI/UX Designer": "UI/UX Designer",
      "Graphic Designer": "Graphic Designer",
      "Hanoi University of Science and Technology":
        "Trường Đại học Khoa học và Công nghệ Hà Nội",
      "Saved Jobs": "Việc làm đã lưu",
      "Phone:": "Số điện thoại:",
      "Address:": "Địa chỉ:",
      "Summary:": "Giới thiệu bản thân:",
      "Experience:": "Kinh nghiệm làm việc:",
      "Education:": "Học vấn:",
      "Skills:": "Kỹ năng:",
      "Applicant Statistics": "Thống kê ứng viên",
      "Total Applicants": "Tổng số ứng viên",
      "Jobs Posted": "Số việc đã đăng",
      "Applications Today": "Ứng tuyển hôm nay",
      "Applications per Job": "Số ứng viên mỗi việc",
      Filter: "Lọc",
      "Min Salary": "Mức lương tối thiểu",
      Location: "Địa điểm",
      Keyword: "Từ khóa",
      Tools: "Công Cụ",
      "Attractive job": "Việc làm hấp dẫn",
    },
    en: {
      // English là mặc định, giữ nguyên text HTML
    },
    fr: {
      "Attractive job": "Emploi attractif",
      Tools: "Outils",
      Filter: "Filtrer",
      "Min Salary": "Salaire minimum",
      Location: "Lieu",
      Keyword: "Mot-clé",
      "Applicant Statistics": "Statistiques des candidats",
      "Total Applicants": "Nombre total de candidats",
      "Jobs Posted": "Offres publiées",
      "Applications Today": "Candidatures aujourd'hui",
      "Applications per Job": "Candidatures par offre",
      "Summary:": "Résumé :",
      "Experience:": "Expérience :",
      "Education:": "Éducation :",
      "Skills:": "Compétences :",
      "Address:": "Adresse :",
      "Phone:": "Téléphone :",
      Home: "Accueil",
      "Find Jobs": "Trouver un emploi",
      Performance: "Performance",
      Bookmarks: "Signets",
      Messages: "Messages",
      Notifications: "Notifications",
      Settings: "Paramètres",
      Login: "Connexion",
      Register: "S'inscrire",
      Logout: "Déconnexion",
      "Post Job": "Publier un emploi",
      "TẠO CV": "Créer CV",
      "CÔNG CỤ": "Outils",
      "CẨM NANG NGHỀ NGHIỆP": "Guide de carrière",
      "No jobs found": "Aucun emploi trouvé",
      Salary: "Salaire",
      Location: "Lieu",
      Posted: "Publié le",
      "Job saved!": "Emploi enregistré !",
      "Job already saved!": "Emploi déjà enregistré !",
      "About Company": "À propos de l'entreprise",
      Qualification: "Qualification",
      "Apply Now": "Postuler maintenant",
      "Save Job": "Enregistrer l'emploi",
      "Featured News": "Actualités en vedette",
      "Top Employers": "Employeurs principaux",
      "Hot Sectors": "Secteurs populaires",
      "Information Technology": "Technologie de l'information",
      Marketing: "Marketing",
      Design: "Design",
      Healthcare: "Santé",
      Finance: "Finance",
      "Enter your information": "Entrez vos informations",
      "Full Name:": "Nom complet :",
      Email: "Email :",
      Phone: "Téléphone :",
      Address: "Adresse :",
      Summary: "Résumé :",
      Experience: "Expérience :",
      Education: "Éducation :",
      Skills: "Compétences :",
      "Create CV": "Créer CV",
      "CV Preview": "Aperçu du CV",
      "Work Experience": "Expérience professionnelle",
      "Support Tools": "Outils de soutien",
      "CV Builder": "Créateur de CV",
      "Skill Test": "Test de compétences",
      "Salary Estimator": "Estimateur de salaire",
      "Open CV": "Ouvrir CV",
      "Open Tool": "Ouvrir l'outil",
      Settings: "Paramètres",
      Profile: "Profil",
      Notifications: "Notifications",
      Account: "Compte",
      "Update Profile": "Mettre à jour le profil",
      "Save Preferences": "Enregistrer les préférences",
      "Delete Account": "Supprimer le compte",
      "Career Guide": "Guide de carrière",
      "Frontend Developer": "Développeur Frontend",
      "Backend Developer": "Développeur Backend",
      "DevOps Engineer": "Ingénieur DevOps",
      "Digital Marketer": "Marketeur digital",
      "SEO Specialist": "Spécialiste SEO",
      "UI/UX Designer": "Designer UI/UX",
      "Graphic Designer": "Designer graphique",
      "Hanoi University of Science and Technology":
        "Université des Sciences et Technologies de Hanoï",
      "Saved Jobs": "Emplois sauvegardés",
    },
  };

  let currentLang = "en";

  /**
   * Chuyển ngôn ngữ trang
   * @param {string} lang - mã ngôn ngữ: 'vi', 'en', 'fr'
   */
  function translatePage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;

    $("[data-translate]").each(function () {
      const key = $(this).data("translate");
      $(this).text(translations[lang][key] || $(this).data("original") || key);
    });
  }

  // ================= Lưu text gốc để fallback =================
  $("[data-translate]").each(function () {
    $(this).data("original", $(this).text());
  });

  // ================= Bắt sự kiện click vào cờ =================
  $(".lang img").click(function () {
    const lang = $(this).data("lang");
    translatePage(lang);
  });

  // ================= Tự động chuyển sang ngôn ngữ mặc định =================
  $(document).ready(function () {
    translatePage(currentLang);
  });

  // ================= State =================
  let jobs = [];
  let filteredJobs = [];
  let currentUser = null;
  let currentPage = 1;
  const jobsPerPage = 5;
  let editingJobId = null;
  let currentKeyword = "";
  let currentLocation = "";
  let currentSalary = "";
  let currentSort = "newest";

  // ================= Cache selectors =================
  const $sidebar = $(".sidebar"),
    $wrapper = $(".wrapper"),
    $popupAuth = $("#popup-auth"),
    $popupJob = $("#popup-job"),
    $popupDetail = $("#popup-detail"),
    $authForm = $("#auth-form"),
    $jobForm = $("#jobForm"),
    $btnLogin = $("#btn-login"),
    $btnRegister = $("#btn-register"),
    $btnLogout = $("#btn-logout"),
    $btnCreateJob = $("#btn-create-job"),
    $authTitle = $("#auth-title"),
    $authSubmit = $("#auth-submit"),
    $authError = $("#auth-error"),
    $inputKeyword = $("#filter-keyword"),
    $inputLocation = $("#filter-location"),
    $inputSalary = $("#filter-salary"),
    $btnFilter = $("#btn-filter"),
    $sortSelect = $("#sort-select");

  // ================= Sidebar toggle =================
  $(".menu-bar").on("click", () => $sidebar.toggleClass("active"));
  $(".logo").on("click", () => $sidebar.removeClass("active"));

  // ================= Show section function =================
  function showSection(sectionIds) {
    $(
      "#home-section, #jobs-section, #performance-section, #bookmarks-section, #messages-section, #notifications-section, #settings-section, #cv-section, #tools-section, #career-guide"
    ).hide();
    $(sectionIds).show();

    if (sectionIds.includes("#jobs-section")) fetchJobs();
    if (sectionIds.includes("#bookmarks-section")) renderBookmarks();
    if (sectionIds.includes("#messages-section")) renderMessages();
    if (sectionIds.includes("#notifications-section")) renderNotifications();
  }

  // ================= Menu click handlers =================
  $("#menu-home").click((e) => {
    e.preventDefault();
    showSection("#home-section,#jobs-section,#career-guide");
  });
  $("#menu-jobs").click((e) => {
    e.preventDefault();
    showSection("#jobs-section");
  });
  $("#menu-performance").click((e) => {
    e.preventDefault();
    showSection("#performance-section");
  });
  $("#menu-bookmarks").click((e) => {
    e.preventDefault();
    showSection("#bookmarks-section");
  });
  $("#menu-messages").click((e) => {
    e.preventDefault();
    showSection("#messages-section");
  });
  $("#menu-notifications").click((e) => {
    e.preventDefault();
    showSection("#notifications-section");
  });
  $("#menu-cv").click((e) => {
    e.preventDefault();
    showSection("#cv-section");
  });
  $("#menu-tools").click((e) => {
    e.preventDefault();
    showSection("#tools-section");
  });
  $("#menu-career-guide").click((e) => {
    e.preventDefault();
    showSection("#career-guide");
  });
  $("#menu-settings").click((e) => {
    e.preventDefault();
    showSection("#settings-section");
  });

  // ================= Profile & Notification Forms =================
  $("#profile-settings-form").submit((e) => {
    e.preventDefault();
    const name = $("#settings-name").val();
    const email = $("#settings-email").val();
    const password = $("#settings-password").val();
    alert(`Profile updated:\nName: ${name}\nEmail: ${email}`);
  });

  $("#notification-settings-form").submit((e) => {
    e.preventDefault();
    const email = $("#notify-email").is(":checked");
    const sms = $("#notify-sms").is(":checked");
    const push = $("#notify-push").is(":checked");
    alert(
      `Notification preferences saved:\nEmail: ${email}\nSMS: ${sms}\nPush: ${push}`
    );
  });

  $("#btn-delete-account").click(() => {
    if (confirm("Are you sure you want to delete your account?")) {
      alert("Account deleted!");
    }
  });

  // ================= Notifications =================
  const notificationsData = [
    {
      title: "Profile Updated",
      content: "Your profile was successfully updated.",
      date: "07/10/2025",
    },
    {
      title: "Job Expired",
      content: "Your posted job at Samsung has expired.",
      date: "05/10/2025",
    },
  ];

  function renderNotifications() {
    const $wrapperNotif = $(".notifications-wrapper");
    const $noNotifications = $("#no-notifications");
    $wrapperNotif.empty();
    if (!notificationsData.length) {
      $noNotifications.show();
      return;
    }
    $noNotifications.hide();
    notificationsData.forEach((notif) => {
      $wrapperNotif.append(`
        <div class="notification-card">
          <h4>${notif.title}</h4>
          <p>${notif.content}</p>
          <span class="notif-date">${notif.date}</span>
        </div>`);
    });
  }

  // ================= Notification Module =================

  // Mảng lưu notifications
  let notifications = [
    {
      title: "Profile Updated",
      message: "Your profile was successfully updated.",
      date: "07/10/2025",
    },
    {
      title: "Job Expired",
      message: "Your posted job at Samsung has expired.",
      date: "05/10/2025",
    },
  ];

  // Hàm hiển thị notifications
  function renderNotifications() {
    const wrapper = $("#notifications-section .notifications-wrapper");
    const noNotif = $("#no-notifications");
    wrapper.empty();

    if (notifications.length === 0) {
      noNotif.show();
      return;
    } else {
      noNotif.hide();
    }

    notifications.forEach((notif) => {
      const notifHTML = `
      <div class="notification-card">
        <h4>${notif.title}</h4>
        <p>${notif.message}</p>
        <span class="notif-date">${notif.date}</span>
      </div>
    `;
      wrapper.append(notifHTML);
    });
  }

  // Gọi lần đầu để hiển thị
  renderNotifications();

  // ================= Thêm notification mới tự động =================
  function addNotification(title, message) {
    const date = new Date().toLocaleDateString();
    notifications.unshift({ title, message, date }); // thêm đầu mảng
    renderNotifications();
  }

  // Ví dụ mô phỏng thêm thông báo sau 10 giây
  setTimeout(() => {
    addNotification("New Job Posted", "A new job at Google Inc. is available.");
  }, 10000);

  // ================= Tích hợp fetch từ backend (nếu có) =================
  async function fetchNotificationsFromAPI() {
    try {
      const res = await fetch("/api/notifications"); // URL API backend
      const data = await res.json();
      // Gộp notifications mới vào đầu mảng
      notifications = data.concat(notifications);
      renderNotifications();
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  }

  // Tự động fetch mỗi 5 phút
  setInterval(fetchNotificationsFromAPI, 300000);

  // ================= Messages =================
  const messagesData = [
    {
      from: "Alice",
      content: "Your application for Google was received.",
      date: "07/10/2025",
    },
    { from: "Bob", content: "New job posted at Apple.", date: "06/10/2025" },
  ];

  function renderMessages() {
    const $wrapperMsg = $(".messages-wrapper");
    const $noMessages = $("#no-messages");
    $wrapperMsg.empty();
    if (!messagesData.length) {
      $noMessages.show();
      return;
    }
    $noMessages.hide();
    messagesData.forEach((msg) => {
      $wrapperMsg.append(`
        <div class="message-card">
          <h4>${msg.from}</h4>
          <p>${msg.content}</p>
          <span class="msg-date">${msg.date}</span>
        </div>`);
    });
  }

  // ================= Bookmarks =================
  function renderBookmarks() {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    const $bookmarkWrapper = $(".bookmarks-wrapper");
    const $noJobs = $("#no-bookmarks");
    $bookmarkWrapper.empty();
    if (!savedJobs.length) {
      $noJobs.show();
      return;
    }
    $noJobs.hide();
    savedJobs.forEach((job) => {
      $bookmarkWrapper.append(`
        <div class="card" data-id="${job.id}">
          <h3>${job.company}</h3>
          <p>${job.title}</p>
          <p><ion-icon name="location-outline"></ion-icon> ${
            job.location || "Unknown"
          }</p>
          <p>Salary: $${job.salary || "?"}</p>
          <button class="btn-remove" data-id="${job.id}">Remove</button>
        </div>`);
    });
  }

  $(document).on("click", ".btn-remove", function () {
    const jobId = $(this).data("id");
    let savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    savedJobs = savedJobs.filter((job) => job.id !== jobId);
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
    renderBookmarks();
  });

  $(document).on("click", ".btn-bookmark", function (e) {
    e.stopPropagation();
    const jobId = $(this).data("id");
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return;
    let savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    if (!savedJobs.some((j) => j.id === job.id)) {
      savedJobs.push(job);
      localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
      alert("Job saved!");
    } else alert("Job already saved!");
  });

  // ================= Popup Auth =================
  function showAuthPopup(mode) {
    $popupAuth.show();
    $authTitle.text(mode);
    $authSubmit.text(mode);
    $authError.text("");
    const isLogin = mode === "Login";
    $("#auth-name, #role-select").toggle(!isLogin).val("");
  }

  $btnLogin.click(() => showAuthPopup("Login"));
  $btnRegister.click(() => showAuthPopup("Register"));
  $(".close-popup, .close-detail, .close-job-popup").click(function () {
    $(this).closest(".popup").hide();
    editingJobId = null;
  });
  $(document).click((e) => {
    if ($(e.target).hasClass("popup")) $(e.target).hide();
  });

  // ================= Auth =================
  $authForm.submit(async function (e) {
    e.preventDefault();
    const isLogin = $authSubmit.text() === "Login";
    const email = $("#auth-email").val()?.trim();
    const password = $("#auth-password").val()?.trim();
    if (!email || !password)
      return $authError.text("Email and password are required!");

    let body = { email, password };
    let url = isLogin
      ? `${BASE_URL}/api/users/login`
      : `${BASE_URL}/api/users/register`;

    if (!isLogin) {
      const name = $("#auth-name").val()?.trim();
      const role = $("#role-select").val();
      if (!name) return $authError.text("Name is required!");
      body = { name, email, password, role };
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      if (data.error) return $authError.text(data.error);
      if (data.token) localStorage.setItem("token", data.token);
      currentUser = data.user || data;
      if (currentUser) {
        currentUser.role = (currentUser.role || "").toLowerCase();
        $popupAuth.hide();
        updateSidebar();
        fetchJobs();
      } else $authError.text("Login failed!");
    } catch (err) {
      console.error(err);
      $authError.text("Server error. Please try again!");
    }
  });

  // ================= Sidebar update =================
  function updateSidebar() {
    $("#user-name").text(currentUser?.name || "Guest");
    $("#user-role").text(currentUser?.role || "Visitor");
    $btnLogin.add($btnRegister).toggle(!currentUser);
    $btnLogout.toggle(!!currentUser);
    $btnCreateJob.toggle(currentUser?.role === "employer");
  }

  $btnLogout.click(() => {
    currentUser = null;
    localStorage.removeItem("token");
    updateSidebar();
    fetchJobs();
  });

  // ================= Post/Edit Job =================
  $btnCreateJob.click(() => {
    if (currentUser?.role !== "employer")
      return alert("Please login as employer!");
    editingJobId = null;
    $popupJob.show();
    $jobForm[0].reset();
  });

  $jobForm.submit(async function (e) {
    e.preventDefault();
    if (currentUser?.role !== "employer")
      return alert("Please login as employer!");
    const formData = new FormData(this);
    const qualification = $(this)
      .find("textarea[name='qualification']")
      .val()
      ?.trim();
    if (qualification)
      formData.set("qualification", JSON.stringify(qualification.split("\n")));

    const url = editingJobId
      ? `${BASE_URL}/api/jobs/${editingJobId}`
      : `${BASE_URL}/api/jobs/create`;
    const method = editingJobId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: formData,
      });
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      if (data.error) return alert(data.error);
      alert(
        editingJobId ? "Job updated successfully!" : "Job posted successfully!"
      );
      $popupJob.hide();
      $jobForm[0].reset();
      editingJobId = null;
      fetchJobs();
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again!");
    }
  });

  // ================= Fetch & Render Jobs =================
  async function fetchJobs() {
    try {
      const res = await fetch(`${BASE_URL}/api/jobs`);
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      const data = await res.json();
      jobs = (data || []).map((job) => ({
        ...job,
        postedById: Number(job.postedById || job.postedBy?.id || 0),
        qualification: Array.isArray(job.qualification)
          ? job.qualification
          : job.qualification
          ? JSON.parse(job.qualification)
          : [],
      }));
      filterAndSortJobs();
    } catch (err) {
      console.error("Error fetching jobs:", err);
      $wrapper.html(
        "<p class='no-jobs'>Cannot load jobs. Please try later.</p>"
      );
    }
  }

  function filterAndSortJobs() {
    filteredJobs = jobs.filter((job) => {
      const keywordMatch = !currentKeyword
        ? true
        : (job.title + " " + job.company)
            .toLowerCase()
            .includes(currentKeyword.toLowerCase());
      const locationMatch = !currentLocation
        ? true
        : job.location?.toLowerCase().includes(currentLocation.toLowerCase());
      const salaryMatch = !currentSalary
        ? true
        : Number(job.salary) >= Number(currentSalary);
      return keywordMatch && locationMatch && salaryMatch;
    });

    filteredJobs.sort((a, b) => {
      if (currentSort === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (currentSort === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (currentSort === "highest") return (b.salary || 0) - (a.salary || 0);
      return 0;
    });

    currentPage = 1;
    renderJobs();
  }

  function renderJobs() {
    $wrapper.empty();
    const start = (currentPage - 1) * jobsPerPage;
    const paginatedJobs = filteredJobs.slice(start, start + jobsPerPage);
    if (!paginatedJobs.length)
      return $wrapper.html("<p class='no-jobs'>No jobs found.</p>");

    paginatedJobs.forEach((job) => {
      const postedDate = new Date(job.createdAt).toLocaleDateString();
      const isOwner =
        currentUser?.role === "employer" && currentUser.id === job.postedById;
      $wrapper.append(`
        <div class="card" data-id="${job.id}">
          <div class="card-left"><img src="${
            job.logo || `${BASE_URL}/uploads/default.png`
          }" alt="logo"></div>
          <div class="card-center">
            <h3>${job.company}</h3>
            <p>${job.title}</p>
            <p><ion-icon name="location-outline"></ion-icon> ${
              job.location || "Unknown"
            }</p>
            <p class="job-date">Posted: ${postedDate}</p>
          </div>
          <div class="card-right">
            <p>$${job.salary || "?"}/year</p>
            <button class="btn-bookmark" data-id="${job.id}">Bookmark</button>
            ${
              isOwner
                ? `<button class="btn-edit" data-id="${job.id}">Edit</button><button class="btn-delete" data-id="${job.id}">Delete</button>`
                : ""
            }
          </div>
        </div>`);
    });

    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
    if (totalPages > 1) {
      const $pagination = $("<div class='pagination'></div>");
      for (let i = 1; i <= totalPages; i++) {
        const $btn = $(`<button>${i}</button>`).toggleClass(
          "active",
          i === currentPage
        );
        $btn.click(() => {
          currentPage = i;
          renderJobs();
        });
        $pagination.append($btn);
      }
      $wrapper.append($pagination);
    }
  }

  $btnFilter.click(() => {
    currentKeyword = $inputKeyword.val()?.trim() || "";
    currentLocation = $inputLocation.val()?.trim() || "";
    currentSalary = $inputSalary.val()?.trim() || "";
    filterAndSortJobs();
  });

  $sortSelect.change(() => {
    currentSort = $sortSelect.val();
    filterAndSortJobs();
  });

  $(document).on("click", ".btn-edit", function () {
    const jobId = $(this).data("id");
    const job = jobs.find((j) => j.id === jobId);
    if (!job || currentUser?.id !== job.postedById)
      return alert("You cannot edit this job!");
    editingJobId = jobId;
    $popupJob.show();
    $jobForm[0].reset();
    $jobForm.find("input[name='title']").val(job.title);
    $jobForm.find("input[name='company']").val(job.company);
    $jobForm.find("input[name='location']").val(job.location);
    $jobForm.find("input[name='salary']").val(job.salary);
    $jobForm.find("textarea[name='description']").val(job.description);
    $jobForm
      .find("textarea[name='qualification']")
      .val(
        (Array.isArray(job.qualification) ? job.qualification : []).join("\n")
      );
  });

  $(document).on("click", ".btn-delete", async function () {
    const jobId = $(this).data("id");
    const job = jobs.find((j) => j.id === jobId);
    if (!job || currentUser?.id !== job.postedById)
      return alert("You cannot delete this job!");
    if (!confirm("Are you sure you want to delete this job?")) return;

    try {
      const res = await fetch(`${BASE_URL}/api/jobs/${jobId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) throw new Error(`Server returned ${res.status}`);
      alert("Job deleted successfully!");
      fetchJobs();
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again!");
    }
  });

  $(document).on("click", ".card", function (e) {
    if ($(e.target).is(".btn-edit, .btn-delete, .btn-bookmark")) return;
    const jobId = $(this).data("id");
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return;

    $popupDetail.show();
    $("#detail-company").text(job.company);
    $("#detail-title").text(job.title);
    $("#detail-description").text(
      job.description || "No description available"
    );
    const $qual = $("#detail-qualification").empty();
    (Array.isArray(job.qualification) ? job.qualification : []).forEach((q) =>
      $qual.append(`<li>${q}</li>`)
    );
    $("#popup-detail img").attr(
      "src",
      job.logo || `${BASE_URL}/uploads/default.png`
    );
  });

  // ================= Init =================
  async function init() {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await fetch(`${BASE_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        const data = await res.json();
        if (!data.error && data.user) {
          currentUser = data.user;
          currentUser.role = (currentUser.role || "").toLowerCase();
        } else localStorage.removeItem("token");
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
      }
    }
    updateSidebar();
    showSection("#home-section");
  }

  init();


});
