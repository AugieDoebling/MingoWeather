var mingos = [];
var canvas;

var maxMingos = 50;


function setup() {
  canvas = document.getElementById("mingoCanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  spawnMingo(canvas.height-80);
}

function draw() {
  let ctx = canvas.getContext("2d");

  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  // maybe spawn a new mingo
  if (Math.random() < 0.001 && mingos.length < maxMingos)
    spawnMingo();

  // draw all mingos
  for (let i = 0; i < mingos.length; i++) {
    mingos[i].flock(ctx);
  }
}

function spawnMingo(y=null) {
  if (y === null)
    y = Math.random() * document.getElementById("mingoCanvas").height;

  x = Math.random() < 0.5 ? -40 : canvas.width + 40;

  console.log('spwaning mingo at', x, y)
  mingos.push(new Flamingo(x, y))
}

class Flamingo{
  constructor(x, y) {
    this.light = Math.random() < 0.2;
    this.x = x
    this.y = y
    this.movingRight = true;
    this.waitingFrames = 0;
    this.minMoving = 120;
  }
    
  flock(ctx) {
    this.act();
    this.draw(ctx)
  }

  act() {
    if (0 < this.waitingFrames) {
      this.waitingFrames -= 1;
      return;
    }

    this.minMoving -= 1;
    
    //chose what to do
    if (Math.random() < 0.02 && this.minMoving <= 0) {
      this.waitingFrames = 120;
      this.minMoving = 120;
    }
    else if (Math.random() < 0.01)
      this.movingRight = !this.movingRight;
    else
      this.move();
  }
  
  move() {
    let speed = 0.5;
        
    if (this.movingRight) {
      this.x += speed;
    }
    else {
      this.x -= speed;
    }    
    
    if (this.x < -40)
      this.x = canvas.width + 39;
    else if (canvas.width + 40 < this.x)
      this.x = -39
  }
  
  draw(ctx) {
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, 35, 25, Math.PI, 0, 2 * Math.PI);
    ctx.fillStyle = this.light ? '#F8BBD0' : '#F06292';
    ctx.fill();

    ctx.rect(this.x+5, this.y, 5, 80)
    ctx.rect(this.x-5, this.y, 5, 80)
    ctx.fill();

    //head
    ctx.ellipse(this.movingRight? this.x+35 : this.x-35, this.y-70, 12.5, 7.5, 0, 0, 2*Math.PI)
    ctx.fill();
    ctx.rect(this.movingRight? this.x+22 : this.x-30, this.y, 8, -70)
    ctx.fill();

    ctx.fillStyle = this.light ? '#F06292' : '#F8BBD0';
    ctx.beginPath();
    ctx.moveTo(this.x, this.y)
    if (this.movingRight)
      ctx.ellipse(this.x, this.y, 25, 17.5, 0, Math.PI*0.25, Math.PI)
    else
      ctx.ellipse(this.x, this.y, 25, 17.5, 0, 0, Math.PI*0.75)
      
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.beginPath();
    if (this.movingRight) {
      ctx.moveTo(this.x+40, this.y-65)
      ctx.ellipse(this.x+40, this.y-65, 12.5, 10, 0, Math.PI*1.5, Math.PI*2) 
    }
    else {
      ctx.moveTo(this.x-40, this.y-65)
      ctx.ellipse(this.x-40, this.y-65, 12.5, 10, 0, Math.PI, Math.PI*1.5) 
    }
    ctx.closePath();
    ctx.fill();
  }
}

window.onload = () => {
  setup();
  setInterval(draw, 15);
}

window.onresize = () => {
  console.log('resizing')
  canvas = document.getElementById("mingoCanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}


