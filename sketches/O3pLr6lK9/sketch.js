function setup() {
  createCanvas(innerWidth, innerHeight);
}

function draw() {
  translate(width/2, height/2);
  
  stroke(random(256), random(256), random(256));
  let r = width/4;
  let a = random(TWO_PI);
  
  const x1 = r*cos(a), y1 = r*sin(a);
  a += random(PI/2);
  const x2 = r*cos(a), y2 = r*sin(a)
  line(x1, y1, x2, y2);
}