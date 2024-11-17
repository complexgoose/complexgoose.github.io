const gridSize = 50;
function setup() {
  createCanvas(innerWidth,innerHeight);
  background(0);
  rectMode(CENTER);
  //noFill();
  //stroke(255);
  noStroke();
  for(let i=0;i<5;i++) {
    for(let x=0;x<width;x+=gridSize) {
      for(let y=0;y<height;y+=gridSize) {
        push();
        translate(x,y);
        rotate(random(TWO_PI));
        square(0,0,gridSize*.8);
        pop();
      }
    }
  }
}

function draw() {
}