function drawSplatter(xo,yo,a,size,length,numDots,dotSize) {
  for (let i=0;i<numDots;i++) {
    const lengthMult = pow(random(),10);
    const posLength = lengthMult*length;
    const posa = random(TWO_PI);
    const posr = random(size*(max(1-lengthMult,0)));
    const dx = posr*cos(posa);
    const dy = posr*sin(posa);
    const posxo = xo+posLength*cos(a);
    const posyo = yo+posLength*sin(a);
    circle(posxo+dx,posyo+dy,dotSize);
  }
}
const maxSize = 100;
const maxLength = 500;
const maxDots = 5000;
const maxDotSize = 2.5;
function setup() {
  createCanvas(innerWidth, innerHeight);
  background(255)
  noStroke();
  fill(0)
}

function draw() {
  if(frameCount>100) noLoop()
    drawSplatter(random(width),random(height),random(TWO_PI),random(maxSize),random(maxLength),random(maxDots),random(maxDotSize));
}