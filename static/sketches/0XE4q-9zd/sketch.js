let img;

const edges = {
  not: 0, // not off an edge
  left: 1,
  right: 2,
  top: 3,
  bottom: 4
};

function rgba(r,g,b,a) {
  return `rgba(${r},${g},${b},${a/255})`;
}

function getPixel(pos) {
  const x = min(floor(pos.x/imgScale),img.width-1);
  const y = min(floor(pos.y/imgScale),img.height-1);
  const i = 4*(y*img.width+x);
  return img.pixels.slice(i,i+4);
}

function getPixelColor(pos) {
  return color(...getPixel(pos));
}

const dirs = [
  new p5.Vector(1,0),
  new p5.Vector(-1,0),
  new p5.Vector(0,1),
  new p5.Vector(0,-1),
  new p5.Vector(1,1),
  new p5.Vector(1,-1),
  new p5.Vector(-1,1),
  new p5.Vector(-1,-1)
].map((dir) => dir.normalize());

function pickNeighbor(pos) {
  const pixel = getPixel(pos);
  
  let minDeltaE = Infinity;
  let minDir = [0,0];
  for(const dir of dirs) {
    const neighbor = p5.Vector.add(pos,dir);
    if(pos.x<0 || pos.x>width || pos.y<0 || pos.y>height) continue;
    const oPixel = getPixel(neighbor);
    const deltaE = chroma.deltaE(chroma(rgba(...pixel)), chroma(rgba(...oPixel)));
    if(deltaE < minDeltaE) {
      minDeltaE = deltaE;
      minDir = dir;
    }
  }
  return minDir;
}

function getDirection(pos) {
  const x = floor(pos.x/gridSize)%flowField.length;
  const y = floor(pos.y/gridSize)%flowField[x].length;
  return flowField[x][y];
}

function offEdge(pos) {
  if (pos.x<0) return edges.left;
  else if(pos.x>width) return edges.right;
  if (pos.y<0) return edges.top;
  else if(pos.y>height) return edges.bottom;
  return edges.not;
}

const flowField = [];
const brushSize = 5;
const gridSize =10;
const numPoints = 1000;
const points = [];
const acc = .2;
const maxSpeed = 2;
const maxSpeedSq = Math.pow(maxSpeed,2);
const colorVel = .3;
let time = 0;

function preload() {
  img = loadImage("IMG_5219.jpg");
}

function setupPoints() {
  for(let i=0;i<numPoints;i++) {
    const point = {pos:createVector(floor(random(width)),floor(random(height))), vel:createVector(0,0)};
    point.color = getPixelColor(point.pos);
    if(points.length<=i) points.push(point);
    else points[i] = point;
  }
}

function setup() {
  pixelDensity(1);
  img.loadPixels();
  imgScale = max(innerWidth/img.width,innerHeight/img.height);
  let _width = img.width*imgScale;
  let _height = img.height*imgScale;
  createCanvas(_width, _height);
  noStroke();
  // image(img,0,0,width,height);
  for(let x=0;x<width;x+=gridSize) {
    const column = [];
    flowField.push(column);
    for(let y=0;y<height;y+=gridSize) {
      column.push(pickNeighbor(createVector(x,y)));
    }
  }
  setupPoints();
}

function draw() {
  if(++time % 100 === 0) {
    setupPoints();
  }
  for(const point of points) {
    let {pos,vel,color} = point;
    fill(color);
    circle(pos.x,pos.y,brushSize);
    const dir = getDirection(pos);
    vel.add(p5.Vector.mult(dir,acc));
    vel.limit(maxSpeed);
    pos.add(vel);
    
    const edge = offEdge(pos)
    if (edge) {
      switch(edge) {
        case edges.left:
          pos.x = width;
          break;
        case edges.right:
          pos.x = 0;
          break;
        case edges.top:
          pos.y = height;
          break;
        case edges.bottom:
          pos.y = 0;
          break;
      }
      point.color = getPixelColor(pos);
    }
    
    point.color = lerpColor(color,getPixelColor(pos),colorVel);
  }
}