function doubleKey(x,y) {
    return x+","+y;
}

function keyToVals(key) {
  const vals = key.split(",");
  return vals.map((val) => Number.parseInt(val));
}

class DoubleMap {
  constructor() {
    this.map = new Map();
  }
  
  set(x,y,val) {
    return this.map.set(doubleKey(x,y),val);
  }
  
  get(x,y) {
    return this.map.get(doubleKey(x,y));
  }
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
  
  pop() {
    const {value, done} = this.get();
    if(done) return undefined;
    this.set.delete(value);
    return keyToVals(value);
  }
  
  get() {
    return this.set.values().next();
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
    return this.inverseSet.size;
  }
}

class PriorityQueue {
  constructor() {
    this.map = new Map();
    this.minKey = Infinity;
  }
  
  clear() {
    this.map.clear();
    this.minKey = Infinity;
  }
  
  refreshMinKey() {
    let min = Infinity;
    for(const key of this.map.keys()) {
      if(key < min) {
        min = key;
      }
    }
    this.minKey = min;
  }
  
  enqueue(priority, x, y) {
    if(!this.map.has(priority)) {
     this.map.set(priority, new DoubleSet());
    }
    if(priority < this.minKey) this.minKey = priority;
    return this.map.get(priority).add(x,y);
  }
  
  dequeue() {
    if(this.map.size === 0) return undefined;
    let val = this.map.get(this.minKey).pop();
    if(val===undefined) {
      this.map.delete(this.minKey);
      if(this.map.size === 0) return val;
      this.refreshMinKey();
      val = this.map.get(this.minKey).pop();
    }
    return val;
  }
  
  requeue(oldP, newP, x, y) {
    const oldSet = this.map.get(oldP);
    oldSet.delete(x,y);
    if(oldSet.size === 0) this.map.delete(oldP);
    return this.enqueue(newP, x, y);
  }
}

class BiDoubleMap {
  constructor(vals) {
    this.map = new Map();
    this.inverseMap = new DoubleMap();
    for(const key in vals) {
      const [x,y] = vals[key];
      this.set(key, x, y);
    }
  }
  
  get(key) {
    return this.map.get(key);
  }
  
  inverseGet(x,y) {
    return this.inverseMap.get(x,y);
  }
  
  set(key, x, y) {
    this.map.set(key, [x,y]);
    this.inverseMap.set(x,y,key);
  }
}

let speedSlr;
let grid = [];
let inMaze;
const gridSize = 20;
const cellSize = 12;
const pathSize = (gridSize-cellSize)/2;
const dirs = ["up", "down", "left", "right"];
const oppDir = {up:"down", down:"up", left:"right", right:"left"}
const dirToDiff = new BiDoubleMap({
  up: [0,-1],
  right: [1,0],
  down: [0,1],
  left: [-1,0]
});
let numColumns,numRows,xoff,yoff;

function pickRandCoords() {
  return [
    Math.floor(random(numColumns)),
    Math.floor(random(numRows))
  ];
}

function step(x,y) {
  const dir = random(dirs);
  const [dx,dy] = dirToDiff.get(dir);
  return [x+dx,y+dy];
}

let path,coordPathI,tries;
const inPath = new DoubleSet();
const checkTries = false;

function clearPath() {
  path = undefined;
  coordPathI = undefined;
  tries = undefined;
  inPath.clear();
}

function update() {
  if(path===undefined) {
    let coords = inMaze.inverseGet();
    if (coords === undefined) return djikstra();
    const [x,y] = coords;
    path = [coords];
    coordPathI = new DoubleMap();
    coordPathI.set(x,y,path.length-1);
    tries = 0;
    inPath.add(x,y);
    return true;
  }
  
  let [x,y] = path[path.length-1];
  if(inMaze.has(x,y)) {
    for(let i=1;i<path.length;i++) {
      const [px,py] = path[i-1];
      [x,y] = path[i];
      const [dx,dy] = [x-px,y-py];
      const dir = dirToDiff.inverseGet(dx,dy);
      inMaze.add(px,py);
      grid[px][py][dir] = true;
      grid[x][y][oppDir[dir]] = true;
    }
    clearPath();
    return true;
  }
  
  if(checkTries && tries++>1000) {
    clearPath();
    return true;
  }
    
  coords = step(x,y);
  [x,y] = coords;
  const prevIndex = coordPathI.get(x,y);
  if(prevIndex !== undefined) {
    for(let i=prevIndex+1;i<path.length;i++) {
      [x,y] = path[i];
      inPath.delete(x,y);
    }
    path.splice(prevIndex+1);
    return true;
  }
  if(x<0 || x>=numColumns || y<0 || y>=numRows) {
    return true;
  }
  path.push(coords);
  inPath.add(x,y);
  coordPathI.set(x,y,path.length-1);
  
  return true;
}

let inD;
let curD, qD, sourceD, targetD;
function djikstra() {
  if(sourceD === undefined) {
    sourceD = [random()<.5 ? 0 : numColumns-1, random()<.5 ? 0 : numRows-1];
    const [x,y] = sourceD;
    targetD = [(numColumns-1)-x,(numRows-1)-y];
    grid[x][y].dist = 0;
    
    qD = new PriorityQueue();
    for(let xi=0;xi<numColumns;xi++) {
      for(let yi=0;yi<numRows;yi++) {
        const priority = xi === x && yi === y ? 0 : Infinity;
        qD.enqueue(priority, [xi,yi]);
      }
    }
    
    return true;
  }
  
  const coords = qD.dequeue();
  if(coords!==undefined) {
    const [x,y] = coords;
    inD.add(x,y);
    const info = grid[x][y];
    for(const dir of dirs) {
      if(!info[dir]) continue;
      const [dx,dy] = dirToDiff.get(dir);
      const nx = x+dx;
      const ny = y+dy;
      if(inD.has(nx,ny)) continue;
      if([nx,ny] === targetD) {
        qD.clear();
        break;
      }
      const alt = grid[x][y].dist + 1;
      const oldDist = grid[nx][ny].dist;
      if(alt < oldDist) {
        grid[nx][ny].dist = alt;
        grid[nx][ny].prev = coords;
        qD.requeue(oldDist, alt, nx, ny);
      }
    }
    
    return true;
  }
  
  if(curD === undefined) {
    curD = targetD;
  }
  
  if(curD !== sourceD) {
    const [x,y] = curD;
    inD.delete(x,y);
    curD = grid[x][y].prev;
    if(curD === undefined) return false;
    return true;
  }
}

function setupMaze() {
  inMaze = new BiDoubleSet(numColumns, numRows);
  grid = [];
  for(let xi=0;xi<numColumns;xi++) {
    grid[xi] = [];
    for (let yi=0;yi<numRows;yi++) {
      grid[xi][yi] = {
        up: false,
        right: false,
        down: false,
        left: false,
        dist: Infinity,
        prev: undefined,
      };
    }
  }
  const [x,y] = inMaze.inverseGet();
  inMaze.add(x,y);
  inD = new DoubleSet();
  qD = undefined;
  sourceD = undefined;
  targetD = undefined;
  curD = undefined;
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  numColumns = Math.floor(width / gridSize);
  numRows = Math.floor(height / gridSize);
  
  xoff = (width-(numColumns*gridSize))/2;
  yoff = (height-(numRows*gridSize))/2;
  setupMaze();
  noStroke();
  colorMode(HSB);
  speedSlr = createSlider(1,100,1);
}

let displayFrames = 0;
function draw() {
  background("white");
  if(displayFrames>0) {
    if(--displayFrames === 0) {
      setupMaze();
    }
  } else {
    for(let i=0;i<speedSlr.value();i++) {
      if(!update()) {
        displayFrames = 300;
        break;
      }
    }
  }
  
  //while(update());
  for(let xi=0;xi<numColumns;xi++) {
    for (let yi=0;yi<numRows;yi++) {
      const x = xoff+(xi*gridSize);
      const y = yoff+(yi*gridSize);
      if(inMaze.has(xi,yi)) {
        if (inD.has(xi,yi)) fill("black");
        else fill((noise(xi*.05,yi*.05,frameCount*.005)*720)-180,75,75+(yi/numColumns)*25);
      } 
      else if (inPath.has(xi,yi)) fill("orange");
      else fill("white");
      rect(x+pathSize,y+pathSize,cellSize);
      const {up,right,down,left} = grid[xi][yi];
      if(up) {
        rect(x+pathSize, y+pathSize, cellSize, -pathSize*2);
      }
      if (right) {
       rect(x+pathSize+cellSize, y+pathSize, pathSize*2, cellSize) 
      }
      if (down) {
        rect(x+pathSize, y+pathSize+cellSize, cellSize, pathSize*2)
      }
      if(left) {
        rect(x+pathSize, y+pathSize, -pathSize*2, cellSize);
      }
    }
  }
}