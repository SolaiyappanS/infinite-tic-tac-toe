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

const pickCell = (x, y) => {
  if (isAvailable[x][y]) {
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
  $("#refreshBtn").css("opacity", canRefresh ? "1" : "0.3");
};

const refreshBoard = () => {
  if (canRefresh) {
    for (var i = 0; i < 3; i++)
      for (var j = 0; j < 3; j++)
        $(`#gameCell_${i}_${j}`).css("color", "#0000").html("&nbsp;");
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
  }
  $("#refreshBtn").css("opacity", canRefresh ? "1" : "0.3");
};
