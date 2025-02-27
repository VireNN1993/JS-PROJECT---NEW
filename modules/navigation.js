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
    this.setupSmoothScrolling();
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

    // Mobile navigation links - Only handle closing the menu here
    // Smooth scrolling is handled in setupSmoothScrolling
    if (this.mobileNav) {
      this.mobileNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", (e) => {
          // We'll handle smooth scrolling separately
          // Just close the mobile menu
          setTimeout(() => this.closeMobileMenu(), 300);
        });
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

  setupSmoothScrolling() {
    if (window.gsap && window.ScrollToPlugin) {
      // Get all links in both desktop and mobile navigation
      const allNavLinks = document.querySelectorAll("nav a, #mobile-nav a");

      allNavLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
          const targetId = link.getAttribute("href");

          // For home links or brand/logo links
          if (targetId === "#" || targetId === "") {
            e.preventDefault();

            // Scroll to top for home links
            gsap.to(window, {
              duration: 2,
              scrollTo: {
                y: 0,
                autoKill: false,
              },
              ease: "power3.inOut",
            });
          }
          // For section links
          else if (targetId.startsWith("#")) {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
              e.preventDefault();

              // Small delay to allow mobile menu to start closing if needed
              setTimeout(() => {
                // Smooth scroll to the target section
                gsap.to(window, {
                  duration: 2,
                  scrollTo: {
                    y: targetSection.offsetTop,
                    autoKill: false,
                  },
                  ease: "power3.inOut",
                });
              }, 100);
            }
          }
        });
      });
    }
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
