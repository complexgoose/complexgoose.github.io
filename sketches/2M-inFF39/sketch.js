let jitter = .00001;
const da = Math.PI/2;
function setup() {
  createCanvas(innerWidth, innerHeight);
}

function draw() {
  background(255);
  let a = 0;
  let r = min(width,height)/3;
  const xo = width/2;
  const yo = height/2;
  for(let i=0;i<1000;i++) {
    const na = a+da+i*jitter;
    line(xo+r*cos(a),yo+r*sin(a),xo+r*cos(na),yo+r*sin(na));
    a = na;
  }
  jitter*=.99;
}