const noiseScale = .5;
function uniformNoise(x,y,z) {
  return (2*noise(x,y,z))-.5;
}
const hue = Math.random()*360;
function setup() {
  createCanvas(innerWidth, innerHeight);
  ellipseMode(RADIUS);
  colorMode(HSB);
  noStroke();
  const maxr = min(width,height)/2;
  const stepr = maxr/10;
  const circleSize = stepr/2;
  const stepa = PI/5;
  const xo = width/2,yo=height/2;
  for(let r=0;r<maxr-circleSize;r+=stepr) {
    const starta = random(TWO_PI);
    const enda = starta+TWO_PI
    for(let a=starta;a<enda;a+=random(stepa)) {
      fill(hue,random(50,100),random(50,100));
      circle(xo+r*cos(a),yo+r*sin(a),circleSize);
    }
  }
}

function draw() {
  
}