const words = {
  animals: {
    easy: [
      { word: "cat", hint: "A common house pet that meows" },
      { word: "dog", hint: "Man's best friend" },
      { word: "cow", hint: "Gives us milk" },
      { word: "pig", hint: "Farm animal that says oink" },
      { word: "rat", hint: "Small rodent" },
    ],
    medium: [
      { word: "tiger", hint: "Striped big cat" },
      { word: "zebra", hint: "Black and white stripes" },
      { word: "giraffe", hint: "Very long neck" },
      { word: "penguin", hint: "Bird that can't fly but swims" },
      { word: "dolphin", hint: "Smart sea mammal" },
    ],
    hard: [
      { word: "elephant", hint: "Largest land animal" },
      { word: "octopus", hint: "Has eight arms" },
      { word: "kangaroo", hint: "Hops with a pouch" },
      { word: "rhinoceros", hint: "Has a horn on its nose" },
      { word: "crocodile", hint: "Large reptile in water" },
    ],
  },
  countries: {
    easy: [
      { word: "usa", hint: "Land of the free" },
      { word: "spain", hint: "Famous for bullfighting" },
      { word: "italy", hint: "Known for pizza" },
      { word: "china", hint: "Has a great wall" },
      { word: "japan", hint: "Land of the rising sun" },
    ],
    medium: [
      { word: "france", hint: "Eiffel Tower country" },
      { word: "germany", hint: "Known for beer festivals" },
      { word: "brazil", hint: "Soccer and carnival" },
      { word: "mexico", hint: "Known for tacos" },
      { word: "canada", hint: "Maple leaf flag" },
    ],
    hard: [
      { word: "australia", hint: "Land down under" },
      { word: "thailand", hint: "Land of smiles" },
      { word: "egypt", hint: "Home of pyramids" },
      { word: "greece", hint: "Ancient Olympics" },
      { word: "russia", hint: "Largest country" },
    ],
  },
};

let word = "";
let hint = "";
let guessed = new Set();
let mistakes = 0;
let score = 0;
let timer = 60;
let gameTimer;
let level = "medium";
let category = "animals";
let isPlaying = false;

// Scoring System
const points = {
  easy: 1,
  medium: 1.5,
  hard: 2,
};

// DOM Elements
const wordBox = document.getElementById("word-display");
const hintBox = document.getElementById("hint-text");
const scoreBox = document.getElementById("score");
const timerBox = document.getElementById("timer");
const mistakesBox = document.getElementById("wrong-guesses");
const keyboardBox = document.getElementById("keyboard");
const hangmanPic = document.getElementById("hangman-img");

// Game Core Functions
function startGame() {
  resetGameState();
  setTimerByLevel();
  setNewWord();
  updateDisplays();
  startTimer();
}

function resetGameState() {
  guessed.clear();
  mistakes = 0;
  isPlaying = true;
}

function setTimerByLevel() {
  switch (level) {
    case "easy":
      timer = 90;
      break;
    case "medium":
      timer = 60;
      break;
    case "hard":
      timer = 30;
      break;
  }
}

function setNewWord() {
  const newWord = getNewWord();
  word = newWord.word.toUpperCase();
  hint = newWord.hint;
  window.rightGuessPoints = Math.floor(10 * points[level]);
  window.wrongGuessPoints = Math.floor(5 * points[level]);
}

function getNewWord() {
  const wordList = words[category][level];
  return wordList[Math.floor(Math.random() * wordList.length)];
}

// Display Update Functions
function updateDisplays() {
  updateWord();
  updatePicture();
  makeKeyboard();
  updateUIElements();
}

function updateWord() {
  wordBox.textContent = [...word]
    .map((letter) => (guessed.has(letter) ? letter : "_"))
    .join(" ");
}

function updatePicture() {
  hangmanPic.src = `/IMG/hangman${mistakes + 1}.png`;
}

function updateUIElements() {
  hintBox.textContent = hint;
  scoreBox.textContent = score;
  mistakesBox.textContent = mistakes;
  timerBox.textContent = timer;
}

// Keyboard Functions
function makeKeyboard() {
  keyboardBox.innerHTML = "";
  for (let i = 65; i <= 90; i++) {
    createKeyboardButton(String.fromCharCode(i));
  }
}

function createKeyboardButton(letter) {
  const btn = document.createElement("button");
  btn.textContent = letter;
  btn.onclick = () => guessLetter(letter);
  btn.disabled = guessed.has(letter);
  keyboardBox.appendChild(btn);
}

// Game Logic Functions
function guessLetter(letter) {
  if (!isPlaying || guessed.has(letter)) return;

  guessed.add(letter);
  disableLetterButton(letter);

  if (word.includes(letter)) {
    handleCorrectGuess();
  } else {
    handleWrongGuess();
  }

  scoreBox.textContent = score;
}

function handleCorrectGuess() {
  score += window.rightGuessPoints;
  updateWord();

  if (checkWin()) {
    score += timer * points[level];
    gameOver(true);
  }
}

function handleWrongGuess() {
  mistakes++;
  score -= window.wrongGuessPoints;
  updatePicture();
  mistakesBox.textContent = mistakes;

  if (mistakes >= 7) {
    gameOver(false);
  }
}

function disableLetterButton(letter) {
  const btn = [...keyboardBox.children].find(
    (btn) => btn.textContent === letter
  );
  btn.disabled = true;
}

// Timer Functions
function startTimer() {
  clearInterval(gameTimer);
  gameTimer = setInterval(() => {
    timer--;
    timerBox.textContent = timer;

    if (timer <= 0) {
      gameOver(false);
    }
  }, 1000);
}

// Game State Functions
function checkWin() {
  return [...word].every((letter) => guessed.has(letter));
}

function gameOver(won) {
  isPlaying = false;
  clearInterval(gameTimer);
  showGameOverModal(won);
}

function showGameOverModal(won) {
  const modal = document.getElementById("game-over-modal");
  const title = document.getElementById("game-over-title");
  const message = document.getElementById("game-over-message");
  const finalScore = document.getElementById("final-score");

  title.textContent = won ? "You Won!" : "Game Over";
  message.textContent = `The word was: ${word}`;
  finalScore.textContent = `Your Score: ${score}`;

  modal.style.display = "block";
}

// Game Control Functions
function changeLevel(newLevel) {
  level = newLevel;
  score = 0;
  scoreBox.textContent = score;
  startGame();
}

function changeCategory(newCategory) {
  category = newCategory;
  score = 0;
  scoreBox.textContent = score;
  startGame();
}

function restartGame() {
  document.getElementById("game-over-modal").style.display = "none";
  score = 0;
  scoreBox.textContent = score;
  startGame();
}

// High Scores Functions
function saveScore() {
  const nameInput = document.getElementById("player-name");
  const name = nameInput.value.trim();

  if (!name) {
    alert("Please enter your name!");
    return;
  }

  updateHighScores(name);
  closeModalAndRestart(nameInput);
}

function updateHighScores(playerName) {
  let scores = JSON.parse(localStorage.getItem("scores") || "[]");
  scores.push({
    name: playerName,
    score: score,
    date: new Date().toISOString(),
  });

  scores.sort((a, b) => b.score - a.score);
  scores = scores.slice(0, 10);
  localStorage.setItem("scores", JSON.stringify(scores));
  showHighScores();
}

function closeModalAndRestart(nameInput) {
  nameInput.value = "";
  document.getElementById("game-over-modal").style.display = "none";
  restartGame();
}
// Show High Scores
function showHighScores() {
  const scores = JSON.parse(localStorage.getItem("scores") || "[]");
  const scoresList = document.getElementById("high-scores-list");

  scoresList.innerHTML = scores
    .map(
      (score, i) => `
          <tr>
              <td>${i + 1}</td>
              <td>${score.name}</td>
              <td>${score.score}</td>
          </tr>
      `
    )
    .join("");
}

// Resets HighScores
function resetHighScores() {
  if (confirm("Are you sure you want to reset all high scores?")) {
    localStorage.removeItem("scores");
    showHighScores();
  }
}

// Initialize game
window.onload = () => {
  startGame();
  showHighScores();
};
