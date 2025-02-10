// Simplified implementatitons outperform p5
const lerp = (a, b, t) => a + (b - a) * t;
const fract = (x) => x % 1;

// Currently can not be changed after grid is populated
const vnoiseGridDims = 2;

const vnoiseGridSizes = Array(vnoiseGridDims).fill(0);
const vnoiseGrid = [];

function populateVNoiseGrid(
  sizes = vnoiseGridSizes,
  dims = vnoiseGridDims,
  subgrid = vnoiseGrid
) {
  const size = sizes[0];
  for (let i = 0; i < size; i++) {
    if (i < subgrid.length) {
      if (dims <= 1) continue;
      populateVNoiseGrid(sizes.slice(1), dims - 1, subgrid[i]);
    } else {
      subgrid.push(
        dims > 1 ? populateVNoiseGrid(sizes.slice(1), dims - 1, []) : random()
      );
    }
  }
  return subgrid;
}

const smoothstep = (x) => 3 * Math.pow(x, 2) - 2 * Math.pow(x, 3);

function sampleGrid(
  coords,
  subgrid = vnoiseGrid,
  location = [],
  dims = vnoiseGridDims
) {
  const coord = coords[0];
  const i1 = floor(coord);
  const i2 = floor(coord + 1);
  const lerpAmount = smoothstep(fract(coord));
  if (i2 >= vnoiseGridSizes[location.length]) {
    vnoiseGridSizes[location.length] = i2 + 1;
    populateVNoiseGrid();
    subgrid = vnoiseGrid;
    for (const i of location) {
      subgrid = subgrid[i];
    }
  }

  if (dims === 1) {
    return lerp(subgrid[i1], subgrid[i2], lerpAmount);
  }
  return lerp(
    sampleGrid(coords.slice(1), subgrid[i1], [...location, i1], dims - 1),
    sampleGrid(coords.slice(1), subgrid[i2], [...location, i2], dims - 1),
    lerpAmount
  );
}

function resetLastDim(newStartI, subgrid = vnoiseGrid, dims = vnoiseGridDims) {
  if (dims > 1) {
    for (const subgrid2 of subgrid) {
      resetLastDim(newStartI, subgrid2, dims - 1);
    }
    return;
  }
  let i = 0;
  for (let oldi = newStartI; oldi < subgrid.length; oldi++) {
    subgrid[i] = subgrid[oldi];
    i++;
  }
  for (; i < subgrid.length; i++) {
    subgrid[i] = random();
  }
}

function vnoise(...coords) {
  for (let i = coords.length; i < vnoiseGridDims; i++) {
    coords.push(0);
  }
  return sampleGrid(coords);
}

const maxBrushSize = 100;
const maxPointsPerBrush = 100;
const maxPointsPerFrame = 1000;
const maxPointSize = 5;
const brushes = [];
// const numBrushes = 10;
const maxSpeed = 2;
let time = 0;
const noiseScale = .005;

function setup() {
  const _height = innerHeight;
  // const _width = (_height/9)*16;
  const _width = innerWidth;
  
  createCanvas(_width, _height);
  noStroke();
  fill(0);
  background(255);
  const seed = floor(random(1e9));
  randomSeed(seed);
  noiseSeed(seed);
  print(seed);
  
  let totalPoints = 0;
  while(totalPoints < maxPointsPerFrame) {
    const xo = random(width);
    const yo = random(height);
    const brushSize = random(maxBrushSize);
    const numPoints = random(maxPointsPerBrush);
    const pointSize = random(maxPointSize);
    const col =   color(random(256),random(256),random(256));
    const points = [];
    for(let j=0;j<numPoints;j++) {
      const posa = random(TWO_PI);
      const posr = random(brushSize);
      const dx = posr*cos(posa);
      const dy = posr*sin(posa);
      points.push({dx,dy});      
    }
    brushes.push({xo,yo,pointSize,col,points});
    totalPoints += numPoints;
  }
}

function drawBrush(brush) {
  const {xo,yo,pointSize,col,points} = brush;
  fill(col);
  for(const p of points) {
    circle(xo+p.dx,yo+p.dy,pointSize);
  }
}

function draw() {
  time++;
  for(let i=0;i<brushes.length;i++) {
    const brush = brushes[i];
    const a = vnoise(i,time*noiseScale)*TWO_PI;
    brush.xo += maxSpeed*cos(a);
    brush.yo += maxSpeed*sin(a);
    drawBrush(brush);
  }
}