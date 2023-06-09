// Initialize variables
let currentPlayer = "X";
let player1Score = 0;
let player2Score = 0;
let isGameOver = false;
const win = new Audio("./Audio/win.mp3");
// Get game cells and scoreboard elements
const cells = document.querySelectorAll(".cell");
const player1ScoreElement = document.getElementById("player1-score");
const player2ScoreElement = document.getElementById("player2-score");
const resetButton = document.getElementById("reset-btn");
const newRoundButton = document.getElementById("new-round-btn");

const icon = document.querySelector(".symbol");
const text = document.querySelector("p");
// Add click event listener to game cells
function player1() {
  icon.classList.remove("fa-x", "yellow");
  icon.classList.add("fa-o", "turquoise");
  text.textContent = "Player 2, you're up!";
  text.classList.remove("yellow");
  text.classList.add("turquoise");
}
function player2() {
  icon.classList.remove("fa-o", "turquoise");
  icon.classList.add("fa-x", "yellow");
  text.textContent = "Player 1, you're up!";
  text.classList.remove("turquoise");
  text.classList.add("yellow");
}
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    // Check if game is over
    if (isGameOver) {
      return;
    }

    // Check if cell is already filled
    if (cell.textContent !== "") {
      return;
    }
    const xSound = new Audio("./Audio/xTone.mp3");
    const oSound = new Audio("./Audio/OTone.mp3");
    // Update cell and current player
    cell.textContent = currentPlayer;
    cell.className = `${currentPlayer === "X" ? "x" : "o"} cell`;
    if (currentPlayer === "X") {
      player1();
      xSound.play();
    } else {
      player2();
      oSound.play();
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    // Check for winner
    if (checkForWinner()) {
      isGameOver = true;
      updateScoreboard();
      return;
    }

    // Check for tie game
    if (checkForTieGame()) {
      isGameOver = true;
      return;
    }
  });
});

// Add click event listener to reset button
resetButton.addEventListener("click", resetGame);

// Add click event listener to new round button
newRoundButton.addEventListener("click", startNewRound);

// Function to check for winner
function checkForWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];

    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      if (currentPlayer === "X") {
        player1();
        text.textContent = "Player 2, Win!";
      } else {
        player2();
        text.textContent = "Player 1, Win!";
      }
      win.play();
      return true;
    }
  }

  return false;
}

// Function to check for tie game
function checkForTieGame() {
  const errorSound = new Audio("./Audio/error.mp3");
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].textContent === "") {
      return false;
    }
  }

  errorSound.play();
  // alert("Tie game!");
  // resetGame();
  return true;
}

// Function to update scoreboard
function updateScoreboard() {
  if (currentPlayer === "X") {
    player2Score++;
    player2ScoreElement.textContent = player2Score;
    // alert("Player 2 wins!");
  } else {
    player1Score++;
    player1ScoreElement.textContent = player1Score;
    // alert("Player 1 wins!");
  }
}

// Function to reset game
function resetGame() {
  // const ele = document.querySelector(".symbol")
  // ele.style.animation ="animation: 0.6s ease-in-out turn-icon-animation"
  player2();

  win.pause();
  cells.forEach((cell) => {
    cell.textContent = "";
  });

  currentPlayer = "X";
  isGameOver = false;
}

// Function to start new round
function startNewRound() {
  player2();
  resetGame();
  player1Score = 0;
  player2Score = 0;
  player1ScoreElement.textContent = player1Score;
  player2ScoreElement.textContent = player2Score;
}
