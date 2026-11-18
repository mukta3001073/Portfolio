// ====== Config ======
const CONTACT_EMAIL = "mukta3001073@gmail.com";

// ====== Mobile navigation ======
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

function setMenu(open) {
  navLinks.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
}

navToggle.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));

// ====== Highlight active nav link on scroll ======
const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav__links a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navAnchors.forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`)
        );
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);
sections.forEach((s) => sectionObserver.observe(s));

// ====== Reveal on scroll ======
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ====== Contact form (opens the visitor's email app with the message filled in) ======
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  [form.name, form.email, form.message].forEach((f) => f.classList.remove("invalid"));
  statusEl.className = "form__status";

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || !emailOk || !message) {
    if (!name) form.name.classList.add("invalid");
    if (!emailOk) form.email.classList.add("invalid");
    if (!message) form.message.classList.add("invalid");
    statusEl.textContent = "Please fill in all fields with a valid email.";
    statusEl.classList.add("err");
    return;
  }

  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

  statusEl.textContent = "Opening your email app… just press send!";
  statusEl.classList.add("ok");
  form.reset();
});

// ====== Footer year ======
document.getElementById("year").textContent = new Date().getFullYear();