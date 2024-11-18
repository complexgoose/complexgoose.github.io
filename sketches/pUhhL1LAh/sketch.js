const filings = [];
const numFilings = 1000;
const magnetDist = 500;
const magnetDistSq = Math.pow(magnetDist,2);
const magnetR = 10;
const magnetRSq = Math.pow(magnetR,2);
let magnetPos;
const filingVel = 1;
function addFiling() {
  filings.push({pos:createVector(random(width),random(height)),vel:createVector()});
}
function setup() {
  createCanvas(innerWidth, innerHeight);
  for(let i=0;i<numFilings;i++) {
    addFiling();
  }
  magnetPos = createVector(width/2, height/2);
  background(0);
}

function draw() {
  //background(255);
  stroke(255);
  const toRemove = [];
  for(let i=0;i<filings.length;i++) {
    const filing = filings[i];
    const {pos,vel} = filing;
    circle(pos.x,pos.y,1);
    const acc = createVector();
    const diff = p5.Vector.sub(magnetPos,pos);
    const distSq = diff.magSq();
    if(distSq <= magnetRSq) {
      toRemove.push(i);
    }
    else if(distSq <= magnetDistSq) {
      const prog = distSq/magnetDistSq;
      const accMag = (1-prog)*.1;
      let a = atan2(diff.y,diff.x);
      const da = (PI/2)*prog;
      a+=da;
      acc.add(p5.Vector.fromAngle(a).setMag(accMag));
    } else {
      vel.mult(.9);
    }
    vel.add(acc);
    vel.limit(2);
    pos.add(vel);
  }
  for(const i of toRemove) {
    filings.splice(i,1);
  }
  for(let i=0;i<toRemove.length;i++) {
    if(filings.length>=numFilings) break;
    addFiling();
  }
}