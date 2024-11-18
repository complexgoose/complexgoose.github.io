let points = [];
let lines = [];
const numPoints = 1;
const pointSize = 10;
const maxStep = pointSize/4;
const lineSep = 50;
const maxda = Math.PI/16;
const noiseScale = .005;
const animSpeed = 1000;
let globalDa;
const lineLimit = 75;
let numLines = 0;
function setup() {
  createCanvas(innerWidth, innerHeight);
  const seed = floor(random(1e9));
  // const seed = 645591032;
  randomSeed(seed);
  noiseSeed(seed);
  print(seed);
  
  addPoints();
  globalDa = random([PI/2,PI*1.5]);
  background(255);
}

function addPoints() {
  for(let i=0;i<numPoints;i++) {
    points.push({x: random(width),y:random(height), a: random(TWO_PI), lastLine: []});
  }
}

function addLine(data) {
  const start = data[0];
  // const da = random(TWO_PI);
  const da = globalDa;
  const a = start.a + da;
  const x = start.x + lineSep*cos(a);
  const y = start.y + lineSep*sin(a);
  if(x<0||x>width||y<0||y>height) {
    return;
  }
  lines.push({i: 1, data,x,y,da:da,lastLine: [{x,y,a:start.a}]});
}

function getOffsetPoint(pt,da) {
  const sepa = pt.a + da;
  const x = pt.x + lineSep*cos(sepa);
  const y = pt.y + lineSep*sin(sepa);
  return {x,y,a:pt.a};
}

function draw() {
  for(let i=0;i<min(animSpeed/(points.length+lines.length),animSpeed);i++) {
    if(numLines>lineLimit) {
      noLoop();
      break;
    }
    if(points.length===0 && lines.length === 0) addPoints();
    const pointsToRemove = new Set();
    fill(0);
    noStroke();
    for(let i in points) {
      const p = points[i];
      circle(p.x,p.y,pointSize);
      p.a += lerp(-maxda,maxda,noise(p.x*noiseScale,p.y*noiseScale,p.a));
      p.x += maxStep*cos(p.a);
      p.y += maxStep*sin(p.a);
      p.lastLine.push({x:p.x,y:p.y,a:p.a});
      if(p.x > width || p.x < 0 || p.y > height || p.y < 0) {
        pointsToRemove.add(i);
        addLine(p.lastLine);
        numLines++;
        continue;
      }
    }
    points = points.filter((p,i) => !pointsToRemove.has(String(i)));
    const linesToRemove = new Set();
    for(const j in lines) {
      const l = lines[j]
      let {i, data, x, y, da, lastLine} = l;
      if(i >= data.length) {
        addLine(lastLine);
        linesToRemove.add(j);
        numLines++;
        continue;
      }

      const ogpt = data[i];
      ({x: tx,y: ty} = getOffsetPoint(ogpt,da));
      while(true) {
        const a = ogpt.a;
        
        lastLine.push({x,y,a:ogpt.a});
        const distSq = pow(tx-x,2)+pow(ty-y,2);
        const nx = x+maxStep*cos(ogpt.a);
        const ny = y+maxStep*sin(ogpt.a);
        const nxDistSq = pow(tx-nx,2)+pow(ty-ny,2);
        if(nxDistSq>=distSq) {
          break;
        }
        circle(nx,ny,pointSize);
        x = nx;
        y = ny;
      }
      l.x = x;
      l.y = y;
      l.i++;
    }
    lines = lines.filter((l,i) => !linesToRemove.has(String(i)));
  }
}