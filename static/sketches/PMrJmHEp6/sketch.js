let time = 0;
const timeScale = .005;
const maxVertices = 10;
const maxOff = 100;
const maxSubs = 10;
const hue = Math.random()*360;
let maxR;
function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB);
  noStroke();
  maxR = width/2;
  frameRate(10);
}

function uniformNoise(x,y,z) {
  return (2*noise(x,y))-.5;
}

function draw() {
  //background(255);
  time += timeScale;
  const subs = ceil(random(maxSubs));
  const xo = random(width);
  const yo = random(height);
  for(let subi=0;subi<subs;subi++) {
    fill(hue, random(50,100), random(50,100), 1/subs);
    const vertices = ceil(random(2, maxVertices));
    beginShape();
    for(let i=0;i<vertices;i++) {
      const prog = i/vertices;
      const a = prog*TWO_PI;
      const r = random(maxR);
      vertex(xo+r*cos(a), yo+r*sin(a));
    }
    endShape(CLOSE);
  }
}