const people = [];
const numPeople = 200;
const groups = [];
const numGroups = 100;
const closeDist = 100;
const closeDistSq = Math.pow(closeDist, 2);
const maxSpeed = 10;
const maxSpeedSq = Math.pow(maxSpeed, 2);
const maxForce = 1;
const sepMult = 0;
const coMult = 0;
const flowMult = .1;
const noiseScale = 5;
let time = 0;
const timeScale = .005;
let qt;

function setup() {
  createCanvas(innerWidth, innerHeight);
  qt = new QuadTree(new Rectangle(width/2,height/2,width,height),4);
  colorMode(HSB);
  noStroke();
  const hue = random(360);
  for(let i=0;i<numGroups;i++) {
    groups.push({col: color(hue+random(-20,20), 100, random(50,100))});
  }
  const xmean = width/2;
  const xsd = width/6;
  const ymean = height/2;
  const ysd = height/6;
  const velmean = 0;
  const velsd = maxSpeed/3;
  const mid = createVector(width/2, height/2);
  for(let i=0;i<numPeople;i++) {
    const pos = createVector(randomGaussian(xmean,xsd),randomGaussian(ymean,ysd))
    people.push({pos,
                 vel: createVector(),
                 group: Math.floor(Math.random()*numGroups)});
  }
  background(255);
}

function uniformNoise(x,y,z) {
  return (2*noise(x,y,z))-1;
}

function draw() {
  time += timeScale;
  //background(100);
  for(const person of people) {
    const {pos, vel, group} = person;
    const {col} = groups[group];
    fill(col);
    circle(pos.x,pos.y,3);
    //stroke(col)
    //point(pos.x, pos.y);

    const coSum = createVector();
    const sepSum = createVector();
    for(const other of people) {
      const {pos: otherPos, group: otherGroup} = other;
      //if(otherGroup !== group) continue;
      const diff = p5.Vector.sub(otherPos, pos);
      const sepDiff = p5.Vector.sub(pos, otherPos);
      const distSq = diff.magSq();
      if(distSq > closeDistSq) continue;
      coSum.add(diff);
      if(distSq > 0) sepDiff.div(distSq);
      sepSum.add(sepDiff);
    }
    
    if(coSum.magSq() > 0) {
      coSum.setMag(maxSpeed);
      coSum.sub(vel);
      coSum.limit(maxForce)
      coSum.mult(coMult);
      vel.add(coSum);
    }
    
    if(sepSum.magSq() > 0) {
      sepSum.setMag(maxSpeed);
      sepSum.sub(vel);
      sepSum.limit(maxForce);
      sepSum.mult(sepMult);
      vel.add(sepSum);
    }
    const a = uniformNoise(time)*TWO_PI;
    const flow = createVector(maxSpeed*cos(a), maxSpeed*sin(a));
    flow.sub(vel);
    flow.limit(maxForce);
    flow.mult(flowMult);
    vel.add(flow);
    
    vel.limit(maxSpeed);
    vel.mult(.99);
  }
  for(const person of people) {
    const {pos, vel} = person;
    pos.add(vel);
    if(pos.x>width) pos.x = 0;
    if(pos.x<0) pos.x = width;
    if(pos.y>height) pos.y = 0;
    if(pos.y<0) pos.y = height;
  }
}