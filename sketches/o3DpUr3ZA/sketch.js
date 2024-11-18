let circles = [];
let gridSize = 50;
let circleSize = 30;
let stop = false;
function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB);
  reset();
  stroke(0,.30);
}

function reset()
{
  noiseSeed();
  circles = [];
  for(let i=0;i<1000;i++)
    circles.push(new Circle(createVector(random(width),random(height)),color(random(360),75,75,.9))); 
}

function mouseClicked()
{
  //reset();
}


function doubleClicked()
{
  stop = !stop;
}


function draw() 
{
  if(stop) return;
  for(let i=0;i<circles.length;i++)
  {
    let circleobj = circles[i];
    let circlepos = circleobj.pos;
    
    let {x,y} = circlepos;
    let noiseVal = noise(x*.01,y*.01);
    fill(circleobj.col);
    
    circle(x, y, circleSize);
    circlepos.add(p5.Vector.fromAngle(noiseVal*TWO_PI*3, 5));
    if(x>width+circleSize||x<-circleSize||y>height+circleSize||y<-circleSize)
    {
      circles.splice(i,1);
      i--;
    }
  }
  if(circles.length==0) reset();
}

class Circle
{
    constructor(pos, col)
    {
      this.pos = pos;
      this.col = col;
    }
}