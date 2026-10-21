const targets = document.querySelectorAll(
  ".section-heading, .system-feature, .month-copy, .month-board, .service-section > *, .local-section > *, .release-section > div"
);

if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("reveal-ready");
  targets.forEach((target) => target.dataset.reveal = "");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("revealed");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });

  targets.forEach((target) => observer.observe(target));
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
