let maxR;
let time = 0;
const timeScale = .00001;
function addVertex(xo,yo,a) {
  const ox = xo+maxR*cos(a);
  const oy = yo+maxR*sin(a);
  const r = noise(ox,oy,time)*maxR;
  curveVertex(xo+r*cos(a), yo+r*sin(a));
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(200);
  const seed = floor(random(1e9));
  noiseSeed(seed);
  randomSeed(seed);
  console.log(seed)
  maxR = min(width,height)/2;
  fill(0);
  noStroke();
  colorMode(HSB);
}

function draw() {
  background(200);
  time += timeScale;
  for(let i=0;i<100;i++) {
    const xo = noise(i,time,0)*width;
    const yo = noise(i,time,1)*height;
    fill(noise(i,time,2)*360,75,65);
    beginShape();
    const da = PI/16;
    addVertex(xo,yo,-da);
    for(let a=0;a<TWO_PI+da;a+=da) {
      addVertex(xo,yo,a);
    }
    addVertex(xo,yo,da);
    endShape();
  }
}