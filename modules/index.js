import { ProjectManager } from "./projectManager.js";
import { FormManager } from "./formManager.js";
import { ScrollManager } from "./scrollManager.js";
import { toggleDarkMode } from "./themeManager.js";
import { ANIMATION_DEFAULTS } from "./constants.js";

class PortfolioApp {
  constructor() {
    this.projectManager = new ProjectManager();
    this.formManager = new FormManager();
    this.scrollManager = new ScrollManager();
    this.initializeApp();
    this.setupEventListeners();
  }

  initializeApp() {
    gsap.registerPlugin(ScrollTrigger);
    this.initHeroAnimations();
    this.projectManager.renderProjects();
    this.formManager.setupContactForm();
    this.scrollManager.setupBackToTop();
    this.updateFooterYear();
  }

  setupEventListeners() {
    window.addEventListener("scroll", () => {
      this.scrollManager.handleScroll(window.scrollY);
    });

    const modeToggle = document.getElementById("mode-toggle");
    modeToggle.removeAttribute("onclick");
    modeToggle.addEventListener("click", toggleDarkMode);
  }

  initHeroAnimations() {
    const timeline = gsap.timeline({ defaults: ANIMATION_DEFAULTS });

    timeline
      .fromTo(
        "#hero-title",
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1 }
      )
      .fromTo(
        "#hero-subtitle",
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
      .fromTo("#hero-button", { opacity: 0 }, { opacity: 1, duration: 0.5 });
  }

  updateFooterYear() {
    const yearElement = document.getElementById("year");
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }
}

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  new PortfolioApp();
});
