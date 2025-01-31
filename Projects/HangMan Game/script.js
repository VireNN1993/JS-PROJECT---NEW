// רשימת מילים עם רמזים
const wordsWithHints = [
  { word: "javascript", hint: "A popular programming language" },
  { word: "developer", hint: "A person who writes code" },
  { word: "coding", hint: "Another word for programming" },
  { word: "hangman", hint: "This game you're playing now" },
  { word: "browser", hint: "Where you open websites" },
];

let chosenWord = ""; // המילה שנבחרה
let hiddenWord = []; // המילה הנסתרת עם "_"
let hint = ""; // הרמז למילה
let wrongGuesses = 0; // מספר טעויות

const wordElement = document.getElementById("word");
const hintElement = document.getElementById("hint");
const lettersElement = document.getElementById("letters");
const messageElement = document.getElementById("message");
const wrongGuessesElement = document.getElementById("wrong-guesses");
const hangmanImage = document.getElementById("hangman-image");
const restartButton = document.getElementById("restart");

// התחלה מחדש
const startGame = () => {
  // בחירת מילה ורמז
  const randomWord =
    wordsWithHints[Math.floor(Math.random() * wordsWithHints.length)];
  chosenWord = randomWord.word;
  hint = randomWord.hint;

  hiddenWord = Array(chosenWord.length).fill("_");
  wrongGuesses = 0;

  // עדכון ממשק
  wordElement.textContent = hiddenWord.join(" ");
  hintElement.textContent = `Hint: ${hint}`;
  messageElement.textContent = "";
  wrongGuessesElement.textContent = wrongGuesses;
  hangmanImage.src = `img/hangman1.png`; // איפוס התמונה

  // יצירת כפתורי אותיות
  lettersElement.innerHTML = "";
  for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.textContent = String.fromCharCode(i); // אותיות a-z
    button.classList.add("letter");
    button.addEventListener("click", () => guessLetter(button));
    lettersElement.appendChild(button);
  }
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
    if (!hiddenWord.includes("_")) {
      messageElement.textContent = "You Win! 🎉";
      disableAllButtons();
    }
  } else {
    // אם האות לא קיימת במילה
    wrongGuesses++;
    wrongGuessesElement.textContent = wrongGuesses;
    hangmanImage.src = `img/hangman${wrongGuesses + 1}.png`; // עדכון התמונה
    if (wrongGuesses === 6) {
      messageElement.textContent = `Game Over! The word was "${chosenWord}".`;
      disableAllButtons();
    }
  }
};

// השבתת כל הכפתורים
const disableAllButtons = () => {
  const buttons = document.querySelectorAll(".letter");
  buttons.forEach((button) => (button.disabled = true));
};

// כפתור התחלה מחדש
restartButton.addEventListener("click", startGame);

// התחלת המשחק בפעם הראשונה
startGame();
