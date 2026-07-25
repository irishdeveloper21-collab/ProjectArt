document.body.classList.add("motion-ready");

const header = document.querySelector("#header");
const navToggle = document.querySelector(".nav-toggle");
const navList = document.querySelector("#primary-menu");
const form = document.querySelector("#registration-form");
const formMessage = document.querySelector("#form-message");

const updateHeaderState = () => {
  if (!header) {
    return;
  }

  header.classList.toggle("is-scrolled", window.scrollY > 16);
};

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

if (navToggle && navList) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";

    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navToggle.textContent = isOpen ? "Menu" : "Close";
    navList.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("nav-open", !isOpen);
  });

  navList.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.textContent = "Menu";
      navList.classList.remove("is-open");
      document.body.classList.remove("nav-open");
    });
  });
}

const revealTargets = document.querySelectorAll(
  ".section:not(.hero), .card, .content-block, .theme-note, .timeline-item, .section-photo, .steps li, .gallery-grid img, .registration-form"
);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.12,
    }
  );

  revealTargets.forEach((target, index) => {
    target.classList.add("reveal");
    target.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
    revealObserver.observe(target);
  });
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

if (form && formMessage) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    formMessage.textContent = "Thank you. Please make sure the posted artwork includes the matching student, school, teacher, and artwork message details on the back.";
  });
}
