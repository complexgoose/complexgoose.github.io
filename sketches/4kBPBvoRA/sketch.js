const gridSize = 1;
let explored = new Set();
let rows, cols,offx,offy;
let cells = [];
const chance = .5;

function drawCell(col, row) {
  square(offx+col*gridSize,offy+row*gridSize,gridSize+1);
}

function getKey(col,row) {
  return `${col},${row}`;
}

function setup() {
  createCanvas(innerWidth,innerHeight);
  noStroke();
  fill(0);
  cols = floor(width/gridSize);
  rows = int(height/gridSize);
  offx = (width-gridSize*cols)/2;
  offy = (height-gridSize*rows)/2;
  const col = floor(cols/2);
  const row = floor(rows/2);
  cells.push({col,row});
  const key = getKey(col, row);
  explored.add(key);
}

function canSpread(col, row) {
  const key = getKey(col, row);
  const out = !explored.has(key);
  explored.add(key);
  return out;
}

function getNeighbors(col,row) {
  const neighbors = [];
  for (let ocol=col-1;ocol<=col+1;ocol++) {
    for (let orow=row-1;orow<=row+1;orow++) {
      if(ocol >= 0 && ocol < cols && orow >= 0 && orow < rows && (ocol != col || orow != row)) {
        neighbors.push({col:ocol,row:orow});
      }
    }
  }
  return neighbors;
}

const noiseScale = .01;
let time = 0;
const timeScale = .001;
function draw() {
  const nextCells = [];
  for (const cell of cells) {
    const {col,row} = cell;
    fill(0);
    drawCell(col,row);
    for(const neighbor of getNeighbors(col, row)) {
      const {col:ocol, row:orow} = neighbor;
      if(canSpread(ocol,orow) && noise(ocol*noiseScale,orow*noiseScale) < chance) {
        nextCells.push(neighbor);
      }
    }
  }
  cells = nextCells;
  time += timeScale;
}