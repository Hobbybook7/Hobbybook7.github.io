// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gameState = "menu";
let buttonW = 200;
let buttonH = 80;
let buttonX;
let buttonY;

function preload() {
  imgBg = loadImage("images/FlappyBirdBackground.jpg");
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
  displayMenu();
}

function displayMenu() {
  fill("green");
  rect(buttonX, buttonY, buttonW, buttonH);
  fill(255);
  textSize(buttonW / 4);
  textAlign(CENTER, CENTER);
  text("PLAY", width / 2, height / 2);
}

function mousePressed() {
  if (
    mouseX > buttonX &&
    mouseX < buttonX + buttonW &&
    mouseY > buttonY &&
    mouseY < buttonY + buttonH
  ) {
    gameState = "Play";
  }
}
