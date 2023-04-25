const X_CLASS = "x";
const O_CLASS = "o";
const cellElements = document.querySelectorAll("[data-cell]"); // array of data-cell -> [element, element, ...]
const board = document.getElementById("board");
const restartbtn = document.getElementById("restartbtn");
const WINNING_COMBINATION = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

let countO = Number(window.localStorage.getItem("countO"));
let countX = Number(window.localStorage.getItem("countX"));
const countOElement = document.getElementById("countO");
const countXElement = document.getElementById("countX");
const Clear = document.getElementById("btnClear");

let OTurn;

const winningMessageElement = document.getElementById("winningMessage");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message]"
);
countOElement.innerText = `Player O: ${countO}`;
countXElement.innerText = `Player X: ${countX}`;
Clear.innerText = `Reset Score`;

startGame();

restartbtn.addEventListener("click", startGame);

function startGame() {
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  borderHover();
  winningMessageElement.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = OTurn ? O_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    if (currentClass == O_CLASS) {
      countO = countO + 1;
      window.localStorage.setItem("countO", countO);
      countOElement.innerText = `Player O: ${countO}`;
    } else if (currentClass == X_CLASS) {
      countX = countX + 1;
      window.localStorage.setItem("countX", countX);
      countXElement.innerText = `Player X: ${countX}`;
    }
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  }
  swapTurns();
  borderHover();
}

function isDraw() {
  return [...cellElements].every((index2) => {
    return (
      index2.classList.contains(O_CLASS) || index2.classList.contains(X_CLASS)
    );
  });
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw!";
    console.log("draw");
  } else {
    winningMessageTextElement.innerText = `${OTurn ? "O's" : "X's"} Wins!`;
  }
  winningMessageElement.classList.add("show");
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}
function swapTurns() {
  OTurn = !OTurn;
}

function borderHover() {
  board.classList.remove(O_CLASS);
  board.classList.remove(X_CLASS);
  if (OTurn) {
    board.classList.add(O_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATION.some((combination) => {
    return combination.every((index) => {
      console.log(index);
      return cellElements[index - 1].classList.contains(currentClass);
    });
  });
}

Clear.addEventListener("click", () => {
  window.localStorage.clear();
  countO = 0;
  countX = 0;
  countOElement.innerText = `Player O: ${countO}`;
  countXElement.innerText = `Player X: ${countX}`;
});
