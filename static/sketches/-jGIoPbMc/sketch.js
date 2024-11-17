const people = [];
const numPeople = 1000;
const groups = [];
const numGroups = 5;
const closeDist = 30;
const closeDistSq = Math.pow(closeDist, 2);
const maxSpeed = 2;
const maxSpeedSq = Math.pow(maxSpeed, 2);
const maxForce = .1;
const noiseScale = 5;
let time = 0;
const timeScale = .0005;

function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB);
  noStroke();
  for(let i=0;i<numGroups;i++) {
    groups.push({col: color(random(360), random(50,100), 75)});
  }
  const xmean = width/2;
  const xsd = width/6;
  const ymean = height/2;
  const ysd = height/6;
  const velmean = 0;
  const velsd = maxSpeed/3;
  for(let i=0;i<numPeople;i++) {
    people.push({pos: createVector(randomGaussian(xmean,xsd),randomGaussian(ymean,ysd)),
                 vel: createVector(),
                 group: Math.floor(Math.random()*numGroups)});
  }
  background(255);
}

function uniformNoise(x,y,z) {
  return (2*noise(x,y,z))-.5
}

function draw() {
  //background(255);
  time += timeScale;
  for(const person of people) {
    const {pos, vel, group} = person;
    const {col} = groups[group];
    fill(col);
    stroke(col)
    //circle(pos.x,pos.y,5);
    point(pos.x,pos.y);
    
    const a = uniformNoise(group*time, (pos.x/width)*noiseScale, (pos.y/height)*noiseScale)*TWO_PI;
    vel.add(createVector(maxForce*cos(a), maxForce*sin(a)));
    vel.limit(maxSpeed);
    vel.mult(.99);
  }
  for(const person of people) {
    const {pos, vel} = person;
    pos.add(vel);
    if(pos.x>width) pos.x = 0;
    else if(pos.x<0) pos.x = width;;
    if(pos.y>height) pos.y = 0;
    else if(pos.y<0) pos.y = height;
  }
}