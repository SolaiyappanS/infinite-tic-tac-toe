var isXTurn = true;
var co_ordinates = [
  [-1, -1],
  [-1, -1],
  [-1, -1],
  [-1, -1],
  [-1, -1],
  [-1, -1],
];
var isAvailable = [
  [true, true, true],
  [true, true, true],
  [true, true, true],
];
var canRefresh = false;
var gameWin = false;
var gameWinCells = [
  [-1, -1],
  [-1, -1],
  [-1, -1],
];
var winColor = "#0000";

$(document).ready(function () {
  for (var i = 0; i < 3; i++)
    for (var j = 0; j < 3; j++)
      $(`#gameCell_${i}_${j}`)
        .css({ color: "#0000", textShadow: "none" })
        .html("&nbsp;");
});

const pickCell = (x, y) => {
  if (isAvailable[x][y] && !gameWin) {
    if (co_ordinates[0][0] != -1 && co_ordinates[0][1] != -1) {
      $(`#gameCell_${co_ordinates[0][0]}_${co_ordinates[0][1]}`)
        .css("color", "#0000")
        .html("&nbsp;");
      isAvailable[co_ordinates[0][0]][co_ordinates[0][1]] = true;
    }
    canRefresh = true;
    for (var i = 0; i < 5; i++) {
      co_ordinates[i] = co_ordinates[i + 1];
    }
    co_ordinates[5] = [x, y];
    isAvailable[x][y] = false;
    if (co_ordinates[0][0] != -1 && co_ordinates[0][1] != -1) {
      $(`#gameCell_${co_ordinates[0][0]}_${co_ordinates[0][1]}`).css(
        "color",
        isXTurn ? "#ff04" : "#0ff4"
      );
      isAvailable[co_ordinates[0][0]][co_ordinates[0][1]] = true;
    }
    $(`#gameCell_${x}_${y}`)
      .css("color", isXTurn ? "#0ff" : "#ff0")
      .html(isXTurn ? "X" : "O");
    isXTurn = !isXTurn;
  }
  checkGameWin();
  $("#refreshBtn").css("opacity", canRefresh ? "1" : "0.3");
};

const refreshBoard = () => {
  if (canRefresh) {
    for (var i = 0; i < 3; i++)
      for (var j = 0; j < 3; j++)
        $(`#gameCell_${i}_${j}`)
          .css({ color: "#0000", textShadow: "none" })
          .html("&nbsp;");
    isXTurn = true;
    co_ordinates = [
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
      [-1, -1],
    ];
    isAvailable = [
      [true, true, true],
      [true, true, true],
      [true, true, true],
    ];
    canRefresh = false;
    gameWin = false;
  }
  $("#refreshBtn").css("opacity", canRefresh ? "1" : "0.3");
};

const checkGameWin = () => {
  var gameCells = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  for (var i = 0; i < 3; i++)
    for (var j = 0; j < 3; j++)
      gameCells[i][j] = $(`#gameCell_${i}_${j}`).html();

  if (
    gameCells[0][0] === gameCells[0][1] &&
    gameCells[0][1] === gameCells[0][2] &&
    gameCells[0][0] !== "&nbsp;"
  ) {
    gameWin = true;
    gameWinCells = [
      [0, 0],
      [0, 1],
      [0, 2],
    ];
    winColor = gameCells[0][0] === "X" ? "#0ff" : "#ff0";
  } else if (
    gameCells[1][0] === gameCells[1][1] &&
    gameCells[1][1] === gameCells[1][2] &&
    gameCells[1][0] !== "&nbsp;"
  ) {
    gameWin = true;
    gameWinCells = [
      [1, 0],
      [1, 1],
      [1, 2],
    ];
    winColor = gameCells[1][0] === "X" ? "#0ff" : "#ff0";
  } else if (
    gameCells[2][0] === gameCells[2][1] &&
    gameCells[2][1] === gameCells[2][2] &&
    gameCells[2][0] !== "&nbsp;"
  ) {
    gameWin = true;
    gameWinCells = [
      [2, 0],
      [2, 1],
      [2, 2],
    ];
    winColor = gameCells[2][0] === "X" ? "#0ff" : "#ff0";
  } else if (
    gameCells[0][0] === gameCells[1][0] &&
    gameCells[1][0] === gameCells[2][0] &&
    gameCells[0][0] !== "&nbsp;"
  ) {
    gameWin = true;
    gameWinCells = [
      [0, 0],
      [1, 0],
      [2, 0],
    ];
    winColor = gameCells[0][0] === "X" ? "#0ff" : "#ff0";
  } else if (
    gameCells[0][1] === gameCells[1][1] &&
    gameCells[1][1] === gameCells[2][1] &&
    gameCells[0][1] !== "&nbsp;"
  ) {
    gameWin = true;
    gameWinCells = [
      [0, 1],
      [1, 1],
      [2, 1],
    ];
    winColor = gameCells[0][1] === "X" ? "#0ff" : "#ff0";
  } else if (
    gameCells[0][2] === gameCells[1][2] &&
    gameCells[1][2] === gameCells[2][2] &&
    gameCells[0][2] !== "&nbsp;"
  ) {
    gameWin = true;
    gameWinCells = [
      [0, 2],
      [1, 2],
      [2, 2],
    ];
    winColor = gameCells[0][2] === "X" ? "#0ff" : "#ff0";
  } else if (
    gameCells[0][0] === gameCells[1][1] &&
    gameCells[1][1] === gameCells[2][2] &&
    gameCells[0][0] !== "&nbsp;"
  ) {
    gameWin = true;
    gameWinCells = [
      [0, 0],
      [1, 1],
      [2, 2],
    ];
    winColor = gameCells[0][0] === "X" ? "#0ff" : "#ff0";
  } else if (
    gameCells[0][2] === gameCells[1][1] &&
    gameCells[1][1] === gameCells[2][0] &&
    gameCells[2][0] !== "&nbsp;"
  ) {
    gameWin = true;
    gameWinCells = [
      [0, 2],
      [1, 1],
      [2, 0],
    ];
    winColor = gameCells[0][2] === "X" ? "#0ff" : "#ff0";
  } else {
    gameWin = false;
    gameWinCells = [
      [-1, -1],
      [-1, -1],
      [-1, -1],
    ];
    winColor = "#0000";
  }
  if (gameWin) {
    for (var i = 0; i < 3; i++) {
      $(`#gameCell_${gameWinCells[i][0]}_${gameWinCells[i][1]}`).css(
        "textShadow",
        `0 0 1.75vh ${winColor}`
      );
    }
  }
};
