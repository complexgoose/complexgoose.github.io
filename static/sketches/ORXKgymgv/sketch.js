let time =0;
const timeScale = .005;
const noiseScale = .005;
const hue = Math.random()*360;
const bghue = 360-hue;

function setup() {
  createCanvas(innerWidth, innerHeight);
  ellipseMode(RADIUS);
  colorMode(HSB);
  noFill();
  background(bghue,75,75);
}

function draw() {
  time += timeScale;
  background(bghue,100,100,.001);
  stroke(hue,random(50,100),random(50,100));
  const x=width/2, y=height/2;
  const maxr = (min(width,height)/2)-1;
  const rstep = maxr/5;
  const astep = PI/10;
  let lastr=0;
  for(let r=noise(0,time)*rstep;r<maxr;r+=noise(r*noiseScale,time)*rstep) {
    circle(x,y,r);
    for(let a=noise(0,r*noiseScale,time)*astep;a<TWO_PI;a+=noise(a*noiseScale,r*noiseScale,time)*astep) {
      line(x+lastr*cos(a),y+lastr*sin(a),x+r*cos(a),y+r*sin(a));
    }
    lastr = r;
  }
}