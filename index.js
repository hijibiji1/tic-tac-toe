window.addEventListener("DOMContentLoaded", () => {
  const boxes = Array.from(document.querySelectorAll(".box"));
  const displayPlayer = document.querySelector(".display-player");
  const resetButton = document.querySelector(".reset");
  const announcer = document.querySelector(".announcer");

  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let isGameActive = true;

  const PLAYERX_WON = "PLAYERX_WON";
  const PLAYERY_WON = "PLAYERY_WON";
  const TIE = "TIE";

  const winningCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  boxes.forEach((box, index) => {
    box.addEventListener("click", () => userAction(box, index));
  });

  const userAction = (box, index) => {
    if (isValidAction(box) && isGameActive) {
      box.classList.add(`player${currentPlayer}`);
      box.innerText = currentPlayer;
      updateBoard(index);
      resultHandler();
      changePlayer();
    }
  };

  const isValidAction = (box) => {
    if (box.innerText === "X" || box.innerText === "O") {
      return false;
    }
    return true;
  };

  const updateBoard = (index) => {
    board[index] = currentPlayer;
  };

  const resultHandler = () => {
    let roundWon = false;
    for (let i = 0; i < winningCondition.length; i++) {
      const winCondition = winningCondition[i];
      const a = board[winCondition[0]];
      const b = board[winCondition[1]];
      const c = board[winCondition[2]];
      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b == c) {
        roundWon = true;
        break;
      }
    }
    if (roundWon) {
      announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERY_WON);
      isGameActive = false;
      return;
    }
    if (!board.includes("")) {
      announce(TIE);
    }
  };

  const announce = (type) => {
    console.log(type);
    switch (type) {
      case PLAYERX_WON:
        announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
        break;
      case PLAYERY_WON:
        announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
        break;
      case TIE:
        announcer.innerHTML = "Tie";
        break;
    }
    announcer.classList.remove("hide");
  };

  const changePlayer = () => {
    displayPlayer.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    displayPlayer.innerText = currentPlayer;
    displayPlayer.classList.add(`player${currentPlayer}`);
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    announcer.classList.add("hide");

    currentPlayer === "O" ? changePlayer() : null;

    boxes.forEach((box) => {
      box.innerText = "";
      box.classList.remove("playerX");
      box.classList.remove("playerO");
    });
  };

  resetButton.addEventListener("click", resetBoard);
});
