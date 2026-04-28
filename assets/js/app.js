//preloader
const preloadStart = Date.now();

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  const elapsed = Date.now() - preloadStart;
  const minDuration = 1800;
  const remaining = Math.max(0, minDuration - elapsed);

  setTimeout(() => {
    preloader.classList.add("is-hidden");

    setTimeout(() => {
      preloader.remove();
    }, 1250);
  }, remaining);
});



//canvas
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resize();
window.addEventListener('resize', resize);

function noise() {
  const imageData = ctx.createImageData(canvas.width, canvas.height);
  const buffer = new Uint32Array(imageData.data.buffer);

  for (let i = 0; i < buffer.length; i++) {
    const val = Math.random() < 0.5 ? 255 : 0;
    buffer[i] = (255 << 24) | (val << 16) | (val << 8) | val;
  }

  ctx.putImageData(imageData, 0, 0);
}

function animateNoise() {
  noise();
  requestAnimationFrame(animateNoise);
}

animateNoise();

//typewritter

const typewriterElement = document.getElementById("typewriter");

if (typewriterElement) {
  const words = [
    "proyectos freelance",
    "diseño gráfico",
    "motion graphics",
    "diseño web",
    "ux/ui",
    "front-end"
  ];

  let i = 0;
  let j = 0;
  let currentWord = "";
  let isDeleting = false;

  function type() {
    currentWord = words[i];

    if (isDeleting) j--;
    else j++;

    typewriterElement.textContent = currentWord.substring(0, j);

    if (!isDeleting && j === currentWord.length) {
      isDeleting = true;
      setTimeout(type, 1200);
      return;
    }

    if (isDeleting && j === 0) {
      isDeleting = false;
      i = (i + 1) % words.length;
    }

    setTimeout(type, isDeleting ? 40 : 80);
  }

  type();
}



// cursor
const cursor = document.querySelector(".cursor");

if (cursor && !window.matchMedia("(pointer: coarse)").matches) {
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  function updateCursor() {
    currentX += (mouseX - currentX) * 0.22;
    currentY += (mouseY - currentY) * 0.22;

    cursor.style.transform = `translate3d(${currentX - cursor.offsetWidth / 2}px, ${currentY - cursor.offsetHeight / 2}px, 0)`;

    requestAnimationFrame(updateCursor);
  }

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  document.querySelectorAll("a, button, .work-card, .btn, .contact-btn").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
  });

  updateCursor();
}



// Piramyd

const pyramidContainer = document.getElementById("pyramid-canvas");

if (pyramidContainer && typeof THREE !== "undefined") {
  window.addEventListener("DOMContentLoaded", () => {
    const container = pyramidContainer;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    function resizeRenderer() {
      const width = container.clientWidth;
      const height = container.clientHeight;

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    resizeRenderer();
    window.addEventListener("resize", resizeRenderer);

    const geometry = new THREE.ConeGeometry(2.5, 4, 4);
    const material = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0
    });

    const pyramid = new THREE.Mesh(geometry, material);
    scene.add(pyramid);

    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15
    });

    const wireframe = new THREE.LineSegments(edges, lineMaterial);
    scene.add(wireframe);

    const pointsMaterial = new THREE.PointsMaterial({
      color: 0xe03030,
      size: 0.12
    });

    const points = new THREE.Points(geometry, pointsMaterial);
    scene.add(points);

    camera.position.z = 6;

    let scrollY = 0;
    window.addEventListener("scroll", () => {
      scrollY = window.scrollY;
    });

    function animate() {
      requestAnimationFrame(animate);

      pyramid.rotation.x = scrollY * 0.001;
      pyramid.rotation.y = scrollY * 0.008;

      wireframe.rotation.x = pyramid.rotation.x;
      wireframe.rotation.y = pyramid.rotation.y;

      points.rotation.x = pyramid.rotation.x;
      points.rotation.y = pyramid.rotation.y;

      renderer.render(scene, camera);
    }

    animate();
  });
}


// Skills

document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("skills-track");
  if (!track || typeof gsap === "undefined") return;

  const items = Array.from(track.children);

  function fillTrack() {
    const screenWidth = window.innerWidth;
    while (track.scrollWidth < screenWidth * 2) {
      items.forEach((item) => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
      });
    }
  }

  fillTrack();

  const totalWidth = track.scrollWidth / 2;

  gsap.to(track, {
    x: `-=${totalWidth}`,
    duration: 20,
    ease: "none",
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth)
    }
  });
});



//Timeine

document.addEventListener("DOMContentLoaded", () => {
  const timeline = document.querySelector(".timeline");

  if (!timeline || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.to(timeline, {
    "--timeline-progress": "100%",
    ease: "none",
    scrollTrigger: {
      trigger: timeline,
      start: "top 75%",
      end: "bottom 75%",
      scrub: 0.6
    }
  });

  gsap.utils.toArray(".timeline__item").forEach((item) => {
    gsap.fromTo(
      item,
      { autoAlpha: 0, y: 40 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });
});



// liquid

const liquidGroups = document.querySelectorAll(".contact-liquid");

liquidGroups.forEach((group) => {
  const buttons = Array.from(group.querySelectorAll(".contact-liquid__btn"));
  if (!buttons.length) return;

  const setActive = (target) => {
    buttons.forEach((button) => {
      const isTarget = button === target;

      button.classList.toggle("is-active", isTarget);
      button.classList.toggle("is-idle", !isTarget);

      if (isTarget) {
        button.classList.add("is-switching");
        window.setTimeout(() => {
          button.classList.remove("is-switching");
        }, 900);
      }
    });
  };

  buttons.forEach((button) => {
    button.classList.add("is-idle");

    button.addEventListener("mouseenter", () => setActive(button));
    button.addEventListener("focus", () => setActive(button));
  });

  const initialActive = group.querySelector(".contact-liquid__btn.is-active") || buttons[0];
  setActive(initialActive);
});
