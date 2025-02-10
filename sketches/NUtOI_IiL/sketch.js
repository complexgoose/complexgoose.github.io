const points = [];
const numPoints = 1;
const pointSize = 500;
const targetDotSize = pointSize/10;

let dadiv = 1;
const dadivmod = 1.01;
let canvas;

function setup() {
  createCanvas(innerWidth, innerHeight);
  for(let i=0;i<numPoints;i++) {
    points.push({x: width/2,y:height/2});
  }
  noFill();
}

function draw() {
  background(255);
  for(const p of points) {
    let dotSize;
    for(let r=0;r<pointSize;r+=dotSize) {
      let da = r !== 0 ? 2*asin(targetDotSize/(2*r)) : TWO_PI;
      const numDots = floor(TWO_PI/da);
      da = TWO_PI/numDots;
      dotSize = numDots > 1 ? 2*r*sin(da/2) : targetDotSize;
      for(let a=0;a<TWO_PI;a+=da/dadiv) {
        const x = p.x+r*cos(a);
        const y = p.y+r*sin(a);
        circle(x,y,dotSize);
      }
    }
  }
  
  dadiv*=dadivmod;
}