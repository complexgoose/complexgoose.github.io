function setup() {
  createCanvas(innerWidth, innerHeight);
}

let gridsize = 50;
function draw() {
  background(255);
  for(let ox=0;ox<width;ox+=gridsize) {
    for(let oy=0;oy<height;oy+=gridsize) {
      for(let a =0;a<TWO_PI;a+=PI/(noiseScaled(25,ox,oy,frameCount))) {
        let r = gridsize/2;
        let x = ox + r * cos(a);
        let y = oy + r * sin(a);
        line(ox,oy,x,y);
      }
    }
  }
}

let noiseScale = .005;
function noiseScaled(a, x,y,z) {
  return a*noise(x*noiseScale, y*noiseScale, z*noiseScale);
}