const numAgents = 100;
const agentMaxSpeed = 1;
const animSpeed = 1000;
const agentAcc = .01;
const agentSize = 5;
let agents = [];
let xo,yo,r;
const rmod = 150;
let minRSq,maxRSq;
function setup() {
  createCanvas(innerWidth, innerHeight);
  xo = width/2;
  yo = height/2;
  r = min(width,height)/3;
  const minr = r-rmod;
  const maxr = r+rmod;
  minRSq = pow(minr,2);
  maxRSq = pow(maxr,2);
  for(let i=0;i<numAgents;i++) {
    const a = random(TWO_PI);
    const agentr = random(minr,maxr);
    agents.push({x:xo+agentr*cos(a),y:yo+agentr*sin(a),vx:0,vy:0});
  }
  noStroke();
  fill(0);
  background(255);
}

function draw() {
  //background(255);
  for(let i=0;i<animSpeed/agents.length;i++) {
    for(const agent of agents) {
      const {x,y,vx,vy} = agent;
      circle(x,y,agentSize);
      const a = noise(x*.005,y*.005,frameCount*.005)*TWO_PI;
      agent.x += vx;
      agent.y += vy;
      agent.vx = constrain(vx+agentAcc*cos(a),-agentMaxSpeed,agentMaxSpeed);
      agent.vy = constrain(vy+agentAcc*sin(a),-agentMaxSpeed,agentMaxSpeed);
      const distSq = pow(agent.x-xo,2)+pow(agent.y-yo,2);
      if(distSq<minRSq || distSq>maxRSq) {
        agent.x = x;
        agent.y = y;
      }
    }
  }
}