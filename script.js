const button = document.getElementById("langToggle");
const cartBtn = document.getElementById("cartBtn");
const closeCart = document.getElementById("closeCart");
const cartDrawer = document.getElementById("cartDrawer");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartEmpty = document.getElementById("cartEmpty");

let lang = localStorage.getItem("vv_lang") || "es";
let cart = [];

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

function renderCart() {
  if (!cartCount || !cartItems || !cartEmpty) {
    return;
  }

  cartCount.textContent = String(cart.length);
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartEmpty.style.display = "block";
    return;
  }

  cartEmpty.style.display = "none";
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    cartItems.appendChild(li);
  });
}

if (button) {
  applyLang(lang);
  button.addEventListener("click", () => {
    lang = lang === "es" ? "en" : "es";
    applyLang(lang);
  });
}

document.querySelectorAll(".add-cart").forEach((btn) => {
  btn.addEventListener("click", () => {
    cart.push(btn.dataset.name || "Producto");
    renderCart();
    if (cartDrawer) {
      cartDrawer.classList.add("open");
      cartDrawer.setAttribute("aria-hidden", "false");
    }
  });
});

if (cartBtn && cartDrawer) {
  cartBtn.addEventListener("click", () => {
    cartDrawer.classList.toggle("open");
    cartDrawer.setAttribute("aria-hidden", cartDrawer.classList.contains("open") ? "false" : "true");
  });
}

if (closeCart && cartDrawer) {
  closeCart.addEventListener("click", () => {
    cartDrawer.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
  });
}

document.querySelectorAll(".filter-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    const filter = chip.dataset.filter;

    document.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");

    document.querySelectorAll("#productGrid .product-card").forEach((card) => {
      const show = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !show);
    });
  });
});

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
renderCart();
