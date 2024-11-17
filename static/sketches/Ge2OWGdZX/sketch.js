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

const gridSize = 4;
const hGridSize = gridSize/2;

function setup() {
  pixelDensity(1);
  img.loadPixels();
  imgScale = max(innerWidth/img.width,innerHeight/img.height);
  // imgScale = 1;
  let _width = img.width*imgScale;
  let _height = img.height*imgScale;
  createCanvas(_width, _height);
  
  background(255);
  
  const maxColorI = getColorI(MAX_COLOR_COMPONENT,MAX_COLOR_COMPONENT,MAX_COLOR_COMPONENT);
  
  for(let ox=0;ox<width;ox+=gridSize) {
    for(let oy=0;oy<height;oy+=gridSize) {
      const cx = ox + hGridSize;
      const cy = oy + hGridSize;
      const pixel = getPixel(createVector(cx,cy));
      const colorI = getColorI(...pixel);
      const prog = colorI/maxColorI;
      const a = prog*TWO_PI;
      const dx = hGridSize*cos(a)
      const dy = hGridSize*sin(a);
      line(cx+dx,cy+dy,cx-dx,cy-dy);
    }
  }
}

function draw() {
}