const gridSize = 50;
const noiseScale = .007;
const lineRes = 2;
const lineSize = 3;

function drawLines(vertical) {
  let ax1o = 0;
  while(ax1o < (vertical ? width : height)) {
    const size = noise(ax1o*noiseScale)*gridSize;
    beginShape();
    for(let ax2=0;ax2 < (vertical ? height : width);ax2+=lineRes) {
      const ax1 = ax1o + noise((vertical ? ax1o:ax2)*noiseScale, (vertical ? ax2:ax1o)*noiseScale)*size;
      if(vertical) curveVertex(ax1,ax2);
      else curveVertex(ax2,ax1);
    }
    endShape();
    ax1o+=size;
  }
}


function setup() {
  createCanvas(innerWidth, innerHeight);
  background(255);
  strokeCap(ROUND);
  strokeWeight(lineSize);
  noFill();
  drawLines(true);
  drawLines(false);
}

function draw() {
}