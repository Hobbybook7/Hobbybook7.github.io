// Arrays and Object Notation Assignment
// Ben Francis
// 3/5/2026
//
// Extra for Experts:
// - Explored putting images in an array using a for loop
// - Explored saving to local storage using getItem and storeItem
// - Explored using browser popups to get user input and display alerts
// - Explored functions such as parseFloat and to toFixed to make the money in the correct format ($__.00)

// Arrays used in project
let symbols = ["bar", "bell", "cherries", "clover", "coin", "gem", "horseshoe", "seven"];
let reelArray = [];
let symbolChoiceArray = [];

// Booleans/State variables used in project
let spin = false;
let displayingSymbols = false;
let displayingPayout = false;
let changingBet = false;
let win = false;

// Assorted variables used in project
let spinTime;
let payoutTableButton;
let changeBetButton;
let sevenIndex;
let rollTime;
let rollSpeedTime;
let displayWinTime;
let winFactor;
let balance;
let bet;

// Constants used in project
const REEL_AMOUNT = 3;
const ROLL_SPEED = 50;
const ROLL_OFFSET = 250;
const ROLL_FLOOR = 500;
const ROLL_ROOF = 2500; 

// Built in preload function for loading images
function preload() {
  sevenIndex = symbols.indexOf("seven");
  for (let i = 0; i < symbols.length; i++) {
    let symbol = symbols[i];
    symbols[i] = loadImage(`images/${symbol}.png`);
  }
}

// Built in setup function sets up for project
function setup() {
  createCanvas(windowWidth, windowHeight);
  // Calls createReels function to create the dimentions for each reel
  createReels();
  // Loads balance from local storage in browser and sets balance to 1000 if never opened project before
  balance = getItem("balance");
  if (balance === null) {
    balance = 1000;
  }
  else {
    balance = parseFloat(balance);
  }
  // Loads bet from local storage in browser and sets bet to 5 if never opened project before
  bet = getItem("bet");
  if (bet === null) {
    bet = 5;
  }
  else {
    bet = parseFloat(bet);
  }
  // Chooses a random starting postion for the symbols on each reel
  for (let i = 0; i < 3; i++) {
    symbolChoiceArray.push(floor(random(0, symbols.length)));
  }
  spinTime = millis();
}

// Built in draw function calls all main funtions needed to run project
function draw() {
  background(150);
  drawReels();
  displaySymbols();
  createFrame();
  payoutTable();
  createChangeBetButton();
  displaymoney();
  displayWin();
}

// Creates the dimensions for each reel then pushs the reel to an array
function createReels() {
  let firstReelX = width/2 - symbols[0].width;
  for (let i = 0; i < REEL_AMOUNT; i++) {
    let theReel = {
      x: firstReelX + symbols[0].width * i,
      y: height/2,
      w: symbols[0].width,
      h: symbols[0].height*2
    };
    reelArray.push(theReel);
  }  
}

// Draws each reel on the canvas
function drawReels() {
  fill(255);
  stroke(0);
  for (let reel of reelArray) {
    rectMode(CENTER);
    rect(reel.x, reel.y, reel.w, reel.h);
  }
}

// Function to display and roll through the symbols on each reel one at a time
function displaySymbols() {
  // If spin is set to true starts the spin cycle for the first reel and subtracts bet amount from balance
  if (spin) {
    spin = false;
    balance -= bet;
    storeItem("balance", balance);
    rollSpeedTime = millis() + ROLL_SPEED;
    rollTime = random(ROLL_FLOOR, ROLL_ROOF);
    displayingSymbols = "firstReel";
  }
  // Spins through all symbols in order on the first reel for a randomly chosen rollSpeedTime
  if (millis() > rollSpeedTime) {
    rollSpeedTime = millis() + ROLL_SPEED;
    if (displayingSymbols === "firstReel") {
      symbolChoiceArray[0] = (symbolChoiceArray[0] + 1) % symbols.length;
      if (millis() > spinTime + rollTime) {
        displayingSymbols = "secondReel";
        rollTime = random(ROLL_FLOOR, ROLL_ROOF);
        spinTime = millis();
      }
    }
    // Spins through all symbols in order on the second reel for a randomly chosen rollSpeedTime
    else if ( displayingSymbols === "secondReel") {
      symbolChoiceArray[1] = (symbolChoiceArray[1] + 1) % symbols.length;
      if (millis() > spinTime + rollTime) {
        displayingSymbols = "thirdReel";
        rollTime = random(ROLL_FLOOR, ROLL_ROOF);
        spinTime = millis();
      }
    }
    // Spins through all symbols in order on the third reel for a randomly chosen rollSpeedTime and calls checkWin function to check if a win exists
    else if ( displayingSymbols === "thirdReel") {
      symbolChoiceArray[2] = (symbolChoiceArray[2] + 1) % symbols.length;
      if (millis() > spinTime + rollTime) {
        displayingSymbols = false;
        spinTime = millis();
        checkWin();
        changeBalance();
      }
    }
  }
  // Calls the displaySymbolsOnReel function to put the images on the canvas in the right spot
  for (let i = 0; i < 3; i ++) {
    displaySymbolsOnReel(symbolChoiceArray[i], i);
  }
}

// Puts the symbol images on the canvas in the right spot on each reel
function displaySymbolsOnReel(symbol, reel) {
  let top = (symbol + 1) % symbols.length;
  let bottom = (symbol - 1 + symbols.length) % symbols.length;
  imageMode(CENTER);
  image(symbols[top], reelArray[reel].x, height/2 - reelArray[0].h/2);
  image(symbols[symbol], reelArray[reel].x, height/2);
  image(symbols[bottom], reelArray[reel].x, height/2 + reelArray[0].h/2);
}

// Displays a Winner! screen if a win is present
function displayWin() {
  let winTime = 1500;
  if (win !== false && millis() < displayWinTime + winTime) {
    push();
    textSize(70);
    textStyle(BOLD);
    fill(255);
    rect(width/2, height/2, reelArray[0].w*4.5, reelArray[0].h, 60);
    fill(0);
    text(`${win}\n${winFactor}x`, width/2, height/2);
    pop();
  }
}

// Checks if a win is present and updates winFactor according the the paytable
function checkWin() {
  if (!displayingSymbols) {
    let symbolOne = symbolChoiceArray[0];
    let symbolTwo = symbolChoiceArray[1];
    let symbolThree = symbolChoiceArray[2];

    if (symbolOne === sevenIndex && symbolTwo === sevenIndex && symbolThree === sevenIndex) {
      winFactor = 150;
      win = "Jackpot!!!!";
    }
    else if (symbolOne === symbolTwo && symbolTwo === symbolThree) {
      winFactor = 10;
      win = "Crazy Win!!!";
    }
    else if (symbolOne === sevenIndex && symbolTwo === sevenIndex ||
             symbolOne === sevenIndex && symbolThree === sevenIndex ||
             symbolTwo === sevenIndex && symbolThree === sevenIndex) {
      winFactor = 2;
      win = "Big Win!!";
    }
    else if (symbolOne === symbolTwo ||
             symbolOne === symbolThree ||
             symbolTwo === symbolThree) {
      winFactor = 1.5;
      win = "Winner!";
    }
    else {
      winFactor = 0;
      win = false;
    }
  }
  displayWinTime = millis();
}

// Creates the red frame around reels
function createFrame() {
  let middleReel = reelArray[1];
  let reelTop = middleReel.y - middleReel.h/2;
  let reelBottom = middleReel.y + middleReel.h/2;
  
  let topFrameH = symbols[0].height/2;
  let topFrameW = symbols[0].width*4;

  let leftFrameX = middleReel.x - middleReel.w*2  + topFrameH/2;
  let rightFrameX = middleReel.x + middleReel.w*2  - topFrameH/2;

  fill("red");
  noStroke();
  rect(middleReel.x, reelTop - topFrameH/2, topFrameW, topFrameH);
  rect(middleReel.x, reelBottom + topFrameH/2, topFrameW, topFrameH);

  rect(leftFrameX, middleReel.y, topFrameH, middleReel.h);
  rect(rightFrameX, middleReel.y, topFrameH, middleReel.h);
  push();
  strokeWeight(5);
  stroke("red");
  line(leftFrameX, middleReel.y, rightFrameX, middleReel.y);
  pop();
}

// Creates the payout table and displays it if payoutButton is pressed
function payoutTable() {
  payoutTableButton = {
    x: width/3,
    y: height - 100,
    w: 100,
    h: 100,
    r: 15
  };
  fill(80);
  stroke(0);
  rect(payoutTableButton.x, payoutTableButton.y, payoutTableButton.w, payoutTableButton.h, payoutTableButton.r);
  fill(220);
  textAlign(CENTER, CENTER);
  textSize(25);
  text("Payout", payoutTableButton.x, payoutTableButton.y - 15);
  text("Table", payoutTableButton.x, payoutTableButton.y + 15);

  if (displayingPayout) {
    let payoutBox = {
      x: width/2,
      y: height/2,
      w: reelArray[1].w*6,
      h: reelArray[1].h*2
    };
    let lineOne = "3 of a kind: 7's - 150x";
    let lineTwo = "2 of a kind: 7's - 2x";
    let lineThree = "3 of a kind: Any Symbol - 10x";
    let lineFour = "2 of a kind: Any Symbol - 1.5x";

    fill(255);
    stroke(0);
    rect(payoutBox.x, payoutBox.y, payoutBox.w, payoutBox.h);
    textAlign(CENTER, CENTER);
    textSize(40);
    fill(0);
    noStroke();
    text(`${lineOne}\n${lineTwo}\n${lineThree}\n${lineFour}`, payoutBox.x, payoutBox.y);
  }
}

// Creates the dimensions for the change bet button and displays it on the canvas
function createChangeBetButton() {
  changeBetButton = {
    x: width/1.5,
    y: height - 100,
    w: 100,
    h: 100,
    r: 15
  };
  fill(80);
  stroke(0);
  rect(changeBetButton.x, changeBetButton.y, changeBetButton.w, changeBetButton.h, changeBetButton.r);
  fill(220);
  textAlign(CENTER, CENTER);
  textSize(25);
  text("Change", changeBetButton.x, changeBetButton.y - 15);
  text("Bet", changeBetButton.x, changeBetButton.y + 15);
}

// Changes the bet based on user input on a popup screen in the browser
function changeBet() {
  let tempBet;
  tempBet = prompt(`Enter a bet amount\nBalance: $${balance}`);
  if (tempBet === null) {
    return;
  }
  tempBet = parseFloat(tempBet);
  if (!isNaN(tempBet) && balance - tempBet >= 0 && tempBet > 0) {
    bet = tempBet;
    storeItem("bet", bet);
  }
  else {
    alert("Please enter a valid number");
    changeBet();
  }
}

// Displays the balance and bet amount at the top of the screen
function displaymoney() {
  fill(0);
  noStroke();
  text(`Balance: $${balance.toFixed(2)}`, width/2, 20);
  text(`Bet: $${bet.toFixed(2)}`, width/2, 40);
}

// Changes the balance based on bet amount and the win factor
function changeBalance() {
  let tempBet = bet;
  if (!displayingSymbols) {
    balance += tempBet*winFactor;
  }
  storeItem("balance", balance);
}

// Built in function to detect if mouse button is clicked
function mouseClicked() {
  // Variables used to determine where payout table and change bet buttons are
  let mouseInPayoutButtonLeft = mouseX > payoutTableButton.x - payoutTableButton.w/2;
  let mouseInPayoutButtonRight = mouseX < payoutTableButton.x + payoutTableButton.w/2;
  let mouseInPayoutButtonTop = mouseY > payoutTableButton.y - payoutTableButton.h/2;
  let mouseInPayoutButtonBottom = mouseY < payoutTableButton.y + payoutTableButton.h/2;

  let mouseInChangeBetButtonLeft = mouseX > changeBetButton.x - changeBetButton.w/2;
  let mouseInChangeBetButtonRight = mouseX < changeBetButton.x + changeBetButton.w/2;
  let mouseInChangeBetButtonTop = mouseY > changeBetButton.y - changeBetButton.h/2;
  let mouseInChangeBetButtonBottom = mouseY < changeBetButton.y + changeBetButton.h/2;

  // Toggles payout screen on or off when payout table button is pressed
  if (mouseInPayoutButtonLeft && mouseInPayoutButtonRight && mouseInPayoutButtonTop && mouseInPayoutButtonBottom) {
    displayingPayout = !displayingPayout;
  }
  // Calls changeBet function if change bet button is pressed
  else if (mouseInChangeBetButtonLeft && mouseInChangeBetButtonRight && mouseInChangeBetButtonTop && mouseInChangeBetButtonBottom && !displayingSymbols) {
    changeBet();
  }
  // Displays a browser alert popup if you try to spin reel with a bet amount higher than total balance
  else if (balance - bet < 0) {
    alert("Lower your bet\n(Or press up arrow to increase balance)");
  }
  // Spins reel
  else if (!displayingSymbols && !displayingPayout) {
    spin = true;
    spinTime = millis();
  }
}

// Built in function used to increase balance if up arrow is pressed (Shhhh its a secret)
function keyPressed() {
  if (keyCode === 38) {
    balance += 1000;
    storeItem("balance", balance);
  }
}