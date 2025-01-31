import { NOTIFICATION_DURATION } from "./constants.js";

export class FormManager {
  setupContactForm() {
    const form = document.querySelector("form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.validateForm(form)) {
        this.showNotification("Message sent successfully!", "success");
        form.reset();
      } else {
        this.showNotification("Please fill all fields", "error");
      }
    });
  }

  validateForm(form) {
    return Array.from(form.querySelectorAll("input, textarea")).every(
      (input) => input.value.trim() !== ""
    );
  }

  showNotification(message, type) {
    const notification = document.createElement("div");
    notification.className = `
      fixed bottom-4 right-4 p-4 rounded-lg text-white transform transition-all duration-300
      ${type === "success" ? "bg-green-500" : "bg-red-500"}
    `;
    notification.textContent = message;

    document.body.appendChild(notification);
    setTimeout(() => {
      notification.classList.add("opacity-0");
      setTimeout(() => notification.remove(), 300);
    }, NOTIFICATION_DURATION);
  }
}
