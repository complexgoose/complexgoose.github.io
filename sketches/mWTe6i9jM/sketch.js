let xr;
let yr;
const dxr = -.1;
const dyr = -1;
let a = 0;
let da = Math.PI/100;
let divdr = Math.PI/da;
let rotateA = 0;
function setup() {
  const minSide = min(innerWidth,innerHeight)
  createCanvas(minSide,minSide);
  noFill();
  background(255);
  xr = width/8;
  yr = height/2;
  translate(width/2,height/2);
  beginShape();
  while(a<=609*PI) {
    const x1 = xr*cos(a);
    const y1 = yr*sin(a);
    const x = x1*cos(rotateA)-y1*sin(rotateA);
    const y = x1*sin(rotateA)+y1*cos(rotateA);
    curveVertex(x,y);

    rotateA += PI/20000;
    a += da;
    xr += dxr/divdr;
    yr += dyr/divdr;
  }
  endShape();
}

function draw() {
}