class Cell {
  constructor(x, y, w, m) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.mine = m; // is a mine if m is true
    this.mineCount = 0;
    this.revealed = false;
    this.marked = false;
  }
  isBoundary() {
    //I made my main grid to have 2 more rows and columns each, these aren't displayed, but for easy computation.
    if (this.x == 0 || this.x == 11 || this.y == 0 || this.y == 11) {
      return true;
    }
  }

  mark() {
    this.marked = true;
  }
  unmark() {
    this.marked = false;
  }
  contains(_x, _y) {
    //checks whether a particular x,y is within a cell or not
    if (_x > this.x && _x < this.x + this.w && _y > this.y && _y < this.y + this.w) {
      return true;
    }
    return false;
  }
  reveal() {
    this.revealed = true;
  }
  mineCountSet(num) {
    this.mineCount = num;
  }
  isMine() {
    return this.mine;
  }
  isRevealed() {
    return this.revealed;
  }
  changeImage() {
    image(images[13], this.x, this.y, this.w, this.w, 0, 0);
  }
  showCell() {
    if (this.marked) {
      //displays the flag image
      image(images[11], this.x, this.y, this.w, this.w, 0, 0);
    }
    if (this.isRevealed()) {
      if (!this.isMine()) {
        //not a mine
        image(images[this.mineCount], this.x, this.y, this.w, this.w, 0, 0); //shows the appropriate image according to mineCount
      } else {
        //if it is a mine
        if (mineX != 0 && mineY != 0) {
          image(images[13], this.x, this.y, this.w, this.w, 0, 0);
        } else {
          image(images[0], this.x, this.y, this.w, this.w, 0, 0);
        }
        image(images[9], this.x, this.y, this.w, this.w, 0, 0);
      }
    } else {
      image(images[10], this.x, this.y, this.w, this.w, 0, 0);
    }
  }
}
