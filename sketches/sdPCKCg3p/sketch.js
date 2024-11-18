let img;
function preload() {
  img = loadImage("IMG_6813.jpg");
}

function getPixel(pos) {
  const x = min(floor(pos.x/imgScale),img.width-1);
  const y = min(floor(pos.y/imgScale),img.height-1);
  const i = 4*(y*img.width+x);
  return img.pixels.slice(i,i+4);
}

let noiseScale = .0005;
const timeScale = .005;
let time = 0;

const pointSize = 2;

function setup() {
  // const seed = 212779;
  const seed = floor(random(1e6));
  print(seed);
  randomSeed(seed);
  noiseSeed(seed);
  
  pixelDensity(1);
  img.loadPixels();
  imgScale = max(innerWidth/img.width,innerHeight/img.height);
  // imgScale = 1;
  let _width = img.width*imgScale;
  let _height = img.height*imgScale;
  createCanvas(_width, _height);
  noiseScale /= imgScale;
  background(255);
  noStroke();
  
  for(let ox=0;ox<width;ox+=pointSize) {
    for(let oy=0;oy<height;oy+=pointSize) {
      const sx = width*vnoise(0,ox*noiseScale,oy*noiseScale);
      const sy = height*vnoise(1,ox*noiseScale,oy*noiseScale);
      fill(...getPixel(createVector(sx,sy)));
      square(ox,oy,pointSize);
    }
  }
}

function draw() {
  time++;
}