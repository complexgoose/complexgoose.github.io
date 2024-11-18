const gridSize = 5;
const noiseScale = .005;
const timeScale = .005;
let time = 0;

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(255);
  for(let ox=0;ox<width;ox+=gridSize) {
    for(let oy=0;oy<height;oy+=gridSize) {
      const a = noise((ox/gridSize)*noiseScale,(oy/gridSize)*noiseScale,time*timeScale)*TWO_PI;
      const dx = gridSize*cos(a);
      const dy = gridSize*sin(a);
      line(ox-dx,oy-dy,ox+dx,oy+dy);
    }
  }
}

function draw() {
  time++;
}