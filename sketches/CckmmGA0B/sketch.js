let smears = [];
function setup() {
  createCanvas(innerWidth, innerHeight);
  noStroke();
  for(let i=0;i<10;i++) {
    let a = random(TWO_PI);
    let velr = 5;
    smears.push({x:random(width), y:random(height), velx:velr*cos(a), vely:velr*sin(a), fill:color(random(255),random(255),random(255),255)});
  }
}
let done = false;
function draw() {
  for(let smear of smears) {
    fill(smear.fill);
    circle(smear.x, smear.y, 50);
    smear.x += smear.velx;
    smear.y += smear.vely;
    if(!done) {
      if(smear.x > width || smear.x <0){
        smear.velx *= -1;
      } else if(smear.y >height || smear.y <0) {
        smear.vely *= -1;
      }
    }
  }
}