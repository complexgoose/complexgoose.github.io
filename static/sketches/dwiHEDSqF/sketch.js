const points = [];
const numPoints = 50;
function setup() {
  createCanvas(innerWidth, innerHeight);
  for(let i=0;i<numPoints;i++) {
    points.push({x:random(width), y:random(height),col:color(random(255),random(255),random(255))});
  }
  background(255);
  for(const {x:x1,y:y1,col} of points) {
    for(const {x:x2,y:y2,col:col2} of points) {
      stroke(lerpColor(col,col2,0.5));
      line(x1,y1,x2,y2);
    }
  }
}

function draw() {
}