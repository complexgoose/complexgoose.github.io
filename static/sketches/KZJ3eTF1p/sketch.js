let circles;
const initSize = 200;
const minSizeChange = .65;
const sizeChangeMod = .05;
const noiseScale = .00005;
function setup() {
  createCanvas(innerWidth, innerHeight);
  ellipseMode(RADIUS);
  noFill();
  circles = [[width/2,width/2,initSize],];
}

function draw() {
  const next = [];
  for(const cur of circles) {
    const [x,y,r,from] = cur;
    if(r<13) continue;
    circle(x,y,r);
    const newR = r*.67;//(minSizeChange+(noise(x*noiseScale,y*noiseScale)*sizeChangeMod));
    if(from !== 1) next.push([x+r,y,newR,0]);
    if(from !== 0) next.push([x-r,y,newR,1]);
    if(from !== 3) next.push([x,y+r,newR,2]);
    if(from !== 2) next.push([x,y-r,newR,3]);
  }
  circles = next;
  if(circles.length === 0) {
    noLoop();
  }
}