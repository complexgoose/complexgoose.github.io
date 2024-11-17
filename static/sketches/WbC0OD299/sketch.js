const points = [];
const numPoints = 300;
const pointSize = 1;
const maxda = Math.PI/140;
const speed = pointSize/2;
const animSpeed = (1000/numPoints)*0.75;

let time = 0;
const maxTime = 3000;
const timeScale = .005;
const noiseScale = .005;

let bg,fg;

function setup() {
  createCanvas(innerWidth, innerHeight);
  // const seed = floor(random(1e6));
  const seed = 416578;
  randomSeed(seed);
  noiseSeed(seed);
  print(seed);
  
  for(let i=0;i<numPoints;i++) {
    points.push({x: (width/2)-30, y:height/2, a: (i/numPoints)*TWO_PI});
  }
  bg = color("#001D72");
  fg = color("#35C6EE");
  background("#DA3A00");
  noStroke();
}

function draw() {
  if(frameCount<30) return;
  for(let x=0;x<animSpeed;x++) {
    if(time>maxTime) {
      noLoop();
      break;
    }
    time++;
    for(let i=0;i<points.length;i++) {
      const point = points[i];
      fill(lerpColor(bg,fg,noise(i*noiseScale,time*timeScale)))
      circle(point.x,point.y,pointSize);
      point.a += maxda*noise(i*noiseScale,time*timeScale);
      point.x += speed*cos(point.a);
      point.y += speed*sin(point.a);
    }
  }
}