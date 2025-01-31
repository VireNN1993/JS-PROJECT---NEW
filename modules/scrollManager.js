import { SCROLL_THRESHOLD } from "./constants.js";

export class ScrollManager {
  handleScroll(scrollY) {
    const navbar = document.getElementById("navbar");
    const backToTop = document.getElementById("backToTop");

    navbar.classList.toggle("bg-black", scrollY > SCROLL_THRESHOLD);
    navbar.classList.toggle("shadow-lg", scrollY > SCROLL_THRESHOLD);

    if (scrollY > 300) {
      backToTop.classList.remove("opacity-0", "scale-0");
      backToTop.classList.add("opacity-100", "scale-100");
    } else {
      backToTop.classList.add("opacity-0", "scale-0");
      backToTop.classList.remove("opacity-100", "scale-100");
    }
  }

  setupBackToTop() {
    const backToTop = document.getElementById("backToTop");
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}
