const gridSize = 20;
const noiseScale = .05;
const timeScale = .005;
const moveScale = .1;
const uniformNoise = (x,y,z) => 2*noise(x,y,z)-.5;
const stepify = (n,step) => floor(n/step)*step;

let c1,c2;

function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB);
  noStroke();
  fill(0);
  const hue = random(360);
  c1 = color(hue,random(50,100),random(50,100));
  c2 = color(hue,random(50,100),random(50,100));
}

function draw() {
  background(255);
  for(let x=0;x<width;x+=gridSize) {
    for(let y=0;y<height;y+=gridSize) {
      fill(lerpColor(c1,c2,stepify(uniformNoise(((x/gridSize)+frameCount*moveScale)*noiseScale,(y/gridSize)*noiseScale,frameCount*timeScale),.01)));
      square(x,y,gridSize);
    }
  }
}