function initThemeToggle() {
  const toggle = document.getElementById("theme-toggle");
  const heroImage = document.getElementById("hero-arturo");
  if (!toggle) return;

  const root = document.documentElement;
  const savedTheme = localStorage.getItem("site-theme") || "dark";

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("site-theme", theme);

    if (heroImage) {
      heroImage.src =
        theme === "light"
          ? "./assets/img/arturb.png"
          : "./assets/img/arturw.png";
    }
  }

  applyTheme(savedTheme);

  toggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
  });
}

document.addEventListener("DOMContentLoaded", initThemeToggle);
