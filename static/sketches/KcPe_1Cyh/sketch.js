const numLines = 50;
const noiseScale = .005;
function setup() {
  const seed = random(1e9);
  randomSeed(seed);
  noiseSeed(seed);
  console.log(seed);
  const minSide = min(innerWidth, innerHeight);
  createCanvas(minSide, minSide);
  noFill();
  for(let line =0;line<numLines;line++) {
    let y = randomGaussian(height/2,height/8);
    let x = 0;
    beginShape();
    while(x<width) {
      const a = (noise(line*noiseScale,x*noiseScale, y*noiseScale)*PI)-HALF_PI;
      vertex(x,y);
      x += cos(a);
      y += sin(a);
    }
    endShape();
  }
  //saveSVG("flow-field")
}

function draw() {
}