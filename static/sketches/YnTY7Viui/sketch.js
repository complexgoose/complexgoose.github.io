let imgs, imgScale;

const mod = (n, m) => ((n % m) + m) % m;
const triangleWave = (x,a,p) => ((4*a)/p)*abs(mod(x-a-(p/4),p)-(p/2));
const bounded = (n,limit) => triangleWave(n,limit/2,limit*2);
const noiseScale = .003;
const uniformNoise = (x,y,z) => 2*noise(x,y,z)-.5;
function preload() {
  const paths = ["IMG_4992.jpg", "IMG_5001.jpg", "IMG_5211.jpg", "IMG_5215.jpg", "IMG_5225.jpg", "IMG_5219.jpg"];
  imgs = paths.map((path) => loadImage(path));
}

function getPixel(img, imgScale, cx,cy) {
  const x = floor(bounded(cx/imgScale,img.width))%img.width;
  const y = floor(bounded(cy/imgScale,img.height))%img.height;
  const i = 4*(y*img.width+x);
  return img.pixels.slice(i,i+4);
}

function loadImg() {
  const gridSize = 1;
  background(255);
  for (let ox=0;ox<width;ox+=gridSize) {
    for(let oy=0;oy<height;oy+=gridSize) {
      const imgi = floor(uniformNoise(ox*noiseScale,oy*noiseScale)*imgs.length)%imgs.length;
      const img = imgs.at(imgi);
      const imgScale = min(innerWidth/img.width, innerHeight/img.height);
      fill(...getPixel(img, imgScale, ox,oy));
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
  loadImg();
  // for(let i=0;i<100;i++) {
  //   console.log(i, bounded(i,10));
  // }
}

function draw() {
}