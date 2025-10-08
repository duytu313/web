let oldEmployers = [];
/* -------- Nhà tuyển dụng động -------- */
async function fetchEmployers() {
  const res = await fetch("data/employers.json");
  const employers = await res.json();
  const wrapper = document.querySelector(".employers-wrapper");
  wrapper.innerHTML = "";
  employers.forEach((emp) => {
    const card = document.createElement("div");
    card.classList.add("employer-card");
    card.innerHTML = `
            <img src="${emp.logo}" alt="${emp.company}" />
            <div class="employer-info">
                <h3>${emp.company}</h3>
                <p>Industry: ${emp.industry}</p>
                <p>Positions Open: ${emp.positions}</p>
            </div>
        `;
    wrapper.appendChild(card);
  });

  if (JSON.stringify(oldEmployers) !== JSON.stringify(employers)) {
    if (oldEmployers.length > 0) alert("Danh sách nhà tuyển dụng cập nhật!");
    oldEmployers = employers;
  }
}
async function loadAll() {
  await fetchEmployers();
}

loadAll();
setInterval(loadAll, 300000);
