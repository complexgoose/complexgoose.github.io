const numPoints = 20;
const maxOPoints = 5;
const points = [];
function setup() {
  createCanvas(innerWidth, innerHeight);
  noFill();
  for (let i=0;i<numPoints;i++) {
    points.push({x:random(width),y:random(height)});
  }
  for (const point of points) {
    const numOPoints = floor(random(2,maxOPoints));
    let oPointI = 0;
    let {x,y} = point;
    beginShape();
    while(oPointI++ <= numOPoints) {
      const oPoint = random(points);
      vertex(x,y);
      x = oPoint.x;
      y = oPoint.y;
    }
    endShape(CLOSE);
  }
}

function draw() {
}