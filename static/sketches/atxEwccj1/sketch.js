let time = 0;
const timeScale = .005;
const maxVertices = 10;
const maxOff = 4;
const maxSubs = 10;
const gridSize = 100;
let maxR;
let xpad;
let ypad;
function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB);
  noStroke();
  const numCols = floor(width/gridSize);
  const numRows = floor(height/gridSize);
  xpad = (width-(numCols*gridSize))/2;
  ypad = (height-(numRows*gridSize))/2;
  
  maxR = gridSize/2;

}

function uniformNoise(x,y,z) {
  return (2*noise(x,y))-.5;
}

function draw() {
  //background(255);
  time += timeScale;
  for(let xo=xpad+(gridSize/2);xo<width;xo+=gridSize) {
    for(let yo=ypad+(gridSize/2);yo<height;yo+=gridSize) {
      noiseSeed(random(Number.MAX_SAFE_INTEGER));
      const hue = uniformNoise(xo*.005,yo*.005,time)*360;
      const subs = maxSubs;
      const numVertices = ceil(random(2,maxVertices));
      const vertices = [];
      for(let i=0;i<numVertices;i++) {
          const prog = i/numVertices;
          const a = prog*TWO_PI;
          const r = random(maxR);
          vertices.push([xo+r*cos(a), yo+r*sin(a)]);
      }
      for(let subi=0;subi<subs;subi++) {
        fill(hue, 100, random(50,100), 1/subs);
        
        beginShape();
        for(const vert of vertices) {
          const [x,y] = vert;
          vertex(x+random(-maxOff,maxOff),y+random(-maxOff,maxOff));
        }
        endShape(CLOSE);
      }
    }
  }
}