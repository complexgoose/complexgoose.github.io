const points = [];
const numPoints = 100;
const pointSize = 5;
const noiseScale = .005;
const maxAmp = 100;

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(255);
  noStroke();
  fill(0);
  for(let i=0;i<numPoints;i++) {
    points.push({x:width,y:randomGaussian(width/2,width/10),d:pointSize,i});
  }
}

function draw() {
  for(const p of points) {
    circle(p.x,p.y,p.d);
    const speed = p.d/2;
    const a = noise(p.x*noiseScale,p.y*noiseScale,p.i*noiseScale*10)*TWO_PI;
    p.x += speed*cos(a);
    p.y += speed*sin(a);
  }
}