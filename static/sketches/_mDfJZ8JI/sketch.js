let gridSize = 50;
function setup() {
  createCanvas(innerWidth, innerHeight);

}

function draw() 
{
  background(255);
  for(let yo = 0;yo<height+gridSize;yo+=gridSize)
  {
    let lastx = -gridSize;
    let lasty = yo;
    for(let x = 0;x<width+gridSize;x+=gridSize)
    {
      let y = yo + noise(x*.01,yo*.01,frameCount*.01)*gridSize*(x/width)*(yo/height);
      line(lastx, lasty, x, y);
      lastx = x;
      lasty = y;
    }
  }
}