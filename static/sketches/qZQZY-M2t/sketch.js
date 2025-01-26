const animSpeed = 1000;
const numDots = 100000;
const dotSize = 5;
const noiseScale = .4;

let numDotsPlaced = 0;
let maxr;

const summerLeafColors = ["#AAB900","#C2F007", "#517F01", "#0F530D", "#519D28", "#A5DB67", "#4EA61B"];


function setup() {
  createCanvas(innerWidth, innerHeight);
  noStroke();
  background(255);
  
  maxr = min(width,height)/2;
}

function drawLeafDot(xo,yo,r) {
  const a = random(TWO_PI);
  const dotr = random(noise(1+cos(a)*noiseScale,1+sin(a)*noiseScale)*r);
  const x = xo+dotr*cos(a);
  const y = yo+dotr*sin(a);
  circle(x,y,dotSize);
}

function draw() {
  for(let i=0;i<animSpeed;i++) {
    if(numDotsPlaced++ >= numDots) {
      noLoop();
      break;
    }
    fill(random(summerLeafColors));
    drawLeafDot(width/2,height/2,maxr);
  }
}