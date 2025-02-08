// Main Application Entry Point
document.addEventListener("DOMContentLoaded", () => {
  // Navigation
  try {
    const navigation = new Navigation();
  } catch (error) {
    console.error("Navigation initialization error:", error);
  }

  // Project Manager
  try {
    const projectManager = new ProjectManager();
    projectManager.renderProjects();
  } catch (error) {
    console.error("Project Manager initialization error:", error);
  }

  // Form Manager
  try {
    const formManager = new FormManager();
  } catch (error) {
    console.error("Form Manager initialization error:", error);
  }

  // Scroll Manager
  try {
    const scrollManager = new ScrollManager();
    scrollManager.setupBackToTop();
  } catch (error) {
    console.error("Scroll Manager initialization error:", error);
  }

  // Update Footer Year
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Setup Background Image
  const isGithubPages = window.location.hostname.includes("github.io");
  const backgroundPath = isGithubPages
    ? "/JS-PROJECT---NEW/Images/backGround.png"
    : "Images/backGround.png";

  const heroSection = document.querySelector(".hero-section");
  if (heroSection) {
    heroSection.style.backgroundImage = `url('${backgroundPath}')`;
  }

  // GSAP Animations (if GSAP is available)
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
});

// Import necessary modules
import { Navigation } from "./navigation.js";
import { ProjectManager } from "./projectManager.js";
import { FormManager } from "./formManager.js";
import { ScrollManager } from "./scrollManager.js";
