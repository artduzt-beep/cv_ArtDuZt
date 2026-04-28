const translations = {
  es: {
    "preloader.label": "Cargando experiencia",

    "nav.home": "Inicio",
    "nav.projects": "Proyectos",
    "nav.contact": "Mis redes",

    "work.eyebrow": "Trabajo Seleccionado",
    "work.title": 'Una muestra curada de proyectos entre <span>web, branding, motion y 3D</span>',
    "work.lead": "Esta página reúne piezas que muestran cómo mezclo dirección visual, ejecución digital y detalle técnico en distintos formatos.",

    "work.hero.meta1": "Web Experience",
    "work.hero.meta2": "Sitio publicado",
    "work.hero.title": "Campaña digital – Beneficios financieros",
    "work.hero.body": "Diseño visual y desarrollo de prototipos frontend, enfocados en experiencia de usuario y estructura responsive.",

    "work.card2.title": "Identidad visual para empaques",
    "work.card2.body": "Conceptualización de marca y desarrollo de mockups aplicados a producto.",

    "work.card3.meta1": "Motion Graphics",
    "work.card3.meta2": "Case Study",
    "work.card3.title": "Visuales en movimiento para campañas y contenido digital",
    "work.card3.body": "Piezas animadas pensadas para reforzar comunicación, identidad y presencia en plataformas digitales.",

    "work.card4.meta1": "3D / Exploración",
    "work.card4.meta2": "Visual Lab",
    "work.card4.title": "Composiciones 3D para identidad y piezas experimentales",
    "work.card4.body": "Exploraciones donde volumen, textura e iluminación ayudan a construir una dirección visual más potente.",

    "contact.eyebrow": "Contacto",
    "contact.title": "Hablemos de tu proyecto",
    "contact.lead": "Si tienes una idea, una marca o una experiencia digital en mente, puedes escribirme directo por el canal que prefieras.",
    "contact.email": "Correo",
    "contact.whatsapp": "WhatsApp",
    "contact.behance": "Behance",

    "footer.copy": "© 2026 Arturo Diaz — Creative Developer"
  },

  en: {
    "preloader.label": "Loading experience",

    "nav.home": "Home",
    "nav.projects": "Work",
    "nav.contact": "Socials",

    "work.eyebrow": "Selected Work",
    "work.title": 'A curated selection of projects across <span>web, branding, motion, and 3D</span>',
    "work.lead": "This page brings together pieces that show how I blend visual direction, digital execution, and technical detail across different formats.",

    "work.hero.meta1": "Web Experience",
    "work.hero.meta2": "Live site",
    "work.hero.title": "Digital Campaign – Financial Benefits",
    "work.hero.body": "Visual design and frontend prototyping, focused on user experience and responsive structure.",
    "work.hero.cta": "View project",

    "work.card2.title": "Packaging Visual Identity",
    "work.card2.body": "Brand concept and applied product mockups.",

    "work.card3.meta1": "Motion Graphics",
    "work.card3.meta2": "Case Study",
    "work.card3.title": "Moving visuals for campaigns and digital content",
    "work.card3.body": "Animated pieces designed to reinforce communication, identity, and presence across digital platforms.",

    "work.card4.meta1": "3D / Exploration",
    "work.card4.meta2": "Visual Lab",
    "work.card4.title": "3D compositions for identity and experimental pieces",
    "work.card4.body": "Explorations where volume, texture, and lighting help build a stronger visual direction.",

    "contact.eyebrow": "Contact",
    "contact.title": "Let's talk about your project",
    "contact.lead": "If you have an idea, a brand, or a digital experience in mind, feel free to reach out through the channel you prefer.",
    "contact.email": "Email",
    "contact.whatsapp": "WhatsApp",
    "contact.behance": "Behance",

    "footer.copy": "© 2026 Arturo Diaz — Creative Developer"
  }
};

function applyTranslations(lang) {
  const dict = translations[lang];
  if (!dict) return;

  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.dataset.i18nHtml;
    if (dict[key]) el.innerHTML = dict[key];
  });

  const switchRoot = document.getElementById("lang-switch");
  if (switchRoot) {
    switchRoot.classList.toggle("is-es", lang === "es");
    switchRoot.classList.toggle("is-en", lang === "en");
  }

  document.querySelectorAll(".lang-switch__btn").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.lang === lang);
  });

  localStorage.setItem("site-lang", lang);
}

function initLanguageSwitcher() {
  const switchRoot = document.getElementById("lang-switch");
  if (!switchRoot) return;

  const buttons = Array.from(switchRoot.querySelectorAll(".lang-switch__btn"));
  if (!buttons.length) return;

  const savedLang = localStorage.getItem("site-lang") || "es";
  applyTranslations(savedLang);

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      applyTranslations(button.dataset.lang);
    });
  });
}

document.addEventListener("DOMContentLoaded", initLanguageSwitcher);