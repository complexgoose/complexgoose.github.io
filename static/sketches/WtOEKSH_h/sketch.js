const brushSize = 10;
const numPoints = 1000;
const noiseScale = 3;
const timeScale = .005;
let time = 0;
const numDraws = 1;
let img;

function preload() {
  img = loadImage("orsay.jpg");
}

function setup() {
  const minSide = min(innerWidth,innerHeight);
  createCanvas(minSide,minSide);
  img.loadPixels();
  noStroke();
  const xmean = width/2;
  const xsd = width/2/3;
  const ymean = height/2;
  const ysd = height/2/3;
}

function draw() {
  for (let i=0;i<numDraws;i++) {
    time += timeScale;
    for(let i=0;i<numPoints;i++) {
      const pos = {x:random(width),y:random(height)}
      const imgx = floor((pos.x/width)*img.width);
      const imgy = floor((pos.y/height)*img.height);
      const pixelI = 4 * (imgx + imgy*img.width);
      const color = img.pixels.slice(pixelI,pixelI+3);
      fill(color[0],color[1],color[2]);
      circle(pos.x,pos.y, brushSize);
    }
  }
}