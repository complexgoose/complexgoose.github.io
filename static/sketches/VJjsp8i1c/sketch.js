let x,y,a, amod, r=10;
function setup() {
  createCanvas(innerWidth, innerHeight);
  x = width/2;
  y = height/2;
  a = 0;
  amod = 1*PI;
}

function draw() {
  const nextx = x+r*cos(a), nexty = y+r*sin(a);
  line(x, y, nextx , nexty);
  x = nextx, y = nexty;

  a -= amod;
  amod *= 1.01;
  
  fixCoords();
}

function fixCoords() {
  if(x>width) x=0;
  else if(x<0) x=width;
  if(y>height) y=0;
  else if (y<0) y=height;
}