function setup() {
  createCanvas(innerWidth, innerHeight);
  background(255);
  const xo = width/2;
  const yo = height/2;
  const r = min(width,height)/3;
  const da = PI/50;
  const dx = 50;
  for(let x=-r+dx/2;x<=r+dx/2;x+=dx) {
    const a = acos(x/r);
    const x1 = xo+r*cos(a);
    console.log(x1);
    const y1 = yo+r*sin(a);
    const a2 = -a;
    const x2 = xo+r*cos(a2);
    const y2 = yo+r*sin(a2);
    line(x1,y1,x2,y2);
  }
  for(let x=-r;x<=r;x+=dx) {
    const a = acos(x/r);
    const x1 = xo+r*cos(a);
    const y1 = yo+r*sin(a);
    const x2 = x1;
    const y2 = height;
    line(x1,y1,x2,y2);
  }
  for(let x=-r;x<=r;x+=dx) {
    const a = -acos(x/r);
    const x1 = xo+r*cos(a);
    const y1 = yo+r*sin(a);
    const x2 = x1;
    const y2 = 0;
    line(x1,y1,x2,y2);
  }
  for(let x=dx/2;x<=xo-r-dx/2;x+=dx) {
    line(x,0,x,height);
  }
  for(let x=xo+r+dx/2;x<width;x+=dx) {
    line(x,0,x,height);
  }
}

function draw() {
}