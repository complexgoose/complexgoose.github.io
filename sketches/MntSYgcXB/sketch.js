const gridSize = 50;
const numPoints = 100;
const points = [];
const maxForce = 1;
const maxSpeed = 100;
const maxSpeedSq = Math.pow(maxSpeed,2);
const noiseScale = 3;
const timeScale = .005;
let time = 0;
const numDraws = 1;
const massScale = Math.pow(10, 10);
const G = 6.674 * Math.pow(10, -11);
function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB);
  const xmean = width/2;
  const xsd = width/2/3;
  const ymean = height/2;
  const ysd = height/2/3;
  
  const mid = createVector(width/2,height/2);
  for(let i=0;i<numPoints;i++) {
    const hue = uniformNoise(i*.005)*360;
    const size = random(1,40);
    const pos = createVector(randomGaussian(xmean,xsd), randomGaussian(ymean,ysd));
    const diff = p5.Vector.sub(mid,pos);
    const a = atan2(diff.y, diff.x)+PI/2;
    points.push({pos, vel:createVector(cos(a),sin(a)),
                col: color(hue,100,random(50,100)), size, mass: size*massScale});
  }
  noStroke();
}

function uniformNoise(x) {
  return (1.5*noise(x))-.5;
}

function draw() {
  background(100, 1);
  for (let i=0;i<numDraws;i++) {
    time += timeScale;
    for(const p of points) {
      const {pos,vel,col, mass, size} = p;
      fill(col);
      circle(pos.x,pos.y, size);
      for(const o of points) {
        const {pos:opos, mass:omass, size:osize} = o;
        const diff = p5.Vector.sub(opos, pos);
        const touchdistsq = Math.pow(size/2+osize/2,2);
        let r2 = diff.magSq();
        if(r2<touchdistsq) continue;
        const acc = G*(omass/r2);
        diff.setMag(acc);
        vel.add(diff);
        vel.limit(maxSpeed);
      }
    }
    for(const p of points) {
      const {pos,vel} = p;
      pos.add(vel);
      if(pos.x > width || pos.x < 0) vel.x *=-.9;
      if(pos.y > height || pos.y < 0) vel.y *=-.9;
    }
  }
}