const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function updateCanvasDimensions() {
  const windowHeight = window.screen.height;
  const windowWidth = window.screen.width;
  canvas.width = windowWidth;
  if (windowWidth < 400) {
    // portrait on mobile size screens
    canvas.height = windowHeight;
  } else {
    canvas.height = 400;
  }
}
window.addEventListener("resize", updateCanvasDimensions);
window.addEventListener("DOMContentLoaded", updateCanvasDimensions);

const flapper = new Flapper();

const gradient = ctx.createLinearGradient(0, 0, 0, 240);
gradient.addColorStop("0.2", "#ffffff");
gradient.addColorStop("0.4", "#000000");
gradient.addColorStop("0.5", "#4040ff");
gradient.addColorStop("0.6", "#000000");
gradient.addColorStop("0.8", "#ffffff");

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  handlePipes();

  flapper.update();
  if (spacePressed && flapper.y > flapper.height * 2) {
    flapper.flap();
  }

  drawScore();

  handleParticles();

  const collision = getCollision();
  if (collision) {
    handleCollision();
    return;
  }

  angle += 0.1;

  if (gameSpeed) frame++;
  requestAnimationFrame(animate);
}
animate();

function drawScore() {
  ctx.fillStyle = gradient;
  ctx.font = "80px Arial";
  ctx.strokeText(score, 521, 80);
  ctx.fillText(score, 520, 79);
}

function handleCollision() {
  gameOver = true;
  canRestart = false;
  ctx.drawImage(bang, flapper.x - 10, flapper.y - 20, 50, 50);
  ctx.font = "24px Arial";
  ctx.fillStyle = "#fafafa";
  ctx.fillText(
    `Game over, your score is ${score}.`,
    160,
    canvas.height / 2 - 10
  );

  setTimeout(function () {
    canRestart = true;
  }, 1000);
}

function refreshGame() {
  refreshPipes();
  refreshParticles();
  spacePressed = false;
  score = 0;
  angle = 0;
  hue = 0;
  frame = 0;
  gameOver = false;
  animate();
}

// key down
window.addEventListener("keydown", function (e) {
  if (e.code === "Space" || e.code === "ArrowUp") {
    // alert(gameOver);
    if (gameOver && canRestart) {
      refreshGame();
    } else {
      spacePressed = true;
    }
  } else if (e.code === "ArrowRight") {
    gameSpeed = MAX_GAME_SPEED;
  }
});
// key up
window.addEventListener("keyup", function (e) {
  if (e.code === "Space" || e.code === "ArrowUp") {
    spacePressed = false;
  } else if (e.code === "ArrowRight") {
    gameSpeed = 0;
  }
});

window.addEventListener("touchstart", function () {
  if (gameOver && canRestart) {
    refreshGame();
  } else {
    spacePressed = true;
  }
});
window.addEventListener("touchend", function () {
  spacePressed = false;
});
window.addEventListener("touchcancel", function () {
  spacePressed = false;
});
