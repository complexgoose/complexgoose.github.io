const numPeaks = 30;
const peakHeight = 10;

const gridx = 1;
const gridy = 5;

function setup() {
  createCanvas(innerWidth,innerHeight);
  background(255);
  for(let yo=0;yo<height;yo+=gridy) {
    let lx = 0;
    let ly = yo;
    for(let xo=0;xo<width;xo+=gridx) {
      const x = xo;
      const y = yo+sin((xo/width)*TWO_PI*numPeaks)*peakHeight;
      line(lx,ly,x,y);
      lx = x;
      ly = y;
    }
  }
}

function draw() {
}