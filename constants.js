const TERMINAL_VELOCITY = 15;
const MAXIMUM_VELOCITY = 10;
const GRAVITY = 0.49;
const BOTTOM_THRESHOLD = 20;
const FLAPPER_POSITION = 100;
const MAX_GAME_SPEED = 3;

// colors
const colors = {
  flame: "rgba(212, 175, 55, 0.9)",
};

// game states
let spacePressed = false;
let score = 0;
let angle = 0;
let frame = 0;
let speed = 0;
let gameSpeed = 0;
let gameOver = false;
let canRestart = false;

const bang = new Image();
bang.src = "/bang.png";
