var randomNumArr = [];
class Grid {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.grid = new Array(this.rows);
    for (var i = 0; i < this.rows; i++) {
      this.grid[i] = new Array(this.cols);
    }
  }
  createRandomNum() {
    while (randomNumArr.length < 25) {
      let r = floor(random() * 100) + 1;
      if (randomNumArr.indexOf(r) === -1) randomNumArr.push(r); //creating a list of 25 random distinct integers
    }
    sort(randomNumArr);
  }
  initGrid() {
    this.createRandomNum();
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        var m = false;
        if (i == 0 || j == 0 || i == this.rows - 1 || j == this.cols - 1) {
          m = false; //the outer boundary grids are empty, not mines
        } else if (randomNumArr.includes(10 * (i - 1) + j)) {
          m = true; //these particular grids will be a mine
        }
        this.grid[i][j] = new Cell(j * w + 1, i * w + 1, w, m);
      }
    }
  }
  popGrid() {
    for (var i = 1; i < this.rows - 1; i++) {
      for (var j = 1; j < this.cols - 1; j++) {
        if (!this.grid[i][j].isMine()) {
          var num = this.countNeighbours(i, j);
          this.grid[i][j].mineCountSet(num);
        }
      }
    }
  }
  countNeighbours(i, j) {
    var t = 0;
    {
      for (var x = i - 1; x <= i + 1; x++) {
        for (var y = j - 1; y <= j + 1; y++) {
          if (this.grid[x][y].isMine()) {
            t++;
          }
        }
      }
    }
    return t;
  }
  revealNeighbours(i, j) {
    for (var x = i - 1; x <= i + 1; x++) {
      for (var y = j - 1; y <= j + 1; y++) {
        if (x != 0 && x != 11 && y != 0 && y != 11) {
          var neighbour = this.grid[x][y];
          if (!neighbour.isRevealed()) {
            this.revealGrid(x, y);
          }
        }
      }
    }
  }
  revealGrid(x, y) {
    var currentGrid = this.grid[x][y];
    currentGrid.reveal();
    if (currentGrid.mineCount == 0) {
      this.revealNeighbours(x, y);
    }
  }

  showGrid() {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        if (i == 0 || j == 0 || i == this.rows - 1 || j == this.cols - 1) {
          continue; //not drawing the outer enclosing grid
        }
        var currentGrid = this.grid[i][j];
        currentGrid.showCell();
        if (currentGrid.contains(mouseX, mouseY) && !currentGrid.isRevealed()) {
          currentGrid.changeImage();
        }
        if (mouseIsPressed && currentGrid.contains(mouseX, mouseY)) {
          if (mouseButton == LEFT) {
            if (!currentGrid.isMine()) {
              this.revealGrid(i, j);
            } else {
              //this.gameOver();
              mineX = i;
              mineY = j;
              this.revealBoard();
            }
          } else {
            //right click
            if (!currentGrid.marked) currentGrid.mark();
            else currentGrid.unmark();
          }
        }
      }
    }
  }
  // gameOver() {
  //   this.revealBoard();
  //   text("GAMEOVER", 400, 400);
  // }
  revealBoard() {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.grid[i][j].reveal();
      }
    }
  }
}
