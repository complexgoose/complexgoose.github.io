const numPoints = 1000;
let time =0;
const timeScale = .005;
const size = 1;

function setup() {
  createCanvas(innerWidth, innerHeight);
  noStroke();
  fill(0);
}

function draw() {
  time += timeScale;
  //background(220);
  const xo = width/2;
  const yo = height/2;
  for(let i=0;i<numPoints;i++) {
    const r = noise(i)*width/2;
    const a = noise(i,time)*TWO_PI;
    const x = xo+r*cos(a);
    const y = xo+r*sin(a);
    circle(x,y,size);
  }
}