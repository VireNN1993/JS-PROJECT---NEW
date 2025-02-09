/**
 * formManager.js - Contact Form Management
 * Full Stack Portfolio Project
 * Author: Natan Blochin
 *
 * Manages contact form functionality including:
 * - Form validation
 * - Real-time input formatting
 * - User feedback
 * - Error handling
 *
 * Technologies used:
 * - JavaScript ES6+
 * - DOM Events
 * - Regular Expressions
 * - Form Validation
 */

import { NOTIFICATION_DURATION } from "./constants.js";

export class FormManager {
  /**
   * Initialize form manager and bind DOM elements
   * Sets up event handlers when DOM is ready
   */
  constructor() {
    document.addEventListener("DOMContentLoaded", () => {
      this.form = document.querySelector("form");
      if (!this.form) return;
      this.initializeForm();
    });
  }

  /**
   * Set up form elements and event listeners
   * Initializes validation and input formatting
   */
  initializeForm() {
    // Bind form elements
    this.nameInput = this.form.querySelector('input[type="text"]');
    this.emailInput = this.form.querySelector('input[type="email"]');
    this.phoneInput = this.form.querySelector('input[type="tel"]');
    this.messageInput = this.form.querySelector("textarea");
    this.submitButton = this.form.querySelector('button[type="submit"]');

    // Set up event listeners
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
    if (this.phoneInput) {
      this.phoneInput.addEventListener("input", (e) =>
        this.formatPhoneNumber(e)
      );
    }
  }

  /**
   * Handle phone number input formatting
   * Supports multiple phone number formats
   * @param {Event} e - Input event
   */
  formatPhoneNumber(e) {
    let value = e.target.value;
    value = value.replace(/[^\d+]/g, "");

    if (value.includes("+")) {
      value = "+" + value.replace(/\+/g, "");
    }

    e.target.value = value.slice(0, value.startsWith("+") ? 16 : 15);
  }

  /**
   * Validate email format using regex
   * @param {string} email - Email to validate
   * @returns {boolean} Validation result
   */
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate phone number format
   * Supports international and local formats
   * @param {string} phone - Phone number to validate
   * @returns {boolean} Validation result
   */
  validatePhone(phone) {
    const phoneClean = phone.replace(/\s+/g, "");
    if (!phoneClean) return false;

    if (phoneClean.startsWith("+")) {
      return /^\+\d{7,15}$/.test(phoneClean);
    }
    return /^\d{7,15}$/.test(phoneClean);
  }

  /**
   * Display notification message to user
   * @param {string} message - Message to display
   * @param {string} type - Message type (success/error)
   */
  showNotification(message, type = "error") {
    // Remove existing notifications
    document
      .querySelectorAll(".notification-message")
      .forEach((n) => n.remove());

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

    // Show and auto-remove notification
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.classList.add("opacity-0");
      setTimeout(() => notification.remove(), 300);
    }, NOTIFICATION_DURATION);
  }

  /**
   * Validate all form fields
   * @returns {boolean} Overall form validity
   */
  validateForm() {
    let isValid = true;
    const errors = [];

    // Validate each field
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

    // Show first error if validation fails
    if (!isValid) {
      this.showNotification(errors[0], "error");
    }

    return isValid;
  }

  /**
   * Handle form submission
   * Prevents default submission and validates input
   * @param {Event} e - Submit event
   */
  handleSubmit(e) {
    e.preventDefault();

    if (this.validateForm()) {
      // Form is valid - show success message
      this.showNotification("Message sent successfully!", "success");
      this.form.reset();
    }
  }
}

// Initialize form manager
new FormManager();
