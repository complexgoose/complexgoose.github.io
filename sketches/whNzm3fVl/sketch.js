function setup() {
  createCanvas(innerWidth, innerHeight);
  noStroke();
}

function draw() {
  for(let x=0;x<25;x++) {
    fill(random(256), random(256), random(256));
    circle(random(width), random(height), random(20));
  }
}