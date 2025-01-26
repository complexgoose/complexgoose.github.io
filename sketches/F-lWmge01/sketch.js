function doubleKey(x,y) {
    return x+","+y;
}

function keyToVals(key) {
  const vals = key.split(",");
  return vals.map((val) => Number.parseInt(val));
}

class DoubleSet {
  constructor() {
    this.set = new Set();
  }

  add(x,y) {
    return this.set.add(doubleKey(x,y));
  }
  
  has(x,y) {
    return this.set.has(doubleKey(x,y));
  }
  
  delete(x,y) {
    return this.set.delete(doubleKey(x,y));
  }
  
  get(i) {
    const values = this.set.values();
    return values.next();
  }
  
  size() {
    return this.set.size;
  }
  
  clear() {
    return this.set.clear();
  }
}

class BiDoubleSet {
  constructor(width, height) {
    this.set = new DoubleSet();
    this.inverseSet = new DoubleSet();
    for(let x=0;x<width;x++) {
      for(let y=0;y<height;y++) {
        this.inverseSet.add(x,y);
      }
    }
  }
  
  add(x,y) {
    this.inverseSet.delete(x,y);
    return this.set.add(x,y);
  }
  
  has(x,y) {
    return this.set.has(x,y);
  }
  
  inverseGet() {
    const {value, done} = this.inverseSet.get();
    if(done) return undefined;
    return keyToVals(value);
  }
  
  inverseSize() {
    return this.inverseSet.size();
  }
  
  size() {
    return this.set.size;
  }
}


const dirs = [[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]];
const points = [];

const gridSize = 3;
const numPoints = 1;
const noiseScale = .01;
const animSpeed = 100;

let numRows, numCols;
let visited;

function setup() {
  createCanvas(innerWidth, innerHeight);
  numRows = ceil(height/gridSize);
  numCols = ceil(width/gridSize);
  visited = new BiDoubleSet(numCols,numRows);
  for(let i=0;i<numPoints;i++) {
    addPoint();
  }
  background(255);
  strokeCap(SQUARE);
}

function addPoint() {
  let coords = visited.inverseGet();
  if(coords === undefined) return;
  const [xi,yi] = coords;
  const point = {xi,yi};
  points.push(point);
  visited.add(xi,yi);
  return point;
}

function updatePoint(p,i) {
  const dir = dirs[floor(noise(p.xi*noiseScale,p.yi*noiseScale)*dirs.length)];
  const nxi = p.xi+dir[0];
  const nyi = p.yi+dir[1];
  line(p.xi*gridSize,p.yi*gridSize,nxi*gridSize,nyi*gridSize);
  if(visited.has(nxi,nyi) || nxi < 0 || nxi >= numCols || nyi < 0 || nyi >= numRows) {
    points.splice(i,1);
    addPoint();
    return;
  }
  p.xi = nxi;
  p.yi = nyi;
  visited.add(nxi,nyi);
}

function draw() {
  const curNumPoints = points.length;
  if(curNumPoints<=0) {
    noLoop();
    print("Done!");
    return;
  }
  for(let j =0;j<animSpeed/curNumPoints;j++) {
    for(let i = points.length-1;i>=0;i--) {
      const p = points[i];
      updatePoint(p,i);
    }
  }
}