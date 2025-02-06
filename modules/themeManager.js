// themeManager.js

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

function updateTextColors(isDark) {
  // עדכון טקסטים רגילים
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

  // עדכון כותרות
  document.querySelectorAll("h2, h3").forEach((el) => {
    el.style.color = isDark ? "#111827" : "#FFFFFF";
  });

  // עדכון education section
  document.querySelectorAll(".education-text").forEach((el) => {
    el.style.color = isDark ? "#4B5563" : "#FFFFFF";
  });

  // עדכון האייקונים החברתיים
  document.querySelectorAll(".social-icons a").forEach((el) => {
    el.style.color = isDark ? "#4B5563" : "#D1D5DB";
  });
}

function updateThemeButtons(isDark) {
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.textContent = isDark ? "🌙 Dark Mode" : "☀️ Light Mode";
    themeToggle.className = `px-4 py-2 rounded-lg transition ${
      isDark ? "bg-gray-800 text-white" : "bg-blue-500 text-white"
    }`;
  }

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
