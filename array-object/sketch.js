// Arrays and Object Notation Assignment
// Ben Francis
// 3/5/2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let symbols = ["bar", "bell", "cherries", "clover", "coin", "gem", "horseshoe", "seven"];
let reelArray = [];
let reelAmount = 3;
let symbolOne;
let symbolTwo;
let symbolThree;

function preload() {
  for (let i = 0; i < symbols.length; i++) {
    let symbol = symbols[i];
    symbols[i] = loadImage(`images/${symbol}.png`);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  createReels();
}

function draw() {
  background(150);
  for (let reel of reelArray) {
    rectMode(CENTER);
    rect(reel.x, reel.y, reel.w, reel.h);
  }
  displaySymbols();
}

function createReels() {
  let firstReel = width/2 - symbols[0].width;
  for (let i = 0; i < reelAmount; i++) {
    let theReel = {
      x: firstReel + symbols[0].width * i-1,
      y: height/2,
      w: symbols[0].width,
      h: symbols[0].height*2
    };
    reelArray.push(theReel);
  }  
}

function displaySymbols() {
  symbolOne = floor(random(0, symbols.length));
  symbolTwo = floor(random(0, symbols.length));
  symbolThree = floor(random(0, symbols.length));
  imageMode(CENTER);
  image(symbols[symbolOne], reelArray[0].x, height/2);
}