let mesh = [];

const speed = 4;
const noiseScale = .005;
const timeScale = .005;

const uniformNoise = (x,y,z) => 2*noise(x,y,z);
const reachedDistSq = Math.pow(10,2);
const meshSize = 10;
const pointSize = 2;
const pointSep = 4;


const randomMeshPoint = () => floor(random(mesh.length));

function getClosestMeshPoint(i,minA,maxA) {
  const meshPoint = mesh[i];
  let bestDistSq = Infinity;
  let bestI;
  for(const oi in mesh) {
    if(oi===i) continue;
    const oMeshPoint = mesh[oi];
    const dy = meshPoint.y-oMeshPoint.y
    const dx = meshPoint.x-oMeshPoint.x;
    const a = atan2(dy,dx);
    if (a<minA || a>maxA) continue;
    const distSq = pow(dx,2)+pow(dy,2);
    if(distSq<bestDistSq) {
      bestDistSq = distSq;
      bestI = oi;
    }
  }
  return bestI;
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB);
  background(255);
  for(let i=0;i<meshSize;i++) {
    mesh.push({x:randomGaussian(width/2,width/12),y:randomGaussian(height/2,height/12),adj:new Set(),h:random(360)});
  }
  for(const i in mesh) {
    for(let a=PI/4;a<TWO_PI;a+=PI/2) {
      const oi = getClosestMeshPoint(i,a,a+PI/2);
      if(oi === undefined) continue;
      mesh[i].adj.add(oi);
    }
  }
}

function draw() {
  //background(255);
  noStroke();
  for (const meshPoint of mesh) {
    const {x,y,h,adj,xmod,ymod} = meshPoint;
    fill(h,60,90);
    for(const oi of adj) {
      const {x:ox,y:oy} =mesh[oi];
      const distance = dist(x,y,ox,oy);
      const step = pointSep/distance;
      for(let prog=0;prog<=1;prog+=step) {
        circle(lerp(x,ox,prog),lerp(y,oy,prog),pointSize);
      }
    }
    const a = uniformNoise(x*noiseScale,y*noiseScale,frameCount*timeScale)*TWO_PI;
    meshPoint.x = x + speed*cos(a);
    meshPoint.y = y + speed*sin(a);
  }
}