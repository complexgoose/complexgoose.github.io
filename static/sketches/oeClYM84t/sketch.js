const gridSize = 1;
let rows, cols,offx,offy,midCol,midRow;
let cells = [];
const chance = .5;

function drawCell(col, row) {
  square(offx+col*gridSize,offy+row*gridSize,gridSize);
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
  midCol = col;
  midRow = row;
  background(255);
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

const noiseScale = 1;
let time = 0;
const timeScale = .001;
let ring = 0;
function draw() {
  const inNextCells = new Set();
  const nextCells = [];
  ring++;
  for (const cell of cells) {
    const {col,row} = cell;
    fill(0);
    drawCell(col,row);
    for(const neighbor of getNeighbors(col, row)) {
      const {col:ocol, row:orow} = neighbor;
      const key = getKey(ocol, orow);
      if(!inNextCells.has(key) && (abs(ocol-midCol)===ring || abs(orow-midRow) === ring) && random() < chance) {
        inNextCells.add(key);
        nextCells.push(neighbor);
      }
    }
  }
  cells = nextCells;
  time += timeScale;
}