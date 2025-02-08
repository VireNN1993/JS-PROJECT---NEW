// formManager.js
import { NOTIFICATION_DURATION } from "./constants.js";

/**
 * FormManager class - Handles contact form operations
 */
export class FormManager {
  constructor() {
    document.addEventListener("DOMContentLoaded", () => {
      this.form = document.querySelector("form");
      if (!this.form) return;

      this.initializeForm();
    });
  }

  /**
   * Initialize form elements and event listeners
   */
  initializeForm() {
    // Get form elements
    this.nameInput = this.form.querySelector('input[type="text"]');
    this.emailInput = this.form.querySelector('input[type="email"]');
    this.phoneInput = this.form.querySelector('input[type="tel"]');
    this.messageInput = this.form.querySelector("textarea");
    this.submitButton = this.form.querySelector('button[type="submit"]');

    // Add form submission handler
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));

    // Add phone number formatter
    if (this.phoneInput) {
      this.phoneInput.addEventListener("input", (e) =>
        this.formatPhoneNumber(e)
      );
    }
  }

  /**
   * Format phone number as user types
   */
  formatPhoneNumber(e) {
    let value = e.target.value;

    // Allow only numbers and + at the start
    value = value.replace(/[^\d+]/g, "");

    // Ensure + only appears at the start
    if (value.includes("+")) {
      value = "+" + value.replace(/\+/g, "");
    }

    // Limit length to 15 digits (standard E.164 format)
    if (value.startsWith("+")) {
      value = value.slice(0, 16); // +15 digits
    } else {
      value = value.slice(0, 15); // 15 digits
    }

    e.target.value = value;
  }

  /**
   * Validate email format
   */
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate phone number format
   * Accepts:
   * - Local numbers (7-15 digits)
   * - International numbers with + prefix
   */
  validatePhone(phone) {
    const phoneClean = phone.replace(/\s+/g, "");

    // Check if empty
    if (!phoneClean) return false;

    // If starts with +, check for international format
    if (phoneClean.startsWith("+")) {
      return /^\+\d{7,15}$/.test(phoneClean);
    }

    // Otherwise check for regular format (7-15 digits)
    return /^\d{7,15}$/.test(phoneClean);
  }

  /**
   * Show notification message
   */
  showNotification(message, type = "error") {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll(
      ".notification-message"
    );
    existingNotifications.forEach((n) => n.remove());

    // Create notification element
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

    // Add to document
    document.body.appendChild(notification);

    // Remove after delay
    setTimeout(() => {
      notification.classList.add("opacity-0");
      setTimeout(() => notification.remove(), 300);
    }, NOTIFICATION_DURATION);
  }

  /**
   * Validate all form fields
   */
  validateForm() {
    let isValid = true;
    const errors = [];

    // Validate name
    if (!this.nameInput.value.trim()) {
      errors.push("Please enter your name");
      isValid = false;
    }

    // Validate email
    if (!this.validateEmail(this.emailInput.value)) {
      errors.push("Please enter a valid email address");
      isValid = false;
    }

    // Validate phone
    if (!this.validatePhone(this.phoneInput.value)) {
      errors.push("Please enter a valid phone number (7-15 digits)");
      isValid = false;
    }

    // Validate message
    if (!this.messageInput.value.trim()) {
      errors.push("Please enter a message");
      isValid = false;
    }

    if (!isValid) {
      this.showNotification(errors[0], "error");
    }

    return isValid;
  }

  /**
   * Handle form submission
   */
  handleSubmit(e) {
    e.preventDefault();

    if (this.validateForm()) {
      // Here you would typically send the data to a server
      this.showNotification("Message sent successfully!", "success");
      this.form.reset();
    }
  }
}

// Initialize form manager
new FormManager();
