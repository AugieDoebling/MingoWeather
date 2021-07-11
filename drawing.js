var mingos = [];
var canvas;

var maxMingos = 50;

var mingoSpawnner = null;


function setup() {
  canvas = document.getElementById("mingoCanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let ctx = canvas.getContext("2d");
}

function draw() {
  let ctx = canvas.getContext("2d");

  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // draw all mingos
  for (let i = 0; i < mingos.length; i++) {
    mingos[i].flock(ctx);
  }
}

function maybeDrawMingo() {
  if (Math.random() < 0.33 && mingos.length < 50) 
    spawnMingo()
}

function spawnMingo(y=null) {
  if (y === null)
    y = Math.random() * document.getElementById("mingoCanvas").height;

  x = Math.random() < 0.5 ? -40 : canvas.width + 40;

  console.log('spwaning mingo at', x, y)

  if (!!mingoSpawnner)
    mingos.push(mingoSpawnner(x,y))

  console.log(mingos.length, 'mingos')
}

window.onload = () => {
  setup();
  setInterval(draw, 15);
  setInterval(maybeDrawMingo, 1000);
}

window.onresize = () => {
  console.log('resizing')
  canvas = document.getElementById("mingoCanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}


