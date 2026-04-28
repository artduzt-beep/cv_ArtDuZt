/* =========================
   SERVICES SLIDER
========================= */

const services = document.querySelectorAll('.service');
const navItems = document.querySelectorAll('.nav-item');
const navContainer = document.querySelector('.services__nav');
const slider = document.querySelector('.services__slider');

let index = 0;
let interval;

function showSlide(i) {
  services.forEach(s => s.classList.remove('active'));
  navItems.forEach(n => n.classList.remove('active'));

  services[i].classList.add('active');
  navItems[i].classList.add('active');

  const progress = (i / (navItems.length - 1)) * 100;
  navContainer.style.setProperty('--progress', progress + '%');
}

function startSlider() {
  interval = setInterval(() => {
    index = (index + 1) % services.length;
    showSlide(index);
  }, 5000);
}

function stopSlider() {
  clearInterval(interval);
}

navItems.forEach((item, i) => {
  item.addEventListener('click', () => {
    index = i;
    showSlide(index);
  });

  item.addEventListener('mouseenter', () => {
    stopSlider();
    index = i;
    showSlide(index);
  });

  item.addEventListener('mouseleave', startSlider);
});

slider.addEventListener('mouseenter', stopSlider);
slider.addEventListener('mouseleave', startSlider);

showSlide(index);
startSlider();



/* =========================
   ABOUT SLIDES (FIXED PRO)
========================= */

gsap.registerPlugin(ScrollTrigger);

const slides = document.querySelectorAll(".about-slide");
const dots = document.querySelectorAll(".about__dot");
const total = slides.length;

ScrollTrigger.create({
  trigger: ".about",
  start: "top top",
  end: "+=1200",
  scrub: 0.6,
  pin: ".about__inner",
  anticipatePin: 1,

  onUpdate: (self) => {
    let i = Math.floor(self.progress * total);

    if (i >= total) i = total - 1;

    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    slides[i].classList.add("active");
    dots[i].classList.add("active");
  }
});
