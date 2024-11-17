function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  noFill();
}

function draw() 
{
  background(255);
  beginShape();
  let xo = width/2;
  let yo = height/2;
  for (let a = 0; a < 2 * PI; a += .1) 
  {
    let t = frameCount*.01;
    let r = noise(cos(a)+2, sin(a)+2,t)*300;
    let xoff = r * cos(a);
    let yoff = r * sin(a);
    vertex(xo+xoff, yo+yoff);
  }
  endShape(CLOSE);
}