const cells = document.querySelectorAll(".cell");
const board = document.getElementById("board");
const statusText = document.getElementById("status");
const playerText = document.getElementById("player");
const resetBtn = document.getElementById("resetBtn");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const scoreTie = document.getElementById("scoreTie");

let currentPlayer = "X";
let gameBoard = Array(9).fill("");
let running = true;
let scores = { X: 0, O: 0, Tie: 0 };

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach(cell => cell.addEventListener("click", cellClicked));
resetBtn.addEventListener("click", resetGame);

function cellClicked() {
  const index = this.getAttribute("data-index");
  if (gameBoard[index] !== "" || !running) return;

  gameBoard[index] = currentPlayer;
  this.textContent = currentPlayer;
  this.classList.add(currentPlayer);

  checkWinner();
}

function checkWinner() {
  let roundWon = false;
  let winningCells = [];

  for (const condition of winPatterns) {
    const [a, b, c] = condition;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      roundWon = true;
      winningCells = [a, b, c];
      break;
    }
  }

  if (roundWon) {
    highlightWinner(winningCells);
    statusText.textContent = `Winner: ${currentPlayer}`;
    scores[currentPlayer]++;
    updateScores();
    running = false;
  } else if (!gameBoard.includes("")) {
    statusText.textContent = "It's a tie!";
    scores.Tie++;
    updateScores();
    running = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerText.textContent = currentPlayer;
  }
}

function highlightWinner(cellsIndex) {
  cellsIndex.forEach(i => cells[i].classList.add("winning"));
}

function updateScores() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
  scoreTie.textContent = scores.Tie;
}

function resetGame() {
  gameBoard.fill("");
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("X", "O", "winning");
  });
  currentPlayer = "X";
  playerText.textContent = currentPlayer;
  statusText.textContent = "Next Player: X";
  running = true;
}
