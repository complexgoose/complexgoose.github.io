let mesh = [];

const speed = 1;
const noiseScale = .01;
const timeScale = .005;

const uniformNoise = (x,y,z) => 2*noise(x,y,z)-.5;
const reachedDistSq = Math.pow(10,2);
const meshSize = 10;


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
    mesh.push({x:randomGaussian(width/2,width/6),y:randomGaussian(height/2,height/6),adj:new Set(),h:random(360)});
  }
  for(const i in mesh) {
    for(let a=PI/4;a<TWO_PI;a+=PI/2) {
      const oi = getClosestMeshPoint(i,a,a+PI/2);
      if(oi === undefined) continue;
      mesh[i].adj.add(oi);
      mesh[oi].adj.add(i);
    }
  }
}

function draw() {
  //background(255);
  stroke(0);
  for (const meshPoint of mesh) {
    const {x,y,h,adj,xmod,ymod} = meshPoint;
    stroke(h,60,90);
    for(const oi of adj) {
      const {x:ox,y:oy} =mesh[oi];
      line(x,y,ox,oy);
    }
    const a = uniformNoise(x*noiseScale,y*noiseScale,frameCount*timeScale)*TWO_PI;
    meshPoint.x = x + speed*cos(a);
    meshPoint.y = y + speed*sin(a);
  }
  noStroke();
}