const maxd = 2;
const points = [];
const numPoints = 1000;
function setup() {
  createCanvas(innerWidth, innerHeight);
  background(255);
  for(let i=0;i<numPoints;i++) {
    points.push({
      x:random(width),
      y:random(height)
    })
  }
  
  for (let j=0;j<5000;j++) {
    const dx = random(-maxd,maxd);
    const dy = random(-maxd,maxd);
    for(let i=0;i<numPoints;i++) {
      let {x,y} = points[i];
      point(x,y);
      x += dx;
      y += dy;
      if(x<0) x=width;
      else if (x>width) x=0;
      if(y<0) y=height;
      else if(y>height) y=0;
      points[i] = {x,y};
    }
  }
}

function draw() {
  
}