const numShapes = 4;
const maxRand = 1e9;
const noiseScale = 100;
const numPoints = 1000;
function setup() {
  let seed = null;
  if(!seed) seed = floor(random(maxRand));
  console.log(seed)
  randomSeed(seed);
  createCanvas(innerWidth, innerHeight);
  noFill();
  let maxR = min(width,height)/2;
  let da = TWO_PI/numPoints;
  const ox = width/2;
  const oy = height/2;
  for(let i=0;i<numShapes;i++) {
    noiseSeed(random(maxRand));
    beginShape();
    for(let a=0;a<TWO_PI;a+=da) {
      const noiseX = (1+cos(a))*noiseScale;
      const noiseY = (1+sin(a))*noiseScale;
      const r = noise(noiseX,noiseY)*maxR;
      vertex(ox+r*cos(a),oy+r*sin(a));
    }
    endShape();
  }
}

function draw() {
}