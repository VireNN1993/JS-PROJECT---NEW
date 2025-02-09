/**
 * constants.js - Application Constants
 * Full Stack Portfolio Project
 * Author: Natan Blochin
 *
 * Global configuration values and constants used across the application.
 * This module centralizes all magic numbers and configuration values
 * for easier maintenance and consistency.
 */

/**
 * Default animation settings for GSAP animations
 * @type {Object}
 */
export const ANIMATION_DEFAULTS = {
  ease: "power3.out",
};

/**
 * Scroll distance in pixels before triggering scroll-based effects
 * Used for navbar transparency and back-to-top button visibility
 * @type {number}
 */
export const SCROLL_THRESHOLD = 50;

/**
 * Duration in milliseconds for notification messages
 * Applied to success/error notifications in form submissions
 * @type {number}
 */
export const NOTIFICATION_DURATION = 3000; // 3 seconds
