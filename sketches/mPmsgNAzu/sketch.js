let img,imgScale;
function preload() {
  img = loadImage("IMG_7485.jpg");
}

function getPixel(pos) {
  const x = min(floor(pos.x/imgScale),img.width-1);
  const y = min(floor(pos.y/imgScale),img.height-1);
  const i = 4*(y*img.width+x);
  return img.pixels.slice(i,i+3);
}

const gridSize = 25;
const gridPoints = [];
const gridOrigins = [];
const rowSizes = [];
const columnSizes = [];
const noiseScale = .005;
const maxOff = gridSize/5;
let xoff,yoff,numColumns,numRows;

function getCoords(xi,yi) {
  return gridOrigins[xi][yi];
}

function drawLine(x1,y1,x2,y2) {
  const noiseOff1 = -noise(x1*noiseScale,y1*noiseScale)+0.5;
  const noiseOff2 = -noise(x2*noiseScale,y2*noiseScale)+0.5;
  for(let prog=0;prog<=1;prog+=.01) {
    const basex = lerp(x1,x2,prog);
    const basey = lerp(y1,y2,prog);
    const noiseOff = lerp(noiseOff1,noiseOff2,prog);
    const xoff = lerp(-maxOff,maxOff,noise(basex*noiseScale,basey*noiseScale,0)+noiseOff);
  const yoff = lerp(-maxOff,maxOff,noise(basex*noiseScale,basey*noiseScale,0)+noiseOff);
  }
}

function setup() {
  pixelDensity(1);
  img.loadPixels();
  imgScale = max(innerWidth/img.width,innerHeight/img.height);
  // imgScale = 1;
  let _width = img.width*imgScale;
  let _height = img.height*imgScale;
  createCanvas(_width, _height);
  background(255);
  let xo = 0;
  while(xo < width) {
    const size = random(gridSize);
    columnSizes.push(size);
    xo += size;
  }
  columnSizes.pop();
  let yo = 0;
  while(yo < height) {
    const size = random(gridSize);
    rowSizes.push(size);
    yo += size;
  }
  rowSizes.pop();
  numColumns = columnSizes.length;
  numRows = rowSizes.length;
  xoff = (width-xo+columnSizes.at(-1))/2;
  yoff = (height-yo+rowSizes.at(-1))/2;
  xo = 0;
  for(let xi=0;xi<numColumns;xi++) {
    const columnPoints = [];
    gridPoints.push(columnPoints);
    const columnOrigins = [];
    gridOrigins.push(columnOrigins);
    let yo = 0;
    for(let yi=0;yi<numRows;yi++) {
      columnOrigins.push([xo,yo]);
      columnPoints.push([xo+random(gridSize),yo+random(gridSize)]);
      yo += rowSizes[yi];
    }
    xo += columnSizes[xi];
  }
  noStroke();
  for(let xi=0;xi<numColumns-1;xi++) {
    for(let yi=0;yi<numRows-1;yi++) {
      const nudge = 1;
      const p1 = gridPoints[xi][yi];
      p1[0] -= nudge;
      p1[1] -= nudge;
      const p2 = gridPoints[xi+1][yi];
      p2[0] += nudge;
      p2[1] -= nudge;
      const p3 = gridPoints[xi][yi+1];
      p3[0] -= nudge;
      p3[1] += nudge;
      const p4 = gridPoints[xi+1][yi+1];
      p4[0] += nudge;
      p4[1] += nudge;
      fill(...getPixel(createVector(...p1)));
      beginShape();
      // line(...p1,...p2);
      vertex(...p1);
      vertex(...p2);
      // line(...p2,...p4);
      vertex(...p4);
      // line(...p4,...p3);
      vertex(...p3);
      // line(...p3,...p1);
      vertex(...p1);
      endShape();
    }
  }
}

function draw() {
}