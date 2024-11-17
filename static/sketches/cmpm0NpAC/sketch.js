const smoothstep = (x) => 3 * Math.pow(x, 2) - 2 * Math.pow(x, 3);

const points = [];
const numPoints = 9;
const pointSize = 5;
const dx = pointSize/2;
const noiseScale = .1
const uniqueNoise = .02
const numBends = 1;
const spacea = Math.PI/6;

let maxAmp;

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(255);
  strokeCap(PROJECT);
  for(let i=0;i<numPoints;i++) {
    points.push({x:-pointSize,y:width/2,d:pointSize,i});
  }
  maxAmp = (width/(numBends))/PI;
}

function draw() {
  for(let i=0;i<1000/points.length;i++) {
    for(const p of points) {
      const x1 = p.x;
      const y1 = p.y;
      if(p.x>width) {
        noLoop();
        break;
      }
      p.x += dx;
      const a = (p.x / width) * TWO_PI * numBends;
      const ampmod = ((sin(a)/2))*((p.i/(numPoints-1)*2)-1);
      const amp = maxAmp*ampmod;
      p.y = (height/2)+amp;
      strokeWeight(p.d);
      line(x1,y1,p.x,p.y);
    }
  }
}