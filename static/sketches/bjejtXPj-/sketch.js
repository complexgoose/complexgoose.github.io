let dots = [];
let mesh = [];

const reachedDistSq = Math.pow(10,2);

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
  for(let i=0;i<100;i++) {
    mesh.push({x:randomGaussian(width/2,width/6),y:randomGaussian(height/2,height/6),adj:new Set(),h:random([0,170,220,260,300])});
  }
  for(const i in mesh) {
    for(let a=PI/4;a<TWO_PI;a+=PI/2) {
      const oi = getClosestMeshPoint(i,a,a+PI/2);
      if(oi === undefined) continue;
      mesh[i].adj.add(oi);
      mesh[oi].adj.add(i);
    }
  }
  let extraTries = 0;
  for(let i=0;i<1000;i++) {
    const target = randomMeshPoint();
    const {x,y,h,adj} = mesh[target];
    if(adj.size===0) {
      i--;
      if(++extraTries>1000) break;
      continue;
    }
    const dot = {x,y,d:5,a:random(TWO_PI),v:10,h,target,dead:false,age:0};
    dots.push(dot);
  }
}

function draw() {
  //background(255);
  const qt = new QuadTree(new Rectangle(width/2,height/2,width,height),dots.length);
  for(const dot of dots) {
    qt.insert(new Point(dot.x,dot.y,dot.h));
  }
  stroke(0);
  for (const {x,y,adj} of mesh) {
    //circle(x,y,5);
    for(const oi of adj) {
      const {x:ox,y:oy} =mesh[oi];
      //line(x,y,ox,oy);
    }
  }
  noStroke();
  for(const dot of dots) {
    let {x,y,d,a,v,h,target,dead} = dot;
    for(const odot of qt.query(new Circle(x,y,1))) {
      if(odot.userData !== h) {
        dead = true;
        dot.dead = true;
        break;
      }
    }
    if(dead) continue;
    fill(h,60,75);
    circle(x,y,d);
    
    const {x:ox,y:oy,adj} = mesh[target];
    const dy = oy-y;
    const dx = ox-x;
    const distSq = pow(dx,2)+pow(dy,2);
    if(random()>distSq/reachedDistSq) {
      if(dot.age++>=5) dot.dead = true;
      target = random([...adj]);
    }
    
    const jitter = PI*.5;
    a = atan2(dy,dx)+random(-jitter,jitter);
    x += v*cos(a);
    y += v*sin(a);
    
    dot.x = x;
    dot.y = y;
    dot.a = a;
    dot.target = target;
  }
}