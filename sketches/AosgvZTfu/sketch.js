function doubleKey(x,y) {
    return x+","+y;
}

function keyToVals(key) {
  const vals = key.split(",");
  return vals.map((val) => Number.parseInt(val));
}

class DoubleSet {
  constructor(other) {
    this.set = new Set(other?.set);
  }

  add(x,y) {
    return this.set.add(doubleKey(x,y));
  }
  
  has(x,y) {
    return this.set.has(doubleKey(x,y));
  }
  
  delete(x,y) {
    return this.set.delete(doubleKey(x,y));
  }
  
  get() {
    const {value, done} = this.set.values().next();
    if(done) return undefined;
    return keyToVals(value);
  }
  
  size() {
    return this.set.size;
  }
}

const dirs = [
  [1,0],
  [-1,0],
  [0,1],
  [0,-1],
];

const noiseScale = .01;
const available = new DoubleSet();
const expand = [];
let i = 0;
function setup() {
  createCanvas(innerWidth, innerHeight);
  background(255);
  for(let x=0;x<width;x++) {
    for(let y=0;y<height;y++) {
      available.add(x,y);
    }
  }
  for(let j=0;j<100;j++) {
    const x = floor(random(width));
    const y = floor(random(height));
    available.delete(x,y);
    expand.push([x,y]);
    circle(x,y,1);
  }
}
  

function draw() {
  let expanded = 0;
  i = 0;
  while(expanded < 1000) {
    const toExpand = expand[i];
    const [ox,oy] = toExpand;
    let hits = 0;
    for(const [dx,dy] of dirs) {
      const x = ox+dx;
      const y = oy+dy;
      if(x<0||x>width||y<0||y>height||!available.has(x,y)||random()<.6) continue;
      hits++;
      available.delete(x,y);
      circle(x,y,1);
      expand.push([x,y]);
    }
    if(hits===0) expand.splice(i,1);
    else i++;
    if(i >= expand.length) {
      if(expand.length === 0) {
        console.log("done");
        noLoop();
        break;
      }
      i = 0;
    }
    expanded ++;
  }
}