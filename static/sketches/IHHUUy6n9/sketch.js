const numSegs = 20;
const margin = 50;
const maxVeins = 1000;
function setup() {
  createCanvas(innerWidth, innerHeight);
  const maxR = width/2;
  const heightRange = height-margin*2;
  const yStep = heightRange/(numSegs-1);
  const ox = width/2;
  const da = PI/2;
  for(const side of [-1,1]) {
    for(let oy=margin;oy<=height-margin;oy+=yStep) {
      const prog = (oy-margin)/heightRange;
      const a = ((1-prog)*(-PI/10))-(PI/10);
      const r = (1-abs(prog-.5)*2) *maxR;
      const dx = r*cos(a);
      const dy = r*sin(a);
      const tip = [ox+dx*side,oy+dy]
      line(ox,oy,...tip);
      const o =[ox,oy];
      for(let i=0;i<(r/maxR)*maxVeins;i++) {
        const fProg = random();
        const fx = lerp(o[0],tip[0],fProg);
        const fy = lerp(o[1],tip[1],fProg);
        const fa = a+random(-da,da);
        const fr = random(r/5);
        line(fx,fy,fx+side*fr*cos(fa),fy+fr*sin(fa))
      }
    }
  }
}

function draw() {
}