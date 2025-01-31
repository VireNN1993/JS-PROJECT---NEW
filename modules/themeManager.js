export function toggleDarkMode() {
  const body = document.body;
  const isDark = body.classList.contains("dark-mode");

  body.classList.toggle("dark-mode");
  body.classList.toggle("light-mode");

  document.querySelectorAll(".section").forEach((section) => {
    section.classList.toggle("bg-gray-100", isDark);
    section.classList.toggle("bg-gray-800", !isDark);
  });

  document.querySelectorAll(".project-card").forEach((card) => {
    card.classList.toggle("bg-white", isDark);
    card.classList.toggle("bg-gray-800", !isDark);
  });

  document.getElementById("mode-toggle").textContent = isDark
    ? "🌙 Dark Mode"
    : "☀️ Light Mode";
}
