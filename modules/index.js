/**
 * index.js - Main Application Entry Point
 * Full Stack Portfolio Project
 * Author: Natan Blochin
 */

import { Navigation } from "./navigation.js";
import { ProjectManager } from "./projectManager.js";
import { FormManager } from "./formManager.js";
import { ScrollManager } from "./scrollManager.js";

// Main initialization function
document.addEventListener("DOMContentLoaded", () => {
  initializeCore();
  setupBackgroundImage();
  initializeAnimations();
  setupSmoothScroll();
  updateFooterYear();
});

/**
 * Initialize core application features
 */
function initializeCore() {
  try {
    const navigation = new Navigation();
  } catch (error) {
    console.error("Navigation initialization error:", error);
  }

  try {
    const projectManager = new ProjectManager();
    projectManager.renderProjects();
  } catch (error) {
    console.error("Project Manager initialization error:", error);
  }

  try {
    const formManager = new FormManager();
  } catch (error) {
    console.error("Form Manager initialization error:", error);
  }

  try {
    const scrollManager = new ScrollManager();
    scrollManager.setupBackToTop();
  } catch (error) {
    console.error("Scroll Manager initialization error:", error);
  }
}

/**
 * Setup smooth scroll for Explore Projects button
 */
function setupSmoothScroll() {
  const exploreButton = document.getElementById("hero-button");

  if (exploreButton) {
    exploreButton.addEventListener("click", (e) => {
      e.preventDefault();

      const projectsSection = document.getElementById("projects");

      if (projectsSection) {
        const startY = window.pageYOffset;
        const endY =
          projectsSection.getBoundingClientRect().top + window.pageYOffset;

        gsap.to(window, {
          duration: 2,
          scrollTo: {
            y: endY,
            autoKill: false,
          },
          ease: "power2.inOut",
        });
      }
    });
  }
}

/**
 * Setup dynamic background image path
 */
function setupBackgroundImage() {
  const isGithubPages = window.location.hostname.includes("github.io");
  const backgroundPath = isGithubPages
    ? "/JS-PROJECT---NEW/Images/background.png"
    : "Images/background.png";

  const heroSection = document.querySelector(".hero-section");
  if (heroSection) {
    heroSection.style.backgroundImage = `url('${backgroundPath}')`;
  }
}

/**
 * Initialize GSAP animations
 */
function initializeAnimations() {
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    const heroTitle = document.getElementById("hero-title");
    const heroSubtitle = document.getElementById("hero-subtitle");
    const heroButton = document.getElementById("hero-button");

    if (heroTitle && heroSubtitle && heroButton) {
      gsap
        .timeline()
        .fromTo(
          heroTitle,
          { opacity: 0, y: -50 },
          { opacity: 1, y: 0, duration: 1 }
        )
        .fromTo(
          heroSubtitle,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 0.8 }
        )
        .fromTo(heroButton, { opacity: 0 }, { opacity: 1, duration: 0.5 });
    }
  }
}

/**
 * Update footer year
 */
function updateFooterYear() {
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}
