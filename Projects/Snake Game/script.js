const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = canvas.width;
let snake = [{ x: 5 * box, y: 5 * box }];
let food = spawnFood();
let direction = "RIGHT";
let score = 0;

// פונקציה לציור תא
function drawBox(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, box, box);
}

// פונקציה לציור הנחש
function drawSnake() {
  snake.forEach((segment, index) => {
    const color = index === 0 ? "green" : "lightgreen"; // הראש בצבע שונה
    drawBox(segment.x, segment.y, color);
  });
}

// פונקציה לציור האוכל
function drawFood() {
  drawBox(food.x, food.y, "red");
}

// פונקציה ליצירת אוכל במקום אקראי
function spawnFood() {
  return {
    x: Math.floor(Math.random() * (canvasSize / box)) * box,
    y: Math.floor(Math.random() * (canvasSize / box)) * box,
  };
}

// עדכון המיקום של הנחש
function updateSnake() {
  const head = { ...snake[0] }; // יצירת ראש חדש
  if (direction === "LEFT") head.x -= box;
  if (direction === "RIGHT") head.x += box;
  if (direction === "UP") head.y -= box;
  if (direction === "DOWN") head.y += box;

  // בדיקה אם הנחש אוכל
  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").textContent = `Score: ${score}`;
    food = spawnFood(); // יצירת אוכל חדש
  } else {
    snake.pop(); // הסרת הזנב אם לא אוכל
  }

  // הוספת ראש חדש
  snake.unshift(head);

  // בדיקה אם הנחש פוגע בעצמו או בקירות
  if (checkCollision(head)) {
    alert(`Game Over! Final Score: ${score}`);
    resetGame();
  }
}

// פונקציה לבדוק אם הנחש פוגע בעצמו או בקירות
function checkCollision(head) {
  // פגיעה בקירות
  if (
    head.x < 0 ||
    head.x >= canvasSize ||
    head.y < 0 ||
    head.y >= canvasSize
  ) {
    return true;
  }
  // פגיעה בעצמו
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

// איפוס המשחק
function resetGame() {
  snake = [{ x: 5 * box, y: 5 * box }];
  food = spawnFood();
  direction = "RIGHT";
  score = 0;
  document.getElementById("score").textContent = `Score: ${score}`;
}

// שינוי כיוון עם מקשי החצים
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

// פונקציה לעדכון המשחק
function updateGame() {
  ctx.clearRect(0, 0, canvasSize, canvasSize); // ניקוי הקאנבס
  drawFood(); // ציור האוכל
  drawSnake(); // ציור הנחש
  updateSnake(); // עדכון מיקום הנחש
}

// התחלת המשחק
setInterval(updateGame, 150);
