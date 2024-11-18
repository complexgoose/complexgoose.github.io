let dr,maxr,r,a,maxda,xo,yo;
function setup() {
  createCanvas(innerWidth,innerHeight);
  noFill();
  maxr = min(width,height)/2;
  dr = maxr/4;
  r = dr;
  a = random(TWO_PI);
  maxda = PI/4;
  xo = width/2;
  yo = height/2;
  background(255);
  beginShape();
  for(let i=0;i<5000;i++) {
    let nr = r + dr;
    if (nr > maxr || nr < abs(dr)) {
      dr *= -1;
      nr = r + dr;
    }
    const na = a + random(-maxda,maxda);
    vertex(xo+r*cos(a),yo+r*sin(a))
    r = nr;
    a = na;
  }
  endShape();
}

function draw() {
}