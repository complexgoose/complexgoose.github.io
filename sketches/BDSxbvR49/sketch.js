const noiseScale = .05;
const fruit = "#f9b900";
function setup() {
  createCanvas(innerWidth,innerHeight);
  noFill();
  //noStroke();
  background(255);
  let xo = width/2;
  let yo = height/2;
  for(let i=0;i<100;i++) {
    const numSlices = floor(random(3,30));
    const da = TWO_PI/numSlices;
    const r = min(width,height)/10;
    circle(xo,yo,r*2);
    for(let a=0;a<=TWO_PI;a+=da) {
      line(xo,yo,xo+r*cos(a),yo+r*sin(a));
    }
    const a = noise(i*noiseScale)*TWO_PI;
    xo += 2*r*cos(a);
    yo += 2*r*sin(a);
    if(xo<0) xo = width;
    else if(xo>width) xo = 0;
    if(yo<0) yo = height;
    else if(yo>height) yo = 0;
  }
}

function draw() {
}