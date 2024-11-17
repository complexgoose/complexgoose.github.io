let imgs, imgScale, img;
let imgi = -1;
const noiseScale = .003;
function preload() {
  const paths = ["IMG_0368.jpg", "IMG_4992.jpg", "IMG_5001.jpg", "IMG_5197.jpg", "IMG_5211.jpg", "IMG_5215.jpg", "IMG_5225.jpg", "IMG_5219.jpg", "sky.jpg"];
  imgs = paths.map((path) => loadImage(path));
  img = imgs[imgi];
}

function getPixel(cx,cy) {
  const x = min(floor(cx/imgScale),img.width);
  const y = min(floor(cy/imgScale),img.height);
  const i = 4*(y*img.width+x);
  return img.pixels.slice(i,i+4);
}

function loadImg(i) {
  imgi = i % imgs.length;
  img = imgs.at(imgi);
  imgScale = min(innerWidth/img.width, innerHeight/img.height);
  let _width = img.width*imgScale;
  let _height = img.height*imgScale;
  //resizeCanvas(_width, _height);
  const gridSize = 1;
  background(255);
  for (let ox=0;ox<width;ox+=gridSize) {
    for(let oy=0;oy<height;oy+=gridSize) {
      const x = ((noise(ox*noiseScale,oy*noiseScale,0)*width)+ox)%_width;
      const y = ((noise(ox*noiseScale,oy*noiseScale,1)*height)+oy)%_height;
      fill(...getPixel(x,y));
      square(ox,oy,gridSize);
    }
  }
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  pixelDensity(1);
  imgs.forEach((img) => img.loadPixels());
  createCanvas(innerWidth, innerHeight);
  noStroke();
  loadImg(imgi);
}

function keyReleased() {
  switch(keyCode) {
    case RIGHT_ARROW:
      loadImg(imgi+1);
      break;
    case LEFT_ARROW:
      loadImg(imgi-1);
      break;
  }
}

function draw() {
}