const gridSizeX = 25;
const gridSizeY = 5;
const curveSize = 25;
function setup() {
  createCanvas(innerWidth, innerHeight);
  noFill()
  background(255);
  for(let x=0;x<width;x+=gridSizeX) {
    for(let y=0;y<height;y+=gridSizeY) {
      bezier(x,y,x+random(curveSize),y+random(curveSize),x+random(curveSize),y+random(curveSize),x+curveSize,y+curveSize);
    }
  }
}

function draw() {
}