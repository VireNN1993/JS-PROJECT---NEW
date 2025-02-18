/**
 * projectManager.js - Project Gallery Management
 * Full Stack Portfolio Project
 * Author: Natan Blochin
 */

import { projects } from "./projectsData.js";

export class ProjectManager {
  constructor() {
    // Initialize GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Bind methods
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Add window resize handler
    window.addEventListener("resize", this.handleWindowResize);
  }

  handleWindowResize() {
    // Refresh ScrollTrigger on window resize
    ScrollTrigger.refresh();
  }

  /**
   * Creates an interactive project card with animation and hover effects
   * @param {Object} project - Project data object
   * @param {number} index - Project index for stagger animations
   * @returns {HTMLElement} Animated project card
   */
  createProjectCard(project, index) {
    const card = document.createElement("div");
    card.className =
      "project-card bg-gray-800 p-6 rounded-xl shadow-lg transform transition-all duration-500";
    card.setAttribute("data-project-id", project.id);

    // Card HTML structure
    card.innerHTML = `
            <div class="card-inner relative group overflow-hidden rounded-lg">
                <!-- Project Image Container -->
                <div class="image-container relative overflow-hidden rounded-lg">
                    <img 
                        src="${project.image}" 
                        alt="${project.title}" 
                        class="w-full h-48 object-cover transition duration-500"
                        onerror="this.src='Images/placeholder.png'"
                    >
                    <div class="overlay absolute inset-0 bg-black bg-opacity-50 opacity-0 
                                transition-opacity duration-300 flex items-center justify-center">
                        <div class="text-white text-center p-4 transform translate-y-4 transition-transform duration-300">
                            <h4 class="font-bold mb-2">View Details</h4>
                            <p class="text-sm">${project.technologies.join(
                              ", "
                            )}</p>
                        </div>
                    </div>
                </div>

                <!-- Project Content -->
                <div class="content-wrapper mt-4">
                    <h3 class="text-xl font-bold project-title">${
                      project.title
                    }</h3>
                    <p class="text-gray-400 mt-2 h-20 project-description">${
                      project.description
                    }</p>
                    
                    <!-- Project Tags -->
                    <div class="tags-container mt-4 flex flex-wrap gap-2">
                        ${project.tags
                          .map(
                            (tag) =>
                              `<span class="tag bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                                ${tag}
                            </span>`
                          )
                          .join("")}
                    </div>
                </div>
            </div>
        `;

    // Add hover animations
    this.addHoverEffects(card);

    // Add click handler for modal
    card.addEventListener("click", () => this.openProjectModal(project));

    // Initial entrance animation setup
    gsap.set(card, {
      opacity: 0,
      y: 50,
      rotation: 5,
    });

    return card;
  }

  /**
   * Adds hover animations to project card
   * @param {HTMLElement} card - Project card element
   */
  addHoverEffects(card) {
    // Get card elements
    const image = card.querySelector("img");
    const overlay = card.querySelector(".overlay");
    const overlayContent = card.querySelector(".overlay div");
    const tags = card.querySelectorAll(".tag");
    const title = card.querySelector(".project-title");

    // Create hover animation timeline
    const hoverTimeline = gsap.timeline({ paused: true });

    hoverTimeline
      .to(image, {
        scale: 1.1,
        duration: 0.5,
        ease: "power2.out",
      })
      .to(
        overlay,
        {
          opacity: 1,
          duration: 0.3,
        },
        0
      )
      .to(
        overlayContent,
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
        },
        0
      )
      .to(
        tags,
        {
          scale: 1.1,
          stagger: 0.1,
          duration: 0.3,
          ease: "back.out(1.7)",
        },
        0
      )
      .to(
        title,
        {
          color: "#60A5FA",
          duration: 0.3,
        },
        0
      )
      .to(
        card,
        {
          boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
          duration: 0.5,
        },
        0
      );

    // Add hover event listeners
    card.addEventListener("mouseenter", () => hoverTimeline.play());
    card.addEventListener("mouseleave", () => hoverTimeline.reverse());
  }

  /**
   * Opens project details modal
   * @param {Object} project - Project data
   */
  openProjectModal(project) {
    const modal = document.getElementById("projectModal");
    if (!modal) return;

    // Get modal elements
    const modalImage = modal.querySelector("#modalImage");
    const modalTitle = modal.querySelector("#modalTitle");
    const modalDescription = modal.querySelector("#modalDescription");
    const modalTechnologies = modal.querySelector("#modalTechnologies");
    const previewButton = modal.querySelector("#previewButton");
    const downloadButton = modal.querySelector("#downloadButton");

    // Update modal content
    modalImage.src = project.image;
    modalImage.alt = project.title;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;

    // Update technologies
    modalTechnologies.innerHTML = project.technologies
      .map(
        (tech) => `
                <span class="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                    ${tech}
                </span>
            `
      )
      .join("");

    // Update buttons
    previewButton.href = project.link;
    downloadButton.href = project.download;

    // Show modal with animation
    modal.style.display = "flex";
    setTimeout(() => modal.classList.add("show"), 10);

    // Lock body scroll
    document.body.style.overflow = "hidden";

    // Setup modal close handlers
    this.setupModalCloseHandlers(modal);
  }

  /**
   * Sets up modal close functionality
   * @param {HTMLElement} modal - Modal element
   */
  setupModalCloseHandlers(modal) {
    const closeButton = modal.querySelector(".close-button");

    const closeModal = () => {
      modal.classList.remove("show");
      setTimeout(() => {
        modal.style.display = "none";
        document.body.style.overflow = "";
      }, 300);
    };

    closeButton.onclick = closeModal;
    modal.onclick = (e) => {
      if (e.target === modal) closeModal();
    };

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("show")) {
        closeModal();
      }
    });
  }

  /**
   * Renders all project cards with animations
   */
  renderProjects() {
    const container = document.getElementById("projects-container");
    if (!container) return;

    // Clear container
    container.innerHTML = "";

    // Create and append cards
    projects.forEach((project, index) => {
      const card = this.createProjectCard(project, index);
      container.appendChild(card);

      // Entrance animation with ScrollTrigger
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        y: 0,
        rotation: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: "back.out(1.7)",
        onComplete: () => {
          // Reset transform after animation for proper hover effects
          gsap.set(card, { clearProps: "transform" });
        },
      });
    });
  }

  /**
   * Cleanup method
   */
  destroy() {
    window.removeEventListener("resize", this.handleWindowResize);
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }
}
