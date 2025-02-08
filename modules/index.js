/**
 * index.js - Main Application Entry Point
 * Full Stack Portfolio Project
 * Author: Natan Blochin
 *
 * This module initializes and coordinates all core application features:
 * - Navigation system
 * - Project gallery management
 * - Contact form handling
 * - Scroll behavior
 * - Theme management
 * - GSAP animations
 */

// Import core modules
import { Navigation } from "./navigation.js";
import { ProjectManager } from "./projectManager.js";
import { FormManager } from "./formManager.js";
import { ScrollManager } from "./scrollManager.js";

// Main initialization function
document.addEventListener("DOMContentLoaded", () => {
  initializeCore();
  setupBackgroundImage();
  initializeAnimations();
  updateFooterYear();
});

/**
 * Initialize core application features
 * Each feature is wrapped in error handling to prevent cascading failures
 */
function initializeCore() {
  // Initialize Navigation
  try {
    const navigation = new Navigation();
  } catch (error) {
    console.error("Navigation initialization error:", error);
  }

  // Initialize Project Manager
  try {
    const projectManager = new ProjectManager();
    projectManager.renderProjects();
  } catch (error) {
    console.error("Project Manager initialization error:", error);
  }

  // Initialize Form Manager
  try {
    const formManager = new FormManager();
  } catch (error) {
    console.error("Form Manager initialization error:", error);
  }

  // Initialize Scroll Manager
  try {
    const scrollManager = new ScrollManager();
    scrollManager.setupBackToTop();
  } catch (error) {
    console.error("Scroll Manager initialization error:", error);
  }
}

/**
 * Setup dynamic background image path based on environment
 * Handles both local and GitHub Pages environments
 */
function setupBackgroundImage() {
  const isGithubPages = window.location.hostname.includes("github.io");
  const backgroundPath = isGithubPages
    ? "/JS-PROJECT---NEW/Images/backGround.png"
    : "Images/backGround.png";

  const heroSection = document.querySelector(".hero-section");
  if (heroSection) {
    heroSection.style.backgroundImage = `url('${backgroundPath}')`;
  }
}

/**
 * Initialize GSAP animations for hero section
 * Creates smooth entrance animations for title, subtitle, and button
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
 * Update footer year to current year
 */
function updateFooterYear() {
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}
