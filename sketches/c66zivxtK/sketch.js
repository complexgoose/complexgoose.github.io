let maxDepth = 10;
let green;
let brown;
function setup() {
  if(maxDepth>10) throw maxDepth;
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB);
  brown = color(96, 61, 32);
  green = color(123,77,53);
}

function draw() {
  background(255);
  let branchStart = createVector(width/2,height/1.5);
  stroke(brown);
  linev(createVector(branchStart.x ,branchStart.y+200), branchStart);
  treeHelper(branchStart,PI, PI/10, 70, 0);
}

function treeHelper(cur, ao, amod, r, d)
{
  if(d >= maxDepth) return;
  amod = (PI/5)*noise(ao, frameCount*.001);
  let a1 = ao-amod;
  let a2 = ao+amod;
  let next1 = createVector(cur.x+sin(a1)*r,cur.y+cos(a1)*r);
  let next2 = createVector(cur.x+sin(a2)*r,cur.y+cos(a2)*r);
  stroke(lerpColor(brown, green, d/maxDepth));
  strokeWeight(1);
  linev(cur, next1);
  linev(cur, next2);
  let nextamod = amod;
  let nextd = d+1;
  let nextr = r*.9;
  treeHelper(next1, a1, nextamod, nextr, nextd);
  treeHelper(next2, a2, nextamod, nextr, nextd);
}

function linev(pos1, pos2)
{
  line(pos1.x,pos1.y,pos2.x,pos2.y);
}