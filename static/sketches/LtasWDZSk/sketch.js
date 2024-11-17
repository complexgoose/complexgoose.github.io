function step(num, step) {
  return round(num/step)*step;
}
const noiseScale = .005;
function uniformNoise(x,y) {
  return constrain((2*noise(x,y))-.5,0,1);
}
function setup() {
  createCanvas(750,1125);
  colorMode(HSB);
  const col1 = color(180,100,100);
  const col2 = color(240,100,100);
  for(let x=0;x<width;x++) {
    for(let y=0;y<height;y++) {
      stroke(lerpColor(col1,col2,step(uniformNoise(x*noiseScale,y*noiseScale),.1)),100,100);
      point(x,y);
    }
  }
}

function draw() {
}