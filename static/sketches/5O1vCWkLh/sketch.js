function setup() {
  createCanvas(innerWidth, innerHeight);
}

let gridsize = 50;
function draw() {
  let t = frameCount * .005;
  for(let x=0;x<width;x+=noise(t)*gridsize){
    for(let y=0;y<height;y+=noise(t,x*.005)*gridsize) {
      square(x,y,noise(t,x*.005,y*.005)*gridsize);
    }
  }
}