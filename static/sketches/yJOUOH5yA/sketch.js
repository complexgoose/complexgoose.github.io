const layers = [[],[]];
let layeri = 0;
const maxdxy = 100;

const maxLayerSize = () => maxdxy*0.05*(pow(2*(layeri+1),2)-pow(2*layeri,2));

const getLayer = () => {
  let nextLayer = layers[layeri+1];
  if (nextLayer.length >= maxLayerSize()) {
    addLayer();
    return getLayer();
  }
  return layers[layeri];
}

const addLayer = () => {
  layeri++;
  layers.push([]);
}

function setup() {
  createCanvas(innerWidth,innerHeight);
  getLayer().push([width/2,height/2]);
  background(255);
}

function draw() {
  const [xo,yo] = random(getLayer());
  const x = xo + floor(random(-maxdxy,maxdxy));
  const y = yo + floor(random(-maxdxy,maxdxy));
  line(xo,yo,x,y);
  if(x<0||x>width||y<0||y>height) return;
  layers[layeri+1].push([x,y]);
}