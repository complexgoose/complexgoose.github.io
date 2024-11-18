const numLines = 1000;
let len;
let step;
function setup() {
  createCanvas(innerWidth, innerHeight);
  background(255);
  len = width+height;
  step = len/numLines;
  noFill();
}
let time = 0;
const timeScale = .005;
function draw() {
  time += timeScale;
  background(255);
  for(let i=step/2;i<len;i+=step) {
    let x1 = 0, y1=0;
    if(i<height) {
      y1 = height-i;
    } else {
      x1 = i - height;
    }
    const x2 = width-y1;
    const y2 = height-x1;
    const cx1 = lerp(x1,x2,noise(0,i,time));
    const cy1 = lerp(y1,y2,noise(1,i,time));
    const cx2 = lerp(x1,x2,noise(2,i,time));
    const cy2 = lerp(y1,y2,noise(3,i,time));
    bezier(x1,y1,cx1,cy1,cx2,cy2,x2,y2);
  }
}