const LIBRE_URL = "https://libretranslate.de/translate";

async function translatePage(targetLang) {
  const elems = document.querySelectorAll("[data-translate]");
  elems.forEach(async (el) => {
    const original = el.dataset.original || el.innerText;
    el.dataset.original = original;
    try {
      const res = await fetch(LIBRE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: original,
          source: "auto",
          target: targetLang,
          format: "text",
        }),
      });
      const data = await res.json();
      el.innerText = data.translatedText;
    } catch (err) {
      console.error("Translation error:", err);
    }
  });
}

document.querySelectorAll(".lang img").forEach((img) => {
  img.addEventListener("click", () => {
    const lang = img.getAttribute("data-lang");
    translatePage(lang);
  });
});
