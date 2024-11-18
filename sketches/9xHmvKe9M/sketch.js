const gridSize = 50;
let numwaves = 10;
function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB);
  noStroke();
}

function draw() {
  background(255);
  let yo = height;
  for(let i=0;i<numwaves;i++) {
    noiseSeed(i);
    for(let x=0;x<width;x+=gridSize) {
      let ySize = noise(x*.005, frameCount*.005)*height*1.5*((numwaves-i)/numwaves);
      fill(noise((x-frameCount)*.005)*360*1.5,75,75);
      rect(x+i*(gridSize/numwaves),yo,gridSize,-ySize);
    }
  }
}