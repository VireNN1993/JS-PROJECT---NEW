// רשימת מילים עם רמזים לפי רמות קושי
const difficultyLevels = {
  easy: [
    { word: "cat", hint: "A small pet" },
    { word: "dog", hint: "Man's best friend" },
    { word: "sun", hint: "Bright star in the sky" },
  ],
  medium: [
    { word: "javascript", hint: "A popular programming language" },
    { word: "developer", hint: "A person who writes code" },
    { word: "coding", hint: "Another word for programming" },
  ],
  hard: [
    { word: "algorithm", hint: "A set of rules to solve a problem" },
    { word: "framework", hint: "A structure for building software" },
    { word: "repository", hint: "A place to store code" },
  ],
};

let chosenWord = ""; // המילה שנבחרה
let hiddenWord = []; // המילה הנסתרת עם "_"
let hint = ""; // הרמז למילה
let wrongGuesses = 0; // מספר טעויות
let score = 0; // ניקוד
let timeLeft = 60; // זמן בשניות
let timerInterval; // טיימר
let currentDifficulty = "medium"; // רמת קושי ברירת מחדל

const wordElement = document.getElementById("word");
const hintElement = document.getElementById("hint");
const lettersElement = document.getElementById("letters");
const messageElement = document.getElementById("message");
const wrongGuessesElement = document.getElementById("wrong-guesses");
const hangmanImage = document.getElementById("hangman-image");
const restartButton = document.getElementById("restart");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");

// התחלה מחדש
const startGame = () => {
  // בחירת מילה ורמז לפי רמת הקושי
  const words = difficultyLevels[currentDifficulty];
  const randomWord = words[Math.floor(Math.random() * words.length)];
  chosenWord = randomWord.word;
  hint = randomWord.hint;

  hiddenWord = Array(chosenWord.length).fill("_");
  wrongGuesses = 0;
  timeLeft = 60; // איפוס הטיימר
  score = 0; // איפוס הניקוד

  // עדכון ממשק
  wordElement.textContent = hiddenWord.join(" ");
  hintElement.textContent = `Hint: ${hint}`;
  messageElement.textContent = "";
  wrongGuessesElement.textContent = wrongGuesses;
  hangmanImage.src = `img/hangman1.png`;
  scoreElement.textContent = `Score: ${score}`;
  timerElement.textContent = `Time Left: ${timeLeft}s`;

  // יצירת כפתורי אותיות
  lettersElement.innerHTML = "";
  for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.textContent = String.fromCharCode(i); // אותיות a-z
    button.classList.add("letter");
    button.addEventListener("click", () => guessLetter(button));
    lettersElement.appendChild(button);
  }

  // התחלת הטיימר
  clearInterval(timerInterval);
  startTimer();
};

// ניחוש אות
const guessLetter = (button) => {
  const letter = button.textContent;
  button.disabled = true; // מניעת לחיצה חוזרת

  if (chosenWord.includes(letter)) {
    // אם האות קיימת במילה
    for (let i = 0; i < chosenWord.length; i++) {
      if (chosenWord[i] === letter) {
        hiddenWord[i] = letter;
      }
    }
    wordElement.textContent = hiddenWord.join(" ");
    updateScore(10); // הוסף 10 נקודות לניחוש נכון
    if (!hiddenWord.includes("_")) {
      messageElement.textContent = "You Win! 🎉";
      disableAllButtons();
    }
  } else {
    // אם האות לא קיימת במילה
    wrongGuesses++;
    wrongGuessesElement.textContent = wrongGuesses;
    hangmanImage.src = `img/hangman${wrongGuesses + 1}.png`; // עדכון התמונה
    updateScore(-5); // הפחת 5 נקודות לניחוש שגוי
    if (wrongGuesses === 6) {
      messageElement.textContent = `Game Over! The word was "${chosenWord}".`;
      disableAllButtons();
    }
  }
};

// עדכון הניקוד
const updateScore = (points) => {
  score += points;
  scoreElement.textContent = `Score: ${score}`;
};

// השבתת כל הכפתורים
const disableAllButtons = () => {
  const buttons = document.querySelectorAll(".letter");
  buttons.forEach((button) => (button.disabled = true));
};

// טיימר
const startTimer = () => {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Time Left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      messageElement.textContent = "Time's up! Game Over!";
      disableAllButtons();
    }
  }, 1000);
};

// בחירת רמת קושי
const setDifficulty = (level) => {
  currentDifficulty = level;
  startGame();
};

// הזנת מילה מותאמת אישית
const setCustomWord = () => {
  const wordInput = document.getElementById("custom-word-input");
  const hintInput = document.getElementById("custom-hint-input");
  if (wordInput.value && hintInput.value) {
    chosenWord = wordInput.value.toLowerCase();
    hint = hintInput.value;
    hiddenWord = Array(chosenWord.length).fill("_");
    wordElement.textContent = hiddenWord.join(" ");
    hintElement.textContent = `Hint: ${hint}`;
    messageElement.textContent = "";
    wrongGuesses = 0;
    wrongGuessesElement.textContent = wrongGuesses;
    hangmanImage.src = `img/hangman1.png`;
    lettersElement.innerHTML = "";
    for (let i = 97; i <= 122; i++) {
      const button = document.createElement("button");
      button.textContent = String.fromCharCode(i);
      button.classList.add("letter");
      button.addEventListener("click", () => guessLetter(button));
      lettersElement.appendChild(button);
    }
    clearInterval(timerInterval);
    startTimer();
  } else {
    alert("Please enter both a word and a hint!");
  }
};

// שמירת תוצאה
const saveScore = () => {
  const playerName = prompt("Enter your name:");
  if (playerName) {
    const scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.push({ name: playerName, score: score });
    localStorage.setItem("scores", JSON.stringify(scores));
    alert("Score saved!");
  }
};

// הצגת תוצאות גבוהות
const showHighScores = () => {
  const scores = JSON.parse(localStorage.getItem("scores")) || [];
  const scoresList = scores
    .map((entry) => `${entry.name}: ${entry.score}`)
    .join("\n");
  alert(`High Scores:\n${scoresList}`);
};

// כפתור התחלה מחדש
restartButton.addEventListener("click", startGame);

// התחלת המשחק בפעם הראשונה
startGame();
