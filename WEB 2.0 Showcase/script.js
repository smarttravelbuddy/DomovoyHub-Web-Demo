const concepts = {
  1: {
    title: "Digital Instrument",
    type: "PRODUCT SITE",
    description: "Кинематографичный тёмный сайт с приборным щитком приложения в центре повествования.",
    format: "Лендинг",
    theme: "Dark",
    accent: "Amber",
    path: "../WEB%202.0/index.html",
  },
  2: {
    title: "Editorial Ledger",
    type: "EDITORIAL SYSTEM",
    description: "Тёмный редакционный сайт: домашний журнал, квитанции, штампы и архитектурная сетка.",
    format: "Журнал",
    theme: "Dark",
    accent: "Amber / Aqua",
    path: "../WEB%202.0%20Variant%20B/index.html",
  },
  3: {
    title: "Home Data System",
    type: "SPATIAL PRODUCT",
    description: "Тёмная smart-home система со связанными приборами, орбитами и спокойной инфографикой.",
    format: "Product story",
    theme: "Dark",
    accent: "Amber / Aqua",
    path: "../WEB%202.0%20Variant%20C/index.html",
  },
  4: {
    title: "Open Control Room",
    type: "PUBLIC MANUAL",
    description: "Сайт как открытый щиток приложения: плотная системная консоль и публичный справочник.",
    format: "Справочник",
    theme: "Dark",
    accent: "Amber / Water",
    path: "../WEB%202.0%20Variant%20D/index.html",
  },
  5: {
    title: "One Month Story",
    type: "IMMERSIVE STORY",
    description: "Полноэкранная история одного показания: от прибытия домой до записи в архиве прибора.",
    format: "Scroll story",
    theme: "Dark",
    accent: "Amber",
    path: "../WEB%202.0%20Variant%20E/index.html",
  },
};

const frame = document.querySelector("#site-frame");
const viewport = document.querySelector("#viewport");
const loading = document.querySelector("#loading-state");
const openSite = document.querySelector("#open-site");
const variantButtons = [...document.querySelectorAll(".variant")];
const viewportButtons = [...document.querySelectorAll("[data-viewport]")];
const toast = document.querySelector("#toast");

let activeVariant = 1;
let activeViewport = "desktop";
let toastTimer;

const setText = (selector, value) => {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
};

const selectVariant = (number, updateHistory = true) => {
  const normalized = Math.min(5, Math.max(1, Number(number) || 1));
  const concept = concepts[normalized];
  activeVariant = normalized;

  variantButtons.forEach((button) => {
    const current = Number(button.dataset.variant) === normalized;
    button.classList.toggle("active", current);
    if (current) button.setAttribute("aria-current", "true");
    else button.removeAttribute("aria-current");
  });

  setText("#concept-type", concept.type);
  setText("#concept-title", concept.title);
  setText("#concept-description", concept.description);
  setText("#concept-format", concept.format);
  setText("#concept-theme", concept.theme);
  setText("#concept-accent", concept.accent);
  setText("#stage-index", `0${normalized} / 05`);
  setText("#stage-title", concept.title);
  setText("#address-label", `domovoy.local / direction-0${normalized}`);

  loading.hidden = false;
  frame.title = `Предпросмотр варианта ${normalized} — ${concept.title}`;
  frame.src = concept.path;
  openSite.href = concept.path;

  if (updateHistory) {
    const url = new URL(location.href);
    url.searchParams.set("variant", String(normalized));
    url.searchParams.set("viewport", activeViewport);
    history.replaceState({}, "", url);
  }
};

const setViewport = (mode, updateHistory = true) => {
  activeViewport = mode === "mobile" ? "mobile" : "desktop";
  viewport.classList.toggle("mobile", activeViewport === "mobile");
  viewport.classList.toggle("desktop", activeViewport === "desktop");

  viewportButtons.forEach((button) => {
    const current = button.dataset.viewport === activeViewport;
    button.classList.toggle("active", current);
    button.setAttribute("aria-pressed", String(current));
  });

  if (updateHistory) {
    const url = new URL(location.href);
    url.searchParams.set("variant", String(activeVariant));
    url.searchParams.set("viewport", activeViewport);
    history.replaceState({}, "", url);
  }
};

variantButtons.forEach((button) => {
  button.addEventListener("click", () => selectVariant(button.dataset.variant));
});

viewportButtons.forEach((button) => {
  button.addEventListener("click", () => setViewport(button.dataset.viewport));
});

frame.addEventListener("load", () => {
  loading.hidden = true;
});

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 1800);
};

document.querySelector("#copy-link").addEventListener("click", async () => {
  const shareUrl = new URL(location.href);
  shareUrl.searchParams.set("variant", String(activeVariant));
  shareUrl.searchParams.set("viewport", activeViewport);

  try {
    await navigator.clipboard.writeText(shareUrl.href);
    showToast("Ссылка скопирована");
  } catch {
    showToast("Скопируйте адрес из браузера");
  }
});

addEventListener("keydown", (event) => {
  if (event.metaKey || event.ctrlKey || event.altKey) return;
  if (event.key === "ArrowRight") selectVariant(activeVariant === 5 ? 1 : activeVariant + 1);
  if (event.key === "ArrowLeft") selectVariant(activeVariant === 1 ? 5 : activeVariant - 1);
  if (event.key.toLowerCase() === "m") setViewport(activeViewport === "desktop" ? "mobile" : "desktop");
});

const params = new URLSearchParams(location.search);
setViewport(params.get("viewport") || "desktop", false);
selectVariant(params.get("variant") || 1, false);
