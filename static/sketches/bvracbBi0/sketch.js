function drawBand(x,y,dx,dy,bandWidth) {
  const ox = x;
  const oy = y;
  const a = atan2(dy,dx)+HALF_PI;
  bandWidth/=2;
  const bandX = cos(a)*bandWidth;
  const bandY = sin(a)*bandWidth;
  while(x>=0&&x<=width&&y>=0&&y<=height) {
    line(x-bandX,y-bandY,x+bandX,y+bandY);
    
    x += dx;
    y += dy;
  }
  x -= dx;
  y -= dy;
  line(ox-bandX,oy-bandY,x-bandX,y-bandY);
  line(ox+bandX,oy+bandY,x+bandX,y+bandY);
}

function setup() {
  const minSide = min(innerWidth, innerHeight);
  createCanvas(minSide,minSide);
  const bandStep = width/150;
  const bandWidth = width/5;
  drawBand(bandStep/2,height/2,bandStep,0,bandWidth);
  drawBand(width/2,bandStep/2,0,bandStep,bandWidth);
  drawBand(bandStep/2,height,bandStep,-bandStep,bandWidth);
}

function draw() {
}