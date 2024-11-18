const gridSize = 10;
const noiseScale = .003;
let time = 0;
const timeScale = .003;
const uniformNoise = (x,y,z) => 2*noise(x,y,z)-.5;
const stepify = (n,step) => floor(n/step)*step;

function setup() {
  createCanvas(innerWidth, innerHeight);
  noStroke();
}

function draw() {
  time += 1;
  for(let x=0;x<width;x+=gridSize) {
    for(let y=0;y<height;y+=gridSize) {
      const chance = uniformNoise(x*noiseScale, y*noiseScale, time*timeScale);
      fill(stepify(chance * 255,30));
      square(x,y,gridSize);
    }
  }
}