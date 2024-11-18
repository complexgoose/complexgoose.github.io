let time = 0;
const timeScale = .000001;
const noiseScale = .005;
const size = 3;
const dxy = 1.5;
const maxda = Math.PI/256;
let x,y,a;

const uniformNoise = (x,y,z) => 2*noise(x,y,z)-.5;
function setup() {
  createCanvas(innerWidth, innerHeight);
  x = width/2;
  y = height/2;
  a = random(TWO_PI);
  noStroke();
  fill(0);
  background(255);
}

function draw() {
  for(let i=0;i<1000;i++) {
    circle(x,y,size);
    x += dxy*cos(a);
    y += dxy*sin(a);
    if(x>width||x<0) x=width-x;
    if(y>height||y<0) y=height-y;
    a += uniformNoise((1+cos(a))*noiseScale,(1+sin(a))*noiseScale,time*timeScale)*maxda;
    time += 1;
  }
}