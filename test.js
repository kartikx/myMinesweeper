class Test {
  Test() {
    this.g = new Array(5);
    for (var i = 0; i < 5; i++) {
      this.g[i] = i + 1;
    }
  }
  init() {}
}
var arr;
function setup() {
  createCanvas(200, 200);
  arr = new Test();
  arr.init();
}

function draw() {
  // console.log(arr[0]);
  for (var i = 0; i < 5; i++) {
    ellipse(100, 100, arr[i] * 10);
  }
}
