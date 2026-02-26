// Interactive Scene - Flappy Bird
// Ben Francis
// 3/3/2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gameState = "Menu";
let buttonW = 200;
let buttonH = 80;
let buttonX;
let buttonY;

function preload() {
  imgBg = loadImage("images/FlappyBirdBackground.jpg");
  imgCharacter = loadImage("images/FlappyBirdCharacter.png");
}

function setup() {
  createCanvas(480, 800);
  image(imgBg, 0, 0, width, height);
  buttonW = width/2.4;
  buttonH = height / 10;
  buttonX = width / 2 - buttonW / 2;
  buttonY = height / 2 - buttonH / 2;
}

function draw() {
  fill(0);
  rect(width/2-50, height+10, 50, 50);
  if (gameState === "Menu") {
    displayMenu();
  }
  playGame();
}

function displayMenu() {
  fill("green");
  rect(buttonX, buttonY, buttonW, buttonH);
  fill(255);
  textSize(buttonW / 4);
  textAlign(CENTER, CENTER);
  text("PLAY", width / 2, height / 2);
  fill(0);
  text("FLAPPY BIRD", width/2, height/4);
}

function mousePressed() {
  if (
    mouseX > buttonX &&
    mouseX < buttonX + buttonW &&
    mouseY > buttonY &&
    mouseY < buttonY + buttonH &&
    gameState === "Menu"
  ) {
    gameState = "Play";
  }
}

function playGame() {
  if (gameState === "Play") {
    image(imgBg, 0, 0, width, height);
    image(imgCharacter, width/2 - 75, height/2 - 75);
  }
}

function keyPressed() {
  if (key === "r") {
    gameState = "End Game";
  }
}