var puzzles = [];
var blankPosition = { row: null, col: null };
const MAX_ROW = 5;
const MAX_COL = 10;

function initPuzzles() {
  for (let row = 1; row <= MAX_ROW; row++) {
    var newRow = [];
    for (let col = 1; col <= MAX_COL; col++) {
      var image = (row - 1) * MAX_COL + col;
      newRow.push(image);
    }
    puzzles.push(newRow);
  }
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

var randomPuzzles = [];
function initRandomPuzzles() {
  var stack = []; // Chứa các giá trị đã random
  for (let row = 0; row < MAX_ROW; row++) {
    var newRow = [];
    for (let col = 0; col < MAX_COL; col++) {
      var rd;
      do {
        rd = randomInteger(1, MAX_ROW * MAX_COL);
      } while (stack.includes(rd));
      
      if (rd == 1) {
        blankPosition = { row, col };
      }
      newRow.push(rd);
      stack.push(rd);

      if (newRow.length == 10) {
        randomPuzzles.push(newRow);
      }
    }
  }
}

function showRandomPuzzles() {
  var html = '';
  for (let row = 0; row < MAX_ROW; row++) {
    for (let col = 0; col < MAX_COL; col++) {
      html += `<img id="img-${row}-${col}" src="./assets/${randomPuzzles[row][col]}.jpg" width="50">`;
      if (col == 9) {
        html += "<br>";
      }
    }
  }
  var game = document.querySelector('#game');
  game.innerHTML = html;
}

function control() {
  document.onkeydown = function (e) {
    switch (e.key) {
      case 'ArrowLeft':
        console.log('Left Arrow key has been pressed');
        switchPosition(e.key);
        break;
      case'ArrowUp':
        console.log('Up Arrow key has been pressed');
        switchPosition(e.key);
        break;
      case 'ArrowRight':
        console.log('Right Arrow key has been pressed');
        switchPosition(e.key);
        break;
      case 'ArrowDown':
        console.log('Down Arrow key has been pressed');
        switchPosition(e.key);
        break;
    }
  }
}

function switchPosition(key) {
  // Xác định ảnh cần switch
  var objectPosition = { row: null, col: null };
  switch (key) {
    case 'ArrowLeft':
      if (blankPosition.col != MAX_COL - 1) {
        objectPosition.row = blankPosition.row;
        objectPosition.col = blankPosition.col + 1;
      }
      break;
    case'ArrowUp':
      if (blankPosition.row != MAX_ROW - 1) {
        objectPosition.row = blankPosition.row + 1;
        objectPosition.col = blankPosition.col;
      }
      break;
    case 'ArrowRight':
      if (blankPosition.col != 0) {
        objectPosition.row = blankPosition.row;
        objectPosition.col = blankPosition.col - 1;
      }
      break;
    case 'ArrowDown':
      if (blankPosition.row != 0) {
        objectPosition.row = blankPosition.row - 1;
        objectPosition.col = blankPosition.col;
      }
      break;
  }
  // Tiến hành đổi vị trí của ảnh ở vị trí blankPosition và ảnh ở vị trí objectPosition
  if (objectPosition.col != null || objectPosition.row != null) {
    var objectID = `#img-${(objectPosition.row)}-${(objectPosition.col)}`;
    var blankObjectID = `#img-${(blankPosition.row)}-${(blankPosition.col)}`;
    var x = document.querySelector(objectID).src;
    document.querySelector(objectID).src = document.querySelector(blankObjectID).src;
    document.querySelector(blankObjectID).src = x;
    // Cập nhật lại vị trí của blank
    blankPosition = objectPosition;
  }
}

function gameStart() {
  initPuzzles();
  initRandomPuzzles();
  showRandomPuzzles();
  control();
}

//======================== START =========================
gameStart();