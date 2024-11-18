let minSide,maxR,x,y,xo,yo,a;
const maxStep = 20;
const maxda = Math.PI/20;
function setup() {
  createCanvas(innerWidth,innerHeight);
  background(255)
  colorMode(HSB);
  minSide = min(width,height);
  maxRSq = pow(minSide/2,2);

  xo = width/2;
  yo = height/2;
  x = xo;
  y = yo;
  a = random(TWO_PI);
  for(let i=0;i<10000;i++) {
    let nx,ny;
    const r = random(maxStep);
    nx = x+r*cos(a);
    ny = y+r*sin(a);
    const rsq = pow(nx-xo,2)+pow(ny-yo,2);
    if(rsq > maxRSq) {
      a -= PI;
      continue;
    }
    a += random(-maxda,maxda);
  
    // stroke(noise(frameCount,i*.005)*360,75,75);
    line(x,y,nx,ny);
    x = nx;
    y = ny;
  }
}

function draw() {
}