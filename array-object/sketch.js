// Arrays and Object Notation Assignment
// Ben Francis
// 3/5/2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let symbols = ["bar", "bell", "cherries", "clover", "coin", "gem", "horseshoe", "seven"];

function preload() {
  for (let i = 0; i < symbols.length; i++) {
    let symbol = symbols[i];
    symbols[i] = loadImage(`images/${symbol}.png`);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
}
