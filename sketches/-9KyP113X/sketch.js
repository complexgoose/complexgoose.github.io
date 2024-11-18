let squareSize;
let time = 0;
const timeScale = .005;
function setup() {
  createCanvas(innerWidth, innerHeight);
  background(255);
  rectMode(CENTER);
  fill(0);
  noStroke();
  squareSize = max(width,height);
}

function draw() {
  background(255);
  for(const x of [0,width]) {
    for(const y of [0,height]) {
      push();
      translate(x,y);
      rotate(noise(x,y,time)*TWO_PI);
      square(0,0,squareSize);
      pop();
    }
  }
  time += timeScale;
}