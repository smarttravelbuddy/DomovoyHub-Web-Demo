const revealTargets = document.querySelectorAll(
  ".section-intro, .feature-ledger article, .workflow, .privacy-section > *, .service-story > *, .download"
);

if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("reveal-ready");
  revealTargets.forEach((element) => element.dataset.reveal = "");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("revealed");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

  revealTargets.forEach((element) => observer.observe(element));
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
