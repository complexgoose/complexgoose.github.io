function doubleKey(x,y) {
    return x+","+y;
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
  
  get() {
    return this.set.values().next();
  }
  
  size() {
    return this.set.size;
  }
}

let img;
function preload() {
  img = loadImage("IMG_7546.jpg");
}

function getPixel(pos) {
  const x = min(floor(pos.x/imgScale),img.width-1);
  const y = min(floor(pos.y/imgScale),img.height-1);
  const i = 4*(y*img.width+x);
  return img.pixels.slice(i,i+3);
}

const MAX_COLOR_COMPONENT = 255;
function getColorI(r,g,b) {
  return r + MAX_COLOR_COMPONENT*g + pow(MAX_COLOR_COMPONENT,2)*b;
}
let MAX_COLOR_I;

const gridSize = 10;
const hGridSize = gridSize/2;
const animSpeed = 1;
const visited = new DoubleSet();
let x,y;

function setup() {
  pixelDensity(1);
  img.loadPixels();
  imgScale = max(innerWidth/img.width,innerHeight/img.height);
  // imgScale = 1;
  let _width = img.width*imgScale;
  let _height = img.height*imgScale;
  createCanvas(_width, _height);
  
  background(255);
  
  MAX_COLOR_I = getColorI(MAX_COLOR_COMPONENT,MAX_COLOR_COMPONENT,MAX_COLOR_COMPONENT);
  
  x = floor(random(width));
  y = floor(random(height));
}

function draw() {
  for(let i=0;i<animSpeed;i++) {
    if(visited.has(x,y) || x<0||x>width||y<0||y>height) {
      x = floor(random(width));
      y = floor(random(height));
      continue;
    }
    visited.add(x,y);
    const pixel = getPixel(createVector(x,y));
    const colorI = getColorI(...pixel);
    const prog = colorI/MAX_COLOR_I;
    const a = prog*TWO_PI;
    const nx = floor(y+gridSize*cos(a));
    const ny = floor(x+gridSize*sin(a));
    line(x,y,nx,ny);
    x = nx;
    y = ny;
  }
}