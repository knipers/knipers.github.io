(() => {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const year = document.getElementById("year");

  if (year) year.textContent = new Date().getFullYear();

  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") {
    root.setAttribute("data-theme", saved);
  } else {
    const prefersLight = window.matchMedia?.("(prefers-color-scheme: light)")?.matches;
    root.setAttribute("data-theme", prefersLight ? "light" : "dark");
  }

  toggle?.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = current === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.12 });

  els.forEach(el => io.observe(el));
})();