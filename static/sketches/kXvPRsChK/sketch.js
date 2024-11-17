const points = [];
const numPoints = 10;
let time =0;
const timeScale = .001;
const noiseScale = .001;
const maxPoints = 10000;

function restartShape() {
  endShape();
  beginShape();
}

function setup() {
  createCanvas(innerWidth,innerHeight);
  const seed = int(random(1e10));
  noiseSeed(seed);
  print(seed);
  noFill();
  //background(0);
  stroke(100,170,209);
  strokeWeight(3);
  const minSide = min(width, height);
  const pointSpread = minSide/15;
  for(let i=0;i<numPoints;i++) {
    let time = 0;
    const prog = ((i+.5)/numPoints);
    const dxy = (prog*pointSpread)-(pointSpread/2);
    let x = (width/2)+dxy;
    let y = (height/2)+dxy;
    let pointI = 0;
    beginShape();
    while(pointI++ < maxPoints) {
      vertex(x,y);
      const a = step(uniformNoise(i*noiseScale,time)*TWO_PI,PI/4);
      x += cos(a);
      y += sin(a);
      time += timeScale;
      if(x < 0) { 
        x = width;
        restartShape();
      }
      else if(x > width) {
        x = 0;
        restartShape();
      }
      if (y < 0) {
        y = height;
        restartShape();
      }
      else if(y > height) {
        y = 0;
        restartShape();
      }
    }
    endShape();
  }
}

function step(num, step) {
  return round(num/step)*step;
}

function uniformNoise(x,y) {
  return (2*noise(x,y))-.5;
}

function draw() {
}