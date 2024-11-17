const points = [];
const numPoints = 1000;
let time =0;
const timeScale = .005;
const noiseScale = .0001;
const pointSize = 10;
let done = false
function setup() {
  createCanvas(innerWidth,innerHeight);
  colorMode(HSB);
  noStroke();
  const hue = random(361);
  for(let i=0;i<numPoints;i++) {
    points.push({x:width/2,y:height/2, col:color(hue,random(50,100),random(50,100))});
  }
}

function uniformNoise(x,y) {
  return (2*noise(x,y))-.5;
}

function doubleClicked() {
  done = true;
}

function draw() {
  time += timeScale;
  for(let i=0;i<numPoints;i++) {
    const p = points[i];
    fill(p.col);
    circle(p.x,p.y,pointSize);
    const a = uniformNoise(i*noiseScale,time)*TWO_PI;
    p.x += (pointSize/3)*cos(a);
    p.y += (pointSize/3)*sin(a);
    if(done) continue;
    if(p.x < 0) p.x = width;
    else if(p.x > width) p.x =0;
    if(p.y < 0) p.y = height;
    else if(p.y > height) p.y = 0;
  }
}