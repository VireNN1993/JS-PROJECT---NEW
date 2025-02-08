document.addEventListener("DOMContentLoaded", () => {
  let mainGameContainer = document.querySelector(".terminal-container");
  mainGameContainer.style.display = "none";

  let startScreen = document.createElement("div");
  startScreen.id = "start-screen";
  startScreen.style.position = "fixed";
  startScreen.style.top = "0";
  startScreen.style.left = "0";
  startScreen.style.width = "100vw";
  startScreen.style.height = "100vh";
  startScreen.style.display = "flex";
  startScreen.style.flexDirection = "column";
  startScreen.style.justifyContent = "center";
  startScreen.style.alignItems = "center";
  startScreen.style.background = "black";
  startScreen.style.color = "#33ff33";
  startScreen.innerHTML = `<h1>Math Terminal Game</h1><button id='start-game' style='padding: 15px 25px; font-size: 1.5rem; background: #33ff33; color: #000; border: none; border-radius: 8px; cursor: pointer;'>Start Game</button>`;
  document.body.appendChild(startScreen);

  document.getElementById("start-game").addEventListener("click", () => {
    startScreen.style.display = "none";
    mainGameContainer.style.display = "block";
    startGame();
  });
});

const startGame = () => {
  let operatorSelect = document.querySelector("#operator");
  let rangeSelect = document.querySelector("#range");
  let num1Span = document.querySelector("#num1");
  let num2Span = document.querySelector("#num2");
  let operatorSpan = document.querySelector("#current-operator");
  let answerInput = document.querySelector("#answer");
  let checkButton = document.querySelector("#check");
  let resultsTable = document.querySelector("#results");
  let timerBar = document.querySelector("#timer-bar");
  let timerText = document.querySelector("#timer-text");
  let scoreDisplay = document.createElement("div");

  scoreDisplay.id = "score-display";
  scoreDisplay.style.position = "absolute";
  scoreDisplay.style.top = "10px";
  scoreDisplay.style.right = "20px";
  scoreDisplay.style.color = "#33ff33";
  scoreDisplay.style.fontSize = "1.5rem";
  scoreDisplay.textContent = "Score: 0";
  document.body.appendChild(scoreDisplay);

  // Add a display for the current question number
  let questionNumberDisplay = document.createElement("div");
  questionNumberDisplay.id = "question-number";
  questionNumberDisplay.style.position = "absolute";
  questionNumberDisplay.style.top = "10px";
  questionNumberDisplay.style.left = "20px";
  questionNumberDisplay.style.color = "#33ff33";
  questionNumberDisplay.style.fontSize = "1.5rem";
  questionNumberDisplay.textContent = "Question: 1/10";
  document.body.appendChild(questionNumberDisplay);

  let num1 = 0,
    num2 = 0,
    correctAnswer = 0,
    attempts = 0,
    timer = null,
    score = 0,
    currentQuestion = 1; // Track the current question number

  const generateQuestion = () => {
    if (currentQuestion > 10) {
      alert(
        "Game Over! You have answered 10 questions."`You score is : ${score}`
      );
      return;
    }

    clearInterval(timer);
    resetTimer();

    let range = parseInt(rangeSelect.value);
    let operator = operatorSelect.value;
    num1 = Math.floor(Math.random() * range) + 1;
    num2 = Math.floor(Math.random() * range) + 1;

    if (operator === "-" && num1 < num2) [num1, num2] = [num2, num1];
    if (operator === "/" && num1 < num2) [num1, num2] = [num2, num1];

    operatorSpan.textContent = operator;
    num1Span.textContent = num1;
    num2Span.textContent = num2;

    if (operator === "+") correctAnswer = num1 + num2;
    else if (operator === "-") correctAnswer = num1 - num2;
    else if (operator === "*") correctAnswer = num1 * num2;
    else if (operator === "/")
      correctAnswer = Math.round((num1 / num2) * 100) / 100;

    startTimer();
  };

  const resetTimer = () => {
    timerBar.style.width = "100%";
    timerText.textContent = "10 Seconds";
  };

  const startTimer = () => {
    let timeLeft = 10;
    timerText.textContent = `${timeLeft} Seconds`;

    timer = setInterval(() => {
      timeLeft--;
      timerText.textContent = `${timeLeft} Seconds`;
      timerBar.style.width = `${(timeLeft / 10) * 100}%`;

      if (timeLeft <= 0) {
        clearInterval(timer);
        addResult("Time's up!", false);
        currentQuestion++;
        questionNumberDisplay.textContent = `Question: ${currentQuestion}/10`;
        generateQuestion();
      }
    }, 1000);
  };

  const addResult = (userAnswer, isCorrect) => {
    attempts++;
    let resultText = isCorrect ? "✅ Correct" : "❌ Incorrect";
    if (isCorrect) score += 10;
    scoreDisplay.textContent = `Score: ${score}`;
    let newRow = document.createElement("tr");
    newRow.innerHTML = `<td>${attempts}</td><td>${correctAnswer}</td><td>${
      userAnswer || "No Answer"
    } (${resultText})</td><td>${num1} ${operatorSpan.textContent} ${num2}</td>`;
    resultsTable.appendChild(newRow);
  };

  checkButton.onclick = () => {
    let userAnswer = answerInput.value.trim();
    if (!userAnswer.match(/^\d+$/)) {
      alert("Invalid input! Please enter numbers only.");
      return;
    }
    let isCorrect = parseInt(userAnswer) === correctAnswer;
    addResult(parseInt(userAnswer), isCorrect);
    answerInput.value = "";
    currentQuestion++;
    questionNumberDisplay.textContent = `Question: ${currentQuestion}/10`;
    generateQuestion();
  };

  const restartGame = () => {
    location.reload();
  };

  let restartButton = document.createElement("button");
  restartButton.textContent = "New Game";
  restartButton.style.position = "absolute";
  restartButton.style.bottom = "20px";
  restartButton.style.left = "50%";
  restartButton.style.transform = "translateX(-50%)";
  restartButton.style.padding = "10px 20px";
  restartButton.style.fontSize = "1.5rem";
  restartButton.style.background = "#33ff33";
  restartButton.style.color = "#000";
  restartButton.style.border = "none";
  restartButton.style.borderRadius = "8px";
  restartButton.style.cursor = "pointer";
  restartButton.onclick = restartGame;
  document.body.appendChild(restartButton);

  operatorSelect.onchange = generateQuestion;
  rangeSelect.onchange = generateQuestion;
  generateQuestion();
};
