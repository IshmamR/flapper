const obstaclesArr = [];

class Obstacle {
  constructor() {
    this.top = (Math.random() * canvas.height) / 3 + 20;
    this.bottom = (Math.random() * canvas.height) / 3 + 20;
    this.x = canvas.width;
    this.width = 40;
    this.color = `hsl(${hue}, 100%, 50%)`;
    this.counted = false;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, 0, this.width, this.top); // top obstacle
    ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom); // bottom obstacle
  }

  update() {
    this.x -= gameSpeed;
    if (!this.counted && this.x < bird.x) {
      score++;
      this.counted = true;
    }
    this.draw();
  }
}

function handleObstacles() {
  if (frame % 120 === 0) {
    obstaclesArr.unshift(new Obstacle());
  }

  for (let i = 0; i < obstaclesArr.length; i++) {
    obstaclesArr[i].update();
  }

  if (obstaclesArr.length > 5) {
    obstaclesArr.pop();
  }
}

function refreshObstacles() {
  obstaclesArr.length = 0;
}
