const button = document.getElementById("langToggle");
let lang = localStorage.getItem("vv_lang") || "es";

function applyLang(nextLang) {
  document.querySelectorAll("[data-es]").forEach((el) => {
    el.textContent = nextLang === "es" ? el.dataset.es : el.dataset.en;
  });

  if (button) {
    button.textContent = nextLang === "es" ? "EN" : "ES";
  }

  document.documentElement.lang = nextLang;
  localStorage.setItem("vv_lang", nextLang);
}

if (button) {
  applyLang(lang);

  button.addEventListener("click", () => {
    lang = lang === "es" ? "en" : "es";
    applyLang(lang);
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
