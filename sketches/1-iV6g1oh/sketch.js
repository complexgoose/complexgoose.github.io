let xo,yo,r;
let a = 0;
function setup() {
  createCanvas(innerWidth,innerHeight);
  xo = width/2;
  yo = height/2;
  r = min(width,height)/3;
  background(255);
}

function draw() {
  const na = a + PI/r*5;
  const nr = max(r -=.5,0);
  line(xo+r*cos(a),yo+r*sin(a),xo+nr*cos(na),yo+nr*sin(na));
  a = na;
  r = nr;
}