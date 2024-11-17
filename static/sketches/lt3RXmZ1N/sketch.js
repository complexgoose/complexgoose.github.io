// Brush settings
const numBristles = 10;
const brushSize = 15;

const noiseScale = .005;

function offset(x,y,maxR) {
  const a = random(TWO_PI);
  const r = random(maxR);
  return [x+r*cos(a),y+r*sin(a)];
}

function paint(ox1,oy1,ox2,oy2) {
  for(let i=0;i<numBristles;i++) {
    const [x1,y1] = offset(ox1,oy1,brushSize);
    const [x2,y2] = offset(ox2,oy2,brushSize);
    line(x1,y1,x2,y2);
  }
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(255);
  const a = random(PI/2);
  const minSide = min(width,height);
  const maxR = minSide;
  for(let xy=0;xy<minSide;xy+=brushSize) {
    const r1 = noise(xy*noiseScale,0)*maxR;
    const r2 = -noise(xy*noiseScale,1)*maxR;
    paint(xy+r1*cos(a),xy+r1*sin(a),xy+r2*cos(a),xy+r2*sin(a));
  }
}

function draw() {
}