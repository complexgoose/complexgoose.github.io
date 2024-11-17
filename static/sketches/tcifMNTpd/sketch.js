let dots = [];
function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB);
  noStroke();
  for(let i=0;i<1000;i++) {
    const dot = {x:random(width),y:random(height),d:5,a:random(TWO_PI),v:1,h:random(360)};
    dots.push(dot);
  }
}

function draw() {
  //background(255);
  const qt = new QuadTree(new Rectangle(width/2,height/2,width,height),1000);
  for(const dot of dots) {
    qt.insert(new Point(dot.x,dot.y,dot.a));
  }
  for(const dot of dots) {
    let {x,y,d,a,v,h} = dot;
    fill(h,60,75);
    circle(x,y,d);
    
    const found = qt.query(new Circle(x,y,d)).find((x)=>x.userData !== a);
    if(found) {
      a = found.userData;
    }
    x += v*cos(a);
    y += v*sin(a);
    if (x<0 || x>width) {
      x = width-x;
    }
    if (y<0 || y>height) {
      y = height-y;
    }
    dot.x = x;
    dot.y = y;
    dot.a = a;
  }
}