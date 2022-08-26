const particleArr = [];
let i;

class Particle {
  constructor() {
    this.x = bird.x;
    this.y = bird.y + bird.height / 2;
    this.size = Math.random() * 7 + 3;
    this.speedY = Math.random() * 1 - 0.5;
    this.color = `hsla(${hue}, 100%, 50%, 0.8)`;
  }

  update() {
    this.x -= gameSpeed;
    this.y += this.speedY;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function handleParticles() {
  particleArr.unshift(new Particle());
  for (i = 0; i < particleArr.length; i++) {
    particleArr[i].update();
    particleArr[i].draw();
  }

  if (particleArr.length > 100) {
    for (i = 0; i < 20; i++) {
      particleArr.pop();
    }
  }
}
