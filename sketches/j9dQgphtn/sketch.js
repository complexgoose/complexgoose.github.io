const points = [];
const numPoints = 1000;
const pointSize = 2;
const maxda = Math.PI/150;
const speed = pointSize/2;
const animSpeed = (1000/numPoints)*1;

let time = 0;
const maxTime = 900;
const timeScale = .005;
const noiseScale = .005;

let bg,fg;

function setup() {
  createCanvas(innerWidth, innerHeight);
  const seed = floor(random(1e6));
  // const seed = 950088;
  randomSeed(seed);
  noiseSeed(seed);
  print(seed);
  
  for(let i=0;i<numPoints;i++) {
    points.push({x: width/2, y:height/2, a: random(TWO_PI)});
  }
  bg = color("#001D72");
  fg = color("#35C6EE");
  background("#DA3A00");
  noStroke();
}

function draw() {
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
      point.a += -maxda+(2*maxda*noise(i*noiseScale,time*timeScale));
      point.x += speed*cos(point.a);
      point.y += speed*sin(point.a);
    }
  }
}