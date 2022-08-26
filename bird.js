const MAXIMUM_VELOCITY = 15;

class Bird {
  constructor() {
    this.x = 150;
    this.y = 200;
    this.vy = 0;
    this.width = 20;
    this.height = 20;
    this.weight = 1;
  }

  update() {
    let curve = Math.sin(angle) * this.height;

    if (this.y > canvas.height - this.height * 2 + curve) {
      // if on ground
      this.y = canvas.height - this.height * 2 + curve;
      this.vy = 0;
    } else if (this.y < 0) {
      // if on top
      this.y = 0;
      this.vy = 0;
    } else {
      this.vy += this.weight * 0.49;
      if (this.vy < MAXIMUM_VELOCITY) {
        this.y += this.vy;
      }
    }

    this.draw();
  }

  draw() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  flap() {
    if (this.vy >= -MAXIMUM_VELOCITY) {
      this.vy -= 1.6;
    }
  }
}
