const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const windowHeight = window.screen.height;
const windowWidth = window.screen.width;
canvas.width = (windowWidth * 90) / 100;

if (windowWidth > 600) {
  canvas.height = 400;
} else {
  canvas.height = 250;
}

let spacePressed = false;
let score = 0;
let angle = 0;
let hue = 0;
let frame = 0;
let speed = 0;
let gameSpeed = 2.5;
let gameOver = false;
let canRestart = false;

const bird = new Bird();

const gradient = ctx.createLinearGradient(0, 0, 0, 240);
gradient.addColorStop("0.2", "#ffffff");
gradient.addColorStop("0.4", "#000000");
gradient.addColorStop("0.5", "#4040ff");
gradient.addColorStop("0.6", "#000000");
gradient.addColorStop("0.8", "#ffffff");

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  handleObstacles();

  bird.update();
  if (spacePressed && bird.y > bird.height * 2) {
    bird.flap();
  }

  drawScore();

  handleParticles();

  const collision = getCollision();
  if (collision) {
    handleCollision();
    return;
  }

  requestAnimationFrame(animate);
  angle += 0.12;
  hue++;
  frame++;
}
animate();

function drawScore() {
  ctx.fillStyle = gradient;
  ctx.font = "80px Arial";
  ctx.strokeText(score, 521, 80);
  ctx.fillText(score, 520, 79);
}

function getCollision() {
  for (let i = 0; i < obstaclesArr.length; i++) {
    if (
      bird.x < obstaclesArr[i].x + obstaclesArr[i].width &&
      bird.x + bird.width > obstaclesArr[i].x &&
      ((bird.y < 0 + obstaclesArr[i].top && bird.y + bird.height > 0) ||
        (bird.y > canvas.height - obstaclesArr[i].bottom &&
          bird.y + bird.height < canvas.height))
    ) {
      // collision detected
      return true;
    }
  }
}

const bang = new Image();
bang.src =
  "https://freepikpsd.com/file/2019/10/bang-icon-png-3-Transparent-Images.png";

function handleCollision() {
  gameOver = true;
  canRestart = false;
  ctx.drawImage(bang, bird.x - 10, bird.y - 20, 50, 50);
  ctx.font = "24px Arial";
  ctx.fillStyle = "#fafafa";
  ctx.fillText(
    `Game over, your score is ${score}.`,
    160,
    canvas.height / 2 - 10
  );

  setTimeout(function () {
    canRestart = true;
  }, 3000);
}

function refreshGame() {
  refreshObstacles();
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
  if (e.code === "Space") {
    // alert(gameOver);
    if (gameOver && canRestart) {
      refreshGame();
    } else {
      spacePressed = true;
    }
  }
});
// key up
window.addEventListener("keyup", function (e) {
  if (e.code === "Space") {
    spacePressed = false;
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
