import kaplay from "kaplay";
// Chicken Match, Author: benjibyte (on GitHub)
// This game was started about a year ago, yet it was a simple match game. 
// I kept shooting myself in the foot several times, and have had to restart
// it over and over. Once it was a half-baked Godot project, then pygame, and before all of that
// it was a html/canvas.js game...
// I need something I can prototype quickly with, and pygame was great for a while...until I realized
// I couldn't compile to Web Assembly without a lot of headache and overhead issues. 
// So here we are with Kaplay... 

// Global variables & Kaplay Initialization

const chickenColCount = 3;
const spriteSize = 16;
const gap = 6;
// layout
const totalGridSize = 16;
const startX = ((320 - totalGridSize) / 2) - 22; // get the center
const startY = ((180 - totalGridSize) / 2) - 22; // get the center

const k = kaplay({
  width: 320,
  height: 180,
  scale: 4
});

// Load Assets
k.loadSprite("chicken", "sprites/chicken.png");
k.loadSprite("brown_egg", "sprites/brown_egg.png");
k.loadSprite("white_egg", "sprites/white_egg.png");
k.loadSprite("green_egg", "sprites/green_egg.png");
k.loadSprite("background", "sprites/background.png");
/*
 * I am going to use the Fisher Yates shuffle since JS doesn't have a native solution
 * */
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}


// Setup hidden cards
function setupHiddenCards() {
  const eggs = ["brown_egg", "white_egg", "green_egg", "brown_egg", "white_egg", "green_egg", "brown_egg", "white_egg", "green_egg"];
  const cardFaces = shuffleArray(eggs);
  
  cardFaces.forEach((egg, index) => {
    // Get cords
    const col = index % chickenColCount;
    const row = Math.floor(index / chickenColCount);

    // Grid
    const posX = startX + (col * (spriteSize + gap));
    const posY = startY + (row * (spriteSize + gap));

    k.add([
      k.sprite("chicken"),
      k.pos(posX, posY),
      k.area(), // area() supposedly allows detectable clicks with a mouse
      "card",
      {
        id: index,
        faceValue: egg,
        isFlipped: false,
        eggChild: null,
      }
    ]);
  })
}



k.scene("game", () => {
  let gameWon = false;
  let selectedCards = [];
  let pairsFound = 0;
  let isChecking = false;

  setupHiddenCards();

  const statusText = k.add([
    k.text("Find matching pairs!", { size: 10 }),
    k.pos(10, 10),
    k.color("#000000")
  ]);

  // When a Egg Card is clicked
  k.onClick("card", (card) => {
    if (isChecking || card.isFlipped || selectedCards.length >= 3) {
      return;
    }

    // Flip the card and hide the Chicken using Opacity
    card.isFlipped = true;
    selectedCards.push(card);
    card.opacity = 0;

    // Spaqwn the egg sprite on top of the chicken
    card.eggChild = card.add ([
      k.sprite(card.faceValue),
      k.pos(8,8),
      k.anchor("center"),
      "revealedEgg" // We will use this tag later to remove it
    ]);

    // Only check logic when we have exactly 3 cards selected
    if (selectedCards.length === 3) {
      isChecking = true;

      const [card1, card2, card3] = selectedCards;
      
      // Check if all three cards match!
      if (card1.faceValue === card2.faceValue && card2.faceValue === card3.faceValue) {
        //Match Found!
        pairsFound++;
        selectedCards = [];
        isChecking = false;

        // Game Win Condition
        if (pairsFound === 3) {
          gameWon = true;
          statusText.text = "You found all the eggs! You win!";
        }
      } else {
        // No match, turn cards back over after a short delay
        k.wait(0.6, () => {
          // Remove egg sprites
          if (card1.eggChild) k.destroy(card1.eggChild);
          if (card2.eggChild) k.destroy(card2.eggChild);
          if (card3.eggChild) k.destroy(card3.eggChild);
          // Reset card state
          card1.isFlipped = false;
          card1.opacity = 1;
          card2.isFlipped = false;
          card2.opacity = 1;
          card3.isFlipped = false;
          card3.opacity = 1;
          selectedCards = [];
          isChecking = false;
        });
      }
    }
  })
});

k.go("game");

