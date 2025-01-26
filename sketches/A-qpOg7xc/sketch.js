const modulo = (n,d) => ((n % d) + d) % d;
const points = [];
const numStartPoints = 1;
const maxStep = 50;
const maxda = Math.PI/4;
const maxBranches = 1;
let i = numStartPoints-1;
const animSpeed = 100;
function setup() {
  createCanvas(innerWidth, innerHeight);
  for(let i=0;i<numStartPoints;i++) {
    points.push({x:width/2,y:height/2,a:random(TWO_PI),step:random(maxStep)});
  }
  background(255);
}

function draw() {
  let numUpdates = 0;
  while(numUpdates++ < animSpeed && points.length > 0) {
    const p = points[i];
    const nx = p.x + p.step*cos(p.a);
    const ny = p.y + p.step*sin(p.a);
    line(p.x,p.y,nx,ny);
    p.x = nx;
    p.y = ny;
    if(p.x > width || p.x < 0 || p.y > height || p.y < 0) {
      points.splice(i,1);
    } else {
      const numBranches = floor(random(maxBranches+1));
      for(let j = 0;j < numBranches;j++) {
        const a = p.a + random(-maxda,maxda);
        const step = random(maxStep);
        points.push({x:p.x,y:p.y,a,step});
      }
      if(random()>1/(numBranches+1.1)) points.splice(i,1);
    }
    i = modulo(i-1,points.length);
  }
}