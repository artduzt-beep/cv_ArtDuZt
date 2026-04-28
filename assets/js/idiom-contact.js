const translations = {
  es: {
    "preloader.label": "Cargando experiencia",

    "nav.home": "Inicio",
    "nav.projects": "Proyectos",
    "nav.contact": "Mis redes",

    "contactHero.eyebrow": "Contacto & Redes",
    "contactHero.title": 'Elige el canal que mejor se adapte a <span>tu idea o proyecto</span>',
    "contactHero.lead": "Si quieres colaborar, cotizar o simplemente conocer más de mi trabajo, aquí tienes acceso directo a mis principales canales.",

    "panel.primary.eyebrow": "Canal Directo",
    "panel.primary.title": "Hablemos por el medio que te resulte más cómodo",
    "panel.primary.body": "Trabajo en proyectos de diseño web, branding, motion graphics y comunicación visual. Si tienes una necesidad clara o una idea todavía en proceso, podemos aterrizarla juntos.",

    "panel.info.eyebrow": "Disponibilidad",
    "panel.info.title": "Abierto a colaboraciones, proyectos freelance y oportunidades creativas",
    "panel.info.label1": "Correo",
    "panel.info.label2": "Ubicación",
    "panel.info.value2": "México",
    "panel.info.label3": "Enfoque",
    "panel.info.value3": "Web, branding, motion, visuales digitales",

    "cards.mail.tag": "Correo",
    "cards.mail.title": "Escríbeme directo",
    "cards.mail.body": "Ideal para propuestas, cotizaciones y colaboraciones más formales.",

    "cards.whatsapp.tag": "WhatsApp",
    "cards.whatsapp.title": "Conversemos rápido",
    "cards.whatsapp.body": "Perfecto para resolver dudas rápidas o iniciar una conversación más directa.",
    "cards.whatsapp.link": "Mensaje directo",

    "cards.behance.tag": "Behance",
    "cards.behance.title": "Ver casos y proceso",
    "cards.behance.body": "Una vista más detallada de proyectos, exploraciones visuales y presentación de piezas.",
    "cards.behance.link": "Abrir portafolio",

    "cards.work.tag": "Trabajo",
    "cards.work.title": "Explorar proyectos",
    "cards.work.body": "Si prefieres revisar primero una selección curada, puedes pasar a mi trabajo destacado.",
    "cards.work.link": "Ver proyectos",

    "footer.copy": "© 2026 Arturo Diaz — Creative Developer"
  },

  en: {
    "preloader.label": "Loading experience",

    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.contact": "Socials",

    "contactHero.eyebrow": "Contact & Socials",
    "contactHero.title": 'Choose the channel that best fits <span>your idea or project</span>',
    "contactHero.lead": "If you want to collaborate, request a quote, or simply know more about my work, here you have direct access to my main channels.",

    "panel.primary.eyebrow": "Direct Channel",
    "panel.primary.title": "Let's connect through the channel that feels most comfortable to you",
    "panel.primary.body": "I work on web design, branding, motion graphics, and visual communication projects. If you already have a clear need or just an idea taking shape, we can define it together.",

    "panel.info.eyebrow": "Availability",
    "panel.info.title": "Open to collaborations, freelance projects, and creative opportunities",
    "panel.info.label1": "Email",
    "panel.info.label2": "Location",
    "panel.info.value2": "Mexico",
    "panel.info.label3": "Focus",
    "panel.info.value3": "Web, branding, motion, digital visuals",

    "cards.mail.tag": "Email",
    "cards.mail.title": "Write to me directly",
    "cards.mail.body": "Ideal for proposals, quotes, and more formal collaborations.",

    "cards.whatsapp.tag": "WhatsApp",
    "cards.whatsapp.title": "Let's chat quickly",
    "cards.whatsapp.body": "Perfect for quick questions or starting a more direct conversation.",
    "cards.whatsapp.link": "Direct message",

    "cards.behance.tag": "Behance",
    "cards.behance.title": "View case studies and process",
    "cards.behance.body": "A more detailed look at projects, visual explorations, and the presentation of selected pieces.",
    "cards.behance.link": "Open portfolio",

    "cards.work.tag": "Work",
    "cards.work.title": "Explore projects",
    "cards.work.body": "If you'd rather start with a curated selection, you can head over to my featured work.",
    "cards.work.link": "View projects",

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