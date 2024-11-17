const points = [];
const numPoints = 100;
const pointSize = 5;
const pointSpeed = pointSize/2;
const noiseScale = .0005;

function setup() {
  createCanvas(innerWidth, innerHeight);
  const seed = floor(random(1e9));
  // const seed = 275162360;
  print(seed);
  randomSeed(seed);
  noiseSeed(seed);
  for(let i=0;i<numPoints;i++) {
    points.push({x:width, y:(i/numPoints)*height});
  }
  background(255);
  noStroke();
  fill(0);
}

function draw() {
  for(const p of points) {
    circle(p.x,p.y,pointSize);
    const a = TWO_PI*noise(p.x*noiseScale,p.y*noiseScale);
    p.x += pointSpeed * cos(a);
    p.y += pointSpeed * sin(a);
  }
}