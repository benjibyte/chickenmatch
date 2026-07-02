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
const startX = (320 - totalGridSize) / 2; // get the center
const startY = (180 - totalGridSize) / 2;

const k = kaplay({
  width: 320,
  height: 180,
  scale: 3
});

// Load Assets
k.loadSprite("chicken", "sprites/chicken.png");
k.loadSprite("brown_egg", "sprites/brown_egg.png");
k.loadSprite("white_egg", "sprites/white_egg.png");
k.loadSprite("green_egg", "sprites/green_egg.png");
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
    k.pos(10, 10)
  ]);

  k.onClick("card", (card) => {
    // Guarding against multiple clicks or checking for win condition 
    if (card.isFlipped || selectedCards.length >= 2 || gameWon || isChecking) return; // prevent if card is clicked already

    // Once a card is clicked flip it over
    card.isFlipped = true;
    selectedCards.push(card);
     
  // spawn sprite and place it on top of the chicken card
    card.eggChild = card.add([
      k.sprite(card.faceValue),
      k.pos(8, 8),
      k.anchor("center"),
      "revealedEgg"
    ]);

    // Check for a match if there are two cards flipped over
    if (selectedCards.length >= 2) {
      const [card1, card2] = selectedCards;

      if (card1.faceValue === card2.faceValue) {
        // Match Case!
        pairsFound++;
        selectedCards = [];
        // Make Egg disappear and bring back the chicken...

        // Win Condition!
        if (pairsFound === 3) {
          gameWon = true;
          statusText.text = "You Collected all the Eggs! You win!";
        }
      } else { // No match found
        isChecking = true;

        k.wait(0.6, () => {
          if (card1.eggChild) k.destroy(card1.eggChild);
          if (card2.eggChild) k.destroy(card2.eggChild);

          card1.isFlipped = false;
          card2.isFlipped = false;
          selectedCards = [];

          isChecking = false;
        });
      }
    }
  });
});

k.go("game");

