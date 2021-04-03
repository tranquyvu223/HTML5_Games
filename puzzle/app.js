var puzzles = [];
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
      html += `<img id="img-${randomPuzzles[row][col]}" src="./assets/${randomPuzzles[row][col]}.jpg" width="50">`;
      if (col == 9) {
        html += "<br>";
      }
    }
  }
  var game = document.querySelector('#game');
  game.innerHTML = html;
}

function gameStart() {
  initPuzzles();
  initRandomPuzzles();
  showRandomPuzzles();
}

//======================== START =========================
gameStart();