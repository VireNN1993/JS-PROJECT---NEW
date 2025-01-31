const startGame = () => {
  // Select elements from the DOM
  let operatorSelect = document.querySelector("#operator");
  let rangeSelect = document.querySelector("#range");
  let num1Span = document.querySelector("#num1");
  let num2Span = document.querySelector("#num2");
  let operatorSpan = document.querySelector("#current-operator");
  let answerInput = document.querySelector("#answer");
  let checkButton = document.querySelector("#check");
  let resultsTable = document.querySelector("#results");
  let timerBar = document.querySelector("#timer-bar"); // Progress bar
  let timerText = document.querySelector("#timer-text"); // Timer text

  // Global variables
  let num1 = 0;
  let num2 = 0;
  let correctAnswer = 0;
  let attempts = 0;
  let timer = null; // Timer ID

  // Generate a new question
  const generateQuestion = () => {
    clearInterval(timer); // Stop the previous timer
    resetTimer(); // Reset the timer

    let range = parseInt(rangeSelect.value);
    let operator = operatorSelect.value;

    // Generate random numbers
    num1 = Math.floor(Math.random() * range) + 1;
    num2 = Math.floor(Math.random() * range) + 1;

    // Ensure num1 >= num2 for subtraction and division
    if (operator === "-" && num1 < num2) {
      [num1, num2] = [num2, num1];
    }
    if (operator === "/" && num1 < num2) {
      [num1, num2] = [num2, num1];
    }

    operatorSpan.textContent = operator;
    num1Span.textContent = num1;
    num2Span.textContent = num2;

    // Calculate the correct answer
    if (operator === "+") {
      correctAnswer = num1 + num2;
    } else if (operator === "-") {
      correctAnswer = num1 - num2;
    } else if (operator === "*") {
      correctAnswer = num1 * num2;
    } else if (operator === "/") {
      correctAnswer = Math.round((num1 / num2) * 100) / 100;
    }

    startTimer(); // Start the timer
  };

  // Reset the timer
  const resetTimer = () => {
    timerBar.style.width = "100%";
    timerText.textContent = "10 Seconds";
  };

  // Start the timer
  const startTimer = () => {
    let timeLeft = 10; // Total time in seconds
    timerText.textContent = `${timeLeft} Seconds`;

    timer = setInterval(() => {
      timeLeft--;
      timerText.textContent = `${timeLeft} Seconds`;
      timerBar.style.width = `${(timeLeft / 10) * 100}%`; // Adjust bar width

      if (timeLeft <= 0) {
        clearInterval(timer); // Stop the timer
        alert("Time's up! A new question will be displayed.");
        addUnansweredRow(); // Add an unanswered row to the results
        generateQuestion(); // Generate a new question
      }
    }, 1000);
  };

  // Add an unanswered row
  const addUnansweredRow = () => {
    attempts++;

    let newRow = `
      <tr>
        <td>${attempts}</td>
        <td>${correctAnswer}</td>
        <td>לא נענתה</td>
        <td>${num1} ${operatorSpan.textContent} ${num2}</td>
      </tr>`;
    resultsTable.innerHTML += newRow;
  };

  // Check the user's answer
  checkButton.onclick = () => {
    let userAnswer = parseFloat(answerInput.value);
    attempts++;

    // Add a new row to the results table
    let newRow = `
      <tr>
        <td>${attempts}</td>
        <td>${correctAnswer}</td>
        <td>${userAnswer || "לא הוזנה תשובה"}</td>
        <td>${num1} ${operatorSpan.textContent} ${num2}</td>
      </tr>`;
    resultsTable.innerHTML += newRow;

    if (userAnswer === correctAnswer) {
      alert("כל הכבוד! התשובה נכונה.");
    } else {
      alert("התשובה שגויה. נסו שוב.");
    }

    answerInput.value = ""; // Clear the answer input
    generateQuestion(); // Generate a new question
  };

  // Update the question when the operator changes
  operatorSelect.onchange = () => {
    generateQuestion();
  };

  // Update the question when the range changes
  rangeSelect.onchange = () => {
    generateQuestion();
  };

  generateQuestion(); // Start with the first question
};

// Start the game
startGame();
