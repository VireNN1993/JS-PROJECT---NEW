// Manages scroll behavior and back-to-top button functionality
export class ScrollManager {
  constructor() {
    this.scrollThreshold = 300; // Show button after 300px scroll
    this.backToTopButton = document.getElementById("backToTop");

    this.setupScrollListener();
    this.setupBackToTop();
  }

  setupScrollListener() {
    let ticking = false;

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.handleScroll(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  handleScroll(scrollY) {
    if (!this.backToTopButton) return;

    if (scrollY > this.scrollThreshold) {
      this.showBackToTopButton();
    } else {
      this.hideBackToTopButton();
    }
  }

  showBackToTopButton() {
    this.backToTopButton.classList.remove("opacity-0", "scale-0");
    this.backToTopButton.classList.add("opacity-100", "scale-100");
  }

  hideBackToTopButton() {
    this.backToTopButton.classList.add("opacity-0", "scale-0");
    this.backToTopButton.classList.remove("opacity-100", "scale-100");
  }

  setupBackToTop() {
    if (!this.backToTopButton) {
      console.warn("Back to top button not found");
      return;
    }

    this.backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}
