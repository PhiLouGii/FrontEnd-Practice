const board = document.getElementById('board');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart-btn');
const scoreboardText = document.getElementById('scoreboard');
const pvpBtn = document.getElementById('pvp-btn');
const aiBtn = document.getElementById('ai-btn');

let currentPlayer = 'X';
let gameActive = false;
let isPvP = true;
let xWins = 0, oWins = 0, ties = 0;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleCellClick(event) {
  const clickedCell = event.target;
  const cellIndex = clickedCell.getAttribute('data-index');

  if (gameState[cellIndex] !== "" || !gameActive) return;

  gameState[cellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  checkWinner();

  if (isPvP) {
    switchPlayer();
  } else if (gameActive && currentPlayer === 'O') {
    setTimeout(aiMove, 500); // Delay for AI move
  }
}

function checkWinner() {
  let roundWon = false;

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      highlightWinningCells([a, b, c]);
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${currentPlayer} Wins!`;
    updateScore(currentPlayer);
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    statusText.textContent = `It's a Tie!`;
    ties++;
    updateScore();
    gameActive = false;
    return;
  }

  if (gameActive) switchPlayer();
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `${currentPlayer}'s Turn`;
}

function highlightWinningCells(cells) {
  cells.forEach(index => {
    board.children[index].classList.add('winning');
  });
}

function updateScore(winner) {
  if (winner === 'X') xWins++;
  if (winner === 'O') oWins++;
  scoreboardText.textContent = `X: ${xWins} | O: ${oWins} | Ties: ${ties}`;
}

function restartGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `${currentPlayer}'s Turn`;

  Array.from(board.children).forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winning');
  });
}

function createBoard() {
  board.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  }
}

function aiMove() {
  const emptyCells = gameState.map((value, index) => value === "" ? index : null).filter(val => val !== null);
  const bestMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];

  if (bestMove !== undefined) {
    gameState[bestMove] = 'O';
    board.children[bestMove].textContent = 'O';
    checkWinner();
  }
}

pvpBtn.addEventListener('click', () => {
  isPvP = true;
  startGame();
});

aiBtn.addEventListener('click', () => {
  isPvP = false;
  startGame();
});

restartBtn.addEventListener('click', restartGame);

function startGame() {
  createBoard();
  restartGame();
  gameActive = true;
  statusText.textContent = `${currentPlayer}'s Turn`;
}

startGame();
