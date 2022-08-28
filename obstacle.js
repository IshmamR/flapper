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

  isHit() {
    const collisionY =
      flapper.y < this.top || flapper.y > canvas.height - this.bottom;
    const collisionX =
      flapper.x + flapper.width > this.x && flapper.x < this.x + this.width;
    return collisionY && collisionX;
  }

  offScreen() {
    return this.x < -this.width;
  }

  refresh() {
    this.top = (Math.random() * canvas.height) / 3 + 20;
    this.bottom = (Math.random() * canvas.height) / 3 + 20;
    this.x = canvas.width;
    this.counted = false;
  }
}

let pooledPipe = null;
function handlePipes() {
  if (frame % 80 === 0 && gameSpeed) {
    // add pooledPipe if exists; else creates a new pipe
    // this way no pipe is deleted and pipes are created only if needed to fit screen
    const pipeToAdd = pooledPipe ?? new Pipe();
    pipesArr.unshift(pipeToAdd); // adds in front of pipesArray
    pooledPipe = null;
  }
  // console.log(pipesArr.length);

  for (let i = 0; i < pipesArr.length; i++) {
    pipesArr[i].update();

    // object pooling for offscreen pipes
    if (pipesArr[i].offScreen()) {
      pooledPipe = pipesArr.pop() ?? null;
      if (pooledPipe) pooledPipe.refresh();
    }
  }
}

function getCollision() {
  for (let i = 0; i < pipesArr.length; i++) {
    const flapperInsideScreen =
      flapper.y + flapper.height > 0 &&
      flapper.y + flapper.height < canvas.height;
    const collision = pipesArr[i].isHit();

    if (flapperInsideScreen && collision) {
      return true;
    }
  }
}

function refreshPipes() {
  pipesArr.length = 0;
}
