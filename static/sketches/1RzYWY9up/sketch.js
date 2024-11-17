let smears = [];
let numsmears = 10;
function setup() {
  createCanvas(innerWidth, innerHeight);
  print(randomSeed())
  for(let i=0;i<numsmears;i++) {
    let a = random(TWO_PI);
    let velr = 10;
    smears.push({x:randomGaussian(width/2,width/8),y:randomGaussian(width/2,width/8), velx:velr*cos(a), vely:velr*sin(a), fill:color(random(255),random(255),random(255),255),otheri:int(random(numsmears))});
  }
  background(0);
}
let done = false;
function draw() {
  for(let smear of smears) {
    stroke(smear.fill);
    smear.x += smear.velx;
    smear.y += smear.vely;
    if(!done) {
      if(smear.x > width || smear.x <0){
        smear.velx *= -1;
      } else if(smear.y >height || smear.y <0) {
        smear.vely *= -1;
      }
    }
    let other = smears[smear.otheri];
    line(smear.x,smear.y,other.x,other.y);
  }
}