const points = [];
const numPoints = 1000;
let time =0;
const timeScale = .005;
const noiseScale = .0005;
const colorScale = .00005;
const pointSize = 3;
let done = false
function setup() {
  createCanvas(innerWidth,innerHeight);
  colorMode(HSB);
  noStroke();
  const hue = random(361);
  for(let i=0;i<numPoints;i++) {
    points.push({i, done:false, x:width/2,y:height/2, col:color(uniformNoise(i*colorScale)*360,random(75,100),random(75,100))});
  }
}

function step(num, step) {
  return round(num/step)*step;
}

function uniformNoise(x,y) {
  return (2*noise(x,y))-.5;
}

function doubleClicked() {
  done = true;
}

function draw() {
  time += timeScale;
  for(let i=0;i<points.length;i++) {
    const p = points[i];
    if(p.done) continue;
    fill(p.col);
    circle(p.x,p.y,pointSize);
    const a = step(uniformNoise(i*noiseScale,time)*TWO_PI,PI/8);
    p.x += (pointSize/3)*cos(a);
    p.y += (pointSize/3)*sin(a);
    if(done) {
      p.done = true;
      continue;
    }
    if(p.x < 0) p.x = width;
    else if(p.x > width) p.x =0;
    if(p.y < 0) p.y = height;
    else if(p.y > height) p.y = 0;
  }
}