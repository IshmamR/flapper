const pipesArr = [];

class Pipe {
  constructor() {
    this.top = (Math.random() * canvas.height) / 3 + 20;
    this.bottom = (Math.random() * canvas.height) / 3 + 20;
    this.x = canvas.width;
    this.width = 40;
    this.color = "green";
    this.counted = false;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, 0, this.width, this.top); // top pipe
    ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom); // bottom pipe
  }

  update() {
    this.x -= gameSpeed;
    if (!this.counted && this.x + this.width < flapper.x) {
      score++;
      this.counted = true;
    }
    this.draw();
  }

  offScreen() {
    return this.x < -this.width;
  }
}

function handlePipes() {
  if (frame % 80 === 0 && gameSpeed) {
    pipesArr.unshift(new Pipe()); // adds in front of pipesArray
  }

  for (let i = 0; i < pipesArr.length; i++) {
    pipesArr[i].update();

    // remove from array if offscreen
    if (pipesArr[i].offScreen()) {
      pipesArr.pop();
    }
  }
}

function getCollision() {
  for (let i = 0; i < pipesArr.length; i++) {
    const flapperInsideScreen =
      flapper.y + flapper.height > 0 &&
      flapper.y + flapper.height < canvas.height;
    const collisionY =
      flapper.y < pipesArr[i].top ||
      flapper.y > canvas.height - pipesArr[i].bottom;
    const collisionX =
      flapper.x + flapper.width > pipesArr[i].x &&
      flapper.x < pipesArr[i].x + pipesArr[i].width;

    if (flapperInsideScreen && collisionX && collisionY) {
      return true;
    }
  }
}

function refreshPipes() {
  pipesArr.length = 0;
}
