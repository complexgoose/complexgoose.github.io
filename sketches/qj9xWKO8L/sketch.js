const gridSize = 100;
const noiseScale = .0005;
const timeScale = .005;
const maxOff = gridSize;
let time = 0;
const seeds = [];
const numSeeds = 100;
function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB);
  for(let i=0;i<numSeeds;i++) {
    seeds.push(random(Number.MAX_SAFE_INTEGER));
  }
}

function uniformNoise(x,y,z) {
  return (2*noise(x,y,z))-.5;
}

function draw() {
  time += timeScale;
  //background(220);
  for(let x=0;x<width;x+=gridSize) {
    for(let y=0;y<height;y+=gridSize) {
      const nx=x*noiseScale;
      const ny=y*noiseScale;
      const nz=time;
      const noise = [];
      for(let i=0;i<3;i++) {
        noiseSeed(seeds[i]);
        noise.push(uniformNoise(nx,ny,nz));
      }
      fill(noise[0]*360,75,100);
      const xoff = (noise[1]*maxOff*2)-maxOff;
      const yoff = (noise[2]*maxOff*2)-maxOff;
      square(x+xoff,y+yoff,gridSize);
    }
  }
}