const noiseScale = .005;
const quadsX = 10;
const allLineTypes = [1,2,3,4];

function sample(data,num) {
  const copy = [...data];
  const out = [];
  for(let i=0;i<num;i++) {
    out.push(copy.splice(floor(random(copy.length)),1)[0]);
  }
  return out;
}

function drawLine(x,y,cellSize,type) {
  switch(type) {
    case 1:
      const lx = x+cellSize/2;
      line(lx,y,lx,y+cellSize);
      break;
    case 2:
      const ly = y+cellSize/2;
      line(x,ly,x+cellSize,ly);
      break;
    case 3:
      line(x,y+cellSize,x+cellSize,y);
      break;
    case 4:
      line(x,y,x+cellSize,y+cellSize);
      break;
  }
}

function setup() {
  const seed = floor(random(1e6));
  randomSeed(seed);
  console.log(seed);
  const minSide = min(innerWidth, innerHeight);
  createCanvas(minSide,minSide);
  noFill();
  //line(0,height/2,width,height/2);
  //line(width/2,0,width/2,height);
  const quadSizeX = width/2;
  const cellSize = quadSizeX/quadsX;
  const quadSizeY = height/2;
  for(const {ox,oy} of [{ox:0,oy:0},{ox:width/2,oy:0},{ox:0,oy:height/2},{ox:width/2,oy:height/2}]) {
    const lineTypes = sample(allLineTypes,3);
    for(let dx=0;dx<=quadSizeX-cellSize;dx+=cellSize) {
      for(let dy=0;dy<=quadSizeY-cellSize;dy+=cellSize) {
        const x = ox+dx;
        const y = oy+dy;
        for(const lineType of lineTypes) {
          drawLine(x,y,cellSize,lineType);
        }
      }
    }
  }
}

function draw() {
}