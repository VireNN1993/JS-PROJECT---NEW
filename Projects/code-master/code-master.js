document.addEventListener("DOMContentLoaded", () => {
  const questionElement = document.getElementById("question");
  const questionNumberElement = document.getElementById("question-number");
  const options = [
    document.getElementById("option1"),
    document.getElementById("option2"),
    document.getElementById("option3"),
    document.getElementById("option4"),
  ];
  const scoreDisplay = document.getElementById("score");
  const timerDisplay = document.getElementById("timer");
  const startButton = document.getElementById("start");
  const resetButton = document.getElementById("reset");
  const statusElement = document.getElementById("status");
  const audienceHelpButton = document.getElementById("audience-help");
  const phoneFriendButton = document.getElementById("phone-friend");
  const fiftyFiftyButton = document.getElementById("fifty-fifty");
  const resultsList = document.getElementById("results-list");

  // Game state variables
  let currentQuestionIndex = 0;
  let score = 0;
  let timer;
  let timeLeft = 30;
  let audienceHelpUsed = false;
  let phoneFriendUsed = false;
  let fiftyFiftyUsed = false;
  let isGameActive = false;

  // Prize
  const prizeLevels = [
    100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000,
    250000, 500000, 1000000,
  ];

  // Questions
  const questions = [
    // Easy Questions (1-5)
    {
      question: "What is the correct way to declare a variable in JavaScript?",
      options: ["variable x;", "let x;", "x = var;", "make x;"],
      correctAnswer: 1,
    },
    {
      question: "Which symbol is used for single-line comments in JavaScript?",
      options: ["#", "//", "/*", "<!--"],
      correctAnswer: 1,
    },
    {
      question: "What is the result of 5 + '5' in JavaScript?",
      options: ["10", "55", "Error", "undefined"],
      correctAnswer: 1,
    },
    {
      question: "Which method is used to add elements to an array?",
      options: ["append()", "push()", "add()", "insert()"],
      correctAnswer: 1,
    },
    {
      question: "How do you write an IF statement in JavaScript?",
      options: ["if x = 5", "if x == 5 then", "if (x == 5)", "if x equals 5"],
      correctAnswer: 2,
    },

    // Medium Questions (6-10)
    {
      question: "What does DOM stand for?",
      options: [
        "Data Object Model",
        "Document Object Model",
        "Display Object Management",
        "Document Orientation Model",
      ],
      correctAnswer: 1,
    },
    {
      question: "Which is the correct way to start a for loop?",
      options: [
        "for (i = 0; i <= 5)",
        "for (let i = 0; i < 5; i++)",
        "for (i <= 5; i++)",
        "for i in range(5)",
      ],
      correctAnswer: 1,
    },
    {
      question: "How do you declare a function in JavaScript?",
      options: [
        "function = myFunction()",
        "function myFunction()",
        "def myFunction()",
        "void myFunction()",
      ],
      correctAnswer: 1,
    },
    {
      question: "Which operator compares value and type?",
      options: ["==", "===", "=", "!="],
      correctAnswer: 1,
    },
    {
      question: "What method is used to remove the last element from an array?",
      options: ["removeLast()", "pop()", "delete()", "slice()"],
      correctAnswer: 1,
    },

    // Hard Questions (11-15)
    {
      question: "What is event bubbling in JavaScript?",
      options: [
        "A bug in event handling",
        "Event propagation from child to parent",
        "Creating multiple events",
        "Stopping event propagation",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is the purpose of 'use strict' in JavaScript?",
      options: [
        "To make code faster",
        "To enforce stricter parsing and error handling",
        "To connect to a database",
        "To include external JavaScript",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is a closure in JavaScript?",
      options: [
        "A way to close browser windows",
        "A function with access to parent scope variables",
        "Ending a loop",
        "Closing a connection",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is the difference between let and var?",
      options: [
        "No difference",
        "let has block scope, var has function scope",
        "var is faster than let",
        "let is older than var",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is a Promise in JavaScript?",
      options: [
        "A guarantee to users",
        "An object representing eventual completion of async operation",
        "A type of loop",
        "A way to store data",
      ],
      correctAnswer: 1,
    },
  ];

  // Function to start the game
  function startGame() {
    isGameActive = true;
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 30;

    scoreDisplay.textContent = `$${score}`;
    timerDisplay.textContent = timeLeft;
    statusElement.textContent = "";

    startButton.disabled = true;
    resetButton.disabled = false;

    resetLifelines();

    resultsList.innerHTML = "";
    loadQuestion();
    startTimer();
  }

  // Function to reset lifelines
  function resetLifelines() {
    audienceHelpUsed = false;
    phoneFriendUsed = false;
    fiftyFiftyUsed = false;

    audienceHelpButton.disabled = false;
    phoneFriendButton.disabled = false;
    fiftyFiftyButton.disabled = false;

    audienceHelpButton.style.backgroundColor = "#4a90e2";
    phoneFriendButton.style.backgroundColor = "#4a90e2";
    fiftyFiftyButton.style.backgroundColor = "#4a90e2";
  }

  // Function to load a question
  function loadQuestion() {
    if (!isGameActive) return;

    const question = questions[currentQuestionIndex];
    questionNumberElement.textContent = `Question ${
      currentQuestionIndex + 1
    } of ${questions.length}`;
    questionElement.textContent = question.question;

    // Reset and set up option buttons
    options.forEach((option, index) => {
      option.textContent = question.options[index];
      option.onclick = () => isGameActive && checkAnswer(index);
      option.style.display = "block";
      option.disabled = false;
    });

    timeLeft = 30;
    timerDisplay.textContent = timeLeft;
  }

  // Function to check answer
  function checkAnswer(selectedIndex) {
    if (!isGameActive) return;

    const question = questions[currentQuestionIndex];
    const isCorrect = selectedIndex === question.correctAnswer;

    if (isCorrect) {
      score = prizeLevels[currentQuestionIndex];
      scoreDisplay.textContent = `$${score}`;
      statusElement.textContent = "Correct!";

      // Add result to board
      const resultItem = document.createElement("li");
      resultItem.textContent = `Question ${
        currentQuestionIndex + 1
      }: Correct - $${score}`;
      resultsList.appendChild(resultItem);

      currentQuestionIndex++;

      if (currentQuestionIndex < questions.length) {
        setTimeout(loadQuestion, 1500);
      } else {
        endGame(true);
      }
    } else {
      endGame(false);
    }
  }

  // Function to start timer
  function startTimer() {
    if (timer) clearInterval(timer);

    timer = setInterval(() => {
      if (!isGameActive) {
        clearInterval(timer);
        return;
      }

      timeLeft--;
      timerDisplay.textContent = timeLeft;

      if (timeLeft <= 0) {
        endGame(false);
      }
    }, 1000);
  }

  // Function to end game
  function endGame(won) {
    isGameActive = false;
    clearInterval(timer);

    // Disable all options
    options.forEach((option) => {
      option.disabled = true;
      option.onclick = null;
    });

    // Update status and controls
    statusElement.textContent = won
      ? `Congratulations! You've won $${score}!`
      : `Game Over! Your final prize is $${score}.`;

    startButton.disabled = false;

    // Disable lifelines
    audienceHelpButton.disabled = true;
    phoneFriendButton.disabled = true;
    fiftyFiftyButton.disabled = true;

    audienceHelpButton.style.backgroundColor = "#cccccc";
    phoneFriendButton.style.backgroundColor = "#cccccc";
    fiftyFiftyButton.style.backgroundColor = "#cccccc";
  }

  // Function to reset game
  function resetGame() {
    isGameActive = false;
    clearInterval(timer);
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 30;

    // Reset display elements
    scoreDisplay.textContent = `$${score}`;
    timerDisplay.textContent = timeLeft;
    statusElement.textContent = "Click START GAME to begin!";

    // Reset buttons
    startButton.disabled = false;
    resetButton.disabled = true;
    options.forEach((option) => {
      option.disabled = true;
      option.onclick = null;
    });

    // Reset lifelines
    audienceHelpButton.disabled = true;
    phoneFriendButton.disabled = true;
    fiftyFiftyButton.disabled = true;
    audienceHelpUsed = false;
    phoneFriendUsed = false;
    fiftyFiftyUsed = false;

    audienceHelpButton.style.backgroundColor = "#4a90e2";
    phoneFriendButton.style.backgroundColor = "#4a90e2";
    fiftyFiftyButton.style.backgroundColor = "#4a90e2";

    resultsList.innerHTML = "";
  }
  //ifeline functions
  function useAudienceHelp() {
    if (!isGameActive || audienceHelpUsed) return;

    audienceHelpUsed = true;
    audienceHelpButton.disabled = true;
    audienceHelpButton.style.backgroundColor = "#cccccc";

    const question = questions[currentQuestionIndex];
    const communityVotes = [0, 0, 0, 0];
    communityVotes[question.correctAnswer] = Math.floor(
      Math.random() * 60 + 40
    );

    let remainingPercent = 100 - communityVotes[question.correctAnswer];
    for (let i = 0; i < 4; i++) {
      if (i !== question.correctAnswer) {
        const vote = Math.floor(Math.random() * remainingPercent);
        communityVotes[i] = vote;
        remainingPercent -= vote;
      }
    }

    statusElement.textContent = `Dev Community votes: 
        A: ${communityVotes[0]}%, 
        B: ${communityVotes[1]}%, 
        C: ${communityVotes[2]}%, 
        D: ${communityVotes[3]}%`;
  }

  function usePhoneFriend() {
    if (!isGameActive || phoneFriendUsed) return;

    phoneFriendUsed = true;
    phoneFriendButton.disabled = true;
    phoneFriendButton.style.backgroundColor = "#cccccc";

    const question = questions[currentQuestionIndex];
    const seniorIsCorrect = Math.random() < 0.8;
    const seniorAnswer = seniorIsCorrect
      ? question.correctAnswer
      : Math.floor(Math.random() * 4);

    const responses = [
      "After checking the documentation, I'm pretty sure it's",
      "Based on my experience, I'd say",
      "Let me think... I believe it's",
      "I've dealt with this before, it's definitely",
    ];

    const response = responses[Math.floor(Math.random() * responses.length)];
    statusElement.textContent = `Senior Dev: "${response} ${String.fromCharCode(
      65 + seniorAnswer
    )}"`;
  }

  function useFiftyFifty() {
    if (!isGameActive || fiftyFiftyUsed) return;

    fiftyFiftyUsed = true;
    fiftyFiftyButton.disabled = true;
    fiftyFiftyButton.style.backgroundColor = "#cccccc";

    const question = questions[currentQuestionIndex];
    const wrongAnswers = [0, 1, 2, 3]
      .filter((index) => index !== question.correctAnswer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);

    wrongAnswers.forEach((index) => {
      options[index].style.display = "none";
    });
  }

  startButton.addEventListener("click", startGame);
  resetButton.addEventListener("click", resetGame);
  audienceHelpButton.addEventListener("click", useAudienceHelp);
  phoneFriendButton.addEventListener("click", usePhoneFriend);
  fiftyFiftyButton.addEventListener("click", useFiftyFifty);

  resetGame();
});
