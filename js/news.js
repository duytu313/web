let oldNews = [];
/* -------- Tin tức động từ Google News RSS -------- */
async function fetchNews() {
  const rssUrl =
    "https://news.google.com/rss/search?q=programming+jobs&hl=en-US&gl=US&ceid=US:en";
  const res = await fetch(
    `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`
  );
  const data = await res.json();
  const newsWrapper = document.querySelector(".news-wrapper");
  newsWrapper.innerHTML = "";
  const newItems = data.items.slice(0, 5);

  newItems.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("news-card");
    card.innerHTML = `
            <img src="${
              item.enclosure
                ? item.enclosure.link
                : "images/news-placeholder.jpg"
            }" alt="${item.title}" />
            <div class="news-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <span class="news-date">${new Date(
                  item.pubDate
                ).toLocaleDateString()}</span>
            </div>
        `;
    newsWrapper.appendChild(card);
  });

  if (
    JSON.stringify(oldNews) !== JSON.stringify(newItems.map((i) => i.title))
  ) {
    if (oldNews.length > 0) alert("Có tin tức mới!");
    oldNews = newItems.map((i) => i.title);
  }
}
async function loadAll() {
  await fetchNews();
}

loadAll();
setInterval(loadAll, 300000);
