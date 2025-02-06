// scrollManager.js
export class ScrollManager {
  constructor() {
    this.setupScrollListener();
    this.setupBackToTop();
  }

  setupScrollListener() {
    window.addEventListener("scroll", () => {
      this.handleScroll(window.scrollY);
    });
  }

  handleScroll(scrollY) {
    const backToTop = document.getElementById("backToTop");

    if (backToTop) {
      if (scrollY > 300) {
        backToTop.classList.remove("opacity-0", "scale-0");
        backToTop.classList.add("opacity-100", "scale-100");
      } else {
        backToTop.classList.add("opacity-0", "scale-0");
        backToTop.classList.remove("opacity-100", "scale-100");
      }
    }
  }

  setupBackToTop() {
    const backToTop = document.getElementById("backToTop");
    if (backToTop) {
      backToTop.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    }
  }
}
