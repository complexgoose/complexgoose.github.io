let qt;


const drops = [];

let gridSize,drawSize,maxSpeed,maxAcc,closeDist,edgeDist,bounceMult


const frameLimit = 900;
function setup() {
  createCanvas(innerWidth, innerHeight);
  gridSize = min(innerWidth,innerHeight)/4;
  drawSize = gridSize/25;
  maxSpeed = 15;
  maxAcc = maxSpeed/30;
  closeDist = gridSize;
  edgeDist = gridSize/2;
  bounceMult = -1;
  qt = new QuadTree(new Rectangle(width / 2, height / 2, width, height), 4);
  const numCols = floor(min(width-gridSize*2,height-gridSize*2)/gridSize);
  const xo = (width-(numCols-1)*gridSize)/2;
  let yo = (height-(numCols-1)*gridSize)/2;
  if(xo===yo) {
    yo*=.99;
  }
  let i = 0;
  const center = createVector(width/2,height/2);
  for (let col = 0; col < numCols; col++) {
    for (let row = 0; row < numCols; row++) {
      const x = xo+gridSize * col;
      const y = yo+gridSize * row;
      const pos = createVector(x, y)
      const diff = p5.Vector.sub(pos,center);
      const a = diff.heading();
      drops.push({ pos, vel: createVector(maxSpeed*cos(a),maxSpeed*sin(a)), acc: createVector() });
    }
  }
  background(255);
  // noFill();
  noStroke();
  const col = "#FF6363"
  // stroke(col)
  fill(col)
}

function draw() {
  if(frameCount%60===0) print(frameCount);
  // if(frameCount > 900) {
  //   noLoop();
  //   return;
  // }
  // background(255,10);
  qt.clear();
  for (const drop of drops) {
    const { pos } = drop;
    qt.insert(new Point(pos.x, pos.y, drop));
    circle(pos.x, pos.y, drawSize);
  }
  for (const drop of drops) {
    const { pos, acc, vel } = drop;
    const others = qt.query(new Circle(pos.x, pos.y, closeDist));
    acc.set(0,0);
    for (const hit of others) {
      const other = hit.userData;
      const { pos: opos, acc: oacc } = other;
      const diff = p5.Vector.sub(pos,opos).div(gridSize);
      acc.add(p5.Vector.add(diff));
    }
    const bottomy = pos.y + edgeDist;
    if(bottomy < height) {
      // acc.add(0,1);
    }
  }
  for (const drop of drops) {
    const { pos, vel, acc } = drop;
    pos.add(vel);
    const leftx = pos.x-edgeDist;
    const rightx = pos.x+edgeDist;
    if(frameCount < 900) {
      if(leftx < 0) {
        pos.x = edgeDist;
        if(vel.x < 0) vel.x = vel.x*bounceMult;
      } else if(rightx > width) {
        pos.x = width-edgeDist;
        if(vel.x > 0) vel.x = vel.x*bounceMult;
      }
      const bottomy = pos.y + edgeDist;
      const topy = pos.y-edgeDist;
      if(topy  < 0) {
        pos.y = edgeDist;
        if(vel.y < 0) vel.y = vel.y*bounceMult;
      } else if(bottomy > height) {
        pos.y = height-edgeDist;
        if(vel.y > 0) vel.y = vel.y*bounceMult;
      }
    }
    acc.limit(maxAcc);
    vel.add(acc);
    vel.limit(maxSpeed);
  }
}
