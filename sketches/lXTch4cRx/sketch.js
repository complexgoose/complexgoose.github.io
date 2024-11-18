let agents = [];
const numAgents = 1000;
const noiseScale = .0005;
const timeScale = .005;

function setup() {
  createCanvas(innerWidth, innerHeight);
  noFill();
  for(let i=0;i<1000;i++) {
    agents.push({x:random(width),y:random(height),d:1});
  }
}

function draw() {
  background(255);
  for(const agent of agents) {
    const {x,y,d} = agent;
    circle(x,y,d);
    agent.d = noise(x*noiseScale,y*noiseScale,frameCount*timeScale)*200;
  }
}