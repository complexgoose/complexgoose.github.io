function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB);
  background(0);
  const percRounds = 100000;
  const percHue = random(360);
  const maxPercSize = 1;
  for(let i=0;i<percRounds;i++) {
    stroke(percHue,random(75,100),random(75,100));
    circle(random(width),random(height),random(maxPercSize));
  }
  
  const bassRounds = 100;
  const maxBassStep = 300;
  let x = 0;
  let y = random(height);
  noFill();
  strokeWeight(random(10));
  stroke(random(360),random(75,100),random(75,100));
  beginShape();
  curveVertex(x,y);
  for(let i=0;i<bassRounds;i++) {
    curveVertex(x,y);
    x += random(-maxBassStep,maxBassStep);
    y += random(-maxBassStep,maxBassStep);
    if(x<0) x=0;
    else if(x>width) x= width;
    if(y<0) y=0;
    else if(y>height) y=height;
  }
  endShape();
  
  x=0;
  y=random(height);
  let a = 0;
  const maxKeyWidth = 30;
  const maxKeyHeight = 200;
  const maxDa = PI/10;
  noStroke();
  rectMode(CENTER);
  const keyHue = random(360);
  const keyRounds = 500;
  for(let i=0;i<keyRounds;i++) {
    const keyWidth =random(maxKeyWidth);
    const keyHeight = random(maxKeyHeight);
    fill(keyHue,random(75,100),random(75,100));
    push();
    translate(x,y);
    rotate(a);
    rect(0,0,keyWidth,keyHeight);
    pop();
    x+=keyWidth*cos(a);
    y+=keyWidth*sin(a);
    if(x<0||x>width||y<0||y>height) {
      a -= PI;
      const bounce = PI/2;
      a += random(-bounce,bounce);
    } else {
      a += random(-maxDa,maxDa);
    }
  }

  
}

function draw() {
}