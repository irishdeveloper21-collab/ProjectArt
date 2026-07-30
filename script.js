document.body.classList.add("motion-ready");

const header = document.querySelector("#header");
const navToggle = document.querySelector(".nav-toggle");
const navList = document.querySelector("#primary-menu");
const form = document.querySelector("#registration-form");
const formMessage = document.querySelector("#form-message");
const timelineItems = Array.from(document.querySelectorAll(".timeline-item[data-start][data-end]"));
const flipCards = Array.from(document.querySelectorAll(".flip-card"));

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
  ".section:not(.hero), .card:not(.flip-card-face), .flip-card, .content-block, .theme-note, .timeline-item, .section-photo, .gallery-grid img, .registration-form"
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

const toggleFlipCard = (selectedCard) => {
  flipCards.forEach((card) => {
    if (card !== selectedCard) {
      card.classList.remove("is-flipped");
    }
  });

  selectedCard.classList.toggle("is-flipped");
};

flipCards.forEach((card) => {
  card.addEventListener("click", () => toggleFlipCard(card));

  card.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    toggleFlipCard(card);
  });
});

const parseLocalDate = (dateValue, endOfDay = false) => {
  const [year, month, day] = dateValue.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  if (endOfDay) {
    date.setHours(23, 59, 59, 999);
  }

  return date;
};

const updateTimelineStage = () => {
  if (!timelineItems.length) {
    return;
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let nextItem = null;
  let nextStart = null;

  timelineItems.forEach((item) => {
    const start = parseLocalDate(item.dataset.start);
    const end = parseLocalDate(item.dataset.end, true);
    const status = document.createElement("span");

    status.className = "timeline-status";

    if (today >= start && today <= end) {
      status.textContent = "Current stage";
      item.classList.add("is-current");
      item.prepend(status);
      return;
    }

    if (today < start && (!nextStart || start < nextStart)) {
      nextItem = item;
      nextStart = start;
    }
  });

  if (document.querySelector(".timeline-item.is-current") || !nextItem) {
    return;
  }

  const status = document.createElement("span");
  status.className = "timeline-status";
  status.textContent = "Next stage";
  nextItem.classList.add("is-next");
  nextItem.prepend(status);
};

updateTimelineStage();

if (form && formMessage) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    formMessage.textContent = "Thank you. Registration and artwork upload details have been received. Please make sure all student, school, teacher, and artwork message details are complete before the system closes on 16 November 2026.";
  });
}
