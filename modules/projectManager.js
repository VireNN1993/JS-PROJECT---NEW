import { projects } from "./projectsData.js";

export class ProjectManager {
  createProjectCard(project) {
    const card = document.createElement("div");
    card.className =
      "project-card bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300";

    card.innerHTML = `
      <div class="relative group overflow-hidden rounded-lg">
        <img 
          src="${project.image}" 
          alt="${project.title}" 
          class="w-full h-48 object-cover transform transition duration-500 group-hover:scale-110"
          onerror="this.src='Images/placeholder.png'"
        >
        <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 
                    transition-opacity duration-300 flex items-center justify-center">
          <div class="text-white text-center p-4">
            <h4 class="font-bold mb-2">Click to see more</h4>
            <p>${project.technologies.join(", ")}</p>
          </div>
        </div>
      </div>
      <h3 class="text-xl font-bold mt-4">${project.title}</h3>
      <p class="text-gray-400 mt-2 h-20">${project.description}</p>
      <div class="mt-4 flex flex-wrap gap-2">
        ${project.tags
          .map(
            (tag) =>
              `<span class="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">${tag}</span>`
          )
          .join("")}
      </div>
    `;

    card.addEventListener("click", () => this.openProjectModal(project));
    return card;
  }

  openProjectModal(project) {
    const modal = document.getElementById("projectModal");
    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalTechnologies = document.getElementById("modalTechnologies");
    const previewButton = document.getElementById("previewButton");
    const downloadButton = document.getElementById("downloadButton");

    modalImage.src = project.image;
    modalImage.alt = project.title;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;

    modalTechnologies.innerHTML = project.technologies
      .map(
        (tech) =>
          `<span class="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">${tech}</span>`
      )
      .join("");

    previewButton.href = project.link;
    downloadButton.href = `${project.link.replace(
      "index.html",
      ""
    )}download/game.zip`;

    modal.style.display = "flex";
    setTimeout(() => {
      modal.classList.add("show");
    }, 10);
    document.body.style.overflow = "hidden";

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
      if (e.target === modal) {
        closeModal();
      }
    };

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    });
  }

  renderProjects() {
    const container = document.getElementById("projects-container");
    if (!container) return;

    projects.forEach((project) => {
      const card = this.createProjectCard(project);
      container.appendChild(card);
      this.animateProjectCard(card);
    });
  }

  animateProjectCard(card) {
    gsap.fromTo(
      card,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
        },
      }
    );
  }
}
