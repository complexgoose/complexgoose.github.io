function setup() {
  createCanvas(innerWidth, innerHeight);
  noLoop();
  for(let i=0;i<4000;i++) {
    draw();
  }
}

function draw() {
  const x1 = randomGaussian(width/2, width/8);
  const y1 = randomGaussian(height/2, height/8);
  const x2 = randomGaussian(width/2, width/8);
  const y2 = randomGaussian(height/2, height/8);
  stroke(random(255),random(255),random(255));
  line(x1,y1,x2,y2);
}

