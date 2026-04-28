const cube = document.querySelector(".cube");

if (cube) {
  window.addEventListener("scroll", () => {
    const scroll = window.scrollY;
    cube.style.transform = `
      rotateX(${scroll * 0.1}deg)
      rotateY(${scroll * 0.15}deg)
    `;
  });
}