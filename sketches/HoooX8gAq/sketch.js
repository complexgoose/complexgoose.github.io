const noiseScale = .01;
function setup() {
  const seed = 1590267682;
  randomSeed(seed);
  noiseSeed(seed);
  console.log(seed);
  createCanvas(innerWidth,innerHeight,SVG);
  strokeWeight(3);
  background(255);
  noFill();
  const maxr = min(width,height)/2.1;
  const xo = width/2;
  const yo = height/2;
  for(let i=0;i<300;i++) {
    const a1 = random(TWO_PI);
    const r2 = noise(a1*noiseScale,0)*maxr;
    const a2 = noise(a1*noiseScale,1)*TWO_PI;
    const r3 = noise(a1*noiseScale,2)*maxr;
    const a3 = noise(a1*noiseScale,3)*TWO_PI;
    const a4 = noise(a1*noiseScale,4)*TWO_PI;
    bezier(xo+maxr*cos(a1),yo+maxr*sin(a1),xo+r2*cos(a2),yo+r2*sin(a2),xo+r3*cos(a3),yo+r3*sin(a3),xo+maxr*cos(a4),yo+maxr*sin(a4));
  }
  // saveSVG("wormhole");
}

function draw() {
}