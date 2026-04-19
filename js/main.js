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
    ringX += (mouseX - ringX) * 0.9;
    ringY += (mouseY - ringY) * 0.9;
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
