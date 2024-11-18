const gridSize = 50;
const numPoints = 1000;
const points = [];
const force = .1;
const maxSpeed = 1;
const maxSpeedSq = Math.pow(maxSpeed,2);
const noiseScale = 1;
const timeScale = .005;
let time = 0;
const numDraws = 1;
function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB);
  const xmean = width/2;
  const xsd = width/2/3;
  const ymean = height/2;
  const ysd = height/2/3;
  const hue = random(360);
  for(let i=0;i<numPoints;i++) {
    points.push({pos: createVector(randomGaussian(xmean,xsd), randomGaussian(ymean,ysd)), vel:createVector(),
                col: color(hue,100,random(50,100))});
  }
  noStroke();
}

function draw() {
  for (let i=0;i<numDraws;i++) {
    time += timeScale;
    for(const p of points) {
      const {pos,vel,col} = p;
      fill(col);
      circle(pos.x,pos.y, 5);
      const a = noise(noiseScale*(pos.x/width), noiseScale*(pos.y/height), time)*PI*4;
      const acc = createVector(force*cos(a), force*sin(a));
      vel.add(acc);
      if(vel.magSq() > maxSpeedSq) vel.setMag(maxSpeed);
      pos.add(vel);
      if(pos.x > width) pos.x =0;
      else if(pos.x < 0) pos.x = width;
      if(pos.y > height) pos.y = 0;
      else if (pos.y < 0) pos.y = height;
    }
  }
}