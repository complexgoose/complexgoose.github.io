const gridSize = 50;
const noiseScale = .0005;
function setup() {
  createCanvas(innerWidth, innerHeight,SVG);
  noFill();
  const seed = floor(random(1e9));
  // const seed = 419156869;
  noiseSeed(seed);
  console.log(seed);
  background(255);
  for(let xo=gridSize*2;xo<width-gridSize*2;xo+=gridSize) {
    for(let yo=gridSize*2;yo<height-gridSize*2;yo+=gridSize) {
      beginShape();
      const r = noise(xo*noiseScale,yo*noiseScale,0)*gridSize*2;
      const amod = TWO_PI/round(noise(xo*noiseScale,yo*noiseScale,1)*10);
      const astart = noise(xo*noiseScale,yo*noiseScale,2)*TWO_PI;
      for(let a=astart;a<=astart+TWO_PI;a+=amod) {
        vertex(xo+r*cos(a),yo+r*sin(a));
      }
      endShape(CLOSE);
    }
  }
  // saveSVG("gridnoiseshapes");
}

function draw() {
  
}