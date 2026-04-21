// ─── CUSTOM CURSOR ───────────────────────
const cursor = document.getElementById("cursor");
const cursorRing = document.getElementById("cursorRing");

if (cursor && cursorRing) {
  let mouseX = 0,
    mouseY = 0;
  let ringX = 0,
    ringY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 1;
    ringY += (mouseY - ringY) * 1;
    cursorRing.style.left = ringX - 18 + "px";
    cursorRing.style.top = ringY - 18 + "px";
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Cursor state on interactive elements
  const interactives = document.querySelectorAll(
    "a, button, .glass-card, .tier-card, .feature-item",
  );
  interactives.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "scale(2.5)";
      cursorRing.style.transform = "scale(1.5)";
      cursorRing.style.borderColor = "var(--primary)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "scale(1)";
      cursorRing.style.transform = "scale(1)";
      cursorRing.style.borderColor = "rgba(255,24,1,0.5)";
    });
  });
}

// ─── NAVBAR SCROLL ───────────────────────
const navbar = document.getElementById("navbar");
if (navbar) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// ─── SCROLL REVEAL ───────────────────────
function revealOnScroll() {
  const targets = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-scale",
  );
  targets.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // run on load

// ─── PROGRESS BARS ───────────────────────
function animateProgressBars() {
  const fills = document.querySelectorAll(".progress-fill");
  fills.forEach((fill) => {
    const top = fill.getBoundingClientRect().top;
    if (top < window.innerHeight - 80 && !fill.classList.contains("animated")) {
      fill.classList.add("animated");
    }
  });
}
window.addEventListener("scroll", animateProgressBars);
animateProgressBars();

// ─── COUNTER ANIMATION ───────────────────
function animateCounters() {
  const counters = document.querySelectorAll(".counter");
  counters.forEach((counter) => {
    const top = counter.getBoundingClientRect().top;
    if (top < window.innerHeight - 80 && !counter.dataset.done) {
      counter.dataset.done = "true";
      const target = parseInt(counter.dataset.target, 10);
      let start = 0;
      const duration = 1800;
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.floor(ease * target);
        if (progress < 1) requestAnimationFrame(step);
        else counter.textContent = target;
      };
      requestAnimationFrame(step);
    }
  });
}
window.addEventListener("scroll", animateCounters);
animateCounters();

// ─── COUNTDOWN TIMER ─────────────────────
function updateCountdown() {
  const raceDate = new Date("2026-04-28T09:00:00");
  const now = new Date();
  const diff = raceDate - now;

  if (diff <= 0) {
    ["days", "hours", "mins", "secs"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.textContent = "00";
    });
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  const pad = (n) => String(n).padStart(2, "0");

  const dEl = document.getElementById("days");
  const hEl = document.getElementById("hours");
  const mEl = document.getElementById("mins");
  const sEl = document.getElementById("secs");

  if (dEl) dEl.textContent = pad(days);
  if (hEl) hEl.textContent = pad(hours);
  if (mEl) mEl.textContent = pad(mins);
  if (sEl) sEl.textContent = pad(secs);
}

if (document.getElementById("days")) {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ─── VIDEO INTERACTIONS ───────────────────
document.querySelectorAll("video[onmouseover]").forEach((vid) => {
  // already handled inline, but clean up autoplay logic
});

// Pause non-autoplay videos on load
document.querySelectorAll("video:not([autoplay])").forEach((vid) => {
  vid.pause();
});

// ─── PARALLAX HERO ────────────────────────
const heroVideo = document.querySelector(".hero-video");
if (heroVideo) {
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    heroVideo.style.transform = `translateY(${scrolled * 0.3}px)`;
  });
}

// ─── PAGE HEADER PARALLAX ────────────────
const pageHeaderBg = document.querySelector(".page-header-bg");
if (pageHeaderBg) {
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    pageHeaderBg.style.transform = `translateY(${scrolled * 0.2}px)`;
  });
}

// ─── GLITCH RANDOM TRIGGER ────────────────
// Glitch effect is CSS-based, but we can add sporadic extra class toggling
const glitchEls = document.querySelectorAll(".glitch");
glitchEls.forEach((el) => {
  setInterval(() => {
    if (Math.random() > 0.85) {
      el.style.transform = `translate(${(Math.random() - 0.5) * 4}px, ${(Math.random() - 0.5) * 2}px)`;
      setTimeout(() => {
        el.style.transform = "";
      }, 80);
    }
  }, 2000);
});
// ─── MERCH: SELECTOR DE TALLA ─────────────────────
let selectedSize = "M";
let selectedColor = "negro";
let selectedColorLabel = "Negra";

function selectSize(btn, size) {
  document
    .querySelectorAll(".size-btn")
    .forEach((b) => b.classList.remove("size-btn-active"));
  btn.classList.add("size-btn-active");
  selectedSize = size;
  updateMerchCTA();
  showOrderSummary();
}

function selectColor(color, hex, btn) {
  document
    .querySelectorAll(".color-swatch")
    .forEach((b) => b.classList.remove("color-swatch-active"));
  btn.classList.add("color-swatch-active");
  selectedColor = color;

  const labels = { negro: "Negra", azul: "Azul marino", roja: "Roja" };
  selectedColorLabel = labels[color] || color;
  document.getElementById("shirt-color-label").textContent =
    selectedColorLabel.toUpperCase();

  // Cambiar color del SVG
  const fills = ["shirt-fill-1", "shirt-fill-2", "shirt-fill-3"];
  const colorMap = { negro: "#0a0a0a", azul: "#1a2040", roja: "#cc1200" };
  fills.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.setAttribute("fill", colorMap[color]);
  });
  const neck = document.getElementById("shirt-fill-4");
  const neckMap = { negro: "#111", azul: "#151a30", roja: "#aa0e00" };
  if (neck) neck.setAttribute("fill", neckMap[color]);

  updateMerchCTA();
  showOrderSummary();
}

function showOrderSummary() {
  const summary = document.getElementById("order-summary");
  const text = document.getElementById("order-text");
  summary.style.display = "block";
  text.textContent = `1× Camiseta AT33 STEM Racing · ${selectedColorLabel} · Talla ${selectedSize} · Edición 2026`;
}

function updateMerchCTA() {
  const cta = document.getElementById("merch-cta");
  const subject = encodeURIComponent(`Camiseta AT33 — Talla ${selectedSize}`);
  const body = encodeURIComponent(
    `Hola, me gustaría pedir una camiseta AT33.\n\nTalla: ${selectedSize}\n\nGracias.`,
  );
  cta.href = `mailto:at33stemracingteamoficial@gmail.com?subject=${subject}&body=${body}`;
}

function showOrderSummary() {
  const summary = document.getElementById("order-summary");
  const text = document.getElementById("order-text");
  summary.style.display = "block";
  text.textContent = `1× Camiseta AT33 STEM Racing · Talla ${selectedSize} · Edición 2026`;
}

// ─── DONACIONES: SELECTOR INTERACTIVO ───────────────
const donationPerks = {
  5: {
    label: "COLABORADOR — 5€",
    desc: "Mención en redes sociales del equipo + Certificado digital de colaborador.",
  },
  15: {
    label: "POPULAR ⭐ — 15€",
    desc: "Mención en redes sociales + Certificado digital + Tu nombre en la lista de colaboradores del Jarama.",
  },
  50: {
    label: "PADRINO — 50€",
    desc: "Todo lo anterior + Logo/nombre en el monoplaza digital + Reconocimiento especial en la ceremonia del Jarama.",
  },
};
let selectedAmount = 15;
let selectedTier = "POPULAR";

function selectDonation(btn, amount, tier) {
  document
    .querySelectorAll(".donation-btn")
    .forEach((b) => b.classList.remove("donation-btn-active"));
  btn.classList.add("donation-btn-active");
  document.getElementById("custom-amount").value = "";
  setDonation(amount, tier);
}

function onCustomAmount(input) {
  document
    .querySelectorAll(".donation-btn")
    .forEach((b) => b.classList.remove("donation-btn-active"));
}

function applyCustomAmount() {
  const val = parseInt(document.getElementById("custom-amount").value);
  if (!val || val < 1) return;
  let tier = val >= 50 ? "PADRINO" : val >= 15 ? "COLABORADOR" : "APOYO";
  setDonation(val, tier);
}

function setDonation(amount, tier) {
  selectedAmount = amount;
  selectedTier = tier;

  const perk = donationPerks[amount] || {
    label: `DONACIÓN — ${amount}€`,
    desc: "Mención en redes sociales + Certificado digital de colaborador.",
  };
  document.getElementById("perk-title").textContent = perk.label;
  document.getElementById("perk-desc").textContent = perk.desc;

  const ctaBtn = document.getElementById("donation-cta");
  const subject = encodeURIComponent(`Donación AT33 — ${amount}€ (${tier})`);
  const body = encodeURIComponent(
    `Hola, me gustaría hacer una donación de ${amount}€ al equipo AT33 STEM Racing.\n\nGracias.`,
  );
  ctaBtn.href = `mailto:at33stemracingteamoficial@gmail.com?subject=${subject}&body=${body}`;
  ctaBtn.textContent = `DONAR ${amount}€ AL EQUIPO`;
}
