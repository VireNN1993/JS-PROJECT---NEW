// Handles navigation system including mobile menu and theme switching
import { toggleDarkMode } from "./themeManager.js";

export class Navigation {
  constructor() {
    // Get navigation elements
    this.mobileNav = document.getElementById("mobile-nav");
    this.mobileMenuBtn = document.getElementById("mobile-menu-btn");
    this.desktopThemeBtn = document.getElementById("theme-toggle");
    this.mobileThemeBtn = document.getElementById("mobile-theme-toggle");
    this.navbar = document.getElementById("navbar");
    this.isMenuOpen = false;

    // Initialize navigation
    this.initializeHamburgerMenu();
    this.setupEventListeners();
    this.setupScrollBehavior();
  }

  initializeHamburgerMenu() {
    const hamburgerIcon = this.mobileMenuBtn?.querySelector("svg");
    if (hamburgerIcon) {
      const isDark = document.body.classList.contains("dark-mode");
      this.updateHamburgerStyle(isDark);

      hamburgerIcon.classList.add("w-6", "h-6", "block");
      this.mobileMenuBtn.classList.add("md:hidden", "p-2", "rounded-lg");
    }
  }

  updateHamburgerStyle(isDark) {
    const hamburgerIcon = this.mobileMenuBtn?.querySelector("svg");
    if (hamburgerIcon && this.mobileMenuBtn) {
      // Reset styles
      hamburgerIcon.style = "";
      this.mobileMenuBtn.style = "";
      this.mobileMenuBtn.className = "md:hidden p-2 rounded-lg";

      // Apply theme styles
      hamburgerIcon.style.stroke = isDark ? "#FFFFFF" : "#1F2937";
      hamburgerIcon.style.strokeWidth = "2";
      hamburgerIcon.style.opacity = "1";
    }
  }

  setupEventListeners() {
    // Mobile menu toggle
    if (this.mobileMenuBtn) {
      this.mobileMenuBtn.addEventListener("click", () =>
        this.toggleMobileMenu()
      );
    }

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      const isDark = document.body.classList.contains("dark-mode");
      this.updateHamburgerStyle(isDark);
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Theme buttons
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

  setupScrollBehavior() {
    window.addEventListener("scroll", () => {
      if (this.navbar) {
        const shouldAddBlur = window.scrollY > 50;
        this.navbar.classList.toggle("bg-opacity-95", shouldAddBlur);
        this.navbar.classList.toggle("backdrop-blur", shouldAddBlur);
      }
    });
  }

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

  closeMobileMenu() {
    this.isMenuOpen = false;
    if (this.mobileNav) {
      this.mobileNav.style.transform = "translateY(100%)";
      const isDark = document.body.classList.contains("dark-mode");
      this.updateHamburgerStyle(isDark);
    }
  }
}
