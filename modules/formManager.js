// Handles form validation, submission and notifications
import { NOTIFICATION_DURATION } from "./constants.js";

export class FormManager {
  constructor() {
    document.addEventListener("DOMContentLoaded", () => {
      this.form = document.querySelector("form");
      if (!this.form) return;
      this.initializeForm();
    });
  }

  initializeForm() {
    // Get form elements
    this.nameInput = this.form.querySelector('input[type="text"]');
    this.emailInput = this.form.querySelector('input[type="email"]');
    this.phoneInput = this.form.querySelector('input[type="tel"]');
    this.messageInput = this.form.querySelector("textarea");
    this.submitButton = this.form.querySelector('button[type="submit"]');

    // Add event listeners
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
    if (this.phoneInput) {
      this.phoneInput.addEventListener("input", (e) =>
        this.formatPhoneNumber(e)
      );
    }
  }

  formatPhoneNumber(e) {
    let value = e.target.value;
    value = value.replace(/[^\d+]/g, "");

    if (value.includes("+")) {
      value = "+" + value.replace(/\+/g, "");
    }

    e.target.value = value.slice(0, value.startsWith("+") ? 16 : 15);
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePhone(phone) {
    const phoneClean = phone.replace(/\s+/g, "");
    if (!phoneClean) return false;

    if (phoneClean.startsWith("+")) {
      return /^\+\d{7,15}$/.test(phoneClean);
    }
    return /^\d{7,15}$/.test(phoneClean);
  }

  showNotification(message, type = "error") {
    // Remove any existing notifications
    document
      .querySelectorAll(".notification-message")
      .forEach((n) => n.remove());

    // Create new notification
    const notification = document.createElement("div");
    notification.className = `
            notification-message
            fixed bottom-4 right-4
            p-4 rounded-lg
            ${type === "success" ? "bg-green-500" : "bg-red-500"}
            text-white
            z-50
            transform transition-all duration-300
        `;
    notification.textContent = message;

    // Add and remove notification after delay
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.classList.add("opacity-0");
      setTimeout(() => notification.remove(), 300);
    }, NOTIFICATION_DURATION);
  }

  validateForm() {
    let isValid = true;
    const errors = [];

    // Check all fields
    if (!this.nameInput.value.trim()) {
      errors.push("Please enter your name");
      isValid = false;
    }

    if (!this.validateEmail(this.emailInput.value)) {
      errors.push("Please enter a valid email address");
      isValid = false;
    }

    if (!this.validatePhone(this.phoneInput.value)) {
      errors.push("Please enter a valid phone number");
      isValid = false;
    }

    if (!this.messageInput.value.trim()) {
      errors.push("Please enter a message");
      isValid = false;
    }

    // Show first error if any
    if (!isValid) {
      this.showNotification(errors[0], "error");
    }

    return isValid;
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.validateForm()) {
      this.showNotification("Message sent successfully!", "success");
      this.form.reset();
    }
  }
}

// Start form manager
new FormManager();
