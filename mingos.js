class Flamingo{
  constructor(x, y) {
    this.light = Math.random() < 0.2;
    this.x = x
    this.y = y
    this.movingRight = true;
    this.waitingFrames = 0;
    this.minMoving = 240;
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
    this.drawBase(ctx, '#F06292', '#F8BBD0') 
  }
  
  drawBase(ctx, primaryColor, secondaryColor, beakColor="black") {
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, 35, 25, Math.PI, 0, 2 * Math.PI);
    // ctx.fillStyle = this.light ? '#F8BBD0' : '#F06292';
    ctx.fillStyle = primaryColor;
    ctx.fill();

    ctx.rect(this.x+5, this.y, 5, 80)
    ctx.rect(this.x-5, this.y, 5, 80)
    ctx.fill();

    //head
    ctx.ellipse(this.movingRight? this.x+35 : this.x-35, this.y-70, 12.5, 7.5, 0, 0, 2*Math.PI)
    ctx.fill();
    ctx.rect(this.movingRight? this.x+22 : this.x-30, this.y, 8, -70)
    ctx.fill();

    // ctx.fillStyle = this.light ? '#F06292' : '#F8BBD0';
    ctx.fillStyle = secondaryColor;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y)
    if (this.movingRight)
      ctx.ellipse(this.x, this.y, 25, 17.5, 0, Math.PI*0.25, Math.PI)
    else
      ctx.ellipse(this.x, this.y, 25, 17.5, 0, 0, Math.PI*0.75)
      
    ctx.closePath();
    ctx.fill();

    // ctx.fillStyle = "black";
    ctx.fillStyle = beakColor;
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

class ColdFlamingo extends Flamingo {
  draw(ctx) {
    this.drawBase(ctx, '#BA68C8', '#E1BEE7')

    ctx.fillStyle = '#9E9E9E';
    ctx.beginPath();
    if (this.movingRight)
      ctx.ellipse(this.x+30, this.y-70, 13, 15, -7, Math.PI, Math.PI*2);
    else
      ctx.ellipse(this.x-30, this.y-70, 13, 15, 7, Math.PI, Math.PI*2);

    ctx.fill();

    ctx.fillStyle = '#1565C0';
    ctx.beginPath();
    if (this.movingRight)
      ctx.ellipse(this.x+18, this.y-83, 6, 6, 0, 0, Math.PI*2);
    else
      ctx.ellipse(this.x-18, this.y-83, 6, 6, 0, 0, Math.PI*2);
    ctx.fill();

    ctx.strokeStyle = '#1565C0';
    ctx.lineWidth = 8;
    ctx.beginPath();
    if (this.movingRight)
      ctx.arc(this.x+25, this.y-17, 9, 3.6, Math.PI * 1/4, true)
    else
      ctx.arc(this.x-25, this.y-17, 9, Math.PI - 3.6, Math.PI * 3/4)
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(this.movingRight ? this.x+12 : this.x-21, this.y-15, 9, 50)
    ctx.fill();
  }
}

class WetFlamingo extends Flamingo {
  draw(ctx) {
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.rect(this.movingRight ? this.x+32 : this.x-38, this.y, 6, -80)
    ctx.fill();

    this.drawBase(ctx, '#FFB74D', '#FFE0B2')

    ctx.fillStyle = '#FB8C00';
    ctx.beginPath();
    ctx.ellipse(this.movingRight ? this.x+35 : this.x-35, this.y-80, 60, 40, 0, Math.PI, Math.PI*2);
    ctx.fill();
  }
}

class HotFlamingo extends Flamingo {
  draw(ctx) {
    this.drawBase(ctx, '#E57373', '#FFCDD2', "#FFD600")

    ctx.fillStyle = '#000000';
    ctx.beginPath();
    if (this.movingRight) {
      ctx.ellipse(this.x+38, this.y-75, 5.5, 5.5, 0, 0, Math.PI*2);
      ctx.ellipse(this.x+50, this.y-75, 5.5, 5.5, 0, 0, Math.PI*2);
      ctx.rect(this.x+25, this.y-78, 25, 3)
    }
    else {
      ctx.ellipse(this.x-38, this.y-75, 5.5, 5.5, 0, 0, Math.PI*2);
      ctx.ellipse(this.x-50, this.y-75, 5.5, 5.5, 0, 0, Math.PI*2);
      ctx.rect(this.x-50, this.y-78, 25, 3)
    }
    
    ctx.fill();
  }
}

class MimosaFlamingo extends Flamingo {
  draw(ctx) {
    this.drawBase(ctx, '#F06292', '#F06292');

    ctx.fillStyle = '#F8BBD0';
    ctx.beginPath();
    
    if (this.movingRight) {
      ctx.moveTo(this.x+20, this.y)
      ctx.ellipse(this.x+20, this.y, 25, 17.5, 0, 0, Math.PI*0.75)
    }
    else {
      ctx.moveTo(this.x-20, this.y)
      ctx.ellipse(this.x-20, this.y, 25, 17.5, 0, Math.PI * 1/4, Math.PI)
    }
      
    ctx.fill()

    ctx.fillStyle = '#E0E0E0';
    ctx.beginPath();
    ctx.rect(this.movingRight ? this.x+44 : this.x-46, this.y-15, 2, 25)
    ctx.fill();

    ctx.fillStyle = '#FFE082'
    ctx.beginPath();
    ctx.ellipse(this.movingRight ? this.x+45 : this.x-45, this.y-25, 6, 23, 0, 0, Math.PI)
    ctx.fill()
    
  }
}



