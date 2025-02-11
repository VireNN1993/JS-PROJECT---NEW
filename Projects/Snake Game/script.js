const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  const maxSize = Math.min(window.innerWidth - 40, 400);
  canvas.style.width = maxSize + "px";
  canvas.style.height = maxSize + "px";
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const box = 20;
const canvasSize = canvas.width;
let snake = [{ x: 5 * box, y: 5 * box }];
let food = spawnFood();
let direction = "RIGHT";
let score = 0;

function drawBox(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, box, box);
}

function drawSnake() {
  snake.forEach((segment, index) => {
    const color = index === 0 ? "green" : "lightgreen";
    drawBox(segment.x, segment.y, color);
  });
}

function drawFood() {
  drawBox(food.x, food.y, "red");
}

function spawnFood() {
  return {
    x: Math.floor(Math.random() * (canvasSize / box)) * box,
    y: Math.floor(Math.random() * (canvasSize / box)) * box,
  };
}

function updateSnake() {
  const head = { ...snake[0] };
  if (direction === "LEFT") head.x -= box;
  if (direction === "RIGHT") head.x += box;
  if (direction === "UP") head.y -= box;
  if (direction === "DOWN") head.y += box;

  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").textContent = `Score: ${score}`;
    food = spawnFood();
  } else {
    snake.pop();
  }

  snake.unshift(head);

  if (checkCollision(head)) {
    alert(`Game Over! Final Score: ${score}`);
    resetGame();
  }
}

function checkCollision(head) {
  if (
    head.x < 0 ||
    head.x >= canvasSize ||
    head.y < 0 ||
    head.y >= canvasSize
  ) {
    return true;
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

function resetGame() {
  snake = [{ x: 5 * box, y: 5 * box }];
  food = spawnFood();
  direction = "RIGHT";
  score = 0;
  document.getElementById("score").textContent = `Score: ${score}`;
}

document.getElementById("upBtn").addEventListener("click", () => {
  if (direction !== "DOWN") direction = "UP";
});

document.getElementById("downBtn").addEventListener("click", () => {
  if (direction !== "UP") direction = "DOWN";
});

document.getElementById("leftBtn").addEventListener("click", () => {
  if (direction !== "RIGHT") direction = "LEFT";
});

document.getElementById("rightBtn").addEventListener("click", () => {
  if (direction !== "LEFT") direction = "RIGHT";
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

function updateGame() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);
  drawFood();
  drawSnake();
  updateSnake();
}

setInterval(updateGame, 150);
