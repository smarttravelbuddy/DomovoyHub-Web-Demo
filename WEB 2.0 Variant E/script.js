const progress = document.querySelector(".progress-fill");
const chapterLinks = [...document.querySelectorAll(".chapter-nav a")];
const chapters = [...document.querySelectorAll("[data-chapter]")];
let maxScroll = 1;

const updateProgress = () => {
  const amount = Math.min(1, Math.max(0, scrollY / maxScroll));
  if (progress) progress.style.width = `${amount * 100}%`;
};

const measurePage = () => {
  maxScroll = Math.max(1, document.documentElement.scrollHeight - innerHeight);
  updateProgress();
};

addEventListener("scroll", updateProgress, { passive: true });
addEventListener("resize", measurePage);
measurePage();

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    const current = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!current) return;
    chapterLinks.forEach((link) => {
      const active = link.getAttribute("href") === `#${current.target.id}`;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }, { rootMargin: "-25% 0px -55% 0px", threshold: [0, .2, .6] });

  chapters.forEach((chapter) => observer.observe(chapter));
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
