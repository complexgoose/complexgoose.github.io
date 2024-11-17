let x,y;
let a = 0;
let time = 0;

const pointSize = 5;
const spinSpeed = pointSize/2;
const driftSpeed = .05;
const animSpeed = 50;

function setup() {
  createCanvas(innerWidth,innerHeight);
  x = width/2;
  y = 0;
  background(255);
  noStroke();
  fill(0);
}

function draw() {
  for(let i=0;i<animSpeed;i++) {
    circle(x,y,pointSize);
    x += spinSpeed * cos(a);
    y += (spinSpeed * sin(a))+driftSpeed;
    a += PI/500+PI/100*(time*.0001);
    time++;
  }
}