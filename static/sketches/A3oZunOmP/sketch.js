function doubleKey(x,y) {
    return x+","+y;
}

function keyToVals(key) {
  const vals = key.split(",");
  return vals.map((val) => Number.parseInt(val));
}

function* doubleSetValues(keys) {
  for(const key of keys) {
    yield keyToVals(key);
  }
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
  
  values() {
    return doubleSetValues(this.set.values());
  }
  
  size() {
    return this.set.size;
  }
}

let img,imgScale;
const dirs = [
  [1,0],
  [-1,0],
  [0,1],
  [0,-1],
];
const gridSize = 5;
const noiseScale = .005;
const maxStrokeLength = 100;
const strokeDensity = 2;
const strokeWidth = gridSize;
const maxBleed = 5;
const maxDeltaE = 15;

function preload() {
  img = loadImage("IMG_6198.JPEG");
}

function getPixel(x,y) {
  const i = 4*imgScale*(y*img.width+x);
  return img.pixels.slice(i,i+4);
}

function rgba(r,g,b,a) {
  return `rgba(${r},${g},${b},${a/255})`;
}


// Simplified implementatitons outperform p5
const lerp = (a, b, t) => a + (b - a) * t;
const fract = (x) => x % 1;

// Currently can not be changed
const vnoiseGridDims = 3;

const vnoiseGridSizes = Array(vnoiseGridDims).fill(0);
const vnoiseGrid = [];

function populateVNoiseGrid(
  sizes = vnoiseGridSizes,
  dims = vnoiseGridDims,
  subgrid = vnoiseGrid
) {
  const size = sizes[0];
  for (let i = 0; i < size; i++) {
    if (i < subgrid.length) {
      if (dims <= 1) continue;
      populateVNoiseGrid(sizes.slice(1), dims - 1, subgrid[i]);
    } else {
      subgrid.push(
        dims > 1 ? populateVNoiseGrid(sizes.slice(1), dims - 1, []) : random()
      );
    }
  }
  return subgrid;
}

const smoothstep = (x) => 3 * Math.pow(x, 2) - 2 * Math.pow(x, 3);

function sampleGrid(
  coords,
  subgrid = vnoiseGrid,
  location = [],
  dims = vnoiseGridDims
) {
  const coord = coords[0];
  const i1 = floor(coord);
  const i2 = floor(coord + 1);
  const lerpAmount = smoothstep(fract(coord));
  if (i2 >= vnoiseGridSizes[location.length]) {
    vnoiseGridSizes[location.length] = i2 + 1;
    populateVNoiseGrid();
    subgrid = vnoiseGrid;
    for (const i of location) {
      subgrid = subgrid[i];
    }
  }

  if (dims === 1) {
    return lerp(subgrid[i1], subgrid[i2], lerpAmount);
  }
  return lerp(
    sampleGrid(coords.slice(1), subgrid[i1], [...location, i1], dims - 1),
    sampleGrid(coords.slice(1), subgrid[i2], [...location, i2], dims - 1),
    lerpAmount
  );
}

function vnoise(...coords) {
  for (let i = coords.length; i < vnoiseGridDims; i++) {
    coords.push(0);
  }
  return sampleGrid(coords);
}

const stepify = (n,step) => floor(n/step)*step;

function setup() {
  // createCanvas(img.width, img.height);
  createCanvas(innerWidth, innerHeight);
  
  const seed = floor(random(1e6));
  // const seed = 42053.43012963536;
  console.log(seed);
  randomSeed(seed);

  pixelDensity(1);
  img.loadPixels();
  imgScale = ceil(min(img.width/width,img.height/height));
  const imgWidth = img.width/imgScale;
  const imgHeight = img.height/imgScale;
  
  resizeCanvas(imgWidth, imgHeight);
  
  vnoiseGridSize = max(width, height);
  populateVNoiseGrid();
  
  const available = new DoubleSet();
  for(let x=0;x<imgWidth;x+=gridSize) {
    for(let y=0;y<imgHeight;y+=gridSize) {
      available.add(x,y);
    }
  }
  const patches = [];
  while(available.size() > 0) {
    const patch = new DoubleSet();
    patches.push(patch);
    const start = available.get();
    patch.add(...start);
    available.delete(...start);
    const pixel = getPixel(...start);
    stroke(...pixel);
    circle(...start,1);
    const expand = [start];
    while(expand.length > 0) {
      const toExpand = expand.shift();
      const [ox,oy] = toExpand;
      for(const [dx,dy] of dirs) {
        const x = ox+dx*gridSize;
        const y = oy+dy*gridSize;
        if(x<0||x>imgWidth||y<0||y>imgHeight||!available.has(x,y)) continue;
        const oPixel = getPixel(x,y);
        const deltaE = chroma.deltaE(chroma(rgba(...pixel)),chroma(rgba(...oPixel)));
        if(deltaE>maxDeltaE) continue;
        patch.add(x,y);
        available.delete(x,y);
        circle(x,y,1);
        expand.push([x,y]);
      }
    }
  }
  
  background(255);
  
  noStroke();
  
  for (const patchi in patches) {
    const patch = patches[patchi];
    const numStrokes = floor(patch.size()*strokeDensity);
    const patchArr = Array.from(patch.values())
    for(let i=0;i<numStrokes;i++) {
      const [ox,oy] = patchArr[i%patchArr.length];
      const pixel = getPixel(ox,oy);
      fill(...pixel);

      let x = ox;
      let y = oy;
      
      let bleedLeft = maxBleed;
      
      while(true) {
        const a = vnoise(patchi,x*noiseScale,y*noiseScale)*TWO_PI;
        x = x+(strokeWidth/2)*cos(a);
        y = y+(strokeWidth/2)*sin(a);
        circle(x,y,strokeWidth);
        if (!patch.has(stepify(x,gridSize), stepify(y,gridSize))) {
          bleedLeft--;
          if(bleedLeft <= 0 || x<0||x>width||y<0||y>height) break;
        }
      }
    }
  }
}

function draw() {
}