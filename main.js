var grid,
  rows,
  cols,
  mineImg,
  mineX = 0,
  mineY = 0;
var w = 60;
var images = [];
function preload() {
  for (var i = 0; i <= 13; i++) {
    images[i] = loadImage("Images/" + i + ".png");
  }
}
function setup() {
  var cnv = createCanvas(802, 802);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  rows = 12;
  cols = 12;
  grid = new Grid(rows, cols);
  grid.initGrid();
  grid.popGrid();
}

function draw() {
  grid.showGrid();
}
