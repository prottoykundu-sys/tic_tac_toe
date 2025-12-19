const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popup-text");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

cells.forEach(cell => cell.addEventListener("click", handleClick));

function handleClick(e) {
    const index = e.target.dataset.index;

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWinner()) {
        popupText.textContent = `Player ${currentPlayer} Wins!`;
        popup.style.display = "block";
        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        popupText.textContent = "It's a Draw!";
        popup.style.display = "block";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === currentPlayer);
    });
}

function newGame() {
    popupText.textContent = "Start a New Game?";
    popup.style.display = "block";
}

function closePopup() {
    popup.style.display = "none";
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Player X's turn";
}
