// Game: Chicken Match, Author: benjibyte (on GitHub)

// This game was started about a year ago, yet it was a simple match game. 
// I kept shooting myself in the foot several times, and have had to restart
// it over and over. Once it was a half baked Godot project, then pygame, and before all of that
// it was a html/canvas.js game...
// I need something I can prototype quickly with, and pygame was great for a while...until I realized
// I couldn't compile to Web Assembly without a lot of headache and overhead issues.
import kaplay from "kaplay";

// Global variables
const chickenColCount = 3;
const chickenRowCount = 3;

const chickenStartPos = [0,0];
const spriteSize = 16;
const k = kaplay({
  width: 320,
  height: 180,
  scale: 3,
});

// Load Assets
loadSprite("chicken", "sprites/chicken.png");



// Game ...
let x = chickenStartPos[0];
let y = chickenStartPos[1];
for (let x = 0; x < chickenColCount; x++) {
  const chickenX = x * spriteSize;
  const chickenY = y * spriteSize
  k.add([
    sprite("chicken"),
    pos(chickenX, chickenY),
    "hens"
  ]);
  // change position based on index of array
};

