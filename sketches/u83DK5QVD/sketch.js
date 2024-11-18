const numLines = 30;
const maxStep = 300;
const noiseScale = .005;
const maxPoints = 100;

function rangeNoise(x,y,z,range) {
  return (2*noise(x*noiseScale,y*noiseScale,z*noiseScale)*range)-range;
}

function setup() {
  createCanvas(innerWidth,innerHeight,SVG);
  noFill();
  for(let i=0;i<numLines;i++) {
    let x = random(width);
    let y = random(height);
    beginShape();
    let pointI = 0;
    while(x>=0&&x<=width&&y>=0&&y<=height&&pointI++ < maxPoints) {
      const xStep = rangeNoise(i*10,x,y,maxStep);
      const yStep = rangeNoise(i*100,x,y,maxStep);
      curveVertex(x,y);
      x += xStep;
      y += yStep;
    }
    endShape();
  }
}

function draw() {
}