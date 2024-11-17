const maxr = 10;
const maxda = Math.PI/2;
const maxleaves = 1000;
const colstep = .01;

let leaves;
let qt;
let noopframes = 0;
const maxnoopframes = 10;

function randCol() {
  return color(random(361),75,75);
}

function noiseCol() {
  return color(noise(frameCount)*361,75,75);
}

function nextCol(prev) {
  const next = randCol();
  return lerpColor(prev,next,colstep);
}

function setup() {
  createCanvas(innerWidth,innerHeight);
  colorMode(HSB);
  //noiseSeed(234256);
  leaves = [{x:width/2,y:height/2,r:random(maxr),fill:randCol(),a:random(TWO_PI)}];
  qt = new QuadTree(new Rectangle(width/2,height/2,width,height),4);
  qt.insert(new Point(leaves[0].x,leaves[0].y,leaves[0].r));
  
  noStroke();
  ellipseMode(RADIUS);
}


function distSq(a,b) {
  return Math.pow(a.x-b.x,2)+Math.pow(a.y-b.y,2);
}

function draw() {
  const nextleaves = [];
  let failures = 0;
  for(const leaf of leaves) {
    fill(leaf.fill);
    circle(leaf.x,leaf.y,leaf.r);
    const numchildren = Math.ceil(random(maxleaves*2/leaves.length));
    for(let i=0;i<numchildren;i++) {
      const a = leaf.a + floor(random(-1,2))*maxda;
      const r = random(maxr);
      let x = leaf.x+(leaf.r+r)*cos(a);
      let y = leaf.y+(leaf.r+r)*sin(a);
      if(x>width) x=0;
      else if(x<0) x=width;
      if(y>height) y=0;
      else if(y<0) y=height;
      
      const point = new Point(x,y,r);
      const circles = qt.query(new Circle(x,y,r+maxr));
      
      let failed = false;
      for(const other of circles) {
        if(distSq(point,other) < Math.pow(r+other.userData,2)) {
          failed = true;
          break;
        }
      }
      if(failed) {
        continue;
      }
      qt.insert(point);
      nextleaves.push({x,y,r,fill:nextCol(leaf.fill),a});
    }
    if(nextleaves.length>maxleaves) {
      break;
    }
  }
  if(nextleaves.length > 0) {
    leaves = nextleaves;
  } else {
    noopframes++;
    if(noopframes > maxnoopframes) {
      noLoop();
      console.log("max no op frames exceeded");
    }
  }
}