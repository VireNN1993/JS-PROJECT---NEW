/**
 * navigation.js - Navigation System Manager
 * Full Stack Portfolio Project
 * Author: Natan Blochin
 *
 * Manages site navigation including:
 * - Responsive navigation for desktop and mobile
 * - Theme toggling functionality
 * - Scroll behavior for navbar
 * - Mobile menu animations
 * Features:
 * - Responsive design
 * - Smooth transitions
 * - Theme switching
 * - Mobile-first approach
 */

import { toggleDarkMode } from "./themeManager.js";

export class Navigation {
  /**
   * Initialize navigation system and bind DOM elements
   */
  constructor() {
    // Initialize DOM elements
    this.mobileNav = document.getElementById("mobile-nav");
    this.mobileMenuBtn = document.getElementById("mobile-menu-btn");
    this.desktopThemeBtn = document.getElementById("theme-toggle");
    this.mobileThemeBtn = document.getElementById("mobile-theme-toggle");
    this.navbar = document.getElementById("navbar");
    this.isMenuOpen = false;

    // Setup navigation system
    this.initializeHamburgerMenu();
    this.setupEventListeners();
    this.setupScrollBehavior();
  }

  /**
   * Initialize hamburger menu icon and styles
   */
  initializeHamburgerMenu() {
    const hamburgerIcon = this.mobileMenuBtn?.querySelector("svg");
    if (hamburgerIcon) {
      const isDark = document.body.classList.contains("dark-mode");
      this.updateHamburgerStyle(isDark);

      hamburgerIcon.classList.add("w-6", "h-6", "block");
      this.mobileMenuBtn.classList.add("md:hidden", "p-2", "rounded-lg");
    }
  }

  /**
   * Update hamburger menu styles based on theme
   * @param {boolean} isDark - Current theme state
   */
  updateHamburgerStyle(isDark) {
    const hamburgerIcon = this.mobileMenuBtn?.querySelector("svg");
    if (hamburgerIcon && this.mobileMenuBtn) {
      // Reset existing styles
      hamburgerIcon.style = "";
      this.mobileMenuBtn.style = "";
      this.mobileMenuBtn.className = "md:hidden p-2 rounded-lg";

      // Apply theme-specific styles
      hamburgerIcon.style.stroke = isDark ? "#FFFFFF" : "#1F2937";
      hamburgerIcon.style.strokeWidth = "2";
      hamburgerIcon.style.opacity = "1";
    }
  }

  /**
   * Setup all navigation event listeners
   */
  setupEventListeners() {
    // Mobile menu toggle
    if (this.mobileMenuBtn) {
      this.mobileMenuBtn.addEventListener("click", () =>
        this.toggleMobileMenu()
      );
    }

    // Theme change observer
    const observer = new MutationObserver(() => {
      const isDark = document.body.classList.contains("dark-mode");
      this.updateHamburgerStyle(isDark);
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Theme toggle buttons
    [this.desktopThemeBtn, this.mobileThemeBtn].forEach((btn) => {
      if (btn) {
        btn.addEventListener("click", () => {
          toggleDarkMode();
          this.closeMobileMenu();
          const isDark = document.body.classList.contains("dark-mode");
          this.updateHamburgerStyle(isDark);
        });
      }
    });

    // Mobile navigation links
    if (this.mobileNav) {
      this.mobileNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => this.closeMobileMenu());
      });
    }
  }

  /**
   * Setup navbar scroll behavior
   * Adds blur effect and opacity changes on scroll
   */
  setupScrollBehavior() {
    window.addEventListener("scroll", () => {
      if (this.navbar) {
        const shouldAddBlur = window.scrollY > 50;
        this.navbar.classList.toggle("bg-opacity-95", shouldAddBlur);
        this.navbar.classList.toggle("backdrop-blur", shouldAddBlur);
      }
    });
  }

  /**
   * Toggle mobile menu state with animation
   */
  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.mobileNav) {
      this.mobileNav.style.transform = this.isMenuOpen
        ? "translateY(0)"
        : "translateY(100%)";

      const isDark = document.body.classList.contains("dark-mode");
      this.updateHamburgerStyle(isDark);
    }
  }

  /**
   * Close mobile menu and reset state
   */
  closeMobileMenu() {
    this.isMenuOpen = false;
    if (this.mobileNav) {
      this.mobileNav.style.transform = "translateY(100%)";
      const isDark = document.body.classList.contains("dark-mode");
      this.updateHamburgerStyle(isDark);
    }
  }
}
