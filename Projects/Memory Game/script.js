let flippedCards = [];
let matchedCards = [];
let size = 4;
let timerInterval;
let secondsElapsed = 0;
let matches = 0;

// DOM elements
const resBtn = document.getElementById("res");
const startBtn = document.getElementById("start-btn");
const difficultyDiv = document.getElementById("difficulty");
const timerSpan = document.getElementById("timer");
const matchesSpan = document.getElementById("matches");
const bestTimeSpan = document.getElementById("best-time");
const gameBoard = document.getElementById("board");
const winModal = document.getElementById("win-modal");
const finalTimeSpan = document.getElementById("final-time");
const newRecordSpan = document.getElementById("new-record");
const playAgainBtn = document.getElementById("play-again");

// Initialize best times in localStorage
function initializeBestTimes() {
  if (!localStorage.getItem("bestTimes")) {
    localStorage.setItem(
      "bestTimes",
      JSON.stringify({
        2: null,
        4: null,
        6: null,
      })
    );
  }
  updateBestTimeDisplay();
}

// Update best time display
function updateBestTimeDisplay() {
  const bestTimes = JSON.parse(localStorage.getItem("bestTimes"));
  const currentBest = bestTimes[size];

  bestTimeSpan.textContent = currentBest === null ? "-" : `${currentBest}s`;
}

// Show difficulty selection screen
function showDifficultyScreen() {
  clearInterval(timerInterval);
  resetGameState();
  difficultyDiv.style.display = "flex";
  startBtn.style.display = "none";
  resBtn.style.display = "none";
  winModal.style.display = "none";
}

// Reset game state
function resetGameState() {
  gameBoard.innerHTML = "";
  secondsElapsed = 0;
  timerSpan.textContent = "0";
  matches = 0;
  matchesSpan.textContent = "0";
  flippedCards = [];
  matchedCards = [];
}

// Start new game
function startGame(newSize) {
  size = newSize;
  resetGameState();
  resBtn.style.display = "block";
  updateBestTimeDisplay();

  const cards = generateCards();
  createGameBoard(cards);
  startTimer();
}

// Generate card deck
function generateCards() {
  const images = [
    "clubs_2.svg",
    "clubs_3.svg",
    "clubs_4.svg",
    "clubs_5.svg",
    "clubs_6.svg",
    "clubs_7.svg",
    "clubs_8.svg",
    "clubs_9.svg",
    "clubs_10.svg",
    "clubs_ace.svg",
    "clubs_jack.svg",
    "clubs_king.svg",
    "clubs_queen.svg",
    "diamonds_2.svg",
    "diamonds_3.svg",
    "diamonds_4.svg",
  ];

  let cards = [];
  for (let i = 0; i < (size * size) / 2; i++) {
    cards.push(images[i % images.length]);
    cards.push(images[i % images.length]);
  }

  return cards.sort(() => Math.random() - 0.5);
}

// Create game board
function createGameBoard(cards) {
  gameBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

  cards.forEach((card, index) => {
    const cardElement = createCardElement(card, index);
    gameBoard.appendChild(cardElement);
  });
}

// Create card element
function createCardElement(card, index) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.dataset.value = card;
  cardElement.dataset.index = index;

  const backImg = document.createElement("img");
  backImg.src = "images/castle.svg";
  backImg.classList.add("card-back");

  const frontImg = document.createElement("img");
  frontImg.src = `images/${card}`;
  frontImg.classList.add("card-front");

  cardElement.appendChild(backImg);
  cardElement.appendChild(frontImg);
  cardElement.addEventListener("click", flipCard);

  return cardElement;
}

// Handle card flip
function flipCard() {
  if (flippedCards.length >= 2 || this.classList.contains("flipped")) return;

  this.classList.add("flipped");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    setTimeout(checkForMatch, 800);
  }
}

// Check for matching cards
function checkForMatch() {
  const [firstCard, secondCard] = flippedCards;
  const isMatch = firstCard.dataset.value === secondCard.dataset.value;

  if (isMatch) {
    handleMatch(firstCard, secondCard);
  } else {
    unflipCards(firstCard, secondCard);
  }

  flippedCards = [];
}

// Handle matching cards
function handleMatch(firstCard, secondCard) {
  matchedCards.push(firstCard, secondCard);
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");

  matches++;
  matchesSpan.textContent = matches;

  if (matchedCards.length === size * size) {
    handleGameWin();
  }
}

// Handle game win
function handleGameWin() {
  clearInterval(timerInterval);
  const bestTimes = JSON.parse(localStorage.getItem("bestTimes"));
  const currentBest = bestTimes[size];

  // Check if the current time is better
  const isNewRecord = currentBest === null || secondsElapsed < currentBest;

  if (isNewRecord) {
    bestTimes[size] = secondsElapsed;
    localStorage.setItem("bestTimes", JSON.stringify(bestTimes));
    newRecordSpan.textContent = "Yes!";
  } else {
    newRecordSpan.textContent = "No";
  }

  finalTimeSpan.textContent = secondsElapsed;
  winModal.style.display = "flex";

  updateBestTimeDisplay();
}

// Unflip non-matching cards
function unflipCards(firstCard, secondCard) {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
  }, 800);
}

// Start timer
function startTimer() {
  clearInterval(timerInterval);
  secondsElapsed = 0;
  timerSpan.textContent = secondsElapsed;

  timerInterval = setInterval(() => {
    secondsElapsed++;
    timerSpan.textContent = secondsElapsed;
  }, 1000);
}

startBtn.addEventListener("click", showDifficultyScreen);
resBtn.addEventListener("click", showDifficultyScreen);
playAgainBtn.addEventListener("click", showDifficultyScreen);

document.querySelectorAll(".level-btn").forEach((button) => {
  button.addEventListener("click", (event) => {
    const size = parseInt(event.target.getAttribute("data-size"));
    difficultyDiv.style.display = "none";
    startGame(size);
  });
});

initializeBestTimes();
