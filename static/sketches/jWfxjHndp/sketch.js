const points = [];
const numPoints = 1000;
const noiseScale = .005;
let time = 0;
const timeScale = .005;

function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB);
}

function uniformNoise(x,y,z) {
  return (2*noise(x,y,z))-.5
}

function draw() {
  time += timeScale;
  for(let i=0;i<numPoints;i++) {
    const x = uniformNoise(time, i*noiseScale)*width;
    const y = uniformNoise(time+1, i*noiseScale)*height;
    const hue = uniformNoise(time+2, i*noiseScale)*360;
    stroke(hue, 100, 75);
    point(x,y);
  }
}