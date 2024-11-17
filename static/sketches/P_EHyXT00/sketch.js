const smoothstep = (x) => 3 * Math.pow(x, 2) - 2 * Math.pow(x, 3);

const points = [];
const numPoints = 10;
const pointSize = 5;
const noiseScale = .1
const uniqueNoise = .02
const da = Math.PI/200;
const spacea = Math.PI/6;
const numBends = 3;
let maxAmp;

function setup() {
  createCanvas(innerWidth, innerHeight);
  const seed = floor(random(1e9));
  randomSeed(seed);
  noiseSeed(seed);
  console.log(seed);
  background(255);
  // noStroke();
  // fill(0);
  strokeCap(PROJECT);
  for(let i=0;i<numPoints;i++) {
    points.push({x:-pointSize,y:width/2,d:pointSize,i});
  }
  maxAmp = height/6;
}

function draw() {
  for(let i=0;i<100/points.length;i++) {
    for(const p of points) {
      const x1 = p.x;
      const y1 = p.y;
      p.x += p.d/2;
      const banda = (p.x/width)*TWO_PI;
      const bandx = 1+cos(banda);
      const bandy = 1+sin(banda);
      const a = (noise(p.i*uniqueNoise,bandx*noiseScale,bandy*noiseScale)*TWO_PI*numBends)%TWO_PI;
      const ampmod = smoothstep(abs(PI-a)/PI);
      const amp = (maxAmp*ampmod*2)-maxAmp;
      p.y = (height/2)+amp;
      strokeWeight(p.d);
      line(x1,y1,p.x,p.y);
    }
  }
}

function doubleClicked() {
  saveCanvas("spiralband");
}