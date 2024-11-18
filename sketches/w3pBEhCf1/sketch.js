function drawShape(numSides, sideSize) {
  beginShape();
  let x=0,y=0;
  let a = 0;
  const da = TWO_PI/numSides;
  const sides = []
  for(let i=0;i<numSides;i++) {
    vertex(x,y);
    sides.push([x,y,a]);
    x += sideSize*cos(a);
    y += sideSize*sin(a);
    a += da;
  }
  endShape(CLOSE);
  return sides;
}

function checkBounds() {
  let matrix = drawingContext.getTransform();
  let x_0 = matrix['e'];
  let y_0 = matrix['f'];
  let x_1 = matrix['a'] + matrix['e'];
  let y_1 = matrix['b'] + matrix['f'];
  let media_per_unit = dist(x_0, y_0, x_1, y_1);
  let x = x_0 / media_per_unit;
  let y = y_0 / media_per_unit;
  const overx = x < 0 || x > width;
  const overy = y < 0 || y > height;
  if(overx) x = width-x;
  if(overy) y = height-y;
  if(overx || overy) {
    resetMatrix();
    translate(x,y);
  }
  return [x,y];
}

const sideSize = 50;
const noiseScale = .005;

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(255);
  noFill();
  colorMode(HSB);
  const getNumSides = () => floor(random(3,10))
  let x=width/2,y=height/2;
  translate(x,y);
  for(let i=0;i<100;i++) {
    const numSides = getNumSides();
    const sides = drawShape(numSides,sideSize);
    checkBounds();
    let [dx,dy,a] = sides[floor(random(sides.length))];
    translate(dx,dy);
    const da = PI-(TWO_PI/numSides);
    a+=da;
    rotate(a);
  }
}

function draw() {
}