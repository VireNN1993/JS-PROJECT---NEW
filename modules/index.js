// index.js
import { Navigation } from "./navigation.js";
import { ProjectManager } from "./projectManager.js";
import { FormManager } from "./formManager.js";
import { ScrollManager } from "./scrollManager.js";
import { ANIMATION_DEFAULTS } from "./constants.js";

class PortfolioApp {
  constructor() {
    this.projectManager = new ProjectManager();
    this.formManager = new FormManager();
    this.scrollManager = new ScrollManager();
    this.navigation = new Navigation();
    this.initializeApp();
  }

  initializeApp() {
    if (window.gsap) {
      gsap.registerPlugin(ScrollTrigger);
      this.initHeroAnimations();
    }
    this.projectManager.renderProjects();
    this.formManager.setupContactForm();
    this.scrollManager.setupBackToTop();
    this.updateFooterYear();
  }

  initHeroAnimations() {
    const elements = {
      title: document.getElementById("hero-title"),
      subtitle: document.getElementById("hero-subtitle"),
      button: document.getElementById("hero-button"),
    };

    if (elements.title && elements.subtitle && elements.button) {
      const timeline = gsap.timeline({ defaults: ANIMATION_DEFAULTS });
      timeline
        .fromTo(
          elements.title,
          { opacity: 0, y: -50 },
          { opacity: 1, y: 0, duration: 1 }
        )
        .fromTo(
          elements.subtitle,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 0.8 }
        )
        .fromTo(elements.button, { opacity: 0 }, { opacity: 1, duration: 0.5 });
    }
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
