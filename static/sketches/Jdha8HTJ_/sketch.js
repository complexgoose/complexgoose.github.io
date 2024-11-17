const noiseScale = .0005;
const gridSize = 100;
const maxVerts = 40;
const maxR = 1000;
const fruitNoiseScale = .5;
const numFruit = 3;
const numSubs = 10;
const maxOff = 5;
let fruitHue;

function uniformNoise(x,y) {
  return (2*noise(x,y))-.5;
}
function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB);
  //noStroke();
  frameRate(.1);
}

function draw() {
  fruitHue = random(360);
  const hue = (fruitHue+180)%361;
  for(let x=0;x<width;x+=gridSize) {
    for(let y=0;y<height;y+=gridSize) {
      fill(hue, uniformNoise(x*noiseScale, y*noiseScale)*100,100);
      square(x,y,gridSize);
    }
  }
  for(let i=0;i<numFruit;i++) {
    drawFruit();
  }
}

function drawFruit() {
  const x = random(height);
  const y = random(height);
  const numVerts = random(40);
  const verts = [];
  noiseSeed(random(Number.MAX_SAFE_INTEGER));
  for(let a=0;a<TWO_PI;a+=TWO_PI/numVerts) {
    const r = uniformNoise(cos(a*fruitNoiseScale)+1,sin(a*fruitNoiseScale)+1)*maxR;
    verts.push([x+r*cos(a), y+r*sin(a)]);
  }
  for(let i=0;i<numSubs;i++) {
    fill(fruitHue, random(50,100), random(50,100),2/numSubs);
    beginShape();
    let vert = verts[verts.length-1];
    curveVertex(vert[0], vert[1]);
    for(const vert of verts) {
      curveVertex(vert[0]+random(-maxOff,maxOff),vert[1]+random(-maxOff,maxOff));
    }
    vert = verts[0];
    curveVertex(vert[0], vert[1]);
    endShape(CLOSE);
  }
}