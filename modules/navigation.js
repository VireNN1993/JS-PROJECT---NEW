import { toggleDarkMode } from "./themeManager.js";

export class Navigation {
  constructor() {
    this.mobileNav = document.getElementById("mobile-nav");
    this.mobileMenuBtn = document.getElementById("mobile-menu-btn");
    this.desktopThemeBtn = document.getElementById("theme-toggle");
    this.mobileThemeBtn = document.getElementById("mobile-theme-toggle");
    this.navbar = document.getElementById("navbar");
    this.isMenuOpen = false;

    this.initializeHamburgerColor();
    this.setupEventListeners();
    this.setupScrollBehavior();
    this.updateActiveLink();
  }

  initializeHamburgerColor() {
    const hamburgerIcon = this.mobileMenuBtn?.querySelector("svg");
    if (hamburgerIcon) {
      const isDark = document.body.classList.contains("dark-mode");
      hamburgerIcon.style.stroke = isDark ? "#FFFFFF" : "#1F2937";
      hamburgerIcon.style.strokeWidth = "2";
      hamburgerIcon.style.opacity = "1";

      // Add these classes to make sure the icon is visible
      hamburgerIcon.classList.add("w-6", "h-6", "block");
      this.mobileMenuBtn.classList.add(
        "md:hidden",
        "p-2",
        "rounded-lg",
        "hover:bg-gray-700"
      );
    }
  }

  updateHamburgerVisibility() {
    const hamburgerIcon = this.mobileMenuBtn?.querySelector("svg");
    if (hamburgerIcon) {
      const isDark = document.body.classList.contains("dark-mode");
      hamburgerIcon.style.stroke = isDark ? "#FFFFFF" : "#1F2937";
      hamburgerIcon.style.strokeWidth = "2";
      hamburgerIcon.style.opacity = "1";

      // Ensure visibility in both modes
      this.mobileMenuBtn.style.color = isDark ? "#FFFFFF" : "#1F2937";
      this.mobileMenuBtn.classList.toggle("text-white", isDark);
      this.mobileMenuBtn.classList.toggle("text-gray-900", !isDark);
    }
  }

  setupEventListeners() {
    if (this.mobileMenuBtn) {
      this.mobileMenuBtn.addEventListener("click", () =>
        this.toggleMobileMenu()
      );
      window.addEventListener("resize", () => this.updateHamburgerVisibility());
    }

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      this.updateHamburgerVisibility();
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    [this.desktopThemeBtn, this.mobileThemeBtn].forEach((btn) => {
      if (btn)
        btn.addEventListener("click", () => {
          toggleDarkMode();
          this.updateHamburgerVisibility();
        });
    });

    if (this.mobileNav) {
      this.mobileNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => this.closeMobileMenu());
      });
    }

    window.addEventListener("scroll", () => this.updateActiveLink());
  }

  updateHamburgerVisibility() {
    const hamburgerIcon = this.mobileMenuBtn?.querySelector("svg");
    if (hamburgerIcon) {
      const isDark = document.body.classList.contains("dark-mode");
      hamburgerIcon.style.stroke = isDark ? "#FFFFFF" : "#1F2937";
      hamburgerIcon.style.strokeWidth = "2";
      hamburgerIcon.style.opacity = "1";
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
      document.body.style.paddingBottom = this.isMenuOpen ? "80px" : "0";
    }
  }

  closeMobileMenu() {
    this.isMenuOpen = false;
    if (this.mobileNav) {
      this.mobileNav.style.transform = "translateY(100%)";
      document.body.style.paddingBottom = "0";
    }
  }

  updateActiveLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const links = document.querySelectorAll(`a[href="#${sectionId}"]`);

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        links.forEach((link) => link.classList.add("text-blue-400"));
      } else {
        links.forEach((link) => link.classList.remove("text-blue-400"));
      }
    });
  }
}
