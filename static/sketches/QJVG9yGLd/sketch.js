
function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB);
  noStroke();
}

let gridsize = 50;
function draw() {
  for(let yi=0;yi<(height+gridsize*2)/(gridsize/2.25);yi++) {
    let y = yi*gridsize/2.27;
    for(let x=yi % 2 == 0 ? gridsize*.75 : 0;x<width+gridsize*2;x+=gridsize*1.5) {
      x += randomGaussian(0,5);
      y += randomGaussian(0,5);
      fill(noise(x,y,frameCount*.005)*(x/width)*(y/height)*360,100,100,.01);
      poly(x,y,6,gridsize/2);
    }
  }
}

function poly(x, y, numsides,  sidelen) {
  beginShape();
  for(let a=0;a<TWO_PI;a+=TWO_PI/numsides) {
    vertex(x,y);
    x += sidelen * sin(a+ PI/2);
    y += sidelen * cos(a+ PI/2);
  }
  endShape(CLOSE);
}