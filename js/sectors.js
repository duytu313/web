let oldSectors = [];

/* -------- Ngành hot động -------- */
async function fetchSectors() {
  const res = await fetch("data/sectors.json");
  const sectors = await res.json();
  const wrapper = document.querySelector(".categories-wrapper");
  wrapper.innerHTML = "";
  sectors.forEach((sec) => {
    const card = document.createElement("div");
    card.classList.add("category-card");
    card.innerHTML = `
            <ion-icon name="${sec.icon}"></ion-icon>
            <h3>${sec.name}</h3>
            <p>${sec.jobs} jobs</p>
        `;
    wrapper.appendChild(card);
  });

  if (JSON.stringify(oldSectors) !== JSON.stringify(sectors)) {
    if (oldSectors.length > 0) alert("Ngành hot cập nhật!");
    oldSectors = sectors;
  }
}
async function loadAll() {
  await fetchSectors();
}

loadAll();
setInterval(loadAll, 300000);
