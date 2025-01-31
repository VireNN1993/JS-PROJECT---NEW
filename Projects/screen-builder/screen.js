// בחירת אלמנטים מה-DOM
const addButton = document.getElementById("add-btn");
const clearButton = document.getElementById("clear-btn");
const elementsContainer = document.getElementById("elements-container");

// טעינת אלמנטים מ-localStorage
function loadFromLocalStorage() {
  const savedElements = localStorage.getItem("elements");
  if (savedElements) {
    elementsContainer.innerHTML = savedElements;
  }
}

// שמירת אלמנטים ל-localStorage
function saveToLocalStorage() {
  localStorage.setItem("elements", elementsContainer.innerHTML);
}

function createNewElement() {
  const element = document.createElement(
    document.getElementById("type").value || "div"
  );
  element.id = document.getElementById("id").value || `element-${Date.now()}`;
  element.textContent = document.getElementById("content").value || "";

  Object.assign(element.style, {
    width: `${document.getElementById("width").value || 100}px`,
    height: `${document.getElementById("height").value || 100}px`,
    backgroundColor: document.getElementById("color").value || "black",
    border: `${document.getElementById("border").value || 0}px solid ${
      document.getElementById("border-color").value || "transparent"
    }`,
    borderRadius: `${document.getElementById("border-radius").value || 0}px`,
    margin: `${document.getElementById("margin").value || 0}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  element.setAttribute("title", document.getElementById("title").value || "");
  elementsContainer.appendChild(element);
  saveToLocalStorage();
}

function clearAllElements() {
  elementsContainer.innerHTML = "";
  localStorage.removeItem("elements");
}

addButton.addEventListener("click", createNewElement);
clearButton.addEventListener("click", clearAllElements);

window.onload = loadFromLocalStorage;
