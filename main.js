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
var gameCells = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
var gameWin = false;
var gameWinCells = [
  [-1, -1],
  [-1, -1],
  [-1, -1],
];
var winColor = "#0000";
var blocked_cell = [-1, -1];

$(document).ready(function () {
  for (var i = 0; i < 3; i++)
    for (var j = 0; j < 3; j++)
      $(`#gameCell_${i}_${j}`)
        .css({ color: "#0000", textShadow: "none" })
        .html("&nbsp;");
});

const pickCell = (x, y) => {
  if (
    isAvailable[x][y] &&
    !(blocked_cell[0] === x && blocked_cell[1] === y) &&
    !gameWin
  ) {
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
      blocked_cell[0] = co_ordinates[0][0];
      blocked_cell[1] = co_ordinates[0][1];
    }
    $(`#gameCell_${x}_${y}`)
      .css("color", isXTurn ? "#0ff" : "#ff0")
      .html(isXTurn ? "X" : "O");
    isXTurn = !isXTurn;
  }
  checkGameWin();
  $("#refreshBtn").css("opacity", canRefresh ? "1" : "0.3");
};

const isWin = (c1, c2, c3) =>
  gameCells[c1[0]][c1[1]] === gameCells[c2[0]][c2[1]] &&
  gameCells[c2[0]][c2[1]] === gameCells[c3[0]][c3[1]] &&
  gameCells[c1[0]][c1[1]] !== "&nbsp;";

const setWin = (c1, c2, c3) => {
  gameWin = true;
  gameWinCells = [
    [c1[0], c1[1]],
    [c2[0], c2[1]],
    [c3[0], c3[1]],
  ];
  winColor = gameCells[c1[0]][c1[1]] === "X" ? "#0ff" : "#ff0";
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
    blocked_cell = [-1, -1];
  }
  $("#refreshBtn").css({
    opacity: canRefresh ? "1" : "0.3",
    textShadow: "none",
  });
};

const checkGameWin = () => {
  for (var i = 0; i < 3; i++)
    for (var j = 0; j < 3; j++)
      gameCells[i][j] = $(`#gameCell_${i}_${j}`).html();

  if (isWin([0, 0], [0, 1], [0, 2])) setWin([0, 0], [0, 1], [0, 2]);
  else if (isWin([1, 0], [1, 1], [1, 2])) setWin([1, 0], [1, 1], [1, 2]);
  else if (isWin([2, 0], [2, 1], [2, 2])) setWin([2, 0], [2, 1], [2, 2]);
  else if (isWin([0, 0], [1, 0], [2, 0])) setWin([0, 0], [1, 0], [2, 0]);
  else if (isWin([0, 1], [1, 1], [2, 1])) setWin([0, 1], [1, 1], [2, 1]);
  else if (isWin([0, 2], [1, 2], [2, 2])) setWin([0, 2], [1, 2], [2, 2]);
  else if (isWin([0, 0], [1, 1], [2, 2])) setWin([0, 0], [1, 1], [2, 2]);
  else if (isWin([0, 2], [1, 1], [2, 0])) setWin([0, 2], [1, 1], [2, 0]);
  else {
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
      $(`#gameCell_${gameWinCells[i][0]}_${gameWinCells[i][1]}`).css({
        color: "#fffa",
        textShadow: `0 0 5px ${winColor}, 0 0 10px ${winColor}, 0 0 20px ${winColor}, 0 0 40px #fff`,
      });
    }
    $("#refreshBtn").css({
      opacity: canRefresh ? "1" : "0.3",
      textShadow: `0 0 5px ${winColor}, 0 0 10px ${winColor}, 0 0 20px ${winColor}, 0 0 40px #fff`,
    });
  }
};
