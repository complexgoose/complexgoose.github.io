const maxPoints = 10000;
let time = 0;
const noiseScale = .005;
const timeScale = .005;

function uniformNoise(x,y) {
  return (2*noise(x,y))-.5;
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  noFill();
}

function draw() {
  // stroke(random(256),random(256),random(256));
  if(time>0) {
    time -= 3*timeScale;
  }
  const numPoints = floor(random(4,maxPoints+1));
  beginShape();
  for (let i=0;i<numPoints;i++) {
    curveVertex(noise(0,time)*width,noise(1,time)*height);
    time += timeScale;
  }
  endShape();
}