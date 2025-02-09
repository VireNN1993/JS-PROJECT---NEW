/**
 * themeManager.js - Theme Management System
 * Full Stack Portfolio Project
 * Author: Natan Blochin
 *
 * Manages theme switching and UI updates across the application
 */

export function toggleDarkMode() {
  const body = document.body;
  const isDark = body.classList.contains("dark-mode");

  body.classList.toggle("dark-mode");
  body.classList.toggle("light-mode");

  updateHamburgerMenu(isDark);
  updateMobileNav(isDark);
  updateNavbar(isDark);
  updateSections(isDark);
  updateTextColors(isDark);
  updateThemeButtons(isDark);
}

/**
 * Update hamburger menu appearance based on theme
 * @param {boolean} isDark - Current theme state
 */
function updateHamburgerMenu(isDark) {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  if (!mobileMenuBtn) return;

  const hamburgerIcon = mobileMenuBtn.querySelector("svg");
  if (hamburgerIcon) {
    hamburgerIcon.style.stroke = !isDark ? "#FFFFFF" : "#1F2937";
    hamburgerIcon.style.strokeWidth = "2";
    hamburgerIcon.style.opacity = "1";

    mobileMenuBtn.classList.toggle("text-white", !isDark);
    mobileMenuBtn.classList.toggle("text-gray-900", isDark);
  }
}

/**
 * Update mobile navigation styling
 * @param {boolean} isDark - Current theme state
 */
function updateMobileNav(isDark) {
  const mobileNav = document.getElementById("mobile-nav");
  if (!mobileNav) return;

  mobileNav.classList.toggle("bg-gray-800", !isDark);
  mobileNav.classList.toggle("bg-white", isDark);

  mobileNav.querySelectorAll("a, button, svg").forEach((el) => {
    el.classList.toggle("text-white", !isDark);
    el.classList.toggle("text-gray-900", isDark);
  });
}

/**
 * Update main navigation bar styling
 * @param {boolean} isDark - Current theme state
 */
function updateNavbar(isDark) {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  navbar.classList.toggle("bg-gray-800", !isDark);
  navbar.classList.toggle("bg-white", isDark);
  navbar.classList.toggle("bg-opacity-90", true);

  navbar.querySelectorAll("a").forEach((link) => {
    link.classList.toggle("text-white", !isDark);
    link.classList.toggle("text-gray-900", isDark);
  });
}

/**
 * Update section backgrounds and colors
 * @param {boolean} isDark - Current theme state
 */
function updateSections(isDark) {
  document.querySelectorAll(".section").forEach((section) => {
    const isProjects = section.id === "projects";

    if (isDark) {
      section.classList.remove("bg-gray-800", "bg-gray-900");
      section.classList.add("bg-gray-50");
      section.style.color = "#1F2937";
    } else {
      section.classList.remove("bg-gray-50");
      section.classList.add(isProjects ? "bg-gray-900" : "bg-gray-800");
      section.style.color = "#FFFFFF";
    }
  });
}

/**
 * Update text colors throughout the site
 * @param {boolean} isDark - Current theme state
 */
function updateTextColors(isDark) {
  // Update regular text elements
  document
    .querySelectorAll("p, .text-gray-300, .text-gray-400")
    .forEach((el) => {
      if (isDark) {
        el.style.color = "#4B5563";
        el.classList.remove("text-gray-300", "text-gray-400");
        el.classList.add("text-gray-600");
      } else {
        el.style.color = "#D1D5DB";
        el.classList.remove("text-gray-600");
        el.classList.add("text-gray-300");
      }
    });

  // Update headings
  document.querySelectorAll("h2, h3").forEach((el) => {
    el.style.color = isDark ? "#111827" : "#FFFFFF";
  });

  // Update education section text
  document.querySelectorAll(".education-text").forEach((el) => {
    el.style.color = isDark ? "#4B5563" : "#FFFFFF";
  });

  // Update social media icons
  document.querySelectorAll(".social-icons a").forEach((el) => {
    el.style.color = isDark ? "#4B5563" : "#D1D5DB";
  });
}

/**
 * Update theme toggle buttons appearance
 * @param {boolean} isDark - Current theme state
 */
function updateThemeButtons(isDark) {
  // Update desktop theme button
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.textContent = isDark ? "🌙 Dark Mode" : "☀️ Light Mode";
    themeToggle.className = `px-4 py-2 rounded-lg transition ${
      isDark ? "bg-gray-800 text-white" : "bg-blue-500 text-white"
    }`;
  }

  // Update mobile theme button
  const mobileThemeToggle = document.getElementById("mobile-theme-toggle");
  if (mobileThemeToggle) {
    const icon = mobileThemeToggle.querySelector("svg");
    if (icon) {
      icon.style.stroke = isDark ? "#1F2937" : "#FFFFFF";
      icon.style.strokeWidth = "2";
      icon.classList.toggle("text-gray-900", isDark);
      icon.classList.toggle("text-white", !isDark);
    }
  }
}
