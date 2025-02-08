/**
 * scrollManager.js - Scroll Behavior Management
 * Full Stack Portfolio Project
 * Author: Natan Blochin
 *
 * Manages scroll-related functionality including:
 * - Back to top button behavior
 * - Scroll event handling
 * - Smooth scrolling animations
 *
 * Features:
 * - Responsive scroll handling
 * - Dynamic button visibility
 * - Smooth scroll animations
 * - Performance-optimized event handling
 */

export class ScrollManager {
  /**
   * Initialize scroll management system
   */
  constructor() {
    this.scrollThreshold = 300; // Pixels from top to show button
    this.backToTopButton = document.getElementById("backToTop");

    this.setupScrollListener();
    this.setupBackToTop();
  }

  /**
   * Setup main scroll event listener
   * Uses throttling for performance optimization
   */
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

  /**
   * Handle scroll position changes
   * Controls back to top button visibility
   * @param {number} scrollY - Current scroll position
   */
  handleScroll(scrollY) {
    if (!this.backToTopButton) return;

    if (scrollY > this.scrollThreshold) {
      this.showBackToTopButton();
    } else {
      this.hideBackToTopButton();
    }
  }

  /**
   * Show back to top button with animation
   */
  showBackToTopButton() {
    this.backToTopButton.classList.remove("opacity-0", "scale-0");
    this.backToTopButton.classList.add("opacity-100", "scale-100");
  }

  /**
   * Hide back to top button with animation
   */
  hideBackToTopButton() {
    this.backToTopButton.classList.add("opacity-0", "scale-0");
    this.backToTopButton.classList.remove("opacity-100", "scale-100");
  }

  /**
   * Setup back to top button click handler
   * Implements smooth scrolling behavior
   */
  setupBackToTop() {
    if (!this.backToTopButton) {
      console.warn("Back to top button not found in DOM");
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
