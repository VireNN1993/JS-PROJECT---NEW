import { Navigation } from "./navigation.js";
import { ProjectManager } from "./projectManager.js";
import { FormManager } from "./formManager.js";
import { ScrollManager } from "./scrollManager.js";

// Main initialization function
document.addEventListener("DOMContentLoaded", () => {
  if (window.gsap) {
    if (window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }
    if (window.ScrollToPlugin) {
      gsap.registerPlugin(ScrollToPlugin);
    }
  }

  initializeCore();
  initializeAnimations();
  updateFooterYear();
});

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

function initializeAnimations() {
  if (window.gsap) {
    const heroTitle = document.getElementById("hero-title");
    const heroSubtitle = document.getElementById("hero-subtitle");
    const heroButton = document.getElementById("hero-button");

    if (heroTitle && heroSubtitle && heroButton) {
      // Reset initial opacity
      gsap.set([heroTitle, heroSubtitle, heroButton], {
        opacity: 0,
        y: 30,
      });

      // Create timeline for hero animations
      const tl = gsap.timeline({
        defaults: {
          duration: 1,
          ease: "power3.out",
        },
      });

      // Add animations to timeline
      tl.to(heroTitle, {
        opacity: 1,
        y: 0,
        delay: 0.5,
      })
        .to(
          heroSubtitle,
          {
            opacity: 1,
            y: 0,
          },
          "-=0.5"
        )
        .to(
          heroButton,
          {
            opacity: 1,
            y: 0,
          },
          "-=0.5"
        );

      // Setup smooth scroll for hero button
      heroButton.addEventListener("click", (e) => {
        e.preventDefault();
        const projectsSection = document.getElementById("projects");

        if (projectsSection) {
          gsap.to(window, {
            duration: 2.5,
            scrollTo: {
              y: projectsSection.offsetTop,
              autoKill: false,
            },
            ease: "power3.inOut",
          });
        }
      });
    }
  }
}

function updateFooterYear() {
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}
