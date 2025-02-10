const numStripes = 100;

function setup() {
  createCanvas(innerWidth, innerHeight);
  const a = random(TWO_PI);
  translate(width/2,height/2);
  rotate(a);
  const stripeSize = (width*2)/numStripes;
  background(255);
  noStroke();
  for(let i=0;i<numStripes;i++) {
    const length = random(height*2);
    const xo = stripeSize*i-width;
    fill(random(256),random(256),random(256));
    rect(xo,-height,stripeSize,length);
  }
}

function draw() {
}