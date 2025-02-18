var board = document.getElementById("board");
var cells = board.getElementsByTagName("td");
var player = "X";

// Function to check for a win
function checkWin() {
  const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6], // Diagonal from top-right to bottom-left
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      cells[a].innerHTML !== "" &&
      cells[a].innerHTML === cells[b].innerHTML &&
      cells[a].innerHTML === cells[c].innerHTML
    ) {
      return true; // There's a winner
    }
  }
  return false; // No winner yet
}

// Function to check for a draw
function checkDraw() {
  for (let cell of cells) {
    if (cell.innerHTML === "") {
      return false; // Game is not a draw yet
    }
  }
  return true; // All cells are filled, it's a draw
}

// Function to show the win/draw modal
function showWinModal(message) {
  const modal = document.getElementById("winModal");
  const winMessage = document.getElementById("winMessage");
  winMessage.innerHTML = message;
  modal.style.display = "block";

  document.getElementById("closeModal").addEventListener("click", () => {
    modal.style.display = "none";
    resetGame();
  });
}

// Add event listeners to cells
for (var i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", function () {
    if (this.innerHTML === "") {
      this.innerHTML = player;

      // Check for a win
      if (checkWin()) {
        showWinModal(`Player ${player} WINS!`);
        return;
      }

      // Check for a draw
      if (checkDraw()) {
        showWinModal("It's a DRAW!");
        return;
      }

      // Switch players
      player = player === "X" ? "O" : "X";
    }
  });
}

// Reset button functionality
var resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", resetGame);

function resetGame() {
  for (var i = 0; i < cells.length; i++) {
    cells[i].innerHTML = "";
  }
  player = "X"; // Reset to player X
}