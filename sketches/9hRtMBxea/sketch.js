function doubleKey(x,y) {
    return x+","+y;
}

function keyToVals(key) {
  const vals = key.split(",");
  return vals.map((val) => Number.parseInt(val));
}

class DoubleSet {
  constructor() {
    this.set = new Set();
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
    return keyToVals(this.set.values().next().value);
  }
  
  size() {
    return this.set.size;
  }
}

let img,imgScale,available,imgWidth,imgHeight,pixel,expand;
const dirs = [
  [1,0],
  [-1,0],
  [0,1],
  [0,-1],
];

function preload() {
  img = loadImage("IMG_4252.jpg");
}

function getPixel(x,y) {
  const i = 4*imgScale*(y*img.width+x);
  return img.pixels.slice(i,i+3);
}

function rgba(r,g,b,a) {
  return `rgba(${r},${g},${b},${a/255})`;
}

function setup() {
  createCanvas(innerWidth,innerHeight);
  pixelDensity(1);
  img.loadPixels();
  imgScale = ceil(min(img.width/width,img.height/height));
  imgWidth = img.width/imgScale;
  imgHeight = img.height/imgScale;
  available = new DoubleSet();
  for(let x=0;x<imgWidth;x++) {
    for(let y=0;y<imgHeight;y++) {
      available.add(x,y);
    }
  }
}

function draw() {
  if(available.size() <= 0) {
      noLoop();
      return;
  }
  let pixelsDrawn = 0;
  while(pixelsDrawn < 1000 && available.size() > 0) {
    if(pixel===undefined) {
      const start = available.get();
      available.delete(...start);
      pixel = getPixel(...start);
      stroke(...pixel);
      circle(...start,1);
      expand = [start];
    }
    if(expand.length <= 0) {
      pixel = undefined;
      expand = undefined;
      continue;
    }
    const remove = [];
    stroke(...pixel);
    for(const i in expand) {
      const toExpand = expand[i];
      const [ox,oy] = toExpand;
      let hits = 0;
      for(const [dx,dy] of dirs) {
        const x = ox+dx;
        const y = oy+dy;
        if(x<0||x>imgWidth||y<0||y>imgHeight||!available.has(x,y)) continue;
        const oPixel = getPixel(x,y);
        const deltaE = chroma.deltaE(chroma(...pixel),chroma(...oPixel));
        if(deltaE>22) continue;
        hits++;
        available.delete(x,y);
        circle(x,y,1);
        expand.push([x,y]);
        pixelsDrawn++;
      }
      if(hits===0) remove.push(i);
    }
    for(const i of remove) {
      expand.splice(i,1);
    }
  }
}