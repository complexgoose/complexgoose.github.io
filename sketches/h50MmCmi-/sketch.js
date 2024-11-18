const brushSize = 5;
const numPoints = 1000;
const noiseScale = .005;
const timeScale = .005;
let time = 0;
const numDraws = 1;

function setup() {
  const minSide = min(innerWidth,innerHeight);
  createCanvas(minSide,minSide);
  colorMode(HSB);
  noStroke();
  const xmean = width/2;
  const xsd = width/2/3;
  const ymean = height/2;
  const ysd = height/2/3;
}

function draw() {
  for (let i=0;i<numDraws;i++) {
    time += timeScale;
    for(let i=0;i<numPoints;i++) {
      const pos = {x:random(width),y:random(height)}
      const hue = noise(pos.x*noiseScale,pos.y*noiseScale,time)*360;
      fill(hue,75,75);
      circle(pos.x,pos.y, brushSize);
    }
  }
}