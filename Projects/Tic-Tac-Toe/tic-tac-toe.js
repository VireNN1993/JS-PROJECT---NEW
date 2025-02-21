document.addEventListener("DOMContentLoaded", () => {
  const gameBoard = document.getElementById("board"); // The game board element
  const gameStatus = document.getElementById("status"); // Element to display game status (win/draw)
  const turnDisplay = document.getElementById("turn-display"); // Element to display whose turn it is
  const difficultyLevel = document.getElementById("difficulty"); // Dropdown for difficulty level
  const resetGameButton = document.getElementById("reset"); // Reset game button
  const winsDisplay = document.getElementById("wins"); // Wins counter
  const lossesDisplay = document.getElementById("losses"); // Losses counter
  const drawsDisplay = document.getElementById("draws"); // Draws counter

  let boardCells = ["", "", "", "", "", "", "", "", ""]; // Array to store the state of each cell
  let currentPlayer = "X"; // Current player (X or O)
  let isGameRunning = true; // Flag to check if the game is still running
  let wins = 0,
    losses = 0,
    draws = 0; // Score counters

  // All possible winning combinations
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  // Function to draw the game board
  function drawBoard() {
    gameBoard.innerHTML = "";
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (boardCells[i] === "X") cell.classList.add("X");
      if (boardCells[i] === "O") cell.classList.add("O");
      cell.dataset.index = i;
      cell.addEventListener("click", handleCellClick);
      gameBoard.appendChild(cell);
    }
  }

  // Function to handle cell clicks
  function handleCellClick(event) {
    const clickedCellIndex = event.target.dataset.index;
    if (boardCells[clickedCellIndex] !== "" || !isGameRunning) return;

    boardCells[clickedCellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add(currentPlayer);
    checkIfGameOver();

    if (isGameRunning) {
      currentPlayer = "O";
      turnDisplay.textContent = "Computer's turn (O)";
      setTimeout(computerTurn, 500); // Computer takes its turn after 0.5 seconds
    }
  }

  // Function for the computer's turn
  function computerTurn() {
    let computerMove;
    const selectedDifficulty = difficultyLevel.value;

    if (selectedDifficulty === "easy") {
      computerMove = getRandomCell(); // Easy: random move
    } else if (selectedDifficulty === "medium") {
      computerMove = getSmartMove(); // Medium: tries to win or block
    } else if (selectedDifficulty === "hard") {
      computerMove = getBestMove(); // Hard: uses Minimax algorithm
    }

    if (computerMove !== undefined) {
      boardCells[computerMove] = "O";
      const cell = document.querySelector(`[data-index="${computerMove}"]`);
      cell.textContent = "O";
      cell.classList.add("O");
      checkIfGameOver();
      currentPlayer = "X";
      turnDisplay.textContent = "Your turn (X)";
    }
  }

  // Function to get a random empty cell
  function getRandomCell() {
    const emptyCells = boardCells
      .map((cell, index) => (cell === "" ? index : null))
      .filter((cell) => cell !== null);
    return emptyCells.length > 0
      ? emptyCells[Math.floor(Math.random() * emptyCells.length)]
      : undefined;
  }

  // Function to get a smart move (tries to win or block)
  function getSmartMove() {
    let move = findWinningMove("O"); // Try to win
    if (move === undefined) move = findWinningMove("X"); // Try to block the player
    if (move === undefined) move = getRandomCell(); // Otherwise, random move
    return move;
  }

  // Function to find a winning move for a player
  function findWinningMove(player) {
    for (let line of winningLines) {
      const [a, b, c] = line;
      if (
        boardCells[a] === player &&
        boardCells[b] === player &&
        boardCells[c] === ""
      )
        return c;
      if (
        boardCells[a] === player &&
        boardCells[c] === player &&
        boardCells[b] === ""
      )
        return b;
      if (
        boardCells[b] === player &&
        boardCells[c] === player &&
        boardCells[a] === ""
      )
        return a;
    }
    return undefined;
  }

  // Function to get the best move using the Minimax algorithm
  function getBestMove() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 9; i++) {
      if (boardCells[i] === "") {
        boardCells[i] = "O";
        let score = minimax(boardCells, 0, false);
        boardCells[i] = "";
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  }

  // Minimax algorithm to evaluate the best move
  function minimax(board, depth, isMaximizing) {
    const result = checkForWinnerMinimax(board);
    if (result !== null) {
      return result === "O" ? 10 - depth : result === "X" ? depth - 10 : 0;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
          board[i] = "O";
          let score = minimax(board, depth + 1, false);
          board[i] = "";
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
          board[i] = "X";
          let score = minimax(board, depth + 1, true);
          board[i] = "";
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }

  // Function to check for a winner in the Minimax algorithm
  function checkForWinnerMinimax(board) {
    for (let line of winningLines) {
      const [a, b, c] = line;
      if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    if (!board.includes("")) {
      return "draw";
    }

    return null;
  }

  // Function to check if the game is over (win or draw)
  function checkIfGameOver() {
    for (let line of winningLines) {
      const [a, b, c] = line;
      if (
        boardCells[a] !== "" &&
        boardCells[a] === boardCells[b] &&
        boardCells[a] === boardCells[c]
      ) {
        isGameRunning = false;
        highlightWinningCells([a, b, c]);
        if (boardCells[a] === "X") {
          gameStatus.textContent = "You win!";
          wins++;
          winsDisplay.textContent = wins;
          setTimeout(() => alert("You win! 🎉"), 100); // Show alert after a short delay
        } else {
          gameStatus.textContent = "You lose!";
          losses++;
          lossesDisplay.textContent = losses;
          setTimeout(() => alert("You lose! 😢"), 100); // Show alert after a short delay
        }
        resetBoard();
        return;
      }
    }

    if (!boardCells.includes("")) {
      isGameRunning = false;
      gameStatus.textContent = "It's a draw!";
      draws++;
      drawsDisplay.textContent = draws;
      setTimeout(() => alert("It's a draw! 🤝"), 100); // Show alert after a short delay
      resetBoard();
    }
  }

  // Function to highlight the winning cells
  function highlightWinningCells(cells) {
    cells.forEach((index) => {
      const cell = document.querySelector(`[data-index="${index}"]`);
      cell.classList.add("winning-cell");
    });
  }

  // Function to reset the board after the game ends
  function resetBoard() {
    setTimeout(() => {
      boardCells = ["", "", "", "", "", "", "", "", ""];
      currentPlayer = "X";
      isGameRunning = true;
      gameStatus.textContent = "";
      turnDisplay.textContent = "Your turn (X)";
      drawBoard();
    }, 1000); // Delay of 1 second before resetting the board
  }

  // Function to reset the entire game (board + scores)
  function restartGame() {
    wins = 0;
    losses = 0;
    draws = 0;
    winsDisplay.textContent = wins;
    lossesDisplay.textContent = losses;
    drawsDisplay.textContent = draws;
    resetBoard();
  }

  // Event listener for the reset button
  resetGameButton.addEventListener("click", restartGame);

  // Draw the initial board
  drawBoard();
});
