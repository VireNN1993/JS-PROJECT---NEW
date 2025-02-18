// Manages project gallery, cards and their animations
import { projects } from "./projectsData.js";

export class ProjectManager {
  constructor() {
    gsap.registerPlugin(ScrollTrigger);
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.setupEventListeners();
  }

  setupEventListeners() {
    window.addEventListener("resize", this.handleWindowResize);
  }

  handleWindowResize() {
    ScrollTrigger.refresh();
  }

  createProjectCard(project, index) {
    const card = document.createElement("div");
    card.className =
      "project-card bg-gray-800 p-6 rounded-xl shadow-lg transform transition-all duration-500";
    card.setAttribute("data-project-id", project.id);

    card.innerHTML = `
            <div class="card-inner relative group overflow-hidden rounded-lg">
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

                <div class="content-wrapper mt-4">
                    <h3 class="text-xl font-bold project-title">${
                      project.title
                    }</h3>
                    <p class="text-gray-400 mt-2 h-20 project-description">${
                      project.description
                    }</p>
                    
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

    // Add animations and interactivity
    this.addHoverEffects(card);
    card.addEventListener("click", () => this.openProjectModal(project));

    // Set initial animation state
    gsap.set(card, {
      opacity: 0,
      y: 50,
      rotation: 5,
    });

    return card;
  }

  addHoverEffects(card) {
    // Get elements for animation
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
      );

    // Add hover listeners
    card.addEventListener("mouseenter", () => hoverTimeline.play());
    card.addEventListener("mouseleave", () => hoverTimeline.reverse());
  }

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

    // Add technology tags
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

    // Show modal
    modal.style.display = "flex";
    setTimeout(() => modal.classList.add("show"), 10);
    document.body.style.overflow = "hidden";

    this.setupModalCloseHandlers(modal);
  }

  setupModalCloseHandlers(modal) {
    const closeButton = modal.querySelector(".close-button");

    const closeModal = () => {
      modal.classList.remove("show");
      setTimeout(() => {
        modal.style.display = "none";
        document.body.style.overflow = "";
      }, 300);
    };

    // Add close handlers
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

  renderProjects() {
    const container = document.getElementById("projects-container");
    if (!container) return;

    container.innerHTML = "";

    // Create and animate each project card
    projects.forEach((project, index) => {
      const card = this.createProjectCard(project, index);
      container.appendChild(card);

      // Add entrance animation
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
          gsap.set(card, { clearProps: "transform" });
        },
      });
    });
  }

  destroy() {
    // Clean up
    window.removeEventListener("resize", this.handleWindowResize);
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }
}
